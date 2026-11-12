import path from 'path';
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import GuideLead from '../models/GuideLead';
import { createDownloadToken, isValidDownloadToken } from '../lib/downloadToken';
import { createRateLimiter } from '../lib/rateLimit';

const router = Router();

const GUIDE_FILE = path.resolve(__dirname, '../../assets/academic-success-starter-guide.pdf');
const GUIDE_FILENAME = 'Edukademia-Academic-Success-Starter-Guide.pdf';

const LEVELS = ['secondary-school', 'undergraduate', 'postgraduate', 'parent-guardian', 'other'] as const;

const requestSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(''),
  level: z.enum(LEVELS),
  marketingConsent: z.boolean().optional().default(false),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().optional(),
});

// Basic per-IP limit to stop scripted form spam.
const isLimited = createRateLimiter(10, 60 * 60 * 1000);

router.post('/request', async (req: Request, res: Response) => {
  if (isLimited(req.ip ?? 'unknown')) {
    res.status(429).json({ error: 'too-many-requests' });
    return;
  }

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation-failed', issues: parsed.error.issues });
    return;
  }

  const { website, ...lead } = parsed.data;

  // Bots that fill the honeypot get a normal-looking response but nothing is stored.
  if (website) {
    res.json({ downloadUrl: `/api/guide/download?token=${createDownloadToken()}` });
    return;
  }

  try {
    await GuideLead.findOneAndUpdate(
      { email: lead.email.toLowerCase() },
      {
        $set: {
          fullName: lead.fullName,
          phone: lead.phone || undefined,
          level: lead.level,
          marketingConsent: lead.marketingConsent,
          lastRequestedAt: new Date(),
        },
        $setOnInsert: { firstRequestedAt: new Date() },
        $inc: { requestCount: 1 },
      },
      // Every field is set explicitly; schema defaults would clash with $inc.
      { upsert: true, setDefaultsOnInsert: false },
    );
    res.json({ downloadUrl: `/api/guide/download?token=${createDownloadToken()}` });
  } catch (err) {
    console.error('Guide request error:', err);
    res.status(500).json({ error: 'internal-error' });
  }
});

router.get('/download', (req: Request, res: Response) => {
  if (!isValidDownloadToken(req.query.token)) {
    res.status(403).send('This download link has expired. Please request the guide again.');
    return;
  }
  res.download(GUIDE_FILE, GUIDE_FILENAME, (err) => {
    if (err && !res.headersSent) {
      console.error('Guide download error:', err);
      res.status(500).send('The guide could not be downloaded. Please try again later.');
    }
  });
});

export default router;

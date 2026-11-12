import { Router, Request, Response } from 'express';
import { z } from 'zod';
import TutorialEnquiry from '../models/TutorialEnquiry';
import { createRateLimiter } from '../lib/rateLimit';

const router = Router();

const EXAMS = ['WAEC', 'NECO', 'JAMB', 'TOEFL', 'IELTS', 'PTE', 'Duolingo', 'Cambridge'] as const;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const TIMES = ['Morning', 'Afternoon', 'Evening'] as const;

const text = (max: number) => z.string().trim().max(max);

const enquirySchema = z
  .object({
    fullName: text(120).min(1),
    phone: text(30).min(5),
    email: text(200).email(),
    country: text(80).min(1),
    exams: z.array(z.enum(EXAMS)).min(1).max(EXAMS.length),
    subjects: z.array(text(60)).max(20).default([]),
    otherSubjects: z.array(text(60).min(1)).max(10).default([]),
    days: z.array(z.enum(DAYS)).min(1).max(7),
    times: z.array(z.enum(TIMES)).min(1).max(3),
    scheduleNotes: text(300).optional().default(''),
    // Honeypot: real visitors never see or fill this field.
    website: z.string().optional(),
  })
  .refine((d) => d.subjects.length > 0 || d.otherSubjects.length > 0, {
    message: 'At least one subject is required',
    path: ['subjects'],
  });

const isLimited = createRateLimiter(10, 60 * 60 * 1000);

router.post('/enquiry', async (req: Request, res: Response) => {
  if (isLimited(req.ip ?? 'unknown')) {
    res.status(429).json({ error: 'too-many-requests' });
    return;
  }

  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation-failed', issues: parsed.error.issues });
    return;
  }

  const { website, ...enquiry } = parsed.data;
  if (website) {
    res.json({ ok: true }); // honeypot hit: pretend success, store nothing
    return;
  }

  try {
    await TutorialEnquiry.create({
      ...enquiry,
      scheduleNotes: enquiry.scheduleNotes || undefined,
      learningFormat: 'Online',
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Tutorial enquiry error:', err);
    res.status(500).json({ error: 'internal-error' });
  }
});

export default router;

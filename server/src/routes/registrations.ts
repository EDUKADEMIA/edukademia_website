import { Router, Request, Response } from 'express';
import { z } from 'zod';
import Registration from '../models/Registration';

const router = Router();

const studentSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  university: z.string().min(1),
  level: z.string().min(1),
  currentCgpa: z.coerce.number().min(0).max(5),
  targetCgpa: z.coerce.number().min(0).max(5),
  phone: z.string().min(1),
  goals: z.string().optional(),
});

const schoolSchema = z.object({
  schoolName: z.string().min(1),
  contactName: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  studentCount: z.coerce.number().min(1),
  interest: z.string().min(1),
  message: z.string().optional(),
});

function generateRef(prefix: string): string {
  return (
    prefix +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );
}

router.post('/student', async (req: Request, res: Response) => {
  const parsed = studentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation-failed', issues: parsed.error.issues });
    return;
  }
  try {
    const ref = generateRef('CGPA-');
    const registration = new Registration({
      type: 'student',
      ref,
      data: parsed.data,
    });
    await registration.save();
    res.json({ ref });
  } catch (err) {
    console.error('Student registration error:', err);
    res.status(500).json({ error: 'internal-error' });
  }
});

router.post('/school', async (req: Request, res: Response) => {
  const parsed = schoolSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'validation-failed', issues: parsed.error.issues });
    return;
  }
  try {
    const ref = generateRef('SCH-');
    const registration = new Registration({
      type: 'school',
      ref,
      data: parsed.data,
    });
    await registration.save();
    res.json({ ref });
  } catch (err) {
    console.error('School registration error:', err);
    res.status(500).json({ error: 'internal-error' });
  }
});

export default router;

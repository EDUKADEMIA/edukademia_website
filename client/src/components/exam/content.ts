const WHATSAPP_NUMBER = '2348067845022';

/** WhatsApp chat with a pre-filled message. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp business message link; cannot carry custom text, so only offered after registration. */
export const WHATSAPP_DIRECT_URL = 'https://wa.me/message/O4UBELVXPM2GB1';

export type ExamGroup = 'school' | 'english';

export interface Exam {
  id: string;
  name: string;
  detail: string;
  group: ExamGroup;
}

export const EXAMS: Exam[] = [
  { id: 'WAEC', name: 'WAEC', detail: 'West African Senior School Certificate Examination', group: 'school' },
  { id: 'NECO', name: 'NECO', detail: 'National Examinations Council SSCE', group: 'school' },
  { id: 'JAMB', name: 'JAMB', detail: 'Unified Tertiary Matriculation Examination (UTME)', group: 'school' },
  { id: 'TOEFL', name: 'TOEFL', detail: 'Test of English as a Foreign Language', group: 'english' },
  { id: 'IELTS', name: 'IELTS', detail: 'International English Language Testing System', group: 'english' },
  { id: 'PTE', name: 'PTE', detail: 'Pearson Test of English', group: 'english' },
  { id: 'Duolingo', name: 'Duolingo English Test', detail: 'Duolingo English Test', group: 'english' },
  { id: 'Cambridge', name: 'Cambridge English', detail: 'Cambridge English Qualifications', group: 'english' },
];

export const EXAM_GROUPS: { id: ExamGroup; label: string }[] = [
  { id: 'school', label: 'School and entrance exams' },
  { id: 'english', label: 'English language exams' },
];

/** Subjects for WAEC, NECO and JAMB. */
export const SUBJECTS = [
  'Mathematics',
  'English Language',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
];

/** The four skills assessed by the English language tests. */
export const ENGLISH_SKILLS = ['Listening', 'Reading', 'Writing', 'Speaking'];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const TIME_SLOTS = [
  { id: 'Morning', label: 'Morning', hours: '8am – 12pm' },
  { id: 'Afternoon', label: 'Afternoon', hours: '12pm – 4pm' },
  { id: 'Evening', label: 'Evening', hours: '4pm – 8pm' },
];

export const COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'United Kingdom',
  'United States',
  'Canada',
];

export const LEARNING_FORMAT = 'Online';

export const STEPS = [
  {
    title: 'Fill in the registration form',
    body: 'Tell us your exam, the subjects you need help with and when you would like your tutorials.',
  },
  {
    title: 'Send it on WhatsApp',
    body: 'Your details are written into a WhatsApp message for you. Just press send.',
  },
  {
    title: 'We get back to you',
    body: 'We reply about availability, your tutorial schedule and how to begin. All tutorials are online.',
  },
];

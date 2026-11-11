export const AT_A_GLANCE = [
  { label: 'For', value: 'Secondary schools, colleges and universities' },
  { label: 'Delivery', value: 'A whole cohort or targeted student groups' },
  { label: 'Support', value: 'Academic coaching, counselling, or both' },
  { label: 'For your team', value: 'Aggregate reporting and staff training' },
];

export const BENEFITS = [
  {
    title: 'Support beyond the classroom',
    body:
      'Students get structured coaching, mentorship and accountability that complement ' +
      'your teaching, not replace it.',
  },
  {
    title: 'Works with your existing services',
    body:
      'The programme runs alongside your current student support, and we train your ' +
      'counselling staff to continue the approach.',
  },
  {
    title: 'Visibility for academic leaders',
    body:
      'Aggregate reporting gives your academic affairs team a clear view of participation ' +
      'and progress across the cohort.',
  },
];

export const FOR_STUDENTS = [
  'CGPA Digital Workbook and CGPA Calculator',
  'Live learning sessions with recordings',
  'One-on-one academic-performance reviews',
  'Accountability check-ins and progress tracking',
  'CV building and opportunity readiness',
];

export const FOR_INSTITUTION = [
  'Delivery to a whole cohort or targeted groups',
  'Branded student portal',
  'Aggregate reporting for academic affairs teams',
  'Training for your counselling staff',
  'A dedicated account manager',
];

export type OptionId = 'coaching-only' | 'counselling-only' | 'both-full-partnership';

export const OPTIONS: {
  id: OptionId;
  name: string;
  body: string;
  includes: string[];
  featured?: boolean;
}[] = [
  {
    id: 'coaching-only',
    name: 'Academic coaching',
    body:
      'Assessment, personal study plans and accountability check-ins built on the CGPA ' +
      'mentorship programme.',
    includes: [
      'Academic assessment for each participating student',
      'Personal study and revision plans',
      'CGPA Digital Workbook and CGPA Calculator',
      'Live learning sessions with recordings',
      'One-on-one academic-performance reviews',
      'Accountability check-ins and progress tracking',
    ],
  },
  {
    id: 'counselling-only',
    name: 'Counselling',
    body:
      'Sessions with licensed counsellors that help students manage stress, motivation ' +
      'and personal challenges.',
    includes: [
      'Sessions with licensed counsellors',
      'Support with stress and exam anxiety',
      'Support with motivation and personal challenges',
      'Training for your counselling staff',
    ],
  },
  {
    id: 'both-full-partnership',
    name: 'Full partnership',
    body:
      'Coaching and counselling delivered together, so academic and personal progress ' +
      'support each other.',
    includes: [
      'Everything in Academic coaching',
      'Everything in Counselling',
      'CV building and opportunity readiness',
      'One coordinated plan across coaching and counselling',
    ],
    featured: true,
  },
];

export const PROCESS = [
  {
    title: 'Send an enquiry',
    body: 'Tell us about your institution, your students and the support you are considering.',
  },
  {
    title: 'Initial conversation',
    body: 'A partnership manager contacts you within two business days to understand your needs.',
  },
  {
    title: 'Tailored proposal',
    body: 'We recommend a delivery plan and package based on your student numbers and goals.',
  },
  {
    title: 'Delivery and reporting',
    body: 'Your account manager coordinates delivery, and your team receives regular reports.',
  },
];

export const SCHOOL_FAQS = [
  {
    q: 'Which institutions do you work with?',
    a: 'We work with secondary schools, colleges and universities that want to strengthen academic and personal support for their students.',
  },
  {
    q: 'Can we start with a small group of students?',
    a: 'Yes. The programme can be delivered to a whole cohort or to targeted groups, such as first-year students or students on academic probation.',
  },
  {
    q: 'Does this replace our counselling team?',
    a: 'No. Edukademia works alongside your existing student support services, and the partnership includes training for your counselling staff.',
  },
  {
    q: 'How is pricing decided?',
    a: 'Each partnership is tailored. Pricing depends on the number of students and the support you choose, and is set out in your proposal.',
  },
  {
    q: 'Can students also join on their own?',
    a: 'Yes. Individual students can register for the CGPA Mentorship Programme directly through its own page.',
  },
];

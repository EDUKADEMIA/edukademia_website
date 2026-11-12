export interface SchoolEnquiry {
  schoolName: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  studentCount: string;
  interest: string;
  message: string;
}

export async function submitSchoolEnquiry(data: SchoolEnquiry) {
  const res = await fetch('/api/registrations/school', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('submission-failed');
  return res.json() as Promise<{ ref: string }>;
}

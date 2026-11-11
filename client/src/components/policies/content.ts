// Policy wording is legal text carried over verbatim from the original CGPA site.
// Change it only with the programme owner's approval, and update LAST_UPDATED.

export const LAST_UPDATED = '20 August 2026';
export const CONTACT_EMAIL = 'edukademia1@gmail.com';

/** A block of policy content: a paragraph, a list, or a sub-heading. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'h3'; text: string };

export interface Policy {
  id: 'refunds' | 'privacy' | 'certificate' | 'participation';
  title: string;
  navLabel: string;
  blocks: Block[];
}

export const POLICIES: Policy[] = [
  {
    id: 'refunds',
    title: 'Refund or Transfer Policy',
    navLabel: 'Refunds and transfers',
    blocks: [
      {
        type: 'p',
        text: 'Payments are processed through Selar. Edukademia aims to handle payment concerns fairly, transparently and in line with applicable consumer-protection requirements.',
      },
      { type: 'h3', text: 'Refund eligibility' },
      {
        type: 'ul',
        items: [
          'If Edukademia cancels a paid programme activity and no suitable alternative is accepted, the affected participant may choose a refund or transfer.',
          'A participant-initiated refund request should be sent within 48 hours of payment and before any digital resource is accessed, downloaded or delivered and before any live session, review, check-in or mentorship activity begins.',
          'Once digital materials have been supplied or programme delivery has begun, payments are generally non-refundable, except where the service was not delivered as described or a refund is required by applicable law.',
          'Duplicate or failed-payment concerns should be reported promptly with the Selar receipt or transaction reference.',
        ],
      },
      { type: 'h3', text: 'Transfers' },
      {
        type: 'p',
        text: 'Before programme delivery begins, a participant may request one transfer to another eligible student or a future available intake. Transfers require Edukademia’s written confirmation; any price difference remains payable.',
      },
      {
        type: 'p',
        text: `Requests should be sent to ${CONTACT_EMAIL} with the participant’s name, selected tier, payment receipt and reason for the request.`,
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Notice',
    navLabel: 'Privacy notice',
    blocks: [
      {
        type: 'p',
        text: 'Edukademia collects only the information reasonably needed to register participants, deliver the programme, provide support, monitor participation and communicate relevant opportunities.',
      },
      { type: 'h3', text: 'Information we may collect' },
      {
        type: 'ul',
        items: [
          'Name, email address, telephone number and country.',
          'School, level of study and academic information voluntarily supplied for coaching or performance review.',
          'Selected tier, programme participation, communications and progress information.',
        ],
      },
      { type: 'h3', text: 'Payments and service providers' },
      {
        type: 'p',
        text: 'Card and payment information is handled by Selar and its payment partners; Edukademia does not request or store participants’ complete card details. Information may be processed through service providers used to deliver the programme, including Selar, email, WhatsApp and online-meeting platforms.',
      },
      { type: 'h3', text: 'How information is handled' },
      {
        type: 'ul',
        items: [
          'Information is used only for stated programme, support, record-keeping and lawful communication purposes.',
          'Personal information is not sold.',
          'Reasonable safeguards are used, and information is retained only for as long as reasonably necessary for programme delivery, records and legal obligations.',
          'Participants may request access, correction or deletion of their information, subject to applicable legal and record-keeping requirements.',
        ],
      },
      {
        type: 'p',
        text: `If a participant is under 18, a parent or legal guardian should approve the registration and programme communications. Privacy requests may be sent to ${CONTACT_EMAIL}.`,
      },
    ],
  },
  {
    id: 'certificate',
    title: 'Certificate Requirements',
    navLabel: 'Certificate requirements',
    blocks: [
      {
        type: 'p',
        text: 'The CGPA Mentorship Certificate is available only to participants who successfully complete the Complete Mentorship pathway. Payment alone does not guarantee certification.',
      },
      { type: 'p', text: 'Successful completion ordinarily requires:' },
      {
        type: 'ul',
        items: [
          'Participation in required learning sessions, mentorship calls and progress reviews.',
          'Completion of assigned workbooks, action steps or programme exercises.',
          'Consistent engagement with the accountability process.',
          'Respectful conduct, academic integrity and compliance with programme expectations.',
          'Completion of any final review or verification communicated during onboarding.',
        ],
      },
      {
        type: 'p',
        text: 'Edukademia may verify completion records before issuing the certificate. Certification recognises programme completion and does not guarantee a particular grade, admission, scholarship, internship or employment outcome.',
      },
    ],
  },
  {
    id: 'participation',
    title: 'Programme Participation Expectations',
    navLabel: 'Participation expectations',
    blocks: [
      {
        type: 'p',
        text: 'Participants are expected to take ownership of their progress and contribute to a safe, respectful and productive learning environment.',
      },
      {
        type: 'ul',
        items: [
          'Attend scheduled activities punctually and communicate early when attendance is not possible.',
          'Complete agreed actions honestly and participate actively in reviews and check-ins.',
          'Treat facilitators and other participants respectfully; harassment, discrimination or disruptive conduct is not permitted.',
          'Protect the privacy of other participants and do not share personal discussions, recordings or group content without permission.',
          'Do not reproduce, resell or distribute Edukademia workbooks, recordings, templates or other programme materials.',
          'Use personal access only; login, resource and community access may not be shared.',
        ],
      },
      {
        type: 'p',
        text: 'Where expectations are seriously or repeatedly breached, Edukademia may issue a warning, limit access or remove a participant after a fair review. This does not remove any rights the participant may have under applicable law.',
      },
    ],
  },
];

export const REFERENCES = [
  { label: 'Nigeria Data Protection Commission', href: 'https://ndpc.gov.ng/' },
  { label: 'Federal Competition and Consumer Protection Commission', href: 'https://fccpc.gov.ng/' },
  {
    label: 'delivery and refund policies',
    href: 'https://help.selar.com/portal/en/kb/articles/how-to-set-up-terms-and-condition-for-my-selar-store',
  },
];

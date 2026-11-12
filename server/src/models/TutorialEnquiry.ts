import mongoose, { Schema, Document } from 'mongoose';

export interface ITutorialEnquiry extends Document {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  exams: string[];
  subjects: string[];
  otherSubjects: string[];
  days: string[];
  times: string[];
  scheduleNotes?: string;
  learningFormat: 'Online';
  submittedAt: Date;
}

const TutorialEnquirySchema = new Schema<ITutorialEnquiry>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  country: { type: String, required: true },
  exams: { type: [String], required: true },
  subjects: { type: [String], default: [] },
  otherSubjects: { type: [String], default: [] },
  days: { type: [String], default: [] },
  times: { type: [String], default: [] },
  scheduleNotes: { type: String },
  learningFormat: { type: String, enum: ['Online'], default: 'Online' },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITutorialEnquiry>('TutorialEnquiry', TutorialEnquirySchema);

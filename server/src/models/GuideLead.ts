import mongoose, { Schema, Document } from 'mongoose';

export interface IGuideLead extends Document {
  fullName: string;
  email: string;
  phone?: string;
  level: string;
  marketingConsent: boolean;
  requestCount: number;
  firstRequestedAt: Date;
  lastRequestedAt: Date;
}

const GuideLeadSchema = new Schema<IGuideLead>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  level: { type: String, required: true },
  marketingConsent: { type: Boolean, default: false },
  requestCount: { type: Number, default: 1 },
  firstRequestedAt: { type: Date, default: Date.now },
  lastRequestedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGuideLead>('GuideLead', GuideLeadSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  type: 'student' | 'school';
  ref: string;
  data: Record<string, unknown>;
  submittedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  type: { type: String, enum: ['student', 'school'], required: true },
  ref: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IData extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const DataSchema = new Schema<IData>({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IData>("Note", DataSchema);

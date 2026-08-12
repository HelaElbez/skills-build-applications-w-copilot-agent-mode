import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  streak: number;
  rank: number;
  createdAt: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
    rank: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const LeaderboardEntry =
  mongoose.models.LeaderboardEntry ||
  mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;

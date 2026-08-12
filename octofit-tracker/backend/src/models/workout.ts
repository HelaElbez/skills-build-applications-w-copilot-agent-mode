import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;

import mongoose, { Schema } from 'mongoose';
const MovieSchema = new Schema({
  title: { type: String, required: true },
  releaseYear: { type: String, required: true },
  videoType: { type: String, required: true },
  actors: { type: String, required: true },
});

export default mongoose.model('Movie', MovieSchema);

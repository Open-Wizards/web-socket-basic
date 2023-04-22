import mongoose from 'mongoose';


const ReviewSchema = new mongoose.Schema(
  {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;

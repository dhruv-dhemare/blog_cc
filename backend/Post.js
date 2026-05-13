import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide post content'],
      minlength: [10, 'Content must be at least 10 characters']
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    tags: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      enum: ['Technology', 'Lifestyle', 'Business', 'Travel', 'Food', 'Other'],
      default: 'Other'
    },
    viewCount: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);

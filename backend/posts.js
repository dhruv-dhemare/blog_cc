import express from 'express';
import { body } from 'express-validator';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getFeaturedPosts
} from './postController.js';

const router = express.Router();

// Validation middleware
const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('author').notEmpty().withMessage('Author is required')
];

// Routes
router.get('/', getAllPosts);
router.get('/featured', getFeaturedPosts);
router.get('/:id', getPostById);
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
router.delete('/:id', deletePost);

export default router;

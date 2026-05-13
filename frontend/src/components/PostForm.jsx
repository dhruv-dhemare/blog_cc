import '../styles/components.css';
import { useState } from 'react';
import { apiClient } from '../utils/api';

const CATEGORIES = ['Technology', 'Lifestyle', 'Business', 'Travel', 'Food', 'Other'];

export function CreatePostForm({ onPostCreated, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.target);
      const post = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        excerpt: formData.get('excerpt'),
        category: formData.get('category'),
        tags: formData.get('tags')
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag)
      };

      const result = await apiClient.createPost(post);
      if (result._id) {
        setSuccess('Post created successfully!');
        setTimeout(() => {
          onPostCreated();
        }, 1000);
      } else {
        setError(result.error || 'Failed to create post');
      }
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-md)',
      marginBottom: '2rem'
    }}>
      <h2>Create New Post</h2>

      {error && <div className="error" style={{ background: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '4px' }}>{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" required maxLength={200} />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input type="text" id="author" name="author" required />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" placeholder="Brief summary of the post (optional)" style={{ minHeight: '80px' }}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea id="content" name="content" required minLength={10}></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: '4px'
            }}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input type="text" id="tags" name="tags" placeholder="e.g., react, javascript, web" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function EditPostForm({ post, onPostUpdated, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.target);
      const updatedPost = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        excerpt: formData.get('excerpt'),
        category: formData.get('category'),
        tags: formData.get('tags')
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag)
      };

      onPostUpdated(updatedPost);
      setSuccess('Post updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-md)',
      marginBottom: '2rem'
    }}>
      <h2>Edit Post</h2>

      {error && <div className="error" style={{ background: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '4px' }}>{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-title">Title *</label>
          <input type="text" id="edit-title" name="title" required maxLength={200} defaultValue={post.title} />
        </div>

        <div className="form-group">
          <label htmlFor="edit-author">Author *</label>
          <input type="text" id="edit-author" name="author" required defaultValue={post.author} />
        </div>

        <div className="form-group">
          <label htmlFor="edit-excerpt">Excerpt</label>
          <textarea id="edit-excerpt" name="excerpt" placeholder="Brief summary of the post (optional)" style={{ minHeight: '80px' }} defaultValue={post.excerpt || ''}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="edit-content">Content *</label>
          <textarea id="edit-content" name="content" required minLength={10} defaultValue={post.content}></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select id="edit-category" name="category" style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border-color)',
              borderRadius: '4px'
            }} defaultValue={post.category}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-tags">Tags (comma-separated)</label>
            <input type="text" id="edit-tags" name="tags" placeholder="e.g., react, javascript, web" defaultValue={post.tags ? post.tags.join(', ') : ''} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

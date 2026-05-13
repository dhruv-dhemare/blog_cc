import '../styles/components.css';
import { FiX, FiCalendar, FiUser, FiEye, FiTag } from 'react-icons/fi';
import { formatDate } from '../utils/api';

export function PostDetail({ post, onClose, onDelete }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        width: '90%',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: 0,
            right: 0,
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '1rem',
            float: 'right',
            zIndex: 10
          }}
        >
          <FiX />
        </button>

        <div style={{ padding: '2rem' }}>
          <span className="badge badge-primary">{post.category}</span>
          <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{post.title}</h1>

          <div className="card-meta" style={{ marginBottom: '2rem' }}>
            <span className="card-meta-item">
              <FiUser size={16} />
              {post.author}
            </span>
            <span className="card-meta-item">
              <FiCalendar size={16} />
              {formatDate(post.createdAt)}
            </span>
            <span className="card-meta-item">
              <FiEye size={16} />
              {post.viewCount} views
            </span>
          </div>

          <div className="divider"></div>

          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <>
              <div className="divider"></div>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Tags</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-secondary">
                      <FiTag size={12} style={{ marginRight: '0.3rem' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ postId, comments, onAddComment, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = {
      postId,
      author: formData.get('author'),
      email: formData.get('email'),
      content: formData.get('content')
    };
    onAddComment(comment, e.target);
  };

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <div className="divider"></div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>💬 Leave a Comment</h3>
        <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Share your thoughts on this post</p>
        
        <form onSubmit={handleSubmit} style={{ 
          background: 'var(--bg-light)',
          padding: '1.25rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="author" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Your Name *</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              placeholder="Enter your name"
              required 
              style={{ width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="your.email@example.com"
              required 
              style={{ width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="content" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Your Comment *</label>
            <textarea 
              id="content" 
              name="content" 
              placeholder="Write your comment here... (minimum 1 character)"
              required 
              style={{ 
                width: '100%',
                minHeight: '80px',
                padding: '0.6rem',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            style={{ width: '100%', fontSize: '0.9rem' }}
          >
            {isLoading ? '⏳ Posting...' : '✓ Post Comment'}
          </button>
        </form>
      </div>

      <div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
          📝 Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <div style={{
            background: 'var(--bg-light)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            color: 'var(--text-light)',
            border: '1px dashed var(--border-color)',
            fontSize: '0.9rem'
          }}>
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {comments.map(comment => (
              <div key={comment._id} style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid var(--accent-color)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '0.5rem'
                }}>
                  <div>
                    <strong style={{ color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                      {comment.author}
                    </strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: '0.15rem 0 0 0' }}>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p style={{ margin: 0, lineHeight: '1.5', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

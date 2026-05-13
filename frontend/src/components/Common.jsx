import '../styles/components.css';
import { FiCalendar, FiUser, FiEye, FiTag } from 'react-icons/fi';
import { formatDate } from '../utils/api';

export function BlogCard({ post, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <h3 className="card-title">{post.title}</h3>
        <div className="card-meta">
          <span className="card-meta-item">
            <FiUser size={14} />
            {post.author}
          </span>
          <span className="card-meta-item">
            <FiCalendar size={14} />
            {post.createdAt ? formatDate(post.createdAt) : (post.updatedAt ? formatDate(post.updatedAt) : 'Unknown Date')}
          </span>
        </div>
      </div>
      <p>{post.excerpt || post.content.substring(0, 150)}...</p>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge badge-primary">{post.category}</span>
        <span className="card-meta-item" style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>
          <FiEye size={16} />
          {post.viewCount || 0} views
        </span>
      </div>
    </div>
  );
}

export function BlogHeader() {
  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">📝 ProBlog</div>
          <ul className="nav-links">
            <li><a href="#posts">All Posts</a></li>
          </ul>
        </div>
      </nav>
      <header className="header">
        <div className="header-container">
          <h1>Professional Blog Platform</h1>
          <p>Share your thoughts with the world</p>
        </div>
      </header>
    </>
  );
}

export function BlogFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Professional Blog. All rights reserved.</p>
        <p>Built with MERN Stack | React, Node.js, Express & MongoDB</p>
      </div>
    </footer>
  );
}

export function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Loading...</p>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div style={{
      background: '#fed7d7',
      border: '1px solid #fc8181',
      color: '#c53030',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem'
    }}>
      <strong>Error:</strong> {message}
    </div>
  );
}

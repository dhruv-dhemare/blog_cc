import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/components.css';
import { BlogHeader, BlogFooter, LoadingSpinner, ErrorMessage, BlogCard } from './components/Common';
import { CreatePostForm, EditPostForm } from './components/PostForm';
import { apiClient, formatDate } from './utils/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiClient.getAllPosts();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      setError(`Failed to load posts: ${err.message}. Make sure the backend server is running on http://localhost:5000`);
      setPosts([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPost = async (postId) => {
    try {
      const post = await apiClient.getPostById(postId);
      setSelectedPost(post);
      // Update the posts list with the new viewCount
      setPosts(posts.map(p => p._id === postId ? post : p));
    } catch (err) {
      console.error('Failed to load post:', err);
      alert('Failed to load post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await apiClient.deletePost(postId);
      setSelectedPost(null);
      fetchPosts();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(null);
    setEditingPost(post);
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      await apiClient.updatePost(editingPost._id, updatedPost);
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const handlePostCreated = () => {
    setShowCreateForm(false);
    fetchPosts();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BlogHeader />

      <main style={{ flex: 1 }}>
        {error && (
          <div className="container" style={{ marginTop: '2rem' }}>
            <ErrorMessage message={error} />
          </div>
        )}

        {showCreateForm ? (
          <div className="container-narrow" style={{ marginTop: '2rem' }}>
            <CreatePostForm onPostCreated={handlePostCreated} onCancel={() => setShowCreateForm(false)} />
          </div>
        ) : null}

        {editingPost ? (
          <div className="container-narrow" style={{ marginTop: '2rem' }}>
            <EditPostForm post={editingPost} onPostUpdated={handleUpdatePost} onCancel={() => setEditingPost(null)} />
          </div>
        ) : null}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {!showCreateForm && (
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
                  Create New Post
                </button>
              </div>
            )}

            <div id="posts">
              <h2 className="section-title">All Posts</h2>
              {posts.length === 0 ? (
                <div className="empty-state">
                  <h3>No posts yet</h3>
                  <p>Create your first blog post to get started!</p>
                </div>
              ) : (
                <div className="grid grid-2">
                  {posts.map(post => (
                    <BlogCard key={post._id} post={post} onClick={() => handleOpenPost(post._id)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedPost && (
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
        }} onClick={() => setSelectedPost(null)}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'auto',
            width: '95%',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <span className="badge badge-primary">{selectedPost.category}</span>
                  <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{selectedPost.title}</h1>
                </div>
                <button onClick={() => setSelectedPost(null)} style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  marginLeft: '1rem'
                }}>✕</button>
              </div>

              <div className="card-meta" style={{ marginBottom: '2rem' }}>
                <span className="card-meta-item">👤 {selectedPost.author}</span>
                <span className="card-meta-item">📅 {selectedPost.createdAt ? formatDate(selectedPost.createdAt) : (selectedPost.updatedAt ? formatDate(selectedPost.updatedAt) : 'Unknown Date')}</span>
                <span className="card-meta-item">👁️ {selectedPost.viewCount} views</span>
              </div>

              <div className="divider"></div>

              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                {selectedPost.content}
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <>
                  <div className="divider"></div>
                  <div style={{ marginBottom: '2rem' }}>
                    <h4>Tags</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedPost.tags.map((tag, idx) => (
                        <span key={idx} className="badge badge-secondary">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => setSelectedPost(null)}>
                  Close
                </button>
                <button className="btn btn-secondary" onClick={() => handleEditPost(selectedPost)}>
                  ✎ Edit Post
                </button>
                <button className="btn btn-danger" onClick={() => handleDeletePost(selectedPost._id)}>
                  🗑️ Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BlogFooter />
    </div>
  );
}

export default App;

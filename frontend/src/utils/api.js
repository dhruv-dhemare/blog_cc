const API_BASE_URL = 'http://Blog-backend-env.eba-e65c8bgk.ap-south-1.elasticbeanstalk.com/api';

export const apiClient = {
  // Posts
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  getPostById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },

  createPost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },

  updatePost: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },

  getFeaturedPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts/featured`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  // Comments
  getCommentsByPost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  createComment: async (comment) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },

  deleteComment: async (id) => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  }
};

export const formatDate = (date) => {
  if (!date) return 'Unknown Date';
  
  try {
    const dateObj = new Date(date);
    
    // Simple check: if year is between 1900 and 2100, it's probably valid
    const year = dateObj.getFullYear();
    if (year < 1900 || year > 2100) {
      return 'Unknown Date';
    }
    
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    return 'Unknown Date';
  }
};

export const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

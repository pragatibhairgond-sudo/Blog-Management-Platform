// 1. Fetch and Display All Blogs (with Static Fallback for GitHub Pages)
async function fetchBlogs() {
  const postsContainer = document.getElementById('posts-container');
  let blogs = [];

  try {
    // Try fetching from Node backend first
    const response = await fetch('/api/blogs');
    if (response.ok) {
      blogs = await response.json();
    } else {
      throw new Error("Server API not available");
    }
  } catch (error) {
    console.log('Backend server not detected, falling back to static blogs.json:', error);
    
    // Fallback: Fetch directly from static blogs.json file for GitHub Pages
    try {
      const staticResponse = await fetch('blogs.json');
      blogs = await staticResponse.json();
    } catch (staticError) {
      console.error('Error fetching static blogs:', staticError);
    }
  }

  // If no blogs returned or array is empty
  if (!blogs || blogs.length === 0) {
    postsContainer.innerHTML = '<p class="no-posts">No blog posts found.</p>';
    return;
  }

  // Render Blog Cards
  postsContainer.innerHTML = blogs.map(blog => `
    <article class="blog-card">
      <div class="card-header">
        <span class="category-badge">${blog.category || 'General'}</span>
        <span class="post-date">${blog.date || ''}</span>
      </div>
      <h3 class="card-title">${blog.title}</h3>
      <p class="card-excerpt">${blog.content}</p>
      <div class="card-footer">
        <span class="author-name">By ${blog.author}</span>
        <div class="card-actions">
          <button class="btn-action btn-edit" onclick="editBlog(${blog.id})">
            ✏️ Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteBlog(${blog.id})">
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  `).join('');
}
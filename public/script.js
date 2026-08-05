document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById('blog-list');
  const blogForm = document.getElementById('blog-form');

  // If on Home Page, fetch and show blogs
  if (blogList) {
    fetchBlogs();
  }

  // If on Add Blog Page, handle form submission
  if (blogForm) {
    blogForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const description = document.getElementById('description').value;

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description })
      });

      if (response.ok) {
        // Redirect back to Home page after adding blog
        window.location.href = '/';
      }
    });
  }
});

// Fetch and display blogs
async function fetchBlogs() {
  try {
    const res = await fetch('/api/blogs');
    const blogs = await res.json();
    const blogContainer = document.getElementById('blog-list');
    blogContainer.innerHTML = '';

    blogs.forEach(blog => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <h2>${blog.title}</h2>
        <p class="author">By <strong>${blog.author}</strong></p>
        <p class="description">${blog.description}</p>
        <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
      `;
      blogContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}

// Delete blog
async function deleteBlog(id) {
  try {
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  } catch (err) {
    console.error('Error deleting blog:', err);
  }
}
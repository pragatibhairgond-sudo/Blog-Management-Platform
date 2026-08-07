const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Path to JSON file storing blogs
const DATA_FILE = path.join(__dirname, 'blogs.json');

// Helper to read blogs
const getBlogs = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data || '[]');
};

// Helper to write blogs
const saveBlogs = (blogs) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2));
};

// GET all blogs
app.get('/api/blogs', (req, res) => {
  const blogs = getBlogs();
  res.json(blogs);
});

// POST a new blog
app.post('/api/blogs', (req, res) => {
  const { title, author, description } = req.body;
  const blogs = getBlogs();
  
  const newBlog = {
    id: Date.now(),
    title,
    author,
    description
  };

  blogs.push(newBlog);
  saveBlogs(blogs);

  res.status(201).json(newBlog);
});

// DELETE a blog
app.delete('/api/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  let blogs = getBlogs();
  blogs = blogs.filter(b => b.id !== id);
  saveBlogs(blogs);
  res.json({ message: 'Blog deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
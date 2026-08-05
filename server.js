const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Fresh, pre-loaded blog posts
let blogs = [
  {
    id: 1,
    title: "Quantum Computing: Breaking 1000-Qubit Barrier",
    author: "Dr. Evelyn Reed",
    date: "Jul 30, 2026",
    description: "New fault-tolerant quantum chips are rendering traditional encryption obsolete faster than predicted. Here is how post-quantum cryptography works."
  },
  {
    id: 2,
    title: "Why Rust is Dominating Modern Cloud Backends",
    author: "Marcus Vance",
    date: "Jul 28, 2026",
    description: "Zero-cost abstractions and memory safety without a garbage collector have made Rust the top pick for high-throughput distributed services."
  },
  {
    id: 3,
    title: "Building Autonomous AI Agents with WebAssembly",
    author: "Elena Rostova",
    date: "Jul 25, 2026",
    description: "By compiling lightweight LLM runtimes to WASM, developers can run fully private AI agents directly inside edge nodes and browser client environments."
  }
];

// GET: Fetch all blogs
app.get('/api/blogs', (req, res) => res.json(blogs));

// POST: Add new blog
app.post('/api/blogs', (req, res) => {
  const { title, author, description } = req.body;
  if (!title || !author || !description) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const newBlog = { id: Date.now(), title, author, date: currentDate, description };
  blogs.unshift(newBlog);
  res.status(201).json(newBlog);
});

// PUT: Edit existing blog
app.put('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, description } = req.body;
  const index = blogs.findIndex(b => b.id === id);

  if (index !== -1) {
    blogs[index] = { ...blogs[index], title, author, description };
    res.json(blogs[index]);
  } else {
    res.status(404).json({ error: "Blog post not found!" });
  }
});

// DELETE: Remove blog post
app.delete('/api/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  blogs = blogs.filter(b => b.id !== id);
  res.json({ message: "Blog deleted successfully!" });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
<!--Blog Management Platform-->
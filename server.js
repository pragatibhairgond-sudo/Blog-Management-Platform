const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to My Blog Website");
});

app.post("/add-blog", (req, res) => {

    const blog = req.body;

    res.json({
        message: "Blog Added Successfully",
        data: blog
    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
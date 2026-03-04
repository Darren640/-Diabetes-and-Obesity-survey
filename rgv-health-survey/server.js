console.log("SERVER STARTED");

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", (req, res)  => {
    const newResponse = req.body;

    const filePath = path.join(__dirname, "responses.json");

    let responses = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        responses = JSON.parse(data);
    }

    responses.push(newResponse);

    fs.writeFileSync(filePath, JSON.stringify(responses, null, 2));

    res.redirect("/thankyou.html");
});

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
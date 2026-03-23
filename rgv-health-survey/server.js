console.log("SERVER STARTED");

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_PASSWORD = "survey2026";

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

app.get("/responses", (req, res) => {
    const password = req.query.password;

    if (password !== ADMIN_PASSWORD) {
        return res.send("Acess denied. Incorrect password.");
    }

    const filePath = path.join(__dirname, "responses.json");

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const data = fs.readFileSync(filePath);
    const responses = JSON.parse(data);

    res.json(responses);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
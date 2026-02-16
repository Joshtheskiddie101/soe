const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
// Fixed typo 'extends' to 'extended' - Express 5 will sometimes flag this
app.use(express.urlencoded({ extended: false })); 
app.use(express.static("public"));

// 1. SPECIFIC ROUTES FIRST
app.get('/library', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "library.html"));
});

app.get('/payment', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "payment.html"));
});

// 2. EXACT ROOT ROUTE (Use .get, not .use)
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "index.html"));
});

// 3. EXPRESS 5 CATCH-ALL
// In Express 5, you MUST use a named parameter for wildcards
app.get('/:any*', (req, res) => {
    res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3000; // Render requires process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
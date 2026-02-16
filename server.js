const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extends: false}));
app.use(express.static("public"));
const path = require("path");
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "index.html"));
});
app.get('/library', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "library.html"));
});
app.get('/payment', (req, res)=> {
    return res.status(200).sendFile(path.join(__dirname, "payment.html"));
});
app.get(/.*$/, (req, res) => {
    return res.status(404).send("Not found");
});
app.listen(3000, () => {
    console.log("the port is listening on port 3000");
});
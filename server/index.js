const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>Server is up and running.</h1>");
});

app.use('/user', require('./routes/registerLoginRoutes'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
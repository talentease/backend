const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
    res.send('Hello TalentEase!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
app.listen(port, host ,() => {
  console.log(`Server running at http://${host}:${port}`);
});
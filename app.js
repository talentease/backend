const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const positionRoutes = require('./routes/positionRoutes');

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.json('Hello TalentEase!');
});

router.use('/auth', authRoutes);
router.use('/position', positionRoutes);

app.use('/api/v1', router);
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

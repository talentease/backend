const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const positionRoutes = require('./routes/positionRoutes');
const profileRoutes = require('./routes/profileRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('Welcome to the TalentEase API');
});

router.use('/auth', authRoutes);
router.use('/position', positionRoutes);
router.use('/profile', profileRoutes);
router.use('/company', companyRoutes);

app.use('/api/v1', router);
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

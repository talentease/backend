const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const positionRoutes = require('./routes/positionRoutes');
const profileRoutes = require('./routes/profileRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const router = express.Router();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

router.get('/', (req, res) => {
  res.send('Welcome to the TalentEase API');
});

router.use('/auth', authRoutes);
router.use('/position', positionRoutes);
router.use('/profile', profileRoutes);
router.use('/company', companyRoutes);
router.use('/application', applicationRoutes);

app.use('/api/v1', router);
app.listen(port, () => {
  console.log(`Talentease: listening on port ${port}`);
});

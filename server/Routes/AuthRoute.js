const { Signup, Login, userVerification, getCountUser } = require('../controllers/AuthController');
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi' });
});
router.get('/getCountUser', getCountUser);

module.exports = router

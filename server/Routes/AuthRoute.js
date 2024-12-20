const { Signup, Login, userVerification, getCountUser } = require('../controllers/AuthController');
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)
router.get('/getCountUser', getCountUser);

module.exports = router

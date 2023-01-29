// al igual que en index.routers:
const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderLogInForm, signup, login, logout } = require('../controllers/user.controller')

router.get('/signup', renderSignUpForm);

router.post('/signup', signup);

router.get('/login', renderLogInForm);

router.post('/login', login);

router.get('/logout', logout);



module.exports = router;
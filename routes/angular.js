const { Router } = require('express');
const router = Router();

router.get('/home', (req, res) => {
    res.redirect('/');
})

router.get('/login', (req, res) => {
    res.redirect('/');
})

router.get('/registro', (req, res) => {
    res.redirect('/');
})

module.exports = router
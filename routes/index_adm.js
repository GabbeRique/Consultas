const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {

    const usuarioId = req.session.userId;

    if (usuarioId == 1) {
        res.render('index_adm');
    } else {
        res.render('login');
    }

});

module.exports = router
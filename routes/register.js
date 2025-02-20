const express = require('express');
const { Login } = require('../model/login.model'); // Importa o modelo Aluno
const router = express.Router();
const path = require('path');

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('register');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await Login.create({ nome, senha });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;

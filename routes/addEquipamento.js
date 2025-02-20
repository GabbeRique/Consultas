const express = require('express');
const equipamento = require('../model/equipamento.model');
const router = express.Router();

// Exibe a página de registro
router.get('/', (req, res) => {
    res.render('addEquipamento');
});

// Rota para processar o registro
router.post('/', async (req, res) => {
    const { nome } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await equipamento.create({ nome });
        res.redirect('/adm');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;

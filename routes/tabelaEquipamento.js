const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importando operadores do Sequelize
const equipamento = require('../model/equipamento.model');

router.get('/', async (req, res) => {
    try {
        // Busca todos os equipamentos
        const equipamentos = await equipamento.findAll();
        const equipamentosMapeados = equipamentos.map(eq => eq.dataValues);
        res.render('tabelaEquipamento', { equipamentos: equipamentosMapeados }); // Adicionada a vírgula aqui
    } catch (error) {
        console.error("Erro ao buscar Equipamento:", error);
        res.status(500).send("Erro ao buscar Equipamento.");
    }
});

module.exports = router;

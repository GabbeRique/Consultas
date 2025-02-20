const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importando operadores do Sequelize
const peca = require('../model/Peca.model');
const equipamento = require('../model/equipamento.model');

router.get('/', async (req, res) => {
    try {
        // Busca todos os equipamentos
        const equipamentos = await equipamento.findAll();
        const equipamentosMapeados = equipamentos.map(eq => eq.dataValues);

        // Captura os filtros
        const { equipamento_nome, categoria, nome_peca } = req.query;

        let whereClause = {}; // Objeto de condições do Sequelize

        if (equipamento_nome) {
            whereClause.equipamento_nome = { [Op.like]: `%${equipamento_nome}%` };
        }
        if (categoria) {
            whereClause.categoria = { [Op.like]: `%${categoria}%` };
        }
        if (nome_peca) {
            whereClause.nome_peca = { [Op.like]: `%${nome_peca}%` };
        }

        // Busca as peças filtradas
        const pecas = await peca.findAll({ where: whereClause });

        res.render('tabelaPeca', { 
            Pecas: pecas.map(p => p.dataValues),
            equipamentos: equipamentosMapeados, 
            equipamento_nome, 
            categoria,
            nome_peca
        });
        

    } catch (error) {
        console.error("Erro ao buscar Peças:", error);
        res.status(500).send("Erro ao buscar Peças.");
    }
});

module.exports = router;

const express = require('express');
const equipamento = require('../model/equipamento.model');
const peca = require('../model/Peca.model'); // Corrigido o caminho da importação
const router = express.Router();

// Exibe a página de registro com os equipamentos
router.get('/', async (req, res) => {
    try {
        const equipamentos = await equipamento.findAll();
        const equipamentosMapeados = equipamentos.map((eq) => eq.dataValues);
        res.render('addPeca', { equipamentos: equipamentosMapeados }); // Passa os equipamentos para a view
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar equipamentos.');
    }
});

router.post('/', async (req, res) => {
    const { equipamento_nome, categoria, nome_peca, SAP } = req.body;

    try {
        // Cria um novo registro no banco de dados
        await peca.create({ equipamento_nome, categoria, nome_peca, SAP });
        res.redirect('/tabelaPeca');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar.');
    }
});

module.exports = router;

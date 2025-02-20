const express = require('express');
const equipamento = require('../model/equipamento.model');
const router = express.Router();

// Rota para exibir o formulário de edição
// Rota para exibir o formulário de edição
router.get('/:id', async (req, res) => {
    const equipamentoId = req.params.id;

    try {
        const equipamentoEncontrado = await equipamento.findByPk(equipamentoId);

        if (!equipamentoEncontrado) {
            return res.status(404).send('Equipamento não encontrado.');
        }

        // Converte o equipamento para um objeto JSON simples
        res.render('editarEquipamento', { equipamento: equipamentoEncontrado.toJSON() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar o equipamento.');
    }
});


// Rota para atualizar o equipamento no banco de dados
router.post('/:id', async (req, res) => {
    const equipamentoId = req.params.id;
    const { nome } = req.body;

    console.log(`Recebendo atualização para ID: ${equipamentoId}, Nome: ${nome}`); // Depuração

    try {
        const equipamentoEncontrado = await equipamento.findByPk(equipamentoId);

        if (!equipamentoEncontrado) {
            return res.status(404).send('Equipamento não encontrado.');
        }

        // Atualiza o nome
        await equipamentoEncontrado.update({ nome });

        res.redirect('/tabelaEquipamento'); // Redireciona para a lista de equipamentos
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o equipamento.');
    }
});

module.exports = router;

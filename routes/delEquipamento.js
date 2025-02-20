const express = require('express');
const router = express.Router();
const equipamento = require('../model/equipamento.model');
const peca = require('../model/Peca.model');

// Rota para deletar o equipamento pelo nome
router.get('/:nome', async (req, res) => {
  const equipamentoNome = req.params.nome;

  try {
    // Deletar as peças associadas ao equipamento
    await peca.destroy({ where: { equipamento_nome: equipamentoNome } });

    // Deletar o equipamento
    await equipamento.destroy({ where: { nome: equipamentoNome } });

    // Redirecionar após sucesso, sem enviar uma resposta adicional
    res.redirect('/tabelaEquipamento');  // Redireciona para a tabela de equipamentos

  } catch (error) {
    // Enviar resposta de erro em caso de falha
    res.status(500).send('Erro ao deletar equipamento e peças');
  }
});

module.exports = router;

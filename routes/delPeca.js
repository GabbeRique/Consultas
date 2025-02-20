const express = require('express');
const router = express.Router();
const peca = require('../model/Peca.model');

// Rota para deletar o equipamento pelo nome
router.get('/:id', async (req, res) => {
    const pecaId = req.params.id;  // Agora é 'id'
  
    try {
      // Deletar a peça associada pelo ID
      await peca.destroy({ where: { id: pecaId } });
  
      // Redireciona para a tabela de peças
      res.redirect('/tabelaPeca');
      
    } catch (error) {
      // Enviar resposta de erro em caso de falha
      res.status(500).send('Erro ao deletar peça');
    }
  });
  

module.exports = router;

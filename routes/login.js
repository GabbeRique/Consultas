const express = require('express');
const { Login } = require('../model/login.model'); // Importa o modelo Aluno
const bcrypt = require('bcrypt');
const router = express.Router();

// Exibe a página de login
router.get('/', (req, res) => {
    res.render('login'); // Renderiza o formulário de login
});

// Rota para autenticar o login
router.post('/', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        
        const login = await Login.findOne({ where: { nome } });

        if (!login) {
            return res.status(404).send('Nome não encontrada.');
        }

        // Compara a senha fornecida com o hash salvo
        const senhaValida = await bcrypt.compare(senha, login.senha);

        if (!senhaValida) {
            return res.status(401).send('Senha incorreta.');
        }

        
        req.session.userId = login.id;
        req.session.usernome = login.nome;

        // Redireciona ou envia uma mensagem de sucesso
        res.redirect('/adm'); // Mude para onde quiser redirecionar após login
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer login.');
    }
});

module.exports = router;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./config/database');
const path = require("path");
require('dotenv').config(); // Carregar variáveis do arquivo .env

const app = express();

const Login = require('./model/login.model');
const equipamento = require('./model/equipamento.model');
const peca = require('./model/Peca.model');

app.use(express.static('public'));

const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon_io', 'favicon.ico')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'chavePadrao', // Usa variável de ambiente ou um valor padrão
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

async function testarConexao() {
    try {
        await db.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

async function sincronizarBD() {
    try {
        await db.sync({ force: false });
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco:', error);
    }
}

testarConexao();
sincronizarBD();

const indexFRoutes = require('./routes/index_funcionario');
const indexAdmRoutes = require('./routes/index_adm');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const addequipamentoRoutes = require('./routes/addEquipamento');
const addpecaRoutes = require('./routes/addPeca');
const tabelaPeca = require('./routes/tabelaPeca');
const tabelaEquipamento = require('./routes/tabelaEquipamento');
const delEquipamento = require('./routes/delEquipamento');
const delPeca = require('./routes/delPeca');
const editarEquipamento = require('./routes/editarEquipamento');
const editarPecaRouter = require('./routes/editarPeca');

app.use('/editarEquipamento', editarEquipamento);
app.use('/editarPeca', editarPecaRouter);
app.use('/tabelaPeca', tabelaPeca);
app.use('/tabelaEquipamento', tabelaEquipamento);
app.use('/', indexFRoutes);
app.use('/adm', indexAdmRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/addEquipamento', addequipamentoRoutes);
app.use('/addPeca', addpecaRoutes);
app.use('/delEquipamento', delEquipamento);
app.use('/delPeca', delPeca);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine({
    helpers: {
        ifCond: (val1, val2, options) => {
            return val1 === val2 ? options.fn(this) : options.inverse(this);
        }
    }
}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

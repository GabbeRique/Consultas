const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const equipamento = require('./equipamento.model'); // Corrigido o caminho para o arquivo correto

const peca = sequelize.define('peca', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
            model: equipamento,
            key: 'nome'
        }
    },
    categoria: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    nome_peca: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    SAP: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
});

// Definição das associações
equipamento.hasMany(peca, { foreignKey: 'equipamento_nome', targetKey: 'nome', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
peca.belongsTo(equipamento, { foreignKey: 'equipamento_nome', targetKey: 'nome', as: 'equipamentoRef', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = peca;

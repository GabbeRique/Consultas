const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const equipamento = sequelize.define('equipamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true // Garantindo que o nome seja único para funcionar como chave
    }
});

module.exports = equipamento;

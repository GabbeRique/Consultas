const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const Login = sequelize.define('Login', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'login',
    hooks: {
        beforeCreate: async (login) => {
            if (login.senha) {
                login.senha = await bcrypt.hash(login.senha, 10);
            }
        },
        beforeUpdate: async (login) => {
            if (login.changed('senha')) {
                login.senha = await bcrypt.hash(login.senha, 10);
            }
        }
    }
});

module.exports = { Login };
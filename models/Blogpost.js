const { Model, DataTypes, NOW } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model{}

Blogpost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogpost',
    }
);

module.exports = Blogpost;
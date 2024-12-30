const Sequelize = require('sequelize');

class Note extends Sequelize.Model {
    static initiate(sequelize) {
        Note.init({
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            content: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            underscored: false,
            modelName: 'Note',
            tableName: 'notes',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {
        db.Note.belongsTo(db.User);
    }
}

module.exports = Note;
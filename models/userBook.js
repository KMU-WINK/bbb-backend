const Sequelize = require('sequelize');

class UserBook extends Sequelize.Model {
    static initiate(sequelize) {
        UserBook.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            status: {
                type: Sequelize.ENUM('to-read', 'reading', 'read'),
                allowNull: false,
                defaultValue: 'to-read',
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            bookId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Books',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            underscored: false,
            modelName: 'UserBook',
            tableName: 'user_books',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'bookId'], // userId와 bookId의 조합 유니크
                },
            ],
        })
    }
}

module.exports = UserBook;
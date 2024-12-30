const Sequelize = require('sequelize');

class UserBook extends Sequelize.Model {
    static initiate(sequelize) {
        UserBook.init({
            status: {
                type: Sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 0, // 0 -> to-read, 1 -> reading, 2 -> read
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
                    fields: ['userId', 'bookId'], // userId와 bookId의 조합이 유니크
                },
            ],
        })
    }

    static associate(db) {
        db.UserBook.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
        db.UserBook.belongsTo(db.Book, {
            foreignKey: 'bookId',
            targetKey: 'bookId',
        });
    }
}
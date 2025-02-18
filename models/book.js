const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
    static initiate(sequelize) {
        Book.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            authors: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            publisher: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            isbn: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true,
            },
            thumbnail: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Book',
            tableName: 'books',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Book.belongsToMany(db.User, {
            through: 'UserBook',
            foreignKey: 'bookId',
            otherKey: 'userId',
        });
        db.Book.hasMany(db.Note);
    }
}

module.exports = Book;
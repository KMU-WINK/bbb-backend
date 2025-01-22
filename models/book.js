const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
    static initiate(sequelize) {
        Book.init({
            bookId: {
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
            contents: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            datetime: {
                type: Sequelize.DATE,
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
        db.Book.hasMany(db.UserBook, {
            foreignKey: 'bookId', // 'UserBook' 테이블에서 'bookId' 외래키 사용
            sourceKey: 'bookId',  // 'Book' 모델에서 참조할 기본 키
        });
    }
}

module.exports = Book;
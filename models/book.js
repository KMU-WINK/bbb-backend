const Sequelize = require('sequelize');

class Book extends Sequelize.Model {
    static initiate(sequelize) {
        Book.init({
            bookId: {  // 오픈 API에서 제공되는 bookId
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            // 추가적인 책 정보
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Book',
            tableName: 'books',
            charset: 'utf8',
            collate: 'utf8_general_ci',
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
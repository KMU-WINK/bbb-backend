const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
    static initiate(sequelize) {
        Review.init({
            rating: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            underscored: false,
            modelName: 'Review',
            tableName: 'reviews',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {
        db.Review.belongsTo(db.User, {
            foreignKey: 'userId', // 작성자
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        db.Review.belongsTo(db.UserBook, {
            foreignKey: 'userBookId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        db.Review.belongsToMany(db.User, {
            through: 'Like',
        });
    }
};

module.exports = Review;
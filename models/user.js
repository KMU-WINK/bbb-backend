const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local', 
            },
            snsId: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasOne(db.Profile);
        db.User.belongsToMany(db.Book, {
            through: 'userBook',
            foreignKey: 'userId',
            otherKey: 'bookId',
        });
        db.User.hasMany(db.Note);
        db.User.hasMany(db.Review);
        db.User.belongsToMany(db.Review, { 
            through: 'Like',
            foreignKey: 'userId',
            otherKey: 'reviewId',
        });
    }
}

module.exports = User;
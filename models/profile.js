const Sequelize = require('sequelize');

class Profile extends Sequelize.Model {
    static initiate(sequelize) {
        Profile.init({
            bio: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING(255),
                allowNull: true,
                // defaultValue: 기본 이미지,
            },
        })
    }

    static associate(db) {
        db.Profile.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
    }
}

module.exports = Profile;
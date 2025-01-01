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
        db.Profile.belongsTo(db.User, {
            foreignKey: 'userId',
            
        });
    }
}

module.exports = Profile;
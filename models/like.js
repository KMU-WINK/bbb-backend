const Sequelize = require('sequelize');

class Like extends Sequelize.Model {
    static initiate(sequelize) {
        Like.init({}, {
            sequelize,
            timestamps: false,
            modelName: 'Like',
            tableName: 'likes',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
}

module.exports = Like;
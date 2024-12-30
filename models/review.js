const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
    static initiate(sequelize) {
        Review.init({
            
        })
    }

    static associate(db) {

    }
}
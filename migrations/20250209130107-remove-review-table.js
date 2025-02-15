module.exports = {
  async up(queryInterface, Sequelize) {
    // reviews 테이블의 외래 키 삭제
    await queryInterface.removeConstraint('reviews', 'reviews_ibfk_2');

    // reviews 테이블 삭제
    await queryInterface.dropTable('reviews');
  },

  async down(queryInterface, Sequelize) {
    // 롤백 시 테이블 다시 생성
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  }
};

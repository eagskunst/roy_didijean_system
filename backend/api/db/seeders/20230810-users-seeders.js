const { QueryTypes, Sequelize } = require('sequelize')
const sequelize = require('../../lib/sequelize')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Insert data using raw SQL queries
        await sequelize.query(
            `INSERT INTO users (email, password, name, created_date)
         VALUES ('tony@stark.com', '$2b$10$FLyOaZ2FxlmU8h3xDws1fukjpVW5/8j9yvLzLpv0oYnlRRcSbMNqO', 'Tony Stark', CURDATE());`,
            { type: QueryTypes.INSERT }
        );
        await sequelize.query(
            `INSERT INTO admins (id, user_id, username, created_date)
             VALUES (1, 1, 'tony.stark', CURDATE());`,
            { type: QueryTypes.INSERT }
        );
    },
    down: async (queryInterface, Sequelize) => {
        // Remove the inserted data here if necessary
        await sequelize.query(
            `DELETE FROM admins WHERE user_id = 1; 
           DELETE FROM users WHERE id = 1;`,
            { type: QueryTypes.DELETE }
        );
    }
};
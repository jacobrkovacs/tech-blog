const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./data/userData.json');
const blogData = require('./data/blogData.json');
const commentData = require('./data/commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blogpost.create({
            ...blog,
        });
    };

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
        });
    };

    process.exit(0);
};

seedDatabase();

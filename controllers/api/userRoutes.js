const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{model: Blogpost}, {model: Comment}]
        })
        res.status(200).json(userData)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;
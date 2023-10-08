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

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json()
    }
})

module.exports = router;
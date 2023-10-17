const router = require('express').Router();
const session = require('express-session');
const { User, Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Blogpost.findAll({
            include: [{model: User}, {model: Comment}]
        })
        res.status(200).json(postData)
    } catch (err) {
        res.json(err)
    }
});

router.post('/newPost', async (req, res) => {
    try {
        const addPost = await Blogpost.create(req.body);

        res.status(200).json(addPost);
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;
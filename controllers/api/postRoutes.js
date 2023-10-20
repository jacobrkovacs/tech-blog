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

router.post('/newPost', withAuth, async (req, res) => {
    try {
        const addPost = await Blogpost.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(addPost);
    } catch (err) {
        res.json(err)
    }
});

router.get('/:id', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')   
    };

     try {
        const singlePost = await Blogpost.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        });


        res.render('singlePost', {
            singlePost,
            logged_in: req.session.logged_in
        })
     } catch (err) {
        res.json(err)
     };
});

module.exports = router;
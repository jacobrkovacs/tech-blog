const router = require('express').Router();
const {User, Blogpost, Comment} = require('../models');
const withAuth = require ('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blogpost.findAll({
            include: [{model: User}, {model: Comment}],
            order: [['date_created', 'DESC']],
            limit: 5,
        });
        const blogpost = blogData.map((blogpost) => blogpost.get({plain: true}));
        res.render('homepage', {
            blogpost,
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/login', (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('login')
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/signup', (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('signup')
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;
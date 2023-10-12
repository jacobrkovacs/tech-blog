const router = require('express').Router();
const session = require('express-session');
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
});

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
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email : req.body.email } });

        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
          }
      
          const validPassword = await userData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
          }
      
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},

            include:[
                {
                    model: Blogpost
                },
                {
                    model: Comment
                }
            ]
        });
        const user = userData!=null?userData.get({plain: true}):[]

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
    res.render('login')
  });

module.exports = router;
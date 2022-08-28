const router = require('express').Router();
const authRouter = require('./auth/auth-router');

router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.render('index', { hello: 'world' });
});

module.exports = router;

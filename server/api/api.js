const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/users', require('./user/routes'));
router.use('/posts', require('./post/routes'));

module.exports = router;

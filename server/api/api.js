const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/users', require('./user/routes'));
router.use('/ministries', require('./ministry/routes'));
router.use('/posts', require('./post/routes'));
router.use('/medias', require('./media/routes'));

module.exports = router;

const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/users', require('./user/routes'));
router.use('/posts', require('./post/routes'));
router.use('/pages', require('./page/routes'));
router.use('/medias', require('./media/routes'));
router.use('/tags', require('./tag/routes'));

module.exports = router;

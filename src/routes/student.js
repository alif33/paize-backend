const router = require('express').Router();
const path = require('path');
const { permission, profile, getItems } = require('../controller/studentController');
const { isAuthenticate } = require('../middlewire/common');

router.put('/student/permission', isAuthenticate, permission);
router.get('/student/items', isAuthenticate, getItems);
router.put('/student/profile',isAuthenticate, profile);


module.exports = router;
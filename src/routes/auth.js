const router = require('express').Router();
const { enroll, 
    join, 
    profileUpdate, 
    signin, 
    refreshStudent,
    refreshAuthor,
    forgetAuthor,
    forgetStudent
} = require('../controller/auth');
const { isAuthenticate } = require('../middlewire/common');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');


router.post('/enroll', enroll);
router.post('/join', join);
router.post('/signin', signin);
router.put('/profile', isAuthenticate, profileUpdate);

router.get('/author/refresh', isAuthenticate, refreshAuthor);
router.get('/author/forget-password', forgetAuthor);
router.post('/author/set-password', forgetAuthor);

router.get('/student/refresh', isAuthenticate, refreshStudent);
router.get('/student/forget-password', forgetStudent);

module.exports = router;
const router = require('express').Router();
const { 
    makePayment, 
    PaymentsByStudent, 
    PaymentsInSchool, 
    _Payment,
    _Payments
  } = require('../controller/paymentController');
const { isAuthenticate, isAdmin } = require('../middlewire/common');


router.post('/pay', isAuthenticate, makePayment);
router.get('/payment', isAuthenticate, _Payment);
router.get('/student/payments', isAuthenticate, PaymentsByStudent);
router.get('/school/payments', isAuthenticate, PaymentsInSchool);
router.get('/admin/payments', isAdmin, _Payments);

module.exports = router;
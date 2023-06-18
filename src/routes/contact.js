const router = require('express').Router();
const { 
    getContacts,
    addContact,
    removeContact
      } = require('../controller/contactController');
const { isAdmin } = require('../middlewire/common');


router.get('/contacts', isAdmin, getContacts);
router.post('/contact', addContact);
router.delete('/contact', isAdmin, removeContact);

module.exports = router;
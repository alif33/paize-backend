const router = require('express').Router();
const { addItem,
        editItem, 
        getSchools, 
        getApprovedSchools,
        schoolsGroup, 
        getItems,
        fetchItem, 
        getStudents, 
        removeItems,
        profile
      } = require('../controller/schoolController');
const { isAuthenticate } = require('../middlewire/common');

router.get('/schools', getSchools);
router.get('/public/schools', getApprovedSchools);
router.get('/schools/group', schoolsGroup);
router.get('/items', isAuthenticate, getItems);
router.get('/item', isAuthenticate, fetchItem);
router.post('/add-item', isAuthenticate, addItem);
router.put('/edit-item', isAuthenticate, editItem);
router.post('/remove-items', isAuthenticate, removeItems);
router.get('/students',isAuthenticate, getStudents);
router.put('/author/profile',isAuthenticate, profile);

module.exports = router;
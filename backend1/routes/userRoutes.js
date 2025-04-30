// userRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getUserProfile,getUser, updateUserProfile, registerUser, authUser, getAllUsers,deleteUser } = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.get('/all',  getAllUsers); 
router.delete('/:id', deleteUser);
router.route('/:id').get( getUser);
module.exports = router;

const router = require('express').Router();

//controllers
const registerController = require("./controllers/register-controller");
const authController = require('./controllers/auth-controller');
const adminController = require('./controllers/admin-controller');
const publicController = require('./controllers/public-controller');

//middlewares
const authMiddleware = require('./middlewares/auth-middleware');
const adminLoginMiddleware= require('./middlewares/login-admin-middleware');

//user routes
router.post('/api/send-otp', registerController.sendOtp);
router.post('/api/verify-otp',registerController.verifyOtp);
router.post('/api/activate',authMiddleware,registerController.activate);
router.get('/api/refresh',authController.refresh);
router.post('/api/login',adminLoginMiddleware,authController.login);
router.post('/api/logout',authController.logout);
router.post('/api/updateUser',authMiddleware,authController.updateUser);
router.post('/api/forgotPassword/verifyUser',authController.verifyUser);
router.post('/api/forgotPassword/changePassword',authController.changePassword);
router.post('/api/userOperations',authMiddleware,authController.userOperations);

//public routes
router.get('/api/getAdvertise',publicController.getAdvertise);
router.get('/api/getMembers',publicController.getMembers);
router.post('/api/getMemberProfile',publicController.getMemberProfile);
router.get('/api/gethomePageData',publicController.getHomePageData);

//Admin routes
router.post('/api/registerAdmin',adminController.registerAdmin);
router.post('/api/verifyAdmin',adminController.verifyAdmin);
router.post('/api/logoutAdmin',adminController.logoutAdmin);
router.post('/api/deleteUser',authMiddleware,adminController.deleteUser);
router.post('/api/adminDataOperation',authMiddleware,adminController.adminDataOperation);
router.post('/api/adminSetting',authMiddleware,adminController.adminSetting);

module.exports = router;
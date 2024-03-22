const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const productController = require('../controllers/product-controller');
const postController = require('../controllers/post-controller');
const reportController = require('../controllers/report-controller');
const requestController = require('../controllers/request-controller');
const templateController = require('../controllers/template-controller');
const { body } = require('express-validator');
const AuthMiddleware = require('../middleware/auth-middleware');
const AdminMiddleware = require('../middleware/admin-middleware');
const multer = require('multer');
const upload = multer();
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/user/update', AuthMiddleware, userController.update);
router.post('/user/change-password', AuthMiddleware, userController.updatePassword);
router.get('/user', userController.getUser)
// router.get('/users', userController.getUsers)
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post(
  '/upload',
  upload.single('file'),
  userController.imgUpload
);

router.post('/request/create', requestController.create);
router.get('/request/load-all', AuthMiddleware, AdminMiddleware, requestController.loadAll);

router.post('/template/docx', templateController.generateTemplate);

router.post('/post/create', AuthMiddleware, AdminMiddleware, postController.create);
router.delete('/post/:id', AuthMiddleware, AdminMiddleware, postController.delete);
router.post('/post/edit', AuthMiddleware, AdminMiddleware, postController.edit);
router.get('/posts', AuthMiddleware, postController.getAll);

router.post('/report/create', AuthMiddleware, reportController.create);
router.get('/report/first-post', AuthMiddleware, reportController.getFirst)
router.get('/report/last-post', AuthMiddleware, reportController.getLast)
router.get('/report/my', AuthMiddleware, reportController.getMy)
router.get('/report/admin/:id', AuthMiddleware, reportController.getById)
router.post('/report/edit', AuthMiddleware, reportController.edit);
router.get('/report/all', AuthMiddleware, AdminMiddleware, reportController.getAll);



router.post('/create', AuthMiddleware, productController.create);
router.post('/delete', AuthMiddleware, productController.delete);
router.post('/edit', AuthMiddleware, productController.edit);
router.get('/all', productController.getAll);
router.get('/product/:id', productController.getProduct);
router.get('/byCategories', productController.getByCategories);
router.get('/allCategories', productController.getCategories);
router.get('/allSubCategories', productController.getSubcategories);

module.exports = router;

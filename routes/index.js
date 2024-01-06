var express = require('express');
var router = express.Router();
const struct=require('../component/controller/controller');
const middelware=require('../auth/authenticaton')
const post =require('../component/controller/postController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup',struct.register);
router.post('/signin',struct.login);
router.post('/auth',middelware.auth);
router.post('/blogPost',middelware.auth,post.postData);
router.get('/blogRead',middelware.auth,post.getData);
router.patch('/blogUpdate/:id',middelware.auth,post.updateData);
router.delete('/blogDelete/:id',middelware.auth,post.delete);

module.exports = router;

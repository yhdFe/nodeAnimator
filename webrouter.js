/**
 * Created by renbin on 2015/1/9.
 */
var express = require('express');
var router = express.Router();

var projectController = require('./controllers/projectController');
var imageController = require('./controllers/imageController');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/_blank', function (req, res) {
    res.render('_blank');
});

router.get('/project_list', function (req, res) {
    res.render('project_list');
});

router.post('/project/:myfun', function (req, res) {
    projectController[req.params.myfun](req, res);
});

router.post('/image/:myfun', function (req, res) {
    imageController[req.params.myfun](req, res);
});

module.exports = router;

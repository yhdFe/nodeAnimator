/**
 * Created by renbin on 2015/1/12.
 */
var fs = require('fs');
exports.showlist = function (req, res) {
    var id = req.body.id;
    var myjson = {};
    if (id === undefined) {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    } else {
        var img_src = "../public/project/" + id + "/";
        var img_json_src = img_src + 'list.json';
        var img_json = require(img_json_src);
        if (fs.existsSync(img_src)) {
            if (fs.statSync(img_json_src).size === 0)img_json = "[]";
            myjson.ret = '0';
            myjson.msg = 'success';
            myjson.img_list = img_json;
        } else {
            myjson.ret = '2';
            myjson.msg = 'failed';
        }
    }
    res.send(myjson);
};
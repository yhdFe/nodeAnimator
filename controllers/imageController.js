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
        if (fs.existsSync(img_src)) {
            if (fs.existsSync(img_json_src)) {
                var img_json = fs.readFileSync(img_json_src).toString();
                if (fs.statSync(img_json_src).size === 0)img_json = [];
            } else {
                img_json = [];
            }
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
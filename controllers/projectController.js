/**
 * Created by renbin on 2015/1/12.
 */
var project_list_array = require('../public/project/project_list');
exports.showlist = function (req, res) {
    var myjson = {};
    myjson.ret = '0';
    myjson.msg = 'success';
    myjson.project_list = project_list_array;
    res.send(myjson);
};

exports.read = function (req, res) {
    var id = req.body.id;
    var myjson = {};
    if (!req.body.id) {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    }
    else {
        if (project_list_array == "")project_list_array = "{\"count\":0,\"data\":[]}";
        for (var i = 0; i < project_list_array.data.length; i++) {
            if (project_list_array.data[i].id == id) {
                var project_src = "../public/project/" + id + "/";
                var project_json = require(project_src + 'project');
                myjson.info = project_list_array.data[i];
                myjson.data = project_json;
                myjson.ret = '0';
                myjson.msg = 'success';
            }
        }

        if (myjson['ret'] != '0') {
            myjson['ret'] = '2';
            myjson['msg'] = "read fail";
        }

    }
    res.send(myjson);
};
/**
 * Created by renbin on 2015/1/12.
 */
var fs = require('fs');
var project_list_array = require('../public/project/project_list');
exports.showlist = function (req, res) {
    var myjson = {};
    myjson.ret = '0';
    myjson.msg = 'success';
    myjson.project_list = project_list_array;
    res.send(myjson);
};

exports.read = function (req, res) {
	console.log(req.body);
    var id = req.body.id;
    var myjson = {};
    if (req.body.id === undefined) {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    } else {
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

exports.save = function (req, res) {
    var myjson = {};
    var id = req.body.id;
    var project_data = req.body.project_data;

    //检验id 和 project_data 是否存在
    if (req.body.id === '' || project_data == '') {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    } else {
        //检验项目下project.json是否存在
        if (fs.existsSync('../public/project/project_list.json')) {
            var project_list = JSON.parse(fs.readFileSync('../public/project/project_list.json').toString());
            for (var i in project_list.data) {
                if (project_list.data[i].id == id) {
                    //获取project_list.json 修改 saveflag = 1 和修改时间
                    project_list.data[i].saveflag = 1;
                    project_list.data[i].time_save = new Date().getTime().toString();
                    break;
                }
            }
            //写入获取project_list
            fs.writeFileSync('../public/project/project_list.json', JSON.stringify(project_list));
            //创建 id dir 并将project_data写入到项目中project.json
            var dir = "../public/project/" + id;
            fs.writeFileSync(dir + '/project.json', JSON.stringify(JSON.parse(project_data)));
            var page = exportit();
            if (page != "")myjson['page'] = page;
            myjson['ret'] = '0';
            myjson['msg'] = "success";
        } else {
            myjson['ret'] = '2';
            myjson['msg'] = "failed";
        }
    }
    res.send(myjson);
};

function exportit(){

}

exports.add = function (req, res) {
    var project_name = req.body['project_name'];
    var project_author = req.body['project_author'];
    var project_privacy = req.body['project_privacy'];
    var canvas_width = req.body['canvas_width'];
    var canvas_height = req.body['canvas_height'];
    var myjson = {};
    //读取project_list.json
    if (project_name === '') {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    } else {
        //判空 加header
        var project_list_array = require('../public/project/project_list');
        if (project_list_array == '') project_list_array = "{\"count\":0,\"data\":[]}";
        //加入list
        var newdata = {
            id: project_list_array.count,
            name: project_name,
            author: project_author,
            privacy: project_privacy,
            time_add: new Date().getTime(),
            time_save: '',
            del_flag: 0,
            layer_count: 0
        };
        project_list_array.data.push(newdata);
        //创建新文件夹
        var dir = "../public/project/" + project_list_array.count;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        var project_data = {
            project_info: newdata,
            canvas_data: {
                width: canvas_width,
                height: canvas_height,
                background_type: 1,
                background_color: '#fff',
                background_image: ''
            }
        };
        //将数据写入 project.json
        fs.writeFileSync(dir + '/project.json', JSON.stringify(project_data));
        //count +1写入list
        myjson['id'] = project_list_array.count;
        project_list_array.count++;
        fs.writeFileSync('../public/project/project_list.json', JSON.stringify(project_list_array));
        myjson['ret'] = '0';
        myjson['msg'] = "success";
    }
    res.send(myjson);
};


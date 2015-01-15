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
    /* if(id === undefined || project_data===''){
     myjson.ret = '1';
     myjson.msg = 'parm error';
     }else{
     var project_src = "../public/project/" + id + "/";
     var project_data_json=[];
     var project_json_src=project_src+"project.json";
     if(file_exists($project_src)){

     $project_list_array=@file_get_contents("project/project_list.json");
     if($project_list_array=="")$project_list_array="{\"count\":0,\"data\":[]}";
     $project_list_obj=json_decode($project_list_array);
     foreach($project_list_obj->data as $project_info){

     if($project_info->id==$id){
     $project_info->saveflag=1;
     $project_info->time_save=$project_data->project_info->time_save;
     }
     }
     file_put_contents("project/project_list.json",json_encode($project_list_obj));

     @mkdir("project/".$project_list_obj->count);

     file_put_contents("project/".$project_list_obj->count."/project.json",$project_data);

     file_put_contents($project_json_src,json_encode($project_data));
     $page=$this->export();
     if($page!="")$ret['page']=$page;
     $ret['ret']='0';
     $ret['msg']="success";

     }
     else{
     $ret['ret']='2';
     $ret['msg']="failed";
     }
     }*/
    res.send(myjson);
};

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
        console.log(project_data);
        fs.writeFileSync('project.json', project_data);
        //count +1写入list
    }

};


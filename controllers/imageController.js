/**
 * Created by renbin on 2015/1/12.
 */
var rs = require('rs');
exports.showlist = function (req, res) {
    var id = req.body.id;
    var myjson = {};
    if (!id) {
        myjson.ret = '1';
        myjson.msg = 'parm error';
    } else{
        var img_src="../public/project/" + id + "/";
        var img_json_src = require(img_src + 'list');
        if(file_exists($img_src)){
            $img_json_content=@file_get_contents($img_json_src);
            if(strlen($img_json_content)==0)$img_json_content="[]";
            $img_json=json_decode($img_json_content);
            $ret['ret']='0';
            $ret['msg']="success";
            $ret['img_list']=$img_json;

        }
        else{
            $ret['ret']='2';
            $ret['msg']="failed";
        }
    }
    res.send(myjson);
};
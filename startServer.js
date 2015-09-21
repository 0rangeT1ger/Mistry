/**
 * Created by wujianbo on 15/9/21.
 */
var http = require('http'),
    fs = require('fs'),
    querystring = require('querystring');
var devServerHandler = function(req, res){
    var serve = function(path, type){
        res.writeHead(200, {'Content-Type': type});
        fs.createReadStream(path).pipe(res);
    };

    if('GET' === req.method && '/' === req.url){
        serve('demo.html', 'text/html;charset=UTF-8');
    }
    else if('GET' === req.method && '/invitePanel' === req.url){
        serve('invite_panel.json', 'application/json;charset=UTF-8');
    }
    else if('GET' === req.method && '/static/js/main/main.js' === req.url){
        serve('./static/js/main/main.js', 'application/x-javascript;charset=utf-8');
    }
    else if('GET' === req.method && req.url.indexOf('/images/user_avatar_')!==-1){
        serve('.'+req.url, 'image/png');
    }
    else{
        res.writeHead(404 , {'Content-Type': 'text/html;charset=UTF-8', 'Content-Language': 'zh-CN'});
        res.end('<h1>404!</h1><br/><h3>你似乎来到了知识的荒原</h3>');
    }
};
var devServer = http.createServer(devServerHandler);
devServer.listen(3000);
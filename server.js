var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");
var schedule = require('node-schedule');
var request = require('request');
var cron = require('node-cron');

var buf = fs.readFileSync('userdata.txt', "utf8");
if (! buf){
  console.log('ERROR: no user data found plz enter userdata');
}
else{
  var rn = random(0,29);
  var rn2 =rn+30;
  console.log(rn);
  var data = buf.split(',');
  var nick = data[0];
  var password = data[1];
  var j = schedule.scheduleJob({ minute: rn}, makeattendancce);
  var k = schedule.scheduleJob({ minute: rn2}, makeattendancce);

  http.createServer(function (req, res) {
  	console.log(req.url);
  	var u=req.url.substring(1,req.url.length);
  	console.log(u);
    	console.log('4444455555555555555555555555555');
    if (req.url == "/list.html") {
      fs.readFile('list.html', function (err, html) {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
      });
    } 
    else if(req.url == "/dellist.html"){
      fs.readFile('dellist.html', function (err, html) {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
      });
    }
    else if(req.url == "/addlist.html"){
      fs.readFile('addlist.html', function (err, html) {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
      });
    }
    else if(req.url.substring(0,8) == "/sec123d"){
      var u=req.url.substring(9,req.url.length);
      console.log('4444');
      console.log(u);
      console.log(__dirname);
      console.log(path.resolve(__dirname,u));
      var file = decodeURI(path.resolve(__dirname,u));
      console.log(file);
      fs.readFile(file, function (err, file) {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "video/mp4"});  
        res.write(file);  
        res.end();  
      });
    }
    else{
    	console.log(req.url);
    	console.log('44444');
      var file = decodeURI(path.resolve(__dirname,u));
      console.log(file);
      fs.stat(file, function(err, stats) {
        if (err) {
          if (err.code === 'ENOENT') {
            // 404 Error if file not found
            console.log('404');
            res.writeHead(404, {"Content-Type": "video/mp4"});
            res.write("404 Not Found\n");
            res.end();
            return;
          }
        res.end(err);
        }
        var range = req.headers.range;
        if (!range) {
         // 416 Wrong range
         console.log('416');
         res.writeHead(416, {"Content-Type": "video/mp4"});
            res.write("416 range error\n");
            res.end();
            return;
        }
        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);
        var total = stats.size;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = (end - start) + 1;
        /*chunksize= parseInt(chunksize/800);
        console.log(chunksize);
        console.log('00000000000');
        end = start+chunksize-1;--*/
        console.log(start+" "+end+"+++8888");
        res.writeHead(206, {
          "Content-Range": "bytes " + start + "-" + end + "/" + total,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        });

             var stream = fs.createReadStream(file, { start: start, end: end })
          .on("open", function() {
            stream.pipe(res);
          }).on("error", function(err) {
            res.end(err);
          });
      });
    }
  }).listen(8888);

/*process.on( 'SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  var url="http://localhost:3000/attendance";
  var formdata = {
    nick: nick,
    password: password
  };
  request.post(url, {form: formdata}, function(err, httpres, body){
    if(!body){
      console.log("server not running");
    }
    else{
      console.log(body);
    }
    console.log('running a task every one second');
    process.exit( );
  });
  // some other closing procedures go here
});*/

}

function makeattendancce() {
  var url="http://192.168.118.164:3000/attendance";
    var formdata = {
      nick: nick,
      password: password
    };
    request.post(url, {form: formdata}, function(err, httpres, body){
      if(!body){
        console.log("ERROR: centeral server not running");
      }
      else{
        console.log(body);
      }
  });

}
function random (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
    


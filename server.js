/*var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    var rs = fs.createReadStream('v1.mp4');
    rs.pipe(res);
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');*/
/*var fs=require("fs");
var d=null;
fs.readFile("inp.txt",function(error,data)
{
console.log(data+"hey i got it");
});

console.log("carry on");
var cnt=fs.readFileSync("inp.txt");
console.log(cnt+"this");*/


var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
	console.log(req.url);
	var u=req.url.substring(1,req.url.length);
	console.log(u);
  	console.log('4444455555555555555555555555555');
  /*if (req.url != "/v1.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://localhost:8888/v1.mp4" controls></video>');
  } else*/ {
  	console.log(req.url);
  	console.log('44444');
    var file = path.resolve(__dirname,u);
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;
      /*chunksize= parseInt(chunksize/800);
      console.log(chunksize);
      console.log('00000000000');
      end = start+chunksize-1;*/
      console.log(start+" "+end+"++++++");
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

/*
 * Inspired by: http://stackoverflow.com/questions/4360060/video-streaming-with-html-5-via-node-js
 */

/*var http = require('http'),
    fs = require('fs'),
    util = require('util');

http.createServer(function (req, res) {
  var path = 'movie.mp4';
  var stat = fs.statSync(path);
  var total = stat.size;
  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var http = require('http'),
    fs = require('fs'),
    util = require('util');

var path = "movie.mp4";

var port = 8888;
var host = "localhost";

http.createServer(function (req, res) {

  var stat = fs.statSync(path);
  var total = stat.size;

  if (req.headers.range) {   // meaning client (browser) has moved the forward/back slider
                                         // which has sent this request back to this server logic ... cool
    var range = req.headers.range;
    console.log(range);
    console.log("666666")
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);

  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }
}).listen(port, host);

console.log("Server running at http://" + host + ":" + port + "/");*/
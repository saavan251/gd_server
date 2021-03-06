var request = require('request');
var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");
var buf = fs.readFileSync('userdata.txt', "utf8");
var buf2 = fs.readFileSync('serverdata.txt', "utf8");
if (! buf){
	console.log('ERROR: no user data found plz enter userdata');
}
else{
	var data = buf.split(',');
	var nick = data[0];
	var password = data[1];
	var url="http://192.168.118.164:3000/update/addvid";
	var formdata = {
	    nick: nick,
	    password: password
	  };
	  multirequest(formdata);
}

function multirequest(formdata){
  request.post(url, {form: formdata}, function(err, httpres, body){
      if(!body){
        console.log("ERROR: centeral server not running");
        multirequest(formdata);
      }
      else if(body != "successfully updated"){
      	//console.log(typeof body);
        console.log(body);
        multirequest(formdata);
      }
      else{
      	console.log(body);
        transfer();
      }
  });
}

function transfer(){
  var curr=__dirname;
  var testFolder = path.resolve(curr+'/share_these_videos');
  fs.readdir(testFolder, (err, files) => {
    if(files.length == 0)
      console.log('NO SHARED FILES');
    else{
        files.forEach(file => {
          //console.log(path);
          var old = path.resolve(curr+'/share_these_videos/'+file);
          var nw = path.resolve(curr+'/my_shared_videos/'+file);
          fs.rename(old,nw,  function (err) {
          if (err) throw err;
          console.log(file+': added to your share');
        });
      });
    }
  });
}
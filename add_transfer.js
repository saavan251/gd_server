var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");
var request = require('request');
const md5File = require('md5-file');
var buf = fs.readFileSync('userdata.txt', "utf8");
if (! buf){
	console.log('ERROR: no user data found plz enter userdata');
}
else{
	var curr=__dirname;
	var testFolder = path.resolve(curr+'/share_these_videos');
	fs.readdir(testFolder, (err, files) => {
		if(files.length == 0)
			console.log('NO SHARED FILES');
		else{
		  	files.forEach(file => {
			    //console.log(path);
			    var old = path.resolve(curr+'/share_these_videos/'+file);;
			    var nw = path.resolve(curr+'/my_shared_videos/'+file);
			    fs.rename(old,nw,  function (err) {
				  if (err) throw err;
				  console.log(file+': rename complete');
				});
	 		});
		}
	});
}
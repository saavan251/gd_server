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
	var testFolder = path.resolve(curr+'/remove_from_share');
	fs.readdir(testFolder, (err, files) => {
		if(files.length == 0)
			console.log('NO SHARED FILES');
		else{
		  	files.forEach(file => {
			    //console.log(path);
			    var old = path.resolve(curr+'/remove_from_share/'+file);
			    var nw = path.resolve(curr+'/unshared_videos/'+file);
			    fs.rename(old,nw,  function (err) {
				  if (err) throw err;
				  console.log(file+': rename complete');
				});
	 		});
		}
	});
}
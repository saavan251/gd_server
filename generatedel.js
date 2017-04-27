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
	var testFolder = curr+'\\remove_from_share';
	//console.log(testFolder);
	fs.readdir(testFolder, (err, files) => {
		if(files.length == 0)
			console.log('NO FILES TO DELETE');
		else{
			fs.writeFileSync('dellist.html', '2"""');
		  	files.forEach(file => {
		    var path= 'remove_from_share\\'+file;
		    //console.log(path);
		    md5File(path, (err, hash) => {
		    if (err) throw err
		   //console.log(file);
		    /*console.log('The MD5 sum of'+file+'is: '+hash);
		    console.log('');*/
		    var data = file + ",,,," + hash + "$$$";
		    fs.appendFileSync('dellist.html', data);
	 	});
	  });
		  }
	});
}
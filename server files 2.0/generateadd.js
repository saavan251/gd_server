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
	fs.writeFileSync('addlist.html', '2"""');
	var curr=__dirname;
	var tpath = path.resolve(curr+'/share_these_videos');
	//console.log(testFolder);
	recurse(tpath,'/my_shared_videos');
}

function recurse(tpath, url){
	fs.readdir(tpath, (err, files) => {
		if(files.length == 0)
			console.log('NO FILES TO SHARE in '+tpath);
		else{
			
		  	files.forEach(file => {
		  		//console.log(tpath+'\\'+file);
		  		fs.stat(path.resolve(tpath+'/'+file), function(err, stats) {
		  			if(err)
		  				console.log(err);
		  			else{
		  				if(stats.isDirectory()){
		  					recurse(path.resolve(tpath+'/'+file),url+'/'+file);
		  				}
		  				else{
						    console.log(url+'/'+file);
						    md5File(path.resolve(tpath+'/'+file), (err, hash) => {
						    	if (err) 
						    	{
						    		console.log(err);
						    		console.log("error in md5");
						    	}
							   //console.log(file);
							    var data = url+'/'+file + ",,,," + hash + "$$$";
							    fs.appendFileSync('addlist.html', data);
							    console.log(data);
					 		});
		  				}


		  			}
		  		});
	  });
		  }
	});

}
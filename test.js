/*var fs = require("fs"),
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
	recurse(tpath,'share_these_videos');
	
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
							    console.log(data);
					 		});
		  				}


		  			}
		  		});
	  });
		  }
	});

}

	fs.readdir(testFolder, (err, files) => {
		if(files.length == 0)
			console.log('NO FILES TO SHARE');
		else{
		  	files.forEach(file => {
		    var path= 'share_these_videos\\'+file;
		    //console.log(path);
		    md5File(path, (err, hash) => {
		    if (err) throw err
		   //console.log(file);
		    /*console.log('The MD5 sum of'+file+'is: '+hash);
		    console.log('');
		    var data = file + ",,,," + hash + "$$$";
		    fs.appendFileSync('addlist.html', data);
		    var old = curr+'\\share_these_videos\\'+file;
		    var nw = curr+'\\my_shared_videos\\'+file;
		    fs.rename(old,nw,  function (err) {
			  if (err) throw err;
			  console.log(file+'rename complete');
			});
	 	});
	  });
		  }
	});
}*/
/*var elem = '/my_shared_videos/cover/New folder/Compiler Design Lecture 3 -- Ambiguous grammars and making them unambiguous.mp4';
var ct = elem.lastIndexOf('/');
console.log(ct);console.log(elem.length);
console.log(elem.substring(elem.lastIndexOf('.'),elem.length ));
console.log(elem.substring(ct,elem.length ));*/
var request = require('request');
var url="http://172.16.86.222:13000/login?nick=test123&password=123456&secret=qwerty";

request.get(url,function(err, httpres, body){
					console.log(typeof body)});
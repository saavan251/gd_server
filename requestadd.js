var request = require('request');
var fs = require('fs');
var buf = fs.readFileSync('userdata.txt', "utf8");
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
      	console.log(typeof body);
        console.log(body);
        multirequest(formdata);
      }
      else{
      	console.log(body);
      }
  });
}
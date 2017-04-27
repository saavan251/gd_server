var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");
var request = require('request');
  var ffmpeg = require('fluent-ffmpeg');
var curr=__dirname;
  var testFolder = curr+'\\remove_from_share';
var proc = new ffmpeg({ source: curr+'\\a.mp4' })
  .withSize('150x100')
  .takeScreenshots({
      count: 2,
      timemarks: [ '0.5', '1' ]
    }, testFolder, function(err, filenames) {
      if(err)
        console.log(err);
      console.log(filenames);
      console.log('screenshots were saved');
  });
/*var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");
var schedule = require('node-schedule');
var request = require('request');
var cron = require('node-cron');
var rn = random(0,29);
  var rn2 =rn+30;
  console.log(rn);
var j = schedule.scheduleJob({ minute: rn}, function(){
  console.log('Time for tea!');
});

function random (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}*/
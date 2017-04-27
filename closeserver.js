process.on( 'SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit( );
})
var data = "Data$$$over$$ata$$over$$";
var elem=data.split('$$');
console.log(elem.length);
for(i=0; i< elem.length; i++)
console.log(elem[i]);
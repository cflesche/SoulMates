var fs     = require( "fs" );
var http   = require( "http" );
var sqlite = require( "sqlite3" );

function giveBackFile( name, res )
{
    var contents = "";
    try {
    	contents = fs.readFileSync( name ).toString();
    }
    catch( e ) {
    	console.log(
    	    "Error: Something bad happened trying to open "+name );
        res.writeHead( 404 );
        res.end( "" );
        return;
    }
    res.writeHead( 200 );
    res.end( contents );
}

function addResults(req, res){

    var results = req.url.toString().split("=")[1];
    var username = results.split("/");
    var results2 = results.toString().split("?")[1];
    var indv_result = results2.split("&");
    var matchString = indv_result[0]+indv_result[1]+indv_result[2]+indv_result[3]+indv_result[4];
    console.log(indv_result);
    var db = new sqlite.Database( "characterTest.sqlite" );
    db.run("INSERT INTO TEST ('Username' , 'Choice1' , 'Choice2' , 'Choice3' , 'Choice4' ,'Choice5', 'Result') VALUES ('"+username[0]+"','"+indv_result[0] +"', '"+indv_result[1] +"' ,'"+indv_result[2] +"' , '"+indv_result[3] +"' ,'"+indv_result[4]+"', '"+matchString+"') ",
        function(err){
          if( err !== null )
          {
              console.log( "Can't insert to database" );
              console.log( err );
          }
        });
    db.close(
        function() {
                res.writeHead( 200 );
                res.end( "" );
            } );
}

function getMatch(res){
    var db = new sqlite.Database("characterTest.sqlite");
    var list = [];
    var usernames = [];
    db.each("SELECT Result, Username FROM TEST",
          function(err, row){
              list.push(row.Result);
              usernames.push(row.Username);
          }  );
    db.close(
    function(){
    var theMatch = "";
    for(var i=0;i<list.length-1;i++){
      if(list[i]==list[list.length-1]){
        if(theMatch.length>1){
          theMatch+=", ";
        }
        theMatch += usernames[i];
      }
    }
    if(theMatch == ""){
      theMatch = "none";
      res.writeHead(200);
      res.end(JSON.stringify(theMatch));

    }
    else{
      res.writeHead(200);
      res.end(JSON.stringify(theMatch));
    }
  }
);
}

function doTheServer( req, res )
{
    if( req.url.substring( 0, 5 ) == "/add?" )
    {
        addResults( req, res );
    }
    else if( req.url == "/characterTest_client.js" )
    {
        giveBackFile( "characterTest_client.js", res );
    }
    else if (req.url == "/characterTest.css")
    {
      giveBackFile("characterTest.css", res );
    }
    else if (req.url == "/getMatch")
    {
      getMatch( res );
    }
    else
    {
        giveBackFile( "characterTest.html", res );
    }
}
if(process.argv.length < 3){
  var port = 8080;
}
else{
  var port = parseInt(process.argv[2]);
}
var server = http.createServer( doTheServer );
server.listen( port );

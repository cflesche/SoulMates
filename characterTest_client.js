function addResults()
{
var result_elem =
document.getElementById( "results" );
var results_sender = new XMLHttpRequest();
var results = "/results?";
results += "results=" + result_elem.value;
console.log(results);
name_sender.open( "get", results );
//name_sender.onload = addDone;
name_sender.send();
}
function getAnswers()
{
var answer_elem1 =
document.querySelector('input[name="q1"]:checked').value;
var answer_elem2 =
document.querySelector('input[name="q2"]:checked').value;
var answer_elem3 =
document.querySelector('input[name="q3"]:checked').value;
var answer_elem4 =
document.querySelector('input[name="q4"]:checked').value;
var answer_elem5 =
document.querySelector('input[name="q5"]:checked').value;
var user_elem =
document.getElementById( "username" );
var results_sender = new XMLHttpRequest();
var url = "/add?";
url += "username=" + user_elem.value;
url += "/getResults?";
url += answer_elem1+"&"+answer_elem2+"&"+answer_elem3
+"&"+answer_elem4+"&"+answer_elem5;
console.log(url);
results_sender.open("get", url);
results_sender.send();
}
function getResults(){
var info_request = new XMLHttpRequest();
info_request.onload = showResults;
info_request.open("get", "getMatch")
info_request.send();
}
function showResults(){
var matches = JSON.parse(this.responseText);
var url = "/finalPage?";
}


var btn = document.getElementById("btn");
var notesDiv = document.getElementById("notes");

document.addEventListener("keypress", function(e){
    var key = e.which;

    if(key ===101){
        notesDiv.insertAdjacentHTML("beforeend","<p>test</p>");
    }
   
});
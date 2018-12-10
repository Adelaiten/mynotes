
var btn = document.getElementById("btn");
var notesDiv = document.getElementById("notes");

btn.addEventListener("click", function(){
    notesDiv.insertAdjacentHTML("beforeend","<div class='note'><div class='head' contenteditable='true'>Edit topic</div><div class='interior' contenteditable='true'>Post</div></div>");
});
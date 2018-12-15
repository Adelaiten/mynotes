
var createNote = function(options) {
    var note = document.createElement("div");
    var headElement = document.createElement("div");
    var deleteButton = document.createElement("button");
    var textAreaTopic = document.createElement("textarea");
    var textAreaInterior = document.createElement("textarea");
    const POSITION = 180;
    const POSMULTIPLIER = 3;
    var noteConfig = options || {
        content : "",
        topicContent : "",
        id : "sticker_" + new Date().getTime(),
        elementTopPosition : POSITION * Math.random() * POSMULTIPLIER + "px",
        elementLeftPosition : POSITION * Math.random() * POSMULTIPLIER + "px"

    }
    textAreaTopic.value = noteConfig.topicContent;
    textAreaInterior.value = noteConfig.content;
    deleteButton.classList.add("button-head");
    note.classList.add("note");
    textAreaTopic.classList.add("topic");
    textAreaInterior.classList.add("interior");
    headElement.classList.add("head");
    headElement.appendChild(deleteButton);
    note.style.top = noteConfig.elementTopPosition;
    note.style.left = noteConfig.elementLeftPosition;
    note.appendChild(headElement);
    note.appendChild(textAreaTopic);
    note.appendChild(textAreaInterior);
    document.getElementById("notes").appendChild(note);

    note.id = noteConfig.id;

    var getOffSet = function(el){
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
    }

    var onSave = function(){
        saveNote(getNoteObject(note));
    }

    var getNoteObject = function(element) {
        var TOPICINDEX = 1;
        var INTERIORINDEX = 2;
        var textInterior = element.childNodes[INTERIORINDEX];
        var topic = element.childNodes[TOPICINDEX];
        return {
            topicContent : topic.value,
            content : textInterior.value,
            id : element.id,
            elementTopPosition : (getOffSet(element).top + "px"),
            elementLeftPosition : (getOffSet(element).left + "px")
    
        }
    };

    var saveNote = function(note) {
        localStorage.setItem(note.id, JSON.stringify(note));
    }
    
    document.addEventListener("click", function(event){
        if(event.target.classList.contains("button-head")){
            var divNote = event.target.parentElement.parentElement;
            var removeId = getNoteObject(divNote).id;
            localStorage.removeItem(removeId);
            divNote.remove();
        };
    });
    document.addEventListener("focusout", function(event){
        var eventClassList = event.target.classList;
        if(eventClassList.contains("topic") || eventClassList.contains("interior")){
            onSave();
        }
    });

}


var loadNotes = function(){
    for(var i = 0; i < localStorage.length; i++){   
        var storageNote = JSON.parse(localStorage.getItem(localStorage.key(i)));
        createNote(storageNote);
    }
}

var btnNoteCreation = document.getElementById("btn");

btnNoteCreation.addEventListener("click", function(){
    createNote();
});




document.addEventListener("click", function(event){
    moveElement(event);
});


loadNotes();


function moveElement(event){
    var posX = 0, posY = 0, posX2 = 0, posY2 = 0;
    var element = event.target;
    if(element.classList.contains("head")){
        element.onmousedown = dragWhenMouseDown;
    }
    

    function dragWhenMouseDown(e) {
        posX2 = e.clientX;
        posY2 = e.clientY;
        document.onmouseup = function(){
            document.onmouseup=null;
            document.onmousemove=null;
        };
        document.onmousemove = elementDrag;

    }
    function elementDrag(e) {
        posX = posX2 - e.clientX;
        posY = posY2 - e.clientY;
        posX2 = e.clientX;
        posY2 = e.clientY;
        element.parentElement.style.top =(element.parentElement.offsetTop - posY)+ "px";
        element.parentElement.style.left = (element.parentElement.offsetLeft - posX) + "px";
      }
}



var createNote = function(options) {
    var note = document.createElement("div");
    var headElement = document.createElement("div");
    var deleteButton = document.createElement("button");
    var textAreaTopic = document.createElement("textarea");
    var textAreaInterior = document.createElement("textarea");
    var onDelete;
    var noteConfig = options || {
        content : "",
        id : "sticker_" + new Date().getTime(),

    }

    deleteButton.classList.add("button-head");
    note.classList.add("note");
    textAreaTopic.classList.add("topic");
    textAreaInterior.classList.add("interior");
    headElement.classList.add("head");
    headElement.appendChild(deleteButton);
    note.appendChild(headElement);
    note.appendChild(textAreaTopic);
    note.appendChild(textAreaInterior);
    document.getElementById("notes").appendChild(note);
    onDelete = function () {
        var obj = {};
        deleteNote(obj);
    }

    var getOffSet = function(el){
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
    }

    var onSave = function(){
        saveNote(getNoteObject(noteElement));
    }

    var getNoteObject = function(element) {
        var text = element.querySelector("interior");
        var topic = element.querySelector("topic");
        return {
            content : text.value,
            id : element.id,
            elementTopPosition : getOffSet(element).top,
            elementLeftPosition : getOffSet.left
    
        }
    };

    var saveNote = function(note) {
        localStorage.setItem(note.id, note);
    }
}


var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
    createNote();
});


document.addEventListener("click", function(event){
    if(event.target.classList.contains("button-head")){
        event.target.parentElement.parentElement.remove().onDelete();
    };
});

document.addEventListener("click", function(event){
    moveElement(event);
});

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


let URL = "https://emojihub.yurace.pro/api/all/group/";
let MURL ="";

const button = document.getElementById("btn");
let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");


function submitForm() {
    const selectedValue = document.querySelector('input[name="emoji"]:checked');
    if (selectedValue) {
        if(MURL != ""){
            rightBox.innerHTML = `<button id="btn">Genarate New Icon</button>`;
        }
        MURL = URL + selectedValue.value;
        fetch(MURL).then(x => x.json()).then(y => y.map(Genarate));
    } else {
        alert('Please select an option');
    }
}

button.addEventListener('click',()=>{
    fetch("https://emojihub.yurace.pro/api/random/")
    .then(x => x.json())
    .then(y => Genarate(y));
})

const saveNotes = () => {
    const notes = document.querySelectorAll("#left .list");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.innerHTML)
        }
    )
    localStorage.setItem("notes", JSON.stringify(data))
}

function Genarate(data){
    const note = document.createElement("div");
    note.classList.add("list");
    note.draggable = true;
    note.innerHTML = `
    <span>${data.htmlCode}
    </span> ${data.name}
    <i class="trash fa fa-close"></i>
    `
    rightBox.appendChild(note);

    note.querySelector("i").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )

    note.querySelector("span").addEventListener("click", () => {
        const spanValue = note.querySelector("span").innerText;
        navigator.clipboard.writeText(spanValue);
        alert("Copied 👍");
    });

    note.addEventListener("dragstart", (e) => {
        let selected = e.target;
        e.dataTransfer.setData("text/plain", "");
    });
}

rightBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

rightBox.addEventListener("drop", (e) => {
    let selected = document.querySelector(".list.dragging");
    rightBox.appendChild(selected);
    selected.classList.remove("dragging");
    saveNotes()
});

leftBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

leftBox.addEventListener("drop", (e) => {
    let selected = document.querySelector(".list.dragging");
    leftBox.appendChild(selected);
    selected.classList.remove("dragging");
    saveNotes();
});

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});


document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');
    toggleSwitch.addEventListener('change', switchTheme, false);
    function switchTheme() {
        if (toggleSwitch.checked) {
            document.documentElement.style.setProperty('--TextColor', '#8C4997');
            document.documentElement.style.setProperty('--BColor', '#0b0423');
            document.documentElement.style.setProperty('--LColor', '#003A34');
            document.documentElement.style.setProperty('--ListColor', '#00C9BE');
            document.documentElement.style.setProperty('--Other', '#fff');
        } else {
            document.documentElement.style.setProperty('--TextColor', '#00C9A7');
            document.documentElement.style.setProperty('--BColor', '#FBEAFF');
            document.documentElement.style.setProperty('--LColor', '#4B4453');
            document.documentElement.style.setProperty('--ListColor', '#FFC75F');
            document.documentElement.style.setProperty('--Other', '#000');
        }
    }
});

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        lsNotes.forEach(
            (lsNote) => {
                if(lsNote != ""){
                    const note = document.createElement("div");
                    note.classList.add("list");
                    note.draggable = true;
                    note.innerHTML = `${lsNote}`;
                    leftBox.appendChild(note);

                    note.querySelector("i").addEventListener(
                        "click",
                        function() {
                            note.remove()
                            saveNotes()
                        }
                    )

                    note.querySelector("span").addEventListener("click", () => {
                        const spanValue = note.querySelector("span").innerText;
                        navigator.clipboard.writeText(spanValue);
                        alert("Copied 👍");
                    });               
                
                    note.addEventListener("dragstart", (e) => {
                        let selected = e.target;
                        e.dataTransfer.setData("text/plain", "");
                    });
                }
            }
        )
    }
)()
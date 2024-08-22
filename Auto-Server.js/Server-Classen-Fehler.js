class Auto {
    constructor(Marke, Baujahr, Farbe) {
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }
}

let editingLi = null;

document.getElementById("saveButton").addEventListener("click", function() {
    const marke = document.getElementById("marke").value;
    const baujahr = document.getElementById("baujahr").value;
    const farbe = document.getElementById("farbe").value;

    const liContent = `
        <span>Marke: <span style="font-weight: bold;">${marke}</span></span>, 
        <span>Baujahr: <span style="font-weight: bold;">${baujahr}</span></span>, 
        <span>Farbe: <span style="font-weight: bold;">${farbe}</span></span>
        <button onclick="editAuto(this)">Edit</button>
        <button onclick="deleteAuto(this)">Delete</button> 
    `

    if (editingLi) {
        editingLi.innerHTML = liContent;
        editingLi = null;
    } else {
        const autoList = document.getElementById("autoList");
        const li = document.createElement("li");
        li.innerHTML = liContent;
        autoList.appendChild(li);
    }

    document.getElementById("autoForm").reset();
});

function editAuto(button) {
    const li = button.parentElement;
    const spans = li.querySelectorAll('span > span');
    
    const marke = spans[0].textContent;
    const baujahr = spans[1].textContent;
    const farbe = spans[2].textContent;

    document.getElementById("marke").value = marke;
    document.getElementById("baujahr").value = baujahr;
    document.getElementById("farbe").value = farbe;

    editingLi = li;
}

function deleteAuto(button) {
    const li = button.parentElement
    li.remove()
}
///




function callurl(){
    console.log("calling an url")
    // aufruf eines backends statt finden.
}

document.getElementById("loadButton").addEventListener("click", function(e) {
  callurl()  
})
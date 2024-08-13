class Auto {
    constructor(Marke, Baujahr, Farbe) {
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }
}

let editingLi = null;

document.getElementById("saveButton").addEventListener("click", function() {
    const marke = document.getElementById("marke").value
    const baujahr = document.getElementById("baujahr").value; 
    const farbe = document.getElementById("farbe").value

    if (editingLi) {
        editingLi.innerHTML = `Marke: ${marke}, Baujahr: ${baujahr}, Farbe: ${farbe} 
            <button onclick="editAuto(this)">Edit</button>`
        editingLi = null;
    } else {
        const autoList = document.getElementById("autoList"); 
        const li = document.createElement("li");
        li.innerHTML = `Marke: ${marke}, Baujahr: ${baujahr}, Farbe: ${farbe} 
            <button onclick="editAuto(this)">Edit</button>`;
        autoList.appendChild(li)
    }

    document.getElementById("autoForm").reset()
});

function editAuto(button) {
    const li = button.parentElement;
    const text = li.firstChild.textContent;
    const [marke, baujahr, farbe] = text.match(/(?<=: ).+?(?=,|$)/g);

    document.getElementById("marke").value = marke;
    document.getElementById("baujahr").value = baujahr;
    document.getElementById("farbe").value = farbe;

    editingLi = li;
}

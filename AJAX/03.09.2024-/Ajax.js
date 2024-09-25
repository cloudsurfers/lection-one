class Auto {
    constructor(Marke, Baujahr, Farbe) {
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }
    getMarke() { return this.Marke; }
    getBaujahr() { return this.Baujahr; }
    getFarbe() { return this.Farbe; }
}

var editingIndex = null;

function loadAutos() {
    try {
        var autos = JSON.parse(localStorage.getItem('autos')) || []; // daswegen localstorage sync ist
        return autos;
    } catch (e) {
        console.error("Fehler beim Speichern Daten aus localStorage:", e);
        return [];
    }
}

function saveAutos(autos) {
    try {
        localStorage.setItem('autos', JSON.stringify(autos));
    } catch (e) {
        console.error("Fehler beim Speichern Daten in localStorage:", e);
    }
}

document.getElementById("saveButton").addEventListener("click", function () {
    var marke = document.getElementById("marke").value;
    var baujahr = document.getElementById("baujahr").value;
    var farbe = document.getElementById("farbe").value;

    var auto = new Auto(marke, baujahr, farbe);

    var autos = loadAutos();

    if (editingIndex !== null) {
        autos[editingIndex] = auto;
        editingIndex = null;
    } else {
        autos.push(auto);
    }

    saveAutos(autos);
    renderAutoList();
    resetForm();
});

function renderAutoList() {
    var autos = loadAutos();
    var carList = document.getElementById("autoList");
    carList.innerHTML = '';  

    autos.forEach((auto, index) => {
        var li = document.createElement("li");
        li.dataset.index = index;  

        li.innerHTML = `
            <span><strong>${auto.Marke}</strong></span>, 
            <span><strong>${auto.Baujahr}</strong></span>, 
            <span><strong>${auto.Farbe}</strong></span>
            <div>
                <button onclick="editAuto(${index})">Edit</button>
                <button onclick="deleteAuto(${index})">Delete</button>
            </div>
        `;
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        carList.appendChild(li);
    });
}

function editAuto(index) {
    var autos = loadAutos();
    var auto = autos[index];

    document.getElementById("marke").value = auto.Marke;
    document.getElementById("baujahr").value = auto.Baujahr;
    document.getElementById("farbe").value = auto.Farbe;

    editingIndex = index;
}

function deleteAuto(index) {
    var autos = loadAutos();
    autos.splice(index, 1);
    saveAutos(autos);
    renderAutoList();
}

function resetForm() {
    document.getElementById("autoForm").reset();
}

window.addEventListener("load", function() {
    renderAutoList();
});

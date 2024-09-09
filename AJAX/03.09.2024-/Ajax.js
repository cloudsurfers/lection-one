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
        // Редактирование существующего авто
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
    carList.innerHTML = '';  // Clean List

    autos.forEach((auto, index) => {
        var li = document.createElement("li");
        li.dataset.index = index;  // Speichern Index umzu redaktieren
        li.innerHTML = `
            <span>Marke: <span style="font-weight: bold;">${auto.Marke}</span></span>, 
            <span>Baujahr: <span style="font-weight: bold;">${auto.Baujahr}</span></span>, 
            <span>Farbe: <span style="font-weight: bold;">${auto.Farbe}</span></span>
            <button onclick="editAuto(${index})">Edit</button>
            <button onclick="deleteAuto(${index})">Delete</button>
        `;
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

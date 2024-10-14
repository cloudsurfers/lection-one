let autos = [];
let editngIndex = null;
let farbeliste = []

document.addEventListener("DOMContentLoaded", () => {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    let country = urlParams.get('country')
    if (country == undefined){
        country = "en"
    }
    ladeFarbenList(country)
    loadAutos();
    renderAutoTable(country);

    document.getElementById('saveButton').addEventListener('click', saveAuto);
    document.getElementById('marke').addEventListener( 'focusout', onFocus);
    document.getElementById('downloadCsvBtn').addEventListener('click', downloadCSV);
    document.getElementById('resetButton').addEventListener('click', resetForm);
    
});

function ladeFarbenList(country){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "farbe.json", false);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.send(null);
    if (xhttp.status === 200){
        farbeliste = JSON.parse(xhttp.responseText)
        let optionList = document.getElementById("farbe")
        optionList.replaceChildren()
        farbeliste.forEach(farbe => {
            let opt = document.createElement("option")
            opt.setAttribute("value", farbe.id)

            opt.textContent = farbe[country]
            optionList.appendChild(opt)
        })
    }
}

function loadAutos() {
    autos = JSON.parse(localStorage.getItem('autos')) || [];
}

function saveAutos() {
    localStorage.setItem('autos', JSON.stringify(autos));
}

function validateAndMark(value, element){
   if (value!=null && value!=""){
	   element.style=""
	   return true
   }
   element.style="background-color:red"
   return false;
}

function onFocus(event){
	console.log("focues event: "+event)
}

function saveAuto() {
    const marke = document.getElementById('marke').value;
    const baujahr = document.getElementById('baujahr').value;
    const farbe = document.getElementById('farbe').value;
    const transmission = document.getElementById('transmission').value;

    if (validateAndMark(marke, document.getElementById('marke')) && baujahr && farbe && transmission) {
        const auto = { 
            Marke: marke, 
            Baujahr: baujahr, 
            Farbe: farbe, 
            Transmission: transmission, 
            id:Math.random() 
        };

        if (editngIndex !== null) {
            autos[editngIndex] = auto;
            editngIndex = null;
        } else {
            autos.push(auto);
        }

        saveAutos();
        renderAutoTable();
        resetForm();
    } else {
        alert("Bitte füllen Sie alle Felder aus.");
    }
}

function renderAutoTable(country) {
    const tableBody = document.querySelector('#autoTable tbody');
    tableBody.innerHTML = '';

    autos.forEach((auto, index) => {
        const row = document.createElement('tr');
        var autoFarbe = "not found"
        console.log("hier ist die farbenliste leeehr "+farbeliste)
        farbeliste.forEach(f => {
            console.log(f)
            if (f.id === auto.Farbe){
                autoFarbe = f[country]
                console.log(autoFarbe)
            }
        })
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${auto.Marke}</td>
            <td>${auto.Baujahr}</td>
            <td>${autoFarbe}</td>
            <td>${auto.Transmission}</td>
            <td>
                <button onclick="editAuto(${index})">
                    <span class="iconify" data-icon="iconamoon:edit-light"></span>
                </button>
                <button onclick="deleteAuto(${index})">
                    <span class="iconify" data-icon="bi:trash"></span>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editAuto(index) {
    const auto = autos[index];

    document.getElementById('marke').value = auto.Marke;
    document.getElementById('baujahr').value = auto.Baujahr;
    document.getElementById('farbe').value = auto.Farbe;
    document.getElementById('transmission').value = auto.Transmission;

    editngIndex = index;
}

function deleteAuto(index) {
    autos.splice(index, 1);
    saveAutos();
    renderAutoTable();
}

function deleteAllCars() {
    autos = [];
    saveAutos();
    renderAutoTable();
}

function resetForm() {
    document.getElementById('autoForm').reset();
    editngIndex = null;
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Marke,Baujahr,Farbe,Transmission\r\n";
    autos.forEach(auto => {
        csvContent += `${auto.Marke},${auto.Baujahr},${auto.Farbe},${auto.Transmission}\r\n`;
    });
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'autos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('upload').addEventListener('change', handleFileUpload, false);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Bitte wählen Sie eine Datei aus.");
        return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase(); 
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;

        if (fileExtension === 'json') {

            try {
                autos = JSON.parse(contents); 
                saveAutos();
                renderAutoTable();
            } catch (error) {
                alert("Fehler.");
                console.error("JSON parse error:", error);
            }

        } else if (fileExtension === 'csv') {
            const lines = contents.split("\n"); 
            autos = []; 
            for (let i = 1; i < lines.length; i++) {
                const data = lines[i].split(","); 
                if (data.length === 4) { 
                    const auto = {
                        Marke: data[0].trim(),
                        Baujahr: data[1].trim(),
                        Farbe: data[2].trim(),
                        Transmission: data[3].trim()
                    };
                    autos.push(auto); 
                }
            }

            saveAutos();
            renderAutoTable();
        } else {
            alert("Nicht unterstütztes Dateiformat. Bitte laden Sie eine JSON- oder CSV-Datei hoch.");
        }

        event.target.value = '';
    };

    reader.readAsText(file); 
}
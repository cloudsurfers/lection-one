let autos = [];
let editngIndex = null;
let farbeliste = []

document.addEventListener("DOMContentLoaded", () => {
    
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString)
    let country = urlParams.get('country') || 'en';
    let farbenI18n = loadData("farbe.json")
    ladeOptionenList(country, farbenI18n, 'farbe');
    let transmissionI18n = loadData('trans.json');
    ladeOptionenList(country, transmissionI18n, 'transmissionDe');
    let fileFormatI18n = loadData("fileFormat.json")
    ladeOptionenList(country, fileFormatI18n, 'fileFormat');
    // let PlaceHolBaujahr = loadData("PlaceHolBaujahr.json")
    // ladeOptionenList(country, fileFormatI18n, 'PlaceHolBaujahr')
    // let PlaceHolMarke = loadData ("PlaceHolMarke")
    // ladeOptionenList(country, fileFormatI18n, 'PlaceHolMarke')


    let i18n = loadData('i18n.json');
    translateUploadButton(i18n, country)
    renderAutoTableHeader(i18n, country)
    loadAutos();
    renderAutoTableContent(country);

    //transmission
    console.log("adding eventlistener to buttons")
    document.getElementById('saveButton').addEventListener('click', saveAuto);
    // document.getElementById('marke').addEventListener( 'focusout', onFocus);
    // document.getElementById('downloadCsvBtn').addEventListener('click', downloadCSV);
    document.getElementById('downloadBtn').addEventListener('click', function() {
        console.log("downloadBtn clicked")
        const selectedFormat = document.getElementById('fileFormat').value;
    
        if (selectedFormat === 'CSV') {
            downloadCSV();
        } else if (selectedFormat === 'JSON') {
            downloadJSON()
        } else {
            alert("Bitte wählen Sie eun Format aaus.")
        }
    });
    document.getElementById('resetButton').addEventListener('click', resetForm);
});

function translateUploadButton(i18n, country){
    document.getElementById("upload-button").textContent = i18n["upload-button"][country]
}

function renderAutoTableHeader(autoTableHeader18n, country){
    document.getElementById("tid").textContent = autoTableHeader18n["id"][country]
    document.getElementById("tmarke").textContent = autoTableHeader18n["marke"][country]
    document.getElementById("tfarbe").textContent = autoTableHeader18n["farbe"][country]
    document.getElementById("tbaujahr").textContent = autoTableHeader18n["baujahr"][country]
    document.getElementById("ttransmission").textContent = autoTableHeader18n["Transmission"][country]
    console.log("bin ich hier")
    // document.getElementById("tList").textContent = autoTableHeader18n["List"][country]
        // document.getElementById("tfileFormat").textContent = autoTableHeader18n["fileFormat"][country]
    // document.getElementById("tPlaceHolBaujahr").textContent = autoTableHeader18n["PlaceHolBaujahr"][country]
    // document.getElementById("tPlaceHolMarke").textContent = autoTableHeader18n["PlaceHolMarke"][country]
}

// function renderPlaceholder(autoTableHeader18n, country){
//     document.getElementById("tPlaceHolBaujahr").textContent = autoTableHeader18n["PlaceHolBaujahr"][country]
//     document.getElementById("tPlaceHolMarke").textContent = autoTableHeader18n["PlaceHolMarke"][country]
// }

// function updatePlaceholders(PlaceHolBaujahr, PlaceHolMarke, country){
//     const PlaceHolBaujahr = document.getElementById("PlaceHolBaujahr")
//     const PlaceHolMarke = document.getElementById("PlaceHolMarke")

//     PlaceHolBaujahr.placeholder = PlaceHolBaujahr.[country]
//     PlaceHolMarke.placeholder = PlaceHolMarke.[country]
// }


function loadData(fileName){
    console.log("loading file "+fileName)
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", fileName, false);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.send(null);
    if (xhttp.status === 200) {
        return JSON.parse(xhttp.responseText);
    }else{
        console.log("could no download file "+fileName)
        throw Error("failed to load data from file "+fileName)
    }
}

function ladeOptionenList(country, data, elementId) {
    let optionElement = document.getElementById(elementId);
    optionElement.replaceChildren();
    data.forEach(option => {
        let opt = document.createElement("option");
        opt.setAttribute("value", option.id);
        opt.textContent = option[country];
        optionElement.appendChild(opt);
    });
}

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

function ladeFarbenList(country){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "trans.json", false);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.send(null);
    if (xhttp.status === 200){
        farbeliste = JSON.parse(xhttp.responseText)
        let optionList = document.getElementById("transmissionDe")
        optionList.replaceChildren()
        farbeliste.forEach(farbe => {
            let opt = document.createElement("option")
            opt.setAttribute("value", transmissionDe.id)

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

function renderAutoTableContent(country) {
    const tableBody = document.querySelector('#autoTable tbody');
    tableBody.innerHTML = '';

    autos.forEach((auto, index) => {
        const row = document.createElement('tr');
        var autoFarbe = "not found"
        //console.log("hier ist die farbenliste leeehr "+farbeliste)
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

function downloadJSON() {
    const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(autos, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', 'autos.json');
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


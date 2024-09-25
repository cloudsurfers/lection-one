let carList = null;
let autos = [];
let countChecked = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM content loaded");


    autos = JSON.parse(localStorage.getItem('autos')) || [];
    carList = document.getElementById("carList");

    autos.forEach(function (auto, index) {
        let li = document.createElement("li");


        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                li.classList.add("checked");
                countChecked++;
            } else {
                li.classList.remove("checked");
                countChecked--;
                if (countChecked < 0) {
                    countChecked = 0;
                }
            }

            if (countChecked > 0) {
                document.getElementById("deleteAllButton").textContent = "Lösче " + countChecked + " Autos";
            } else {
                document.getElementById("deleteAllButton").textContent = "Lösche alle Autos";
            }
        });
        li.innerHTML = `${auto.Marke}, ${auto.Baujahr}, ${auto.Farbe}`;
        li.prepend(checkbox);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Löschen";
        deleteBtn.onclick = function () {
            deleteAuto(index);
            li.remove();
        };

        li.appendChild(deleteBtn);
        carList.appendChild(li);
    });

    document.getElementById('downloadCsvBtn').addEventListener('click', function () {
        const csvData = listToCSV();
        const link = document.createElement('a');
        link.setAttribute('href', csvData);
        link.setAttribute('download', 'autos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});


function deleteCars() {
    carUL = document.getElementById("carList");
    for (let i = carUL.children.length - 1; i >= 0; i--) {
        let clList = carUL.children[i].classList;
        if (clList.contains('checked')) {
            deleteAuto(i);
            carUL.children[i].remove();
        }
    }
}


function deleteAuto(index) {
    autos.splice(index, 1);
    localStorage.setItem('autos', JSON.stringify(autos));
}

function listToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Marke,Baujahr,Farbe\r\n";

    autos.forEach(auto => {
        let row = `${auto.Marke},${auto.Baujahr},${auto.Farbe}`;
        csvContent += row + "\r\n";
    });

    return encodeURI(csvContent);
}
 
let autos = [];
let countChecked = 0;

document.addEventListener("DOMContentLoaded", () => {
    autos = JSON.parse(localStorage.getItem('autos')) || [];
    const carList = document.getElementById("carList");

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
                document.getElementById("deleteAllButton").textContent = "Lösche " + countChecked + " Autos"
            } else {
                document.getElementById("deleteAllButton").textContent = "Lösche alle Autos"
            }
        });


        li.textContent = `${auto.Marke} - ${auto.Baujahr} - ${auto.Farbe} - ${auto.Transmission}`;
        li.prepend(checkbox);
        carList.appendChild(li);
    });


    document.getElementById('deleteAllButton').addEventListener('click', deleteCars);
    document.getElementById('downloadCsvBtn').addEventListener('click', downloadCSV);
});

function deleteCars() {
    const checkedItems = document.querySelectorAll('#carList li.checked');
    checkedItems.forEach(item => item.remove());

    autos = autos.filter((auto, index) => !document.querySelectorAll('#carList li')[index].classList.contains('checked'));

    localStorage.setItem('autos', JSON.stringify(autos));
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Marke,Baujahr,Farbe,Transmission\r\n";
    autos.forEach(auto => {
        csvContent += `${auto.Marke},${auto.Baujahr},${auto.Farbe},${auto.Transmission}\r\n`;
    });
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'autos_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

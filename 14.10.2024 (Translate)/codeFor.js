function ladeOptionenList(country, url, elementId) {
    console.log("loading ${country}")
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.send(null);

    if (xhttp.status === 200) {
        const optionsList = JSON.parse(xhttp.responseText);
        let optionElement = document.getElementById(elementId);
        optionElement.replaceChildren();

        optionsList.forEach(option => {
            let opt = document.createElement("option");
            opt.setAttribute("value", option.id);
            opt.textContent = option[country];
            optionElement.appendChild(opt);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let country = urlParams.get('country') || 'en'

    ladeOptionenList(country, 'farbe.json', 'farbe');
    
    ladeOptionenList(country, 'trans.json', 'transmissionDe');

    ladeOptionenList(country, 'autoTable.json')
});
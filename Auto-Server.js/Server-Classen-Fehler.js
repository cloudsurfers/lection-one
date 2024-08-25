var Auto = /** @class */ (function () {
    function Auto(Marke, Baujahr, Farbe) {
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }
    Auto.prototype.getMarke = function () {
        return this.Marke;
    };
    Auto.prototype.getBaujahr = function () {
        return this.Baujahr;
    };
    Auto.prototype.getFarbe = function () {
        return this.Farbe;
    };
    return Auto;
}());
var editingLi = null;
document.getElementById("saveButton").addEventListener("click", function () {
    var markeElement = document.getElementById("marke");
    var baujahrElement = document.getElementById("baujahr");
    var farbeElement = document.getElementById("farbe");
    var marke = markeElement ? markeElement.value : "";
    var baujahr = baujahrElement ? baujahrElement.value : "";
    var farbe = farbeElement ? farbeElement.value : "";
    var liContent = "\n        <span>Marke: <span style=\"font-weight: bold;\">".concat(marke, "</span></span>, \n        <span>Baujahr: <span style=\"font-weight: bold;\">").concat(baujahr, "</span></span>, \n        <span>Farbe: <span style=\"font-weight: bold;\">").concat(farbe, "</span></span>\n        <button onclick=\"editAuto(this)\">Edit</button>\n        <button onclick=\"deleteAuto(this)\">Delete</button> \n    ");
    if (editingLi) {
        editingLi.innerHTML = liContent;
        editingLi = null;
    }
    else {
        var autoList = document.getElementById("autoList");
        var li = document.createElement("li");
        li.innerHTML = liContent;
        autoList.appendChild(li);
    }
    var formElement = document.getElementById("autofotm");
    if (formElement) {
        formElement.reset();
    }
});
function editAuto(button) {
    var li = button.parentElement;
    var spans = li.querySelectorAll('span > span');
    var marke = spans[0].textContent;
    var baujahr = spans[1].textContent;
    var farbe = spans[2].textContent;
    var markeElement = document.getElementById("marke");
    if (markeElement) {
        markeElement.value = marke;
    }
    var baujahrElement = document.getElementById("baujahr");
    if (baujahrElement) {
        baujahrElement.value = baujahr;
    }
    var farbeElement = document.getElementById("farbe");
    if (farbeElement) {
        farbeElement.value = farbe;
    }
    editingLi = li;
}
function deleteAuto(button) {
    var li = button.parentElement;
    li.remove();
}
function callurl() {
    console.log("calling an url");
    // aufruf eines backends statt finden.
}
document.getElementById("loadButton").addEventListener("click", function (e) {
    callurl();
});

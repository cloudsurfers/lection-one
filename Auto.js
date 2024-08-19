var Auto = /** @class */ (function () {
    function Auto(brand, releaseYear, color) {
        this.brand = "";
        this.releaseYear = "";
        this.color = "";
        this.brand = brand;
        this.releaseYear = releaseYear;
        this.color = color;
    }
    return Auto;
}());
var listOfCar = [];
var button = document.querySelector("button");
button.addEventListener('click', function (event) {
    // TypeScript knows `click` event's type is MouseEvent.
    console.log();
    var car = new Auto(document.querySelector("#brand")['value'], document.querySelector("#releaseYear")['value'], document.querySelector("#color")['value']);
    listOfCar.push(car);
    append2list(car);
});
function append2list(auto) {
    var list = document.querySelector("#liste>ul");
    var li = document.createElement("li");
    list.append(li);
    li.textContent = auto.brand + " " + auto.releaseYear + " " + auto.color;
}

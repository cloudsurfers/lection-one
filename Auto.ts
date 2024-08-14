// Определение класса Auto
class Auto {
    private Marke: string = ""
    private Baujahr: string = ""
    private Farbe: string = ""
    constructor(Marke, Baujahr, Farbe) { // Создаем клас авто, добавляем характеристики которые будут сохранятся
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }

    changeColor(newColor: string ){
        this.Farbe = newColor
    }

    public getFarbe(): string{
        return this.Farbe
    }
}
//

function addAutoToList(auto) { //принимает значения в список
    const autoList = document.getElementById("autoList") // принимает по ид и добавляет в лист

    const li = document.createElement("li") // создает элемент li
    li.textContent = `Marke: ${auto.Marke}, Baujahr: ${auto.Baujahr}, Farbe: ${auto.Farbe}` // устанавливает его в строку(форматируем)

    autoList.appendChild(li) //добавляет li в конец списка autoList.
}

document.getElementById("saveButton").addEventListener("click", function() { // находим кнопку и даем ей такие указания

    const marke = document.getElementById("marke").value
    const baujahr = document.getElementById("baujahr").value
    const farbe = document.getElementById("farbe").value

    const auto = new Auto(marke, baujahr, farbe) // оздает новый объект Auto, передавая в него значения marke, baujahr и farbe.

    addAutoToList(auto)

    document.getElementById("autoForm").reset()
})

document.getElementById("changeColor").addEventListener("click", function(event) {
    console.log("changing color")
    const auto = new Auto("fiat", "2088", "black");
    auto.changeColor("silver")

    console.log(`${auto.getFarbe()}`)
})

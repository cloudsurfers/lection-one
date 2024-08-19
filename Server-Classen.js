// Определение класса Auto
class Auto {
    Marke  = ""
    Baujahr  = ""
    Farbe = ""
    constructor(Marke, Baujahr, Farbe) { // Создаем клас авто, добавляем характеристики которые будут сохранятся
        this.Marke = Marke;
        this.Baujahr = Baujahr;
        this.Farbe = Farbe;
    }

    changeColor(newColor){
        this.Farbe = newColor
    }

    getFarbe(){
        return this.Farbe
    }
}

class App {
    listOfCars  = [];

    addAutoToList(auto) { //принимает значения в список
        const autoList = document.querySelector("#liste > ul") // принимает по ид и добавляет в лист
        var index = this.listOfCars.push(auto)
        const li = document.createElement("li") // создает элемент li
        reranderElement(li, auto, index)

         
        autoList.appendChild(li) //добавляет li в конец списка autoList.
       
    }

}
var app = new App()
//

function reranderElement(element, auto, index){
    var disp =  element.style.display;
    element.style.display = "none";
    element["car_index"] = index
    element.textContent = `${index} Marke: ${auto.Marke}, Baujahr: ${auto.Baujahr}, Farbe: ${auto.Farbe}` 
    var button = document.createElement("button")
    button["car_index"] = index
    button.textContent="edit"
    element.appendChild(button)

    button.addEventListener("click", function(event){
         var car = app.listOfCars[event.target.car_index]
         document.getElementById("brand").value = car.Marke
         document.getElementById("releaseYear").value = car.Baujahr
         document.getElementById("color").value = car.Farbe
         document.getElementById("saveButton")["car_index"] = event.target.car_index
    })
    var delXutton = document.createElement("button")
    delXutton["car_index"] = index
    delXutton.textContent="löschen"
    element.appendChild(delXutton)
    delXutton.addEventListener("click", function(event){
        app.listOfCars.splice(event.target.car_index-1, 1)
        console.log(app.listOfCars)
    })
    element.style.display = disp;
}

document.getElementById("saveButton").addEventListener("click", function(evnt) { // находим кнопку и даем ей такие указания
    if(evnt.target.car_index==undefined){
        const marke = document.getElementById("brand").value
        const baujahr = document.getElementById("releaseYear").value
        const farbe = document.getElementById("color").value

        const auto = new Auto(marke, baujahr, farbe) // оздает новый объект Auto, передавая в него значения marke, baujahr и farbe.

        app.addAutoToList(auto)
    }else{
        car = app.listOfCars[evnt.target.car_index-1]
        car.Marke =  document.getElementById("brand").value
        car.Baujahr = document.getElementById("releaseYear").value
        car.Farbe = document.getElementById("color").value
        var element
        document.querySelector("#liste").querySelectorAll("li").forEach(li => {
            if (li.car_index===evnt.target.car_index) {
                console.log("element found "+li)
                element = li
                return;
            }
            console.log(li.car_index)
        })
        reranderElement(element, car, evnt.target.car_index)
        evnt.target.car_index = undefined
        
    }
    //document.getElementById("formular").reset()
})




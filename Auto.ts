class Auto{
    public brand: string = "";
    public releaseYear: string = "";
    public color: string = "";

    constructor(brand:string, releaseYear:string, color:string){
        this.brand = brand; 
        this.releaseYear = releaseYear;
        this.color = color;
    }
}

let listOfCar: Auto[] = [];
let  button =  document.querySelector("button")
button.addEventListener('click', (event: MouseEvent) => {
    // TypeScript knows `click` event's type is MouseEvent.
    console.log()
    let car = new Auto(document.querySelector("#brand")['value'], document.querySelector("#releaseYear")['value'], document.querySelector("#color")['value']);
    listOfCar.push(car);
    append2list(car)
  });


function append2list(auto:Auto): void{
    let list = document.querySelector("#liste>ul") as HTMLUListElement
    let li = document.createElement("li")
    list.append(li)
    li.textContent = auto.brand+" "+auto.releaseYear+" "+auto.color
}
    
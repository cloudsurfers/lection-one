class Auto {
    private Marke: string
    private Baujahr: number
    private Farbe: string
    
constructor(Marke: string, Baujahr: number, Farbe: string) {
    this.Marke = Marke;
    this.Baujahr = Baujahr;
    this.Farbe = Farbe;
} 

getMarke(): string {
    return this.Marke
}
getBaujahr(): number {
    return this.Baujahr
}
getFarbe(): string {
    return this.Farbe
}
}

let editingLi = null;

document.getElementById("saveButton").addEventListener("click", function() {
    const markeElement = document.getElementById("marke") as HTMLInputElement | null
    const baujahrElement = document.getElementById("baujahr") as HTMLInputElement | null
    const farbeElement = document.getElementById("farbe") as HTMLInputElement | null

    const marke = markeElement ? markeElement.value : ""
    const baujahr = baujahrElement ? baujahrElement.value : ""
    const farbe = farbeElement ? farbeElement.value : ""

    const liContent = `
        <span>Marke: <span style="font-weight: bold;">${marke}</span></span>, 
        <span>Baujahr: <span style="font-weight: bold;">${baujahr}</span></span>, 
        <span>Farbe: <span style="font-weight: bold;">${farbe}</span></span>
        <button onclick="editAuto(this)">Edit</button>
        <button onclick="deleteAuto(this)">Delete</button> 
    `

    if (editingLi) {
        editingLi.innerHTML = liContent;
        editingLi = null;
    } else {
        const autoList = document.getElementById("autoList");
        const li = document.createElement("li");
        li.innerHTML = liContent;
        autoList.appendChild(li);
    }

    const formElement = document.getElementById("autofotm") as HTMLFormElement | null

    if (formElement) {
        formElement.reset()
    }
});

function editAuto(button) {
    const li = button.parentElement;
    const spans = li.querySelectorAll('span > span');
    
    const marke = spans[0].textContent;
    const baujahr = spans[1].textContent;
    const farbe = spans[2].textContent;

    const markeElement = document.getElementById("marke") as HTMLInputElement | null 
    if (markeElement) {
        markeElement.value = marke
    }

    const baujahrElement = document.getElementById("baujahr") as HTMLInputElement | null
    if (baujahrElement) {
        baujahrElement.value = baujahr
    }
    const farbeElement = document.getElementById("farbe") as HTMLInputElement | null 
    if (farbeElement) {
        farbeElement.value = farbe
    }

    editingLi = li;
}

function deleteAuto(button) {
    const li = button.parentElement
    li.remove()
}

function callurl(){
    console.log("calling an url")
    // aufruf eines backends statt finden.
}

document.getElementById("loadButton").addEventListener("click", function(e) {
  callurl()  
})

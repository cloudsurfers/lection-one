let num: any = "mein string"

switch (num) {

    case 10:
        console.log("richtig")
        break

    case 11:
        console.log("falsch")
        break

    case "mein string":
        console.log("Hallo Welt")
        break

    case "mein 2 string":
        console.log("dfdgd")    
        break

    default: {
        console.log("Nichts")
        break
    }
}
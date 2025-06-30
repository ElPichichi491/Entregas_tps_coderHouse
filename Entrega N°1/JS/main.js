const contrasenias = []
let miMonto = 0

function crearPin(pin){
    contrasenias.push(pin)
}

//Verificamos que el pin sea correcto
function verificarUsuarioPin(pin){
    const verificarPin = contrasenias.includes(pin)
    if(verificarPin === true){
        return verificarPin
    }else{
        alert("Su contraseña es incorrecta")
        return false
    }
}

function verMontoAcutal(){
    alert(`Su monto es de: ${miMonto}`)
}

const depopsitarDinero = (montoIngreso) => {
    if(montoIngreso < 0){
        alert("No puede ingresar valores negativos")
        return
    }

    if(montoIngreso > 40000){
        alert("Su deposito supera el limite.")
        return 0
    }
    miMonto = miMonto + montoIngreso
}   

const retirarDinero = (montoRetiro) => {
    if(montoRetiro < 0){
        alert("No puede ingresar valores negativos")
        return
    }

    if(montoRetiro > 80000){
        alert("Su retiro supera el limite.")
        return 0
    }

    if(miMonto - montoRetiro < 0){
        alert("No diene el dinero suficiente para hacer esa extraccion.")
        return 0
    }
    alert("su retiro de dinero fue de " + montoRetiro)
    miMonto = miMonto - montoRetiro
}

// ----- Creando Pines -----
crearPin("1234")
crearPin("7894")
crearPin("6231")
crearPin("9999")
crearPin("5544")

//Todo lo que viene siendo el menu para la utilizacion de las funciones
let continuar= true
const login = prompt("Ingrese la contraseña")
const verificarLogin = verificarUsuarioPin(login)

if(verificarLogin){
while(continuar){
    let opcion = parseInt(prompt("1.Ver monto actual\n2.Depositar dinero\n3.Retirar dinero\n4.Salir"))
    switch(opcion){
        case 1: 
            verMontoAcutal()
            break
            case 2: 
            let deposito = parseInt(prompt(`¿Cuanto dinero desea depositar a su cuenta?\nSu saldo actual es: ${miMonto} \nLimite de deposito: 40000`))
            depopsitarDinero(deposito)
            break
            case 3: 
            let retiro = parseInt(prompt(`¿Cuanto dinero desea retirar de su cuenta?\nSu dinero actual es: ${miMonto}\nLimite de retiro: 80000`))
            retirarDinero(retiro)
            break
            case 4:
                alert("Gracias!")
                continuar = false
                break
            default:
                alert("Esta opcion no existe")
        }
    } 
}
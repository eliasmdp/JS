// DECLARACIÓN DE VARIABLES Y CONSTANTES
let var1, var2, var3, var4
const const1="hola"

var1="asd"
var2="qwe"
var3=2
var4=3

console.log(const1)
console.log(var1)
console.log(const1+var1)    
console.log(var1+var2)
console.log(var3+var4)
console.log(var1+var3)

console.log(var3)
var3=34
console.log(var3)

//PROMT y ALERT

// var1=prompt("Hola, soy un prompt")
// alert("Hola, " + var1)

// (!) JS ES 100% SECUENCIAL, SE EJECUTA EN CASCADA (DE ARRIBA HACIA ABAJO) (!)

// CASE
let opcion

var1 = prompt("Seleccione un número del 1 al 3:")

switch (var1) {
  case "1":
    console.log("Usted eligió "+ var1); // UNA FORMA DE PONER VALOR DE VARIABLES EN LOG
    console.log(`Usted eligió ${var1}`); // OTRA FORMA DE PONER VALOR DE VARIABLES EN LOG 
  break;
  case "2":
    console.log("Usted eligió "+ var1);
  break;
  case "3":
    console.log("Usted eligió "+ var1);
  break
  default:
    console.log("Dale pa, opción inválida. Qué haces?");
  break;
  }
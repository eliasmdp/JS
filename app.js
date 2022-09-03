// ------------------------------------------------
// DECLARACIÓN FUNCIONES

<h1>HOLA SOY EL INDEX 1</h1>

let 
i=true
k=false
op=0
cart_precio=0
cart_cant=0

const 
p1_precio=10, p2_precio=20, p3_precio=30, p4_precio=40
p1_nombre="Producto A", p2_nombre="Producto B", p3_nombre="Producto C", p4_nombre="Producto D"

// ------------------------------------------------
// CREACION CLASE PRODUCTO

class Producto {
  constructor(id, name, price) {
    this.id=id;
    this.name=name;
    this.price=price;
  }
}  

// ------------------------------------------------
// DECLARACIÓN FUNCIONES

function add_cart (p_precio, p_nombre) {
  cart_precio = cart_precio + p_precio;
  cart_cant=cart_cant+1;
  k=true;
  alert(p_nombre + " agregado al carro!");
}

function empty_cart () {
  alert("Te esperamos de vuelta pronto!");
  cart_precio = 0;
  cart_cant = 0;
  i=false;
  k=false;  
}

function pay_cart() {
  alert("Gracias por tu compra! \n\nCantidad de productos: "+cart_cant+"\nTotal abonado: $ "+cart_precio);
  cart_precio = 0;
  cart_cant = 0;
  i=false;
  k=false;  
}

// ------------------------------------------------
// ADD TO CART

while (i != false) {
  op = prompt ("Hola! Por favor, seleccioná los Productos que quieras agregar al carro: \n\n1: Producto A - $ "+p1_precio+"\n2: Producto B - $ "+p2_precio+"\n3: Producto C - $ "+p3_precio+"\n4: Producto D - $ "+p4_precio+"\n\nY: Terminar y pagar \nN: Salir sin guardar");
  switch (op) {
    case "1":
      add_cart (p1_precio, p1_nombre);
    break;
    case "2":
      add_cart (p2_precio, p2_nombre);
    break;
    case "3":
      add_cart (p3_precio, p3_nombre);
    break
    case "4":
      add_cart (p4_precio, p4_nombre);
    break
    case "y":
      if (k==true) {
        pay_cart();
      } else {
        alert("Aún no agregaste ningún producto!");
      }
    break
    case "n":
      empty_cart();
    break
    default:
      alert("Opción incorrecta!");
    break;
  }
}

// ------------------------------------------------
// NUEVO COMENTARIO
// NUEVO COMENTARIO 2
// NUEVO COMENTARIO 3
// NUEVO COMENTARIO 4
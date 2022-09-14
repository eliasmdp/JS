// ------------------------------------------------
// DECLARACIÓN VARIABLES

let 
exit_menu=true
option=""
index=1
cart_price=0
product_list=""
add_id=0
add_name=0
add_price=0
catalog=[]
cart=[]
filter_param=""
filter_result=[]
filter_applied=false

// ------------------------------------------------
// CREACION CLASS "PRODUCT"

class Product {
  constructor(id, name, price) {
    this.id=id;
    this.name=name;
    this.price=price;
  }
}

// ------------------------------------------------
// LLENADO DE CATÁLOGO (ARRAY DE OBJETOS DE CLASS "PRODUCT")

catalog.push(new Product(1,"Producto A",10))
catalog.push(new Product(2,"Producto B",20))
catalog.push(new Product(3,"Producto C",30))
catalog.push(new Product(4,"Producto D",40))

// ------------------------------------------------
// FUNCIONES

function view_productlist (array) {
  product_list=""
  index=1
  for (product of array) {
    product_list = product_list + index +": " + product.name + " - $ " + product.price + "\n";
    index = index + 1;
  }
}

function add_cart (add_id, add_name, add_price) {
  cart.push(new Product(add_id,add_name,add_price))
  alert(add_name + " agregado al carro!");
}

function empty_cart () {
  cart = [];
}

function pay_cart() {
  alert("Gracias por tu compra! \n\nCantidad de productos: "+cart.length+"\nTotal abonado: $ "+cart_price);
  cart = [];
}

function sum_price (array) {
  cart_price=0
  index=1
  for (product of array) {
    cart_price = cart_price + product.price;
    index = index + 1;
  }
}

function filter_catalog () {
  filter_param=prompt ("Buscar Producto por nombre:")
  filter_result=catalog.filter(product => product.name.includes(filter_param))
  if (filter_result.length>0) {
    view_productlist(filter_result);
    filter_applied=true;
  } else {
    alert("Sin resultados!");
  }
}

// ------------------------------------------------
// PLP

view_productlist(catalog)
filter_applied=false
exit_menu=false
while (exit_menu!=true) {
  if (filter_applied==false) {
    option = prompt ("Hola! Por favor, seleccioná los Productos que quieras agregar al carro:\n\n" + product_list + "\nF: Aplicar filtro \nY: Ir al carro \nN: Salir del sistema")
  } else {
    option = prompt ("Hola! Por favor, seleccioná los Productos que quieras agregar al carro:\n(Filtro aplicado: '" + filter_param + "') \n\n" + product_list + "\nF: Cambiar filtro \nR: Remover filtro \nY: Ir al carro \nN: Salir del sistema")
  }
  if (option>0 && option<index) {
  if (filter_applied==false) { 
      add_cart (catalog[option-1].id, catalog[option-1].name, catalog[option-1].price)
    } else {
      add_cart (filter_result[option-1].id, filter_result[option-1].name, filter_result[option-1].price) 
    }
  } else if (option=="y" || option=="Y") {
    if (cart.length>0) {
    exit_menu=false;
    break;
    } else {
      alert("Aún no agregaste ningún producto!");
    } 
  } else if (option=="n"|| option=="N") {
    empty_cart();
    alert("Te esperamos de vuelta pronto!");
    exit_menu=true;
  } else if (option=="f"|| option=="F") {
    filter_catalog();
  } else if (option=="r"|| option=="R") {
    view_productlist(catalog);
    filter_applied=false;
  } else {
    alert("Opción incorrecta!");
  }
}

// ------------------------------------------------
// CART

view_productlist(cart)
sum_price (cart)
while (exit_menu != true) {
  option=prompt ("Carro:\n\n" + product_list + "\nTotal: $ " + cart_price + "\n\nY: Pagar \nN: Salir del sistema")
  if (option=="y"|| option=="Y") {
    if (cart.length>0) {
    pay_cart();
    exit_menu=true;
    } else {
     alert("No tienes ningún producto en el carro!");
    } 
  } else if (option=="n"|| option=="N") {
    empty_cart();
    exit_menu=true;
  } else {
   alert("Opción incorrecta!");
  }
}
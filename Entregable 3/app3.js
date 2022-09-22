// ------------------------------------------------
// VARIABLES

let
catalog=[]
cart=[]
index=1
cart_price=0
add_id=0
add_name=0
add_price=0
filter=false

// ------------------------------------------------
// CLASS PRODUCT

class Product {
  constructor(id, name, price) {
    this.id=id;
    this.name=name;
    this.price=price;
  }
}

// ------------------------------------------------
// CATÁLOGO (ARRAY DE PRODUCTs)

catalog.push(new Product(1,"Producto A",10))
catalog.push(new Product(2,"Producto B",20))
catalog.push(new Product(3,"Producto C",30))
catalog.push(new Product(4,"Producto D",40))

// ------------------------------------------------
// FUNCIONES

function refresh_plp (array) { //AL EJECUTAR ESTA FUNCION POR 2DA VEZ, DEJAN DE RESPONDER LOS ONCLICK DE LOS NUEVOS DIV
  plp_products=""
  document.getElementById("plp").innerHTML="" //SI NO BORRO DIV ORIGINALES, SUS ONCLICK SIGUEN RESPONDIENDO OK
  index=1
  for (product of array) {
    plp_products=document.createElement("div") //EL PROBLEMA ES CON LOS DIV CREADOS AL EJECUTAR LA FUNCION POR 2DA VEZ
    plp_products.innerHTML=`<h4>${product.name} - $ ${product.price}</h4> <button class="add_button" id="${index-1}">Agregar</button>`
    plp.append(plp_products)
    index = index + 1;
  }
}

function add_cart (add_id, add_name, add_price) {
  cart.push(new Product(add_id,add_name,add_price))
  alert(add_name + " agregado al carro!");
  sum_price (cart);
  cart_products_entry=document.createElement("div")
  cart_products_entry.innerHTML="<p>"+ cart[cart.length-1].name +" - $ " + cart[cart.length-1].price + "<p>"
  cart_products.append(cart_products_entry)
  refresh_cart();
}

function sum_price (array) {
  cart_price=0
  index=1
  for (product of array) {
    cart_price = cart_price + product.price;
    index = index + 1;
  }
}

function refresh_cart (array) {
  document.getElementById("cart_cant").innerText="Cantidad de Productos: "+cart.length
  document.getElementById("cart_price").innerText="Monto total: $ "+cart_price
}  

function pay_cart() {
  if (cart.length>0) {
    alert("Gracias por tu compra! \n\nCantidad de productos: "+cart.length+"\nTotal abonado: $ "+cart_price);
    empty_cart();
  } else {
    alert("Aún no agregaste ningún producto!");
  }
}

function empty_cart() {
  cart = [];
  cart_products.innerText="";
  document.getElementById("cart_cant").innerText=""
  document.getElementById("cart_price").innerText=""
}

function filter_catalog () {
  filter_param=document.getElementById("filter_param").value
  if (filter_param.value!="") {
    filter_result=catalog.filter(product => product.name.includes(filter_param))
    if (filter_result.length>0) {
      refresh_plp (filter_result)
      filter=true
    } else {
      alert("Sin resultados!")
    }
  } else {
    refresh_plp(catalog)
  }
}

function nofilter_catalog() {
  filter_param=document.getElementById("filter_param")
  filter_param.value=""
  refresh_plp(catalog)
  filter=false
}

// ------------------------------------------------
// PLP + CART

refresh_plp(catalog) //¿CONVIENE TENER UNA CANTIDA FIJA DE "CARDS DE PRODUCTO" Y LUEGO LLENARLAS O GENERARLAS DINAMICAMENTE SEGUN PRODUCTOS CREADOS?

let 
cart_products=document.getElementById("cart_products")
add_button=document.getElementsByClassName("add_button")

if (filter==false) { //VER: AUTOMATIZAR PARA QUE AGREGUE SEGUN BOTON CLICKED
  add_button[0].onclick=()=> {add_cart(catalog[0].id,catalog[0].name,catalog[0].price)}
  add_button[1].onclick=()=> {add_cart(catalog[1].id,catalog[1].name,catalog[1].price)}
  add_button[2].onclick=()=> {add_cart(catalog[2].id,catalog[2].name,catalog[2].price)}
  add_button[3].onclick=()=> {add_cart(catalog[3].id,catalog[3].name,catalog[3].price)}
} else {
  add_button[0].onclick=()=> {add_cart(filter_result[0].id,filter_result[0].name,filter_result[0].price)}
  add_button[1].onclick=()=> {add_cart(filter_result[1].id,filter_result[1].name,filter_result[1].price)}
  add_button[2].onclick=()=> {add_cart(filter_result[2].id,filter_result[2].name,filter_result[2].price)}
  add_button[3].onclick=()=> {add_cart(filter_result[3].id,filter_result[3].name,filter_result[3].price)}
}

let pay_button=document.getElementById("pay_button")
pay_button.onclick=() => {pay_cart()} 

let empty_button=document.getElementById("empty_button")
empty_button.onclick=() => {empty_cart()}

let filter_button=document.getElementById("filter_button")
filter_button.onclick=() => {filter_catalog()}

let nofilter_button=document.getElementById("nofilter_button")
nofilter_button.onclick=() => {nofilter_catalog()}

// ------------------------------------------------
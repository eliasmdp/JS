/*
BACKLOG BUGS:
  1. ELIMINACION PRODUCTOS EN CART
    a. SI NO SE HACE F5, NO SE RECONOCE EVENTO ONCLICK SOBRE LOS "REMOVE_BUTTON"
    b. AL ELIMINAR PRODUCTOS DESDE ARRIBA HACIA ABAJO, SE "DESORIENTA" RESPECTO A CUAL "REMOVE_BUTTON" SE ESTA CLICKEANDO.
  2. MODIFICACION CANTIDADES DE PRODUCTOS EN CART
    a. SI NO SE HACE F5, NO SE RECONOCE EVENTO ONCLICK SOBRE LOS "ADDCANT_BUTTON" Y "SUBCANT_BUTTON"
  3. FILTRADO PRODUCTOS EN PLP
    a. SI LUEGO DE FILTRAR NO SE HACE F5, NO SE RECONOCE EVENTO ONCLICK SOBRE LOS "ADD_BUTTON"
    
BACKLOG FUNCIONALIDADES:
  1. VALIDACION STOCK AL AL AGREGAR PRODUCTO
  2. CARGA DE PRODUCTS VIA JSON
  3. CONVALIDACION POR IGUAL MAYUS/MINUS AL FILTRAR PLP
*/

// ------------------------------------------------
// CREACION DE CATALOGO

class Product {
  constructor(id, name, price, stock, cant) {
    this.id=id;
    this.name=name;
    this.price=price;
    this.stock=stock;
    this.cant=cant;
  }
}

let catalog=[]
catalog.push(new Product("PROD_A","Producto A",10,100,1))
catalog.push(new Product("PROD_B","Producto B",20,100,1))
catalog.push(new Product("PROD_C","Producto C",30,100,1))
catalog.push(new Product("PROD_D","Producto D",40,100,1))

// ------------------------------------------------
// FUNCIONES

// LO QUE HACE ESTA FUNCION ES REFRESCAR LA PRODUCT LIST PAGE (PLP), ES DECIR CREA LAS "CARDS" DE PRODUCTOS EN HTML. SE EJECUTA CUANDO SE CARGA LA PAGINA Y SI SE APLICA UN FILTRO.
function refresh_plp (array) { 
  plp_products=""
  document.getElementById("plp").innerHTML="" //"PLP" ES EL DIV PADRE QUE CONTIENE A TODOS LOS DIV HIJOS (LAS "CARDS" DE PRODUCTOS)
  for (product of array) {
    plp_products=document.createElement("div")
    plp_products.innerHTML=`<h4>${product.name} - $ ${product.price}</h4> <button class="add_button" id="${product.id}">Agregar</button>`
    plp.append(plp_products)
  }
}

function add_cart (add_id, add_name, add_price, add_stock, add_cant) {
  let index=cart.findIndex(i => i.id===add_id)
  if (index!=-1) {
    cart[index].cant=cart[index].cant + add_cant
    cart_products_entrydetails=document.getElementById("entrydetails_"+add_id)
    cart_products_entrydetails.innerText=cart[index].name + " - $ " + cart[index].price + " (Cantidad: " + cart[index].cant + ")"
  } else {
    cart.push(new Product(add_id,add_name,add_price,add_stock,add_cant))
    cart_products_entry=document.createElement("div")
    cart_products_entry.id=`entry_${add_id}`
    cart_products_entry.innerHTML=`<p id="entrydetails_${add_id}">${cart[cart.length-1].name} - $ ${cart[cart.length-1].price} (Cantidad: ${cart[cart.length-1].cant})</p> <button class="subCant_button" id="sub_${add_id}">-</button> <button class="addCant_button" id="add_${add_id}">+</button> <button class="remove_button" id="remove_${add_id}">Eliminar</button>`
    cart_products.append(cart_products_entry)
  }
  alert(add_name + " agregado al carro!")
  localStorage.setItem("cart",JSON.stringify(cart))
  refresh_cart(cart)
}

function refresh_cart (array) {
  cart_price=0
  cart_cant=0
  for (product of array) {
    cart_cant = cart_cant + product.cant
    cart_price = cart_price + product.price*product.cant
  }
  document.getElementById("cart_cant").innerText="Cantidad de Productos: "+cart_cant
  document.getElementById("cart_price").innerText="Monto total: $ "+cart_price
  //CHEQUEO VARIABLES EN CONSOLA
  let remove_button=document.getElementsByClassName("remove_button")
  console.log("---------------------------------------------");
  console.log("CART.LENGTH: "+cart.length);
  console.log("REMOVE_BTN.LENGTH: "+remove_button.length);
  for (let j=0; j < cart.length; j++) {
    console.log("CART["+j+"].ID: "+cart[j].id+" // REMOVE_BTN["+j+"].ID: "+remove_button[j].id);
  }
  //
}  

function pay_cart() {
  if (cart.length>0) {
    if (logued==false) {
      alert("Debes registrarte en el sitio para poder finalizar tu compra.")
    } else {  
      alert("Muchas gracias por tu compra! \n\nCantidad de productos: "+cart_cant+"\nTotal abonado: $ "+cart_price);
      empty_cart();
    }
  } else {
    alert("Aún no has agregado ningún producto!");
  }
}

function empty_cart() {
  localStorage.removeItem("cart")
  cart = [];
  cart_products.innerHTML="";
  document.getElementById("cart_cant").innerText="Cantidad de Productos: 0"
  document.getElementById("cart_price").innerText="Monto total: $ 0"
}

function filter_catalog () {
  if (filter_param.value!="") {
    filter_result=catalog.filter(product => product.name.includes(filter_param.value))
    if (filter_result.length>0) {
      filter=true
      sessionStorage.setItem("filter",filter)
      sessionStorage.setItem("filter_result",JSON.stringify(filter_result))
      sessionStorage.setItem("filter_param", filter_param.value)
      refresh_plp (filter_result)
    } else {
      alert("Sin resultados!")
    }
  } else {
    refresh_plp(catalog)
  }
}

function nofilter_catalog() {
  filter=false
  sessionStorage.removeItem("filter")
  sessionStorage.removeItem("filter_result")
  sessionStorage.removeItem("filter_param")
  filter_param.value=""
  refresh_plp(catalog)
}

function login(input_name,input_email) {
  if (input_name.value=="" || input_email.value=="") {
    alert("Debes completar tu Nombre y tu Email.")
  } else if (input_email.value.includes("@")===false) {
    alert("El Email ingresado no es válido.")
  } else {
    alert("Registro exitoso. \n\nBienvenido, "+input_name.value+"!")
    logued=true
    localStorage.setItem("login_name",input_name.value)
    localStorage.setItem("login_email",input_email.value)
    login_inputs.style.display="none"
    input_name.value=""
    input_email.value=""
    login_button.innerText="Cerrar sesión"
  }
}

function unlogin() {
  logued=false
  localStorage.removeItem("login_name")
  localStorage.removeItem("login_email")
  login_inputs.style.display=""
  login_button.innerText="Registrarme"
}

// ------------------------------------------------
// VERIFICACION LOGIN EN LOCALSTORAGE

let login_inputs=document.getElementById("login_inputs")
let login_name=document.getElementById("login_name")
let login_email=document.getElementById("login_email")
let login_button=document.getElementById("login_button")
let user_saved=localStorage.getItem("login_name")
let logued
if (user_saved) {
  logued=true
  login_inputs.style.display="none"
  login_name.value=""
  login_email.value=""
  login_button.innerText="Cerrar sesión"
} else {
  logued=false
  login_inputs.style.display=""
  login_button.innerText="Registrarme"  
}

// ------------------------------------------------
// VERIFICACION CART EN LOCALSTORAGE

let cart=[]
let cart_price=0
let cart_cant=0
let cart_products=document.getElementById("cart_products")
let cart_saved=localStorage.getItem("cart")
if (cart_saved) {
  cart=JSON.parse(cart_saved)
  for (entry of cart) {
    cart_products_entry=document.createElement("div")
    cart_products_entry.id=`entry_${entry.id}`
    cart_products_entry.innerHTML=`<p id="entrydetails_${entry.id}">${entry.name} - $ ${entry.price} (Cantidad: ${entry.cant})</p> <button class="subCant_button" id="sub_${entry.id}">-</button> <button class="addCant_button" id="add_${entry.id}">+</button> <button class="remove_button" id="remove_${entry.id}">Eliminar</button>`
    cart_products.append(cart_products_entry)
  }
  refresh_cart(cart)
}

// ------------------------------------------------
// VERIFICACION FILTER EN SESSIONSTORAGE

let filter=false
let filter_result=[]
let filter_saved=sessionStorage.getItem("filter")
let filter_result_saved=sessionStorage.getItem("filter_result")
let filter_param=document.getElementById("filter_param")
let filter_param_saved=sessionStorage.getItem("filter_param")
if (filter_saved) {
  filter=true
  filter_result=JSON.parse(filter_result_saved)
  filter_param.value=filter_param_saved
  refresh_plp(filter_result)
} else {
  filter=false
  refresh_plp(catalog)
}

// ------------------------------------------------
// EVENTOS

// ADD_BUTTON.ONCLICK
// (!) BUG 3a: SI LUEGO DE EJECUTAR LA FUNCION "FILTER_CATALOG" NO SE HACE F5, NO SE RECONOCE EVENTO ONCLICK SOBRE LOS "ADD_BUTTON"
let add_button=document.getElementsByClassName("add_button")
for (let i=0; i < add_button.length; i++) {
  add_button[i].onclick=()=> {
    if (filter===false) {
      add_id=catalog[i].id
      add_name=catalog[i].name
      add_price=catalog[i].price
      add_stock=catalog[i].stock
      add_cant=catalog[i].cant
    } else {
      add_id=filter_result[i].id
      add_name=filter_result[i].name
      add_price=filter_result[i].price
      add_stock=filter_result[i].stock
      add_cant=filter_result[i].cant
    }
    add_cart(add_id,add_name,add_price,add_stock,add_cant)
    window.location.reload(true)
  }
}

// REMOVE_BUTTON.ONCLICK
// (!) BUG 1a: REQUIERE ACTUALIZAR PARA QUE LOS NUEVOS "REMOVE_BUTTON" RESPONDAN 
let remove_button=document.getElementsByClassName("remove_button")
for (let i=0; i < remove_button.length; i++) {
  remove_button[i].onclick=()=> {
    //CHEQUEO VARIABLES EN CONSOLA
    console.log("---------------------------------------------");
    console.log("REMOVE_BTN.LENGTH:"+remove_button.length)
    console.log("INDEX REMOVE_BTN APRETADO: "+i)
    console.log("INDEX REMOVE_BTN APRETADO: "+i+" // REMOVE_BTN["+i+"].ID: "+remove_button[i].id);
    //
    cart_products_entry=document.getElementById("entry_"+cart[i].id) // (!) BUG 1b: SI VOY ELIMINANDO PRODUCTOS DEL CARRITO DE ARRIBA HACIA ABAJO, SE "DESORIENTA" RESPECTO A QUE BOTTON PRESIONO. SI ACTUALIZO PAGINA, FUNCIONA OK
    cart_products_entry.innerHTML=""
    cart.splice(i,1)
    localStorage.setItem("cart",JSON.stringify(cart))
    refresh_cart(cart)
    window.location.reload(true)
  }
}

// ADDCANT_BUTTON.ONCLICK
// (!) BUG 2a: REQUIERE ACTUALIZAR PARA QUE LOS NUEVOS "ADDCANT_BUTTON" RESPONDAN
let addCant_button=document.getElementsByClassName("addCant_button")
for (let i=0; i < addCant_button.length; i++) {
  addCant_button[i].onclick=()=> {
    cart[i].cant=cart[i].cant+1
    cart_products_entrydetails=document.getElementById("entrydetails_"+cart[i].id)
    cart_products_entrydetails.innerText=cart[i].name + " - $ " + cart[i].price + " (Cantidad: " + cart[i].cant + ")"
    localStorage.setItem("cart",JSON.stringify(cart))
    refresh_cart(cart)
  }
}

// ADDCANT_BUTTON.ONCLICK
// BUG 2a: REQUIERE ACTUALIZAR PARA QUE LOS NUEVOS "ADDCANT_BUTTON" RESPONDAN
let subCant_button=document.getElementsByClassName("subCant_button")
for (let i=0; i < subCant_button.length; i++) {
  subCant_button[i].onclick=()=> {
    if (cart[i].cant>1) {
      cart[i].cant=cart[i].cant-1
      cart_products_entrydetails=document.getElementById("entrydetails_"+cart[i].id)
      cart_products_entrydetails.innerText=cart[i].name + " - $ " + cart[i].price + " (Cantidad: " + cart[i].cant + ")"
      localStorage.setItem("cart",JSON.stringify(cart))
      refresh_cart(cart)
    }
  }
}

// PAY_BUTTON.ONCLICK
let pay_button=document.getElementById("pay_button")
pay_button.onclick=() => {pay_cart()}

// EMPTY_BUTTON.ONCLICK
let empty_button=document.getElementById("empty_button")
empty_button.onclick=() => {empty_cart()}

// LOGIN_BUTTON.ONLICK
login_button.onclick=() => {
  if (logued==false) {
    login(login_name,login_email)
  } else {
    unlogin()
  }
}

// FILTER_BUTTON.ONCLICK
let filter_button=document.getElementById("filter_button")
filter_button.onclick=() => {
  filter_catalog()
  window.location.reload(true)
}

// NOFILTER_BUTTON.ONCLICK
let nofilter_button=document.getElementById("nofilter_button")
nofilter_button.onclick=() => {
  nofilter_catalog()
  window.location.reload(true)
}

// ------------------------------------------------

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
async function load_products () {
  console.log("(!) SOY LA FUNCION LOAD_PRODUCTS INICIANDO EJECUCION")
  const resp = await fetch("products.json")
  const data = await resp.json()
  await data.forEach((product) => {
    catalog.push(new Product(product.id, product.name, product.price, product.stock, product.cant))
  })
  console.log("(!) SOY LA FUNCION LOAD_PRODUCTS TERMINANDO EJECUCION") // Resto del código no espera a que termine ejecución de load_products
}
load_products()

// ------------------------------------------------
// FUNCIONES

// REFRESH_PLP ACTUALIZA LA PRODUCT LIST PAGE (PLP), ES DECIR CREA LAS "CARDS" DE PRODUCTOS EN HTML
function refresh_plp (array) {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION REFRESH_PLP EJECUTANDOSE")
  plp_products=""
  document.getElementById("plp").innerHTML="" // "PLP" ES EL DIV PADRE QUE CONTIENE A TODAS LAS "CARDS" DE PRODUCTOS (DIV HIJOS)
  for (product of array) {
    plp_products=document.createElement("div")
    plp_products.innerHTML=`<h4>${product.name} | $ ${product.price} | Stock: ${product.stock}</h4> <button class="add_button" id="${product.id}">Agregar</button>`
    plp.append(plp_products)
  }
}

function add_cart (add_id, add_name, add_price, add_stock, add_cant) {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION ADD_CART EJECUTANDOSE")
  let index=cart.findIndex(i => i.id===add_id)
  if (index!=-1) {
    cart[index].cant=cart[index].cant + add_cant
    cart_products_entrydetails=document.getElementById("entrydetails_"+add_id)
    cart_products_entrydetails.innerText=cart[index].name + " | $ " + cart[index].price + " | Cantidad: " + cart[index].cant
  } else {
    cart.push(new Product(add_id,add_name,add_price,add_stock,add_cant))
    cart_products_entry=document.createElement("div")
    cart_products_entry.id=`entry_${add_id}`
    cart_products_entry.innerHTML=`<p id="entrydetails_${add_id}">${cart[cart.length-1].name} | $ ${cart[cart.length-1].price} | Cantidad: ${cart[cart.length-1].cant}</p> <button class="subCant_button" id="sub_${add_id}">-</button> <button class="addCant_button" id="add_${add_id}">+</button> <button class="remove_button" id="remove_${add_id}">Eliminar</button>`
    cart_products.append(cart_products_entry)
  }
  localStorage.setItem("cart",JSON.stringify(cart))
  refresh_cart(cart)

  swal({
    text: "¡" + add_name + " agregado al carro!",
    icon: "success",
    button: "Entendido",
  }).then(function(){window.location.reload(true)})
}

function refresh_cart (array) {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION REFRESH_CART EJECUTANDOSE")
  cart_price=0
  cart_cant=0
  for (product of array) {
    cart_cant = cart_cant + product.cant
    cart_price = cart_price + product.price*product.cant
  }
  document.getElementById("cart_cant").innerText="Cantidad de Productos: "+cart_cant
  document.getElementById("cart_price").innerText="Monto total: $ "+cart_price
  let remove_button=document.getElementsByClassName("remove_button")
}  

function pay_cart() {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION PAY_CART EJECUTANDOSE")
  if (cart.length>0) {
    if (logued==false) {
      swal({
        text: "Debes registrarte en el sitio para poder finalizar tu compra",
        icon: "warning",
        button: false
      })
    } else {  
      swal({
        title: "Pago exitoso",
        text: "Cantidad de productos: "+cart_cant+"\nTotal abonado: $ "+cart_price,
        icon: "success",
        button: "Entendido"
      })
      empty_cart();
    }
  } else {
    swal({
      text: "¡Aún no has agregado ningún producto!",
      icon: "warning",
      button: false
    })
  }
}

function empty_cart() {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION EMPTY_CART EJECUTANDOSE")
  localStorage.removeItem("cart")
  cart = [];
  cart_products.innerHTML="";
  document.getElementById("cart_cant").innerText="Cantidad de Productos: 0"
  document.getElementById("cart_price").innerText="Monto total: $ 0"
}

function filter_catalog () {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION FILTER_CATALOG EJECUTANDOSE")
  if (filter_param.value!="") {
    filter_result=catalog.filter(product => product.name.includes(filter_param.value))
    if (filter_result.length>0) {
      filter=true
      sessionStorage.setItem("filter",filter)
      sessionStorage.setItem("filter_result",JSON.stringify(filter_result))
      sessionStorage.setItem("filter_param", filter_param.value)
      refresh_plp (filter_result)
      window.location.reload(true)
    } else {
      swal({
        text: "¡Sin resultados!",
        icon: "error",
        button: false
      })
    }
  } else {
    refresh_plp(catalog)
    window.location.reload(true)
  }
}

function nofilter_catalog() {
  // VALIDO ORDEN DE EJECUCION EN CONSOLA
  console.log("SOY LA FUNCION NOFILTER_CATALOG EJECUTANDOSE")
  filter=false
  sessionStorage.removeItem("filter")
  sessionStorage.removeItem("filter_result")
  sessionStorage.removeItem("filter_param")
  filter_param.value=""
  refresh_plp(catalog)
  window.location.reload(true)
}

function login(input_name,input_email) {
  if (input_name.value=="" || input_email.value=="") {
    swal({
      text: "Debes completar tu Nombre y tu Email",
      icon: "warning",
      button: false
    })
  } else if (input_email.value.includes("@")===false) {
    swal({
      text: "El Email ingresado no es válido",
      icon: "warning",
      button: false
    })
  } else {
    swal({
      title: "Registro exitoso",
      text: "¡Bienvenido, "+input_name.value+"!",
      icon: "success",
      button: "Empezar"
    })
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
    cart_products_entry.innerHTML=`<p id="entrydetails_${entry.id}">${entry.name} | $ ${entry.price} | Cantidad: ${entry.cant}</p> <button class="subCant_button" id="sub_${entry.id}">-</button> <button class="addCant_button" id="add_${entry.id}">+</button> <button class="remove_button" id="remove_${entry.id}">Eliminar</button>`
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
  }
}

// REMOVE_BUTTON.ONCLICK 
let remove_button=document.getElementsByClassName("remove_button")
for (let i=0; i < remove_button.length; i++) {
  remove_button[i].onclick=()=> {
    cart_products_entry=document.getElementById("entry_"+cart[i].id)
    cart_products_entry.innerHTML=""
    cart.splice(i,1)
    localStorage.setItem("cart",JSON.stringify(cart))
    refresh_cart(cart)
    window.location.reload(true)
  }
}

// ADDCANT_BUTTON.ONCLICK
let addCant_button=document.getElementsByClassName("addCant_button")
for (let i=0; i < addCant_button.length; i++) {
  addCant_button[i].onclick=()=> {
    cart[i].cant=cart[i].cant+1
    cart_products_entrydetails=document.getElementById("entrydetails_"+cart[i].id)
    cart_products_entrydetails.innerText=cart[i].name + " | $ " + cart[i].price + " | Cantidad: " + cart[i].cant
    localStorage.setItem("cart",JSON.stringify(cart))
    refresh_cart(cart)
  }
}

// ADDCANT_BUTTON.ONCLICK
let subCant_button=document.getElementsByClassName("subCant_button")
for (let i=0; i < subCant_button.length; i++) {
  subCant_button[i].onclick=()=> {
    if (cart[i].cant>1) {
      cart[i].cant=cart[i].cant-1
      cart_products_entrydetails=document.getElementById("entrydetails_"+cart[i].id)
      cart_products_entrydetails.innerText=cart[i].name + " | $ " + cart[i].price + " | Cantidad: " + cart[i].cant
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
filter_button.onclick=() => {filter_catalog()}

// NOFILTER_BUTTON.ONCLICK
let nofilter_button=document.getElementById("nofilter_button")
nofilter_button.onclick=() => {nofilter_catalog()}

// ------------------------------------------------

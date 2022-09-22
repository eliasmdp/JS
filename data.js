const data= {
	"id":"1",
	"nombre":"Producto A",
	"precio":"20"
}

//PASO OBJETO A JSON
const data_json = JSON.stringify(data)
//ALMACENO JSON EN LOCALSTORAGE
localStorage.setItem("Producto",data_json)
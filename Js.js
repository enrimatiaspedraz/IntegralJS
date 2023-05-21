const form = document.formulario
const inputs = form.getElementsByTagName("input")
const select = form.getElementsByTagName("select")[0]


const montoAPagar = document.getElementById("apagar")
const borrar = document.getElementById("borrar")
const total = document.getElementById("total")

//variables

const precio = 200

const categorias = {
  a: {porcentaje: 80, value:"a"},
  b: {porcentaje: 50, value:"b"},
  c: {porcentaje: 15, value:"c"}
}

let cantidad = null
let categoria = null
let totalAPagar = null


const textoTotal = "Monto a Pagar $: "


 
const preciofinal = () => {

cantidad = 2

  if (!cantidad || !precio) return

  const APagar = precio * cantidad
  const descuento = (APagar/100) *  10
  totalAPagar = APagar - descuento
  montoAPagar.innerText = textoTotal + totalAPagar  
}


  const borrarcampos = () => {
    for (let input of inputs)
    input.value="";
    select.value="none"
  }

  borrar.addEventListener("click", borrarcampos)

  const enviar = () => {
    console.log("jjj")
  }

  total.addEventListener("click", enviar)


  // FUNCIONES PARA BOTONES

  

  const setCategory = (e) => {
    const opcion = e.target.value
    console.log(opcion);

  }

  document.getElementById("categoria").addEventListener("change", setCategory)



  const setCantidad = (e) => {
    const quantity = e.target.value
    console.log(quantity);
    
  }

  document.getElementById("cantidad").addEventListener("change", setCantidad)















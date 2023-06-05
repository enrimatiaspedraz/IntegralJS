const form = document.formulario
const inputs = form.getElementsByTagName("input")
const select = form.getElementsByTagName("select")[0]


const montoAPagar = document.getElementById("apagar")
const borrar = document.getElementById("borrar")
const total = document.getElementById("total")

//variables

const precio = 200

const categories = {
  a: { porcentaje: 80, value: '0' },
  b: { porcentaje: 50, value: '1' },
  c: { porcentaje: 15, value: '2' }
}

let cantidad = null
let category = null
let totalAPagar = null


const textoTotal = "Total a Pagar: $ "


 
const preciofinal = () => {

  if (!cantidad || !precio) return

  const APagar = precio * cantidad
  const descuento = (APagar/100) * categories[category].porcentaje
  totalAPagar = APagar - descuento
  montoAPagar.innerText = textoTotal + totalAPagar  
}


  const borrarcampos = (e) => {
    for (let input of inputs)
    input.value="";
    select.value="none"
    montoAPagar.innerText = "Total a Pagar: $"
  }


  borrar.addEventListener("click", borrarcampos)


  // esto hay que cambiarlo
  const enviar = (e) => {
    preciofinal()
  }

  total.addEventListener("click", enviar)


  // FUNCIONES PARA BOTONES

  

  const setCategory = (e) => {
    const option = e.target.value
    if (option === 'none') {
      borrarcampos()
      return
       }

    category = option
  
  }
  console.log(category);

  document.getElementById("category").addEventListener("change", setCategory)



  const setCantidad = (e) => {
    const value = e.target.value
    if (value < 0){
    e.target.value = 0
    totalAPagar = null
    return}
    cantidad = value
    //preciofinal()
    
  }

  document.getElementById("cantidad").addEventListener("change", setCantidad)















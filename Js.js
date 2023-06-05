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
    e.preventDefault()
    const { nombre, apellido, correo, cantidad, category } = form
    const verificacion = {
      nombre: nombre.value !=="",
      apellido: apellido.value !=="",
      correo: correo.value.includes("@"),
      cantidad: cantidad.value >0,
      category: category.value !=="none"
    }
    const values = Object.values(verificacion)
    const submit = values.every(value => value)
    submit  ? alert ("SU COMPRA HA SIDO EXITOSA!!!") 
            : alert("Existen campos incompletos")

         
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

    //prueba
    // const index = categories[category].value
    // const CardsContainer = document.querySelectorAll('.btn.card')
    // const container = CardsContainer[index]
    // selected = index
    // const colors = ['bg-primary', 'bg-danger', 'bg-success']
    // const transparent = 'bg-transparent'
  
    // const changeColor = (container, index) => {
    //   const i = Number(index)}
    //   container.classList.replace(transparent, colors[i])

    
   
    
    
    // changeColor(container, index)
    // eventsAssignmentsAll() 
  
    //prueba

    preciofinal()
 
  }
 

  document.getElementById("category").addEventListener("change", setCategory)



  const setCantidad = (e) => {
    const value = e.target.value
    if (value < 0){
    e.target.value = 0
    totalAPagar = null
    return}
    cantidad = value

    
  }

  document.getElementById("cantidad").addEventListener("change", setCantidad)

  //EN PRUEBA

  // const colorcajas = (selection) => {
  //   switch(selection){
  //     case "0":
  //       form.category.value = "a"
  //       break
  //     case "1":
  //         form.category.value = "b"
  //         break  
  //     case "2":
  //           form.category.value = "c"
  //           break
  //   }
  // }















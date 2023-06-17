

let selected = null

//CARDS COLOR

const cards = document.getElementsByClassName("card-body")
const cardsContainer = document.getElementsByClassName("card")


const colors = ['bg-primary', 'bg-danger', 'bg-success']
const transparent = 'bg-transparent'

const changeColor = (container, index, revert=false) => {
  const i = Number(index) 
  revert
   ?container.classList.replace(colors[i], transparent)  
   :container.classList.replace(transparent, colors[i])
} 

const cardEnter = (e) => {
  const {index} = e.target.dataset
  changeColor(e.target, index)
  
}

const cardLeave = (e) => {
  const {index} = e.target.dataset
  changeColor(e.target, index, true )
}

const cardClick = (e) => {
selected = e.currentTarget.dataset.index 
eventsAssignmentsAll()
} 

const eventCleaner = (container) => {
  container.removeEventListener('mouseenter', cardEnter)
  container.removeEventListener('mouseleave', cardLeave)
  container.removeEventListener('click', cardClick)

}

const eventAssignments = (container) => {
  container.addEventListener('mouseenter', cardEnter)
  container.addEventListener('mouseleave', cardLeave)
  container.addEventListener('click', cardClick)
}
 
const eventsAssignmentsAll = () => {
 for (let container of cardsContainer) {
  
eventCleaner(container)

  const {index} = container.dataset

if (index !== selected){ 
  
  eventAssignments(container)
  changeColor(container, index, true)
 }
}
}
eventsAssignmentsAll()

//FIN CARD COLOR

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
  c: { porcentaje: 15, value: '2' },
  // none: { porcentaje: 0, value: '3' }

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
    selected = null
    eventsAssignmentsAll()
    
    
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
      // category: category.value !=="none"
    }
    const values = Object.values(verificacion)
    const submit = values.every(value => value)
    submit  ? Swal.fire({
      position: 'center',
      icon: 'success',
      title: ("SU COMPRA HA SIDO EXITOSA!!!"),
      showConfirmButton: false,
      timer: 2000
    }) 
            :Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: ("Existen campos incompletos"),
             
            }) 
            
            

         
  }

  total.addEventListener("click", enviar)


  // FUNCIONES PARA BOTONES

  
const resetCategories = () =>{
  selected = null
  eventsAssignmentsAll()
  
  montoAPagar.innerText = "Total a Pagar:"



}

  const setCategory = (e) => {
    const option = e.target.value
    if(option === "none"){
    resetCategories()
    return
    }
  
    category = option
   

    const index = categories[category].value
    const container = cardsContainer[index]

    selected = index
    changeColor(container, index)

    eventsAssignmentsAll()
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

    preciofinal() //prueba para ver si funciona

    
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











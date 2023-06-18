

let selected = null

//CARDS COLOR

const cards = document.getElementsByClassName("card-body")
const cardsContainer = document.getElementsByClassName("card")


const colors = ['bg-primary', 'bg-secondary', 'bg-warning']
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
matchCategory(selected)
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

const matchCategory = (selection) => {
    switch(selection){
      case "0":
        form.category.value = "a"
       
        break
      case "1":
        form.category.value = "b"
        
        break  
      case "2":
        form.category.value = "c"
      
        break
      default:
           throw new Error ("Error de función")
              
    }
  }

//FIN CARD COLOR

const form = document.formulary
const inputs = form.getElementsByTagName("input")
const select = form.getElementsByTagName("select")[0]


const toPay = document.getElementById("totalpay")
const clear = document.getElementById("clear")
const total = document.getElementById("total")


//variables

const price = 200

const categories = {
  a: { percent: 80, value: '0' },
  b: { percent: 50, value: '1' },
  c: { percent: 15, value: '2' },
  none: { percent: 100, value: '3' },
}

let totalQuantity = null
let category = null
let totalToPay = null




const textTotal = "Total a Pagar: $ "


 
const finalPrice = () => {

  if (!totalQuantity || !price) return

  const finalPrice = price * totalQuantity
  const discount = (finalPrice/100) * categories[category].percent
  totalToPay = finalPrice - discount
  toPay.innerText = textTotal + totalToPay  
  
}


  const deleteAll = (e) => {
  
    for (let input of inputs)
    input.value="";
    select.value="none"
    toPay.innerText = "Total a Pagar: $"
    selected = null
    eventsAssignmentsAll()
    
    
  }


  clear.addEventListener("click", deleteAll)


  
  const send = (e) => {
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

  total.addEventListener("click", send)


  // FUNCIONES PARA BOTONES

  
const resetCategories = () =>{
  selected = null
  eventsAssignmentsAll()
  toPay.innerText = "Total a Pagar: $"
  
 
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
    finalPrice()
 
  }



  document.getElementById("category").addEventListener("change", setCategory)



  const setCantidad = (e) => {
    const value = e.target.value
    if (value < 0){
    e.target.value = 0
    totalToPay = null
    return}
    totalQuantity = value

    finalPrice() //prueba para ver si funciona

    
  }

  document.getElementById("quantity").addEventListener("change", setCantidad)



  














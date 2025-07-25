const notas = []
let idSiguiente = 1

let modoEjemplo = false
let notasEjemplo = []

// cargar las notas de mi archivo json
async function cargarEjemplosNotas() {
    try {
        const response = await fetch('./db/notas.json')
        const notasEjemplo = await response.json()
        return notasEjemplo
    } catch (error) {
        mostrarError('No se pudieron cargar las notas de ejemplo')
        return []
    }
}

function mostrarError(mensaje) {
    const titulo = document.querySelector('h1')
    titulo.innerHTML += `<p id="error-temp" class="mensaje-error">Error: ${mensaje}</p>`
    
    setTimeout(() => {
        const error = document.getElementById('error-temp')
        if (error) {
            error.remove()
        }
    }, 3000)
}

// cargar las notan en localStorage
function cargarNotas() {
    const notasGuardadas = localStorage.getItem('misNotas')
    const idGuardado = localStorage.getItem('idSiguiente')
    
    if (notasGuardadas) {
        const parsedNotes = JSON.parse(notasGuardadas)
        notas.push(...parsedNotes)
    }
    
    if (idGuardado) {
        idSiguiente = parseInt(idGuardado)
    }
}

// guardar las notas en localStorage
function guardarNotas() {
    localStorage.setItem('misNotas', JSON.stringify(notas))
    localStorage.setItem('idSiguiente', idSiguiente.toString())
}

// agrego una nueva nota
function aniadirNota() {
    
    if (modoEjemplo) {
        return
    }
    
    const texto = notaInput.value.trim()
    const categoria = seleccionCategoria.value
    let descripcion = notaDescripcion.value.trim() || "No tiene descripcion"
    if (texto === ''){
        return
    }
    const nuevaNota = {
        id: idSiguiente++,
        texto: texto,	
        categoria: categoria,
        descripcion: descripcion,
        fecha: new Date().toLocaleDateString()
    }
    notas.push(nuevaNota)
    notaInput.value = ''    
    notaDescripcion.value = ''  
    
    guardarNotas()
    renderNotes(notas)
    mostrarToastExito("Se ha añadido una tarea nueva")
}

// eliminar una nota
function eliminarNota(id) {
    const nota = notas.find(nota => nota.id === id)
    if (nota) {
        const index = notas.indexOf(nota)
        notas.splice(index, 1)
        guardarNotas()
        renderNotes(notas)
        mostrarToastExito("Se ha eliminado la tarea")
    }
}

// cambiar la descripcion de una nota
function cambiarDescripcion(id) {
    const nota = notas.find(nota => nota.id === id)
    if (nota) {
        let cambiarDescipcion = document.getElementById(`cambiar-descripcion-${id}`)
        let nuevaDescripcion = cambiarDescipcion.value.trim() || "No tiene descripcion"

        if(nota.descripcion !== nuevaDescripcion) {
            mostrarToastExito("Se ha cambiado la descripcion de la tarea")
        }else{
            mostrarToastError("La descripcion es la misma, no se ha cambiado nada")
        }
        
        nota.descripcion = nuevaDescripcion
        cambiarDescipcion.value = ''
        guardarNotas()
        renderNotes(notas)
    }
}

// cambiar la categoria de una nota
function cambiarCategoria(id) {
    const nota = notas.find(nota => nota.id === id)
    if (nota) {
        let cambiarCategoriaSelect = document.getElementById(`cambiar-categoria-${id}`)
        let nuevaCategoria = cambiarCategoriaSelect.value
        
        if(nota.categoria !== nuevaCategoria) {
            mostrarToastExito("Se ha cambiado la categoria de la tarea")
        }else{
            mostrarToastError("La categoria es la misma, no se ha cambiado nada")
        }
        
        nota.categoria = nuevaCategoria  
        cambiarCategoriaSelect.value = ''
        guardarNotas()
        renderNotes(notas)
    }
}

// filtro las notas sugun su categoria
function filtrarPorCategoria(categoria) {
    const notasActuales = modoEjemplo ? notasEjemplo : notas
    
    if (categoria === 'todo') {
        renderNotes(notasActuales)
    } else {
        const notasFiltradas = notasActuales.filter(nota => nota.categoria === categoria) 
        renderNotes(notasFiltradas)
    }
}

// funcion para activar modo ejemplo
async function activarModoEjemplo() {
    const ejemplos = await cargarEjemplosNotas()
    if(!modoEjemplo){
        mostrarToastInfo("Ha activado el modo ejemplo")
    }
    
    if (ejemplos.length > 0) {
        notasEjemplo = ejemplos
        modoEjemplo = true
        
        modoActualSpan.textContent = '(Viendo ejemplos)'
        notaInput.disabled = true
        notaDescripcion.disabled = true
        seleccionCategoria.disabled = true
        aniadirBoton.disabled = true
        
        document.querySelector('body').className = 'modo-ejemplo'
        
        renderNotes(notasEjemplo)
    }
}

// funcion para volver al modo normal
function activarModoNormal() {
    if(modoEjemplo){
        mostrarToastInfo("Ha salido del modo ejemplo")
    }
    
    modoEjemplo = false
    
    modoActualSpan.textContent = '(Mis notas)'
    notaInput.disabled = false
    notaDescripcion.disabled = false
    seleccionCategoria.disabled = false
    aniadirBoton.disabled = false
    
    document.querySelector('body').className = ''
    
    renderNotes(notas)
}
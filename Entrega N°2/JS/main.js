const notas = []
let idSiguiente = 1

// Elementos del DOM
let notaInput = document.getElementById("nota-input")
let seleccionCategoria = document.getElementById("select-categoria")
let aniadirBoton = document.getElementById("aniadir-button")
let contenedorDeNotas = document.getElementById("notas")
let totalSpan = document.getElementById("total")
let mostrarBotones = document.getElementById("mostrar-todo")
let mostrarBotonPesonal = document.getElementById("mostrar-personal")
let mostrarBotonTrabajo = document.getElementById("mostrar-trabajo")
let mostrarBotonEstudio = document.getElementById("mostrar-estudio")

// cargar las notan en localStorage
function cargarNotas() {
    const notasGuardadas = localStorage.getItem('misNotas')
    if (notasGuardadas) {
        const parsedNotes = JSON.parse(notasGuardadas)
        notas.push(...parsedNotes) //...es para trabajar con una copia por seguridad, aprendi a usar esto en ejercicios con clases y propiedades privadas
    }

    let maxId = 0
    for (let nota of notas) {
    if (nota.id > maxId) {
        maxId = nota.id
        }
        idSiguiente = maxId + 1
    }
}

// guardar las notas en localStorage
function guardarNotas() {
    localStorage.setItem('misNotas', JSON.stringify(notas))
}

function renderNotes(arrayNotas) {
    contenedorDeNotas.innerHTML = ""
    arrayNotas.forEach(nota => {
        let contenedor = document.createElement("div")
        contenedor.innerHTML = `<p><strong>Nota: ${nota.texto}</strong></p>
                                <small>Categoría: ${nota.categoria}</small>
                                <button onclick="eliminarNota(${nota.id})">Eliminar</button>
                                <hr>`
        contenedorDeNotas.appendChild(contenedor)
    })
    totalSpan.innerText = arrayNotas.length
}

// Agrego una nueva nota
function aniadirNota() {
    const texto = notaInput.value.trim()
    const categoria = seleccionCategoria.value
    if (texto === ''){
        return
    }
    const nuevaNota = {
        id: idSiguiente++,
        texto: texto,
        categoria: categoria,
    }
    notas.push(nuevaNota)
    notaInput.value = ''    
    guardarNotas()
    renderNotes(notas)
}

// Eliminar una nota
function eliminarNota(id) {
    const index = notas.findIndex(nota => nota.id === id)
    if (index !== -1) {
        notas.splice(index, 1)
        guardarNotas()
        renderNotes(notas)
    }
}

// Filtro las notas sugun su categoria
function filtrarPorCategoria(categoria) {
    if (categoria === 'todo') {
        renderNotes(notas)
    } else {
        const notasFiltradas = notas.filter(nota => nota.categoria === categoria) 
        renderNotes(notasFiltradas)
    }
}

aniadirBoton.addEventListener('click', aniadirNota)
notaInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        aniadirNota()
    }
})

mostrarBotones.addEventListener('click', () => filtrarPorCategoria('todo'))
mostrarBotonPesonal.addEventListener('click', () => filtrarPorCategoria('personal'))
mostrarBotonTrabajo.addEventListener('click', () => filtrarPorCategoria('trabajo'))
mostrarBotonEstudio.addEventListener('click', () => filtrarPorCategoria('estudio'))

document.addEventListener('DOMContentLoaded', function() {
    cargarNotas()
    renderNotes(notas)
})
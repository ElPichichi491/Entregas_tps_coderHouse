let notaInput = document.getElementById("nota-input")
let notaDescripcion = document.getElementById("nota-descripcion")
let seleccionCategoria = document.getElementById("select-categoria")
let aniadirBoton = document.getElementById("aniadir-button")
let contenedorDeNotas = document.getElementById("notas")
let totalSpan = document.getElementById("total")
let mostrarBotones = document.getElementById("mostrar-todo")
let mostrarBotonPesonal = document.getElementById("mostrar-personal")
let mostrarBotonTrabajo = document.getElementById("mostrar-trabajo")
let mostrarBotonEstudio = document.getElementById("mostrar-estudio")
let verEjemplosBtn = document.getElementById("ver-ejemplos-btn")
let verMisNotasBtn = document.getElementById("ver-mis-notas-btn")
let modoActualSpan = document.getElementById("modo-actual")

function renderNotes(arrayNotas) {
    contenedorDeNotas.innerHTML = ""
    arrayNotas.forEach(nota => {
        let contenedor = document.createElement("div")
        contenedor.innerHTML = `<p><strong>${nota.texto}</strong></p>
                                <small>Categoría: ${nota.categoria} | Fecha: ${nota.fecha}</small>
                                <p>Descripcion: ${nota.descripcion}</p>
                                <button class="btn-eliminar">Eliminar</button>
                                <div id="div-cambiar-descripcion-${nota.id}">
                                <input type="text" id="cambiar-descripcion-${nota.id}" placeholder="Nueva descripción">
                                <button class="btn-cambiar-descripcion">cambiarDescripcion</button>
                                </div> 
                                <div id="div-cambiar-categoria-${nota.id}">
                                    <select id="cambiar-categoria-${nota.id}">
                                        <option value="personal" ${nota.categoria === 'personal' ? 'selected' : ''}>Personal</option>
                                        <option value="trabajo" ${nota.categoria === 'trabajo' ? 'selected' : ''}>Trabajo</option>
                                        <option value="estudio" ${nota.categoria === 'estudio' ? 'selected' : ''}>Estudio</option>
                                    </select>
                                    <button class="btn-cambiar-categoria">Cambiar Categoría</button>
                                </div>
                                <hr>`
    
        const btnEliminar = contenedor.querySelector('.btn-eliminar')
        const btnCambiarDescripcion = contenedor.querySelector('.btn-cambiar-descripcion')
        const btnCambiarCategoria = contenedor.querySelector('.btn-cambiar-categoria')
        
        
        if (!modoEjemplo) {
            btnEliminar.onclick = () => eliminarNota(nota.id)
            btnCambiarDescripcion.onclick = () => cambiarDescripcion(nota.id)
            btnCambiarCategoria.onclick = () => cambiarCategoria(nota.id)
        } else {
            btnEliminar.disabled = true
            btnCambiarDescripcion.disabled = true
            btnCambiarCategoria.disabled = true
        }

        contenedorDeNotas.appendChild(contenedor)
    })
    totalSpan.innerText = arrayNotas.length
}

aniadirBoton.onclick = aniadirNota
mostrarBotones.onclick = () => filtrarPorCategoria('todo')
mostrarBotonPesonal.onclick = () => filtrarPorCategoria('personal')
mostrarBotonTrabajo.onclick = () => filtrarPorCategoria('trabajo')
mostrarBotonEstudio.onclick = () => filtrarPorCategoria('estudio')


verEjemplosBtn.onclick = activarModoEjemplo
verMisNotasBtn.onclick = activarModoNormal

cargarNotas()
renderNotes(notas)
modoActualSpan.textContent = '(Mis notas)'
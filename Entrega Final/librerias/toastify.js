function mostrarToastExito(mensaje) {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#28a745",
        stopOnFocus: true
    }).showToast();
}

function mostrarToastError(mensaje) {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#dc3545",
        stopOnFocus: true
    }).showToast();
}

function mostrarToastInfo(mensaje) {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#007bff",
        stopOnFocus: true
    }).showToast();
}
let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4; i++) {
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
};

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 height=150px>
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-exito');
    mensaje.textContent = 'Agregado al carrito';
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 1000); 
}


function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
        mostrarMensajeExito(); 
    }
}


function incrementarContador() {
    let contadorVisitas = localStorage.getItem('contadorVisitas');
    contadorVisitas = contadorVisitas ? parseInt(contadorVisitas) + 1 : 1;
    localStorage.setItem('contadorVisitas', contadorVisitas);
    document.getElementById('contador').innerText = contadorVisitas;
}

window.onload = function() {
    incrementarContador();
};

const comprarCarritoBtn = document.getElementById('comprar-carrito');

comprarCarritoBtn.addEventListener('click', comprarCarrito);

function comprarCarrito(e) {
    e.preventDefault();
    if (lista.children.length === 0) {
        alert('El carrito está vacío. Añade productos antes de comprar.');
        return;
    }

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    
    alert('¡Compra exitosa! Gracias por tu preferencia.');
}

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    moveToPrevSlide();
});

function updateSlidePosition() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
}

function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

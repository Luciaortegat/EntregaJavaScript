const productosTienda = document.getElementById("productosTienda");
const botonCarrito = document.getElementById("botonCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch ("data.json")
.then (response => response.json())
.then (data => {
    data.forEach((product) =>{
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img class="img" src="${product.imagen}">
            <h3 class="nombre">${product.nombre}</h3>
            <p class="precio">$${product.precio}</p>
        `    
        productosTienda.append(content)
    
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar";
        comprar.className = "comprar";
        content.append(comprar),
    
        comprar.addEventListener("click", () => {
            carrito.push({
                id: product.id,
                imagen: product.imagen,
                nombre: product.nombre,
                precio: product.precio,
            })
            saveLocal();
        })
    })
})

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
}

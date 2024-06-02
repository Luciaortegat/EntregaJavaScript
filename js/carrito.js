const botonVerCarrito = document.createElement("button");
botonVerCarrito.innerText = "Ver Carrito";
botonVerCarrito.className = "boton-carrito";
botonCarrito.append(botonVerCarrito);

const mostrarCarrito = () => {
    ventanaCarrito.innerHTML = "";
    ventanaCarrito.style.display = "flex";
    const tituloCarrito = document.createElement("div");  
    tituloCarrito.className = "titulo-carrito";
    tituloCarrito.innerHTML = `
        <h1 class="titulo-carrito-title">Carrito</h1>
    `
    ventanaCarrito.append(tituloCarrito);

    const botonRemover = document.createElement("button");
    botonRemover.innerText = "X"
    botonRemover.className = "titulo-carrito-button";

    botonRemover.addEventListener("click", () => {
        ventanaCarrito.style.display = "none";

    })

    tituloCarrito.append(botonRemover);

    carrito.forEach((product) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenido-carrito"
        contenidoCarrito.innerHTML = `
            <img src="${product.imagen}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
        `;
        ventanaCarrito.append(contenidoCarrito);

        let eliminar = document.createElement("button");
        eliminar.innerText = "X";
        eliminar.className ="eliminar-producto";
        contenidoCarrito.append(eliminar);

        eliminar.addEventListener ("click", eliminarProducto)
    });


    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const sumaTotalCompra = document.createElement("div")
    sumaTotalCompra.className = "total-compra";
    sumaTotalCompra.innerHTML = `Total a pagar: $${total}`;
    ventanaCarrito.append(sumaTotalCompra);

    const finalizarCompra = document.createElement("button")
        finalizarCompra.innerText = "Finalizar compra";
        finalizarCompra.className ="finalizar-compra";
        finalizarCompra.addEventListener("click", () => Swal.fire({
            title: "Estas seguro que deseas continuar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#212027",
            cancelButtonColor: "#212027",
            confirmButtonText: "Si, estoy seguro"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                text: "Muchas gracias por tu compra!",
                icon: "success"
              });
            }
          }))
        sumaTotalCompra.append(finalizarCompra);


};

botonCarrito.addEventListener("click", mostrarCarrito);

const eliminarProducto = () => {
    const findID = carrito.find((element) => element.id);
    carrito = carrito.filter((carritoID) =>{
        return carritoID !== findID;
    });
    saveLocal();    
    mostrarCarrito();
};
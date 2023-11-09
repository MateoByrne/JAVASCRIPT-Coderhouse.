// Tercera entrega curso 47050 de JAVASCRIPT.


class Producto {
    constructor(id, nombre, precio, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;

    }
}

class BaseDeDatos {
    constructor() {
        this.productos = [];
        this.cargar_registros();
    }

    async cargar_registros(){
        const Resul = await fetch("./json/productos.json");
        this.productos = await Resul.json();
        cargar_productos(this.productos);
    }

    traer_registros() {
        return this.productos;
    }

    registros_id(id) {
        return this.productos.find((producto) => producto.id === id);
    }

    registros_nombre(palabra) {
        return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(palabra.toLowerCase()));
    }
}


class Carrito {
    constructor() {

        const carrito_storage = JSON.parse(localStorage.getItem("carrito"));

        this.carrito = carrito_storage || []; // Almacenamiento de productos.
        this.total = 0; // Precio total.
        this.cantidad_productos = 0; // Cantidad total de productos.
        this.listar();
    }

    actualmente_en_carrito({ id }) {
        return this.carrito.find((producto) => producto.id === id);
    }

    agregar(producto) {
        const producto_en_carrito = this.actualmente_en_carrito(producto);

        if (!producto_en_carrito) {
            this.carrito.push({ ...producto, cantidad: 1 });
        } else {

            producto_en_carrito.cantidad++;
        }

        localStorage.setItem("carrito", JSON.stringify(this.carrito));
        // Muestro productos en HTML
        this.listar();
    }


    quitar(id) {

        const indice = this.carrito.findIndex((producto) => producto.id === id);

        if (this.carrito[indice].cantidad > 1) {
            this.carrito[indice].cantidad--; // Si hay 2 o mas productos dentro del carrito, se elimina uno al seleccionar la opción.
        }
        else {
            this.carrito.splice(indice, 1); // Se aplica a este camino en caso de que solo haya 1 producto en el carrito restante. Este último se elimina.
        }

        localStorage.setItem("carrito", JSON.stringify(this.carrito));

        this.listar();
    }

    listar() {
        this.total = 0;
        this.cantidad_productos = 0;
        div_carrito.innerHTML = "";

        for (const producto of this.carrito) {
            div_carrito.innerHTML +=
                `
            <div class="prodcarrito">
            <h2 class="texto_carrito">${producto.nombre}</h2>
            <p class="texto_carrito">$${producto.precio}</p>
            <p class="texto_carrito">Cantidad: ${producto.cantidad}</p>
            <a href="#" id="botonquitar" class="texto_carrito" data-id= "${producto.id}">Quitar del carrito</a>
            </div>
            
            `;

            // Actualizacion de los totales.
            this.total += producto.precio * producto.cantidad;
            this.cantidad_productos += producto.cantidad;
        }

        const boton_quitar = document.querySelectorAll("#botonquitar");

        for (const boton of boton_quitar) {
            boton.addEventListener("click", (evento) => {
                evento.preventDefault();
                const producto_id = parseInt(boton.dataset.id);
                this.quitar(producto_id);
            });
        }

        span_cant_productos.innerText = this.cantidad_productos;
        span_carrito_total.innerText = this.total;
    }
}


// Instanciando:
const base_dat = new BaseDeDatos();

// Elementos  
const div_productos = document.querySelector("#productos");
const div_carrito = document.querySelector("#carrito");
const span_cant_productos = document.querySelector("#cantidad_productos");
const span_carrito_total = document.querySelector("#carrito_total");
const input_buscar = document.querySelector("#input_buscar");
const boton_carrito = document.querySelector("section h1");

//Instanciando también:
const carrito = new Carrito();


cargar_productos(base_dat.traer_registros());


function cargar_productos(productos) {
    //Div vaciado.
    div_productos.innerHTML = "";

    for (const producto of productos) {
        div_productos.innerHTML +=
            `
        <div id="contenedor_boxes">
        <div class="producto">
          <h2 id="h2_nombre">${producto.nombre}</h2>
          <p class="precio">$${producto.precio}</p>
          <div class= "imagen">
          <img src="img/${producto.imagen}"/>
          </div>
          <a href="#" class="botonagregar" data-id="${producto.id}">Agregar al carrito</a>
        </div> 
        </div> ` ;
    }

    // Eliminar comportamiento predeterminado de los botones
    const BotonNuevo = document.querySelectorAll(".botonagregar")

    for (const boton of BotonNuevo) {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();

            const producto_id = parseInt(boton.dataset.id);

            const producto = base_dat.registros_id(producto_id);

            carrito.agregar(producto);

            Toastify({
                text: "Se añadió el producto al carrito. Revisar abajo de la página para comprar o quitar este mismo.",
                className: "info",
                gravity: "top",
                position: "center",

                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();

        });
    }
}

//Configuramos el buscador
input_buscar.addEventListener("input", (evento) => {
    evento.preventDefault();
    const palabra = input_buscar.value;
    const productos = base_dat.registros_nombre(palabra);
    cargar_productos(productos);
});
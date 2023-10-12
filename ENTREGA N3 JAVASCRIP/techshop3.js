// Tercera entrega curso 47050 de JAVASCRIPT.


class Producto {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

class BaseDeDatos {
    constructor() {
        this.productos = [];
        this.agregar_registros(1, "AirPods Pro 2", 200, "Electronico");
        this.agregar_registros(2, "Battery Pack", 100, "Electronico");
        this.agregar_registros(3, "MagSafe inalambrico", 100, "Electronico");
    }

    agregar_registros(id, nombre, precio, categoria) {
        const producto = new Producto(id, nombre, precio, categoria);
        this.productos.push(producto);
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

    actualmente_en_carrito({id}) {
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
        this.cantidad_productos = 0;
        this.total = 0;
        div_carrito.innerHTML = "";

        for (const producto of this.carrito) {
            div_carrito.innerHTML +=
                `
            <div class="prodcarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: $${producto.cantidad}</p>
            <a href="#" class="botonquitar" data-id= "${producto.id}">Quitar del carrito</a>
            </div> `;

            // Actualizacion de los totales.
            this.total += producto.precio * producto.cantidad;
            this.cantidad_productos += producto.cantidad;
        }

        const boton_quitar = document.querySelectorAll(".botonquitar");

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

//Instanciando también:
const carrito = new Carrito();


cargar_productos(base_dat.traer_registros());


function cargar_productos(productos) {
    //Div vaciado.
    div_productos.innerHTML = "";

    for (const producto of productos) {
        div_productos.innerHTML +=
            `
        <div class="producto">
          <h2>${producto.nombre}</h2>
          <p class="precio">$${producto.precio}</p>
          <a href="#" class="botonagregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>  ` ;
    }

    // Eliminar comportamiento predeterminado de los botones
    const BotonNuevo = document.querySelectorAll(".botonagregar")

    for (const boton of BotonNuevo) {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();

            const producto_id = parseInt(boton.dataset.id);

            const producto = base_dat.registros_id(producto_id);

            console.log(producto);
        });
    }
}
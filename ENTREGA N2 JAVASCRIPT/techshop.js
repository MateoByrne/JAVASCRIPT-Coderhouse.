// Segunda entrega curso 47050 de JAVASCRIPT.

const carrito = [];

const airpods = {
    nombre: "AirPods Pro 2",
    precio: 300,
    subtotal: 300,
    cantidad: 1,
};
const magsafe = {
    nombre: "Batería MagSafe",
    precio: 50,
    subtotal: 50,
    cantidad: 1,
};
const adaptador = {
    nombre: "Adaptador USB-C",
    precio: 30,
    subtotal: 30,
    cantidad: 1,
};


carrito.push(airpods);

carrito.push(magsafe);

carrito.push(adaptador);


function en_carrito(nombre_prompt) {

    return carrito.find((producto) => producto.nombre == nombre_prompt); // Va a buscar si son iguales en el array. En ese caso, lo retorna.

}

function buscar() {
    const palabra_a_buscar = prompt("Buscar productos.");

    const array_resultados = carrito.filter((el) => el.nombre.toLowerCase().includes(palabra_a_buscar.toLowerCase()));

    console.log(array_resultados);
}

function agregar() {

    const nombre_prompt = prompt("Introducir el nombre del producto/s");
    const precio_prompt = prompt("Introducir el precio del producto/s: ");


    const nuevo_producto = {
        nombre: nombre_prompt,
        precio: parseInt(precio_prompt),
        subtotal: parseInt(precio_prompt),
        cantidad: 1,
    };

    const producto_encontrado = en_carrito(nombre_prompt);

    if (producto_encontrado) {
        producto_encontrado.cantidad++;
        producto_encontrado.precio = parseInt(precio_prompt);
        producto_encontrado.subtotal = parseInt(precio_prompt) * producto_encontrado.cantidad;

    } else {
        carrito.push(nuevo_producto);
    }

    alert("El producto " + nombre_prompt + " se agregó al carrito.");
    lista();
}

function lista() {

    console.clear();
    console.log("Producto/s en el carrito actualmente:");


    carrito.forEach((producto) => {
        console.log("------------------------------");
        console.log("El nombre es:", producto.nombre);
        console.log("El precio es de:", producto.precio);
        console.log("El subtotal es de:", producto.subtotal);
        console.log("La cantidad es de:", producto.cantidad);
    });



    const array_reordenado = carrito.sort((el1, el2) => {
        if (el1.precio > el2.precio) {
            return 1;
        }
        if (el1.precio < el2.precio) {
            return -1;
        }
        return 0;
    });
    console.log("Array reordenado:", array_reordenado);



    const total_carrito = carrito.reduce((acumulador, el) => acumulador + el.subtotal, 0);

    console.log("El total del carrito es: $", total_carrito);

}

function quitar() {
    const nombre_prompt = prompt("Escribe que producto deseabas quitar.");

    const producto_encontrado = en_carrito(nombre_prompt);

    if (producto_encontrado) {
        const indice_producto = carrito.indexOf(producto_encontrado);
        carrito.splice(indice_producto, 1);
        alert("El producto " + producto_encontrado.nombre + " ha sido eliminado del carrito.");
        lista();
    } else {
        alert("El producto " + nombre_prompt + " no ha sido encontrado en el carrito.");
    }
}
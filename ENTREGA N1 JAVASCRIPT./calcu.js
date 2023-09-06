// Primer entrega curso 47050 de JAVASCRIPT.

function suma(valor1, valor2) {
    const resultado = valor1 + valor2;
    return resultado;
}

function resta(valor1, valor2) {
    const resultado = valor1 - valor2;
    return resultado;
}

function multiplicacion(valor1, valor2) {
    const resultado = valor1 * valor2;
    return resultado;
}

function division(valor1, valor2) {
    const resultado = valor1 / valor2;
    return resultado;
}

    function calculadora() {

        let operacion;

        operacion = prompt("¿Qué operación desea realizar?\n\n    1) +\n    2) -\n    3) *\n    4) /\n    5) salir\n ");

        if (operacion != "5" && operacion != "salir") {

        switch (operacion) {
            case "1":
                valor1 = parseInt(prompt("Ingrese el primer valor: "));
                valor2 = parseInt(prompt("Ingrese el segundo valor: "));
                alert("El resultado de la suma es: " + suma(valor1, valor2));
                break;
            case "2":
                valor1 = parseInt(prompt("Ingrese el primer valor: "));
                valor2 = parseInt(prompt("Ingrese el segundo valor: "));
                alert("El resultado de la resta es: " + resta(valor1, valor2));
                break;
            case "3":
                valor1 = parseInt(prompt("Ingrese el primer valor: "));
                valor2 = parseInt(prompt("Ingrese el segundo valor: "));
                alert("El resultado de la multiplicacion es: " + multiplicacion(valor1, valor2));
                break;
            case "4":
                valor1 = parseInt(prompt("Ingrese el primer valor: "));
                valor2 = parseInt(prompt("Ingrese el segundo valor: "));
                alert("El resultado de la division es: " + division(valor1, valor2));
                break;
            default:
                alert("La operación ingresada no es compatible.");
        }
    }

    else{
        alert("Usted ha abandonado la calculadora.")
    }

}

calculadora();


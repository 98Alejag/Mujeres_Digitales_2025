// Calculadora.js
// rl es la interfaz de readline para entrada y salida estándar
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para hacer preguntas y obtener respuestas del usuario
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

// Menú principal de la calculadora, el async y el await se usa para manejar las promesas
// y esperar las respuestas del usuario
const menu = async() => {
    console.log('\n===== MENÚ =====');
    console.log('1. Sumar (+)');   
    console.log('2. Restar (-)');
    console.log('3. Multiplicar (*)');
    console.log('4. Dividir (/)');
    console.log('5. Porcentaje (%)');
    console.log('6. Salir');

    const opcionIngresada = await preguntar("Selecciona una opcion: ");
    // Procesar la opción seleccionada
    //En cada caso solicitamos los números necesarios y mostramos el resultado 
    //Uso el parseFloat para convertir las entradas de texto a números y permita números decimales
    switch (opcionIngresada) {
        case "1":
            console.clear();
            console.log("===== Suma =====");
            let cantidad = await preguntar("¿Cúantos números quieres sumar? ");
            let suma = 0;
            for (let i = 1; i <= cantidad; i++) {
                let numero = await preguntar (`Ingrese el número ${i}:`);
                suma += parseFloat(numero);
            };
            console.log(`El resultado es: ${suma}`);
            break;
        case "2":
            console.clear();
            console.log("===== Resta =====");
            const num3 = await preguntar("Ingrese el primer número: ");
            const num4 = await preguntar("Ingrese el segundo número: ");
            console.log(`Resultado: ${num3} - ${num4} = ${(parseFloat(num3) - parseFloat(num4))}`);
            break;
        case "3":
            console.clear();
            console.log("===== Multiplicación =====");
            const num5 = await preguntar("Ingrese el primer número: ");
            const num6 = await preguntar("Ingrese el segundo número: ");
            console.log(`Resultado: ${num5} * ${num6} = ${(parseFloat(num5) * parseFloat(num6))}`);
            break;
        case "4":
            console.clear();
            console.log("===== División =====");
            const num7 = await preguntar("Ingrese el primer número: ");
            const num8 = await preguntar("Ingrese el segundo número: ");
            if (parseFloat(num8) === 0) {
                console.log('Error: División por cero no permitida.');
            }
            const resultado = (parseFloat(num7) / parseFloat(num8));
            console.log(`Resultado: ${num7} / ${num8} = ${resultado}`);
            break;
        case "5":
            console.clear();
            console.log("===== Porcentaje =====");
            const num9 = await preguntar("Ingrese el número total: ");
            const num10 = await preguntar("Ingrese el porcentaje a calcular: ");
            console.log(`Resultado:  (${num9} * ${num10}%) = ${parseFloat(num9) * parseFloat(num10) / 100}`);
            break;
        case "6":
            console.log("===== Gracias por usar la calculadora===== \nSaliendo...");
            rl.close();
            return;
        default:
            console.log("Opción inválida. Por favor, intente de nuevo.");
    }
    menu();
};

// Función para iniciar la calculadora
const iniciar = async () => {
    console.clear();
    console.log("===== BIENVENIDOS A LA CALCULADORA =====");
    await menu();
}
 
iniciar();
function tagName(tag) {
  return document.querySelector(tag);
} //Codigo reutilizable

function globalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
} //Codigo reutilizable

let arrayAmigos = []; //Array vacio
let numeroMinimoDeAmigos = 2;

function ingresarAmigo() {
  let agregarAmigo = tagName("input").value; // Codigo reciclado
  if (agregarAmigo !== "" && isNaN(agregarAmigo)) {
    //isNaN
    arrayAmigos.push(agregarAmigo); //agrega los elementos capturados del input en el array
    document.querySelector("input").value = ""; //limpia el input
    console.log(arrayAmigos); //Console
  } else {
    alert(
      "NO HAS INGRESADO UN NOMBRE VÁLIDO, POR FAVOR INGRESA UN NOMBRE VÁLIDO"
    ); //alerta
    document.querySelector("input").value = "";
  }
}

globalEventListener("click", ".button-add", function (e) {
  e.preventDefault();
  ingresarAmigo();
  listaAmigos();
}); // Se ejecuta el codigo desde el boton añadir

function listaAmigos() {
  // Se crea la lista de amigos
  let lista = tagName(".name-list");
  switch (!!lista) {
    case true:
      lista.textContent = "";
      arrayAmigos.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = element;
        lista.appendChild(li);
      });
      break;

    case false:
      console.log("No se puede crear la lista, revisa el codigo"); //Console

    default:
      break;
  }
}

function sorteo() {
  //la funcion sorteo hace un sorteo de la lista aleatorio para determinar quien es el amigo secreto.
  if (arrayAmigos.length === 0 || arrayAmigos.length <= numeroMinimoDeAmigos) {
    // Numero minimo de amigos
    alert("No hay nombres suficientes para sortear"); //alerta
  } else {
    const amigoAleatorio = Math.floor(Math.random() * arrayAmigos.length);
    let resultadoSorteo = arrayAmigos[amigoAleatorio];
    let liResultado = tagName(".result-list");
    liResultado.textContent = `El amigo secreto es: ${resultadoSorteo}`;
  }
}

globalEventListener("click", ".button-draw", function (e) {
  e.preventDefault();
  sorteo();
}); // Se ejecuta codigo

// Nota: no se asigno un numero maximo de amigos, ya que el numero de amigos lo determinaria el usuario.
// Se realizo una comparacion para determinar si hay mas de 2 amigos para sortear
// Se realizo una comparacion basica para determinar si son numeros o letras ingresadas en el input

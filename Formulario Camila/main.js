// Conectando con firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxkHcRG5chzovFJeWIG1Y_m7cHkk5uO7o",
  authDomain: "registro-web-e269e.firebaseapp.com",
  projectId: "registro-web-e269e",
  storageBucket: "registro-web-e269e.appspot.com",
  messagingSenderId: "450509690123",
  appId: "1:450509690123:web:1ea809f09273fef0c27e0e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();
// llamando elementos de html o del DOM
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnpublicar = document.getElementById('btnpublicar');
let btnFacebook = document.getElementById('btnFacebook');
let btnYoutube = document.getElementById('btnYoutube');

//Función Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
console.log("Inicio de sesión correcto");
            cargarJSON();
            contenidoDeLaWeb.classList.replace('ocultar','mostrar');
            formulario.classList.replace('mostrar','ocultar');
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})


// Función Iniciar Sesión
btnIngresar.addEventListener('click', () => { 
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    console.log("tu email es" + email + " y tu password es " + password);

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("Inició sesión correctamente");
    cargarJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
})


// Función Cerrar Sesión
btnCerrarSesion.addEventListener('click', ()=> {
    firebase.auth().signOut().then(() => {
        console.log("Cierre de sesión correcto");
        contenidoDeLaWeb.classList.replace('mostrar','ocultar');
        formulario.classList.replace('mostrar','ocultar'); 

      }).catch((error) => {
        console.log("Error con el cierre de Sesión");
      });
})


// Función estado del usuario: activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar','mostrar');
      formulario.classList.replace('mostrar','ocultar')
    } else {
      contenidoDeLaWeb.classList.replace('mostrar','ocultar');
      formulario.classList.replace('ocultar','mostrar');
    }
  });


// Función Login con 
btnGoogle.addEventListener('click',()=>{ 
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log("Inició sesión con google");
    cargarJSON();

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error de login con google");
  });

})
//funcion login facebook
btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      console.log("Error de Facebook")
    });
})

//funcion login Yahoo
btnYahoo.addEventListener('click', () => {
  var provider = new firebase.auth.YahooAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      console.log("Error de Yahoo")
    });
})


function cargarJSON () {
  fetch("data1.json")
  .then(function(res){
    return res.json();
  })
  .then((data) => {
    console.log(data);
    let html = '';
    data.forEach((productos) =>{
      html += `
        <div class="producto">
          <p>  ${productos.marca} </p>
          <img src="${productos.img}" width="50px" class="imgProducto">   <br>
          <strong> S/. ${productos.precio} </strong>
        </div>
      `;
    })
    document.getElementById('resultado').innerHTML= html; 
  })
}

//Funcion agregar datos
btnpublicar.addEventListener('click', () => {
  db.collection("comentario").add({
    titulo: txttitulo = document.getElementById('txttitulo').value,
    descripcion: txtdescripcion = document.getElementById('txtdescripcion').value,
  })
    .then((docRef) => {
      console.log("se guardo tu comentario correctamente: ", docRef.id);
      imprimirComentariosEnPantalla();
    })
    .catch((error) => {
      console.error("Error al enviar tu comentario: ", error);
    });
})
//funcion leer datos o imprimir comentarios en pantalla
function imprimirComentariosEnPantalla() {
  db.collection("comentario").get().then((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data().titulo}`);
      console.log(`${doc.data().descripcion}`);
      var listarDatos = `
      <div style = "border: outset";>
      <br>
      <li class = "listarDatos">
      <h5 class ="listarDatosH5"> ${doc.data().titulo} </h5>
      <p> ${doc.data().descripcion} </p>
      </li>
      <br>
      </div>
      `;
      html += listarDatos;
    }); document.getElementById('imprimirComentariosEnPantalla').innerHTML = html;
  });

}

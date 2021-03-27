//Variables
    //Formulario
const formulario = document.querySelector('#formularioLogIn');
    //Inputs
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const username = document.querySelector('#username');
    //btnSubmit
const btnSubmit = document.querySelector('#submit');


eventListenerObjects();
function eventListenerObjects(){
    document.addEventListener('DOMContentLoaded',appIniciando);
    password.addEventListener('blur',validandoCampos);
    email.addEventListener('blur',validandoCampos);
    username.addEventListener('blur',validandoCampos);
    formulario.addEventListener('submit',submitBoton);
}
function appIniciando(){    
    //btnSubmit
    btnSubmit.disabled = true;
    btnSubmit.style.background = 'rgb(226, 226, 226)';
    btnSubmit.style.cursor = 'not-allowed';
}
//Funciones
function validandoCampos(e){
    //passWord
    const erPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;   
    const validandoPassword = erPassword.test(password.value);
    if(e.target.type === 'password'){
        if(validandoPassword){
            if(e.target.parentElement.classList.contains('false')){
                e.target.parentElement.classList.remove('false');
                e.target.parentElement.classList.add('true');
            }else{
                e.target.parentElement.classList.add('true');
            }
            borrarError();
        }else{
            if(e.target.parentElement.classList.contains('true')){
                e.target.parentElement.classList.remove('true');
                e.target.parentElement.classList.add('false');
            }else{
                e.target.parentElement.classList.add('false');
            }
            mensajeError('Contraseña Invalida.<br> Debe contener (#,M,m)');
        }
    }
    //email
    const erEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const validandoEmail = erEmail.test(email.value);
    if(e.target.type === 'email'){
        if(validandoEmail){
            if(e.target.parentElement.classList.contains('false')){
                e.target.parentElement.classList.remove('false');
                e.target.parentElement.classList.add('true');
            }else{
                e.target.parentElement.classList.add('true');
            }
            borrarError();
        }else{
            if(e.target.parentElement.classList.contains('true')){
                e.target.parentElement.classList.remove('true');
                e.target.parentElement.classList.add('false');
            }else{
                e.target.parentElement.classList.add('false');
            }
            mensajeError('Escriba un email Valido');
        }
    }
    //Username
    
    const erUsuario = /^[A-Za-zÁÉÍÓÚáéíóú]{3,16}$/;
    const validandoUsuario = erUsuario.test(username.value);    
    if(e.target.name === 'username'){
        if(validandoUsuario){
            if(e.target.parentElement.classList.contains('false')){
                e.target.parentElement.classList.remove('false');
                e.target.parentElement.classList.add('true');
            }else{
                e.target.parentElement.classList.add('true');
            }
            borrarError();
        }else{
            if(e.target.parentElement.classList.contains('true')){
                e.target.parentElement.classList.remove('true');
                e.target.parentElement.classList.add('false')
            }else{
                e.target.parentElement.classList.add('false');
            }
            mensajeError('Nombre de Usuario No valido.');
        }
    }
    //Validando Todo nuestro Formulario para activar el boton Submit
    if(erPassword.test(password.value) && erEmail.test(email.value) && erUsuario.test(username.value)){
        btnSubmit.disabled = false;
        btnSubmit.style.background = 'rgb(0, 140, 255)';
        btnSubmit.style.cursor = 'pointer';
    }else{
        btnSubmit.disabled = true;
        btnSubmit.style.background = 'rgb(226, 226, 226)';
        btnSubmit.style.cursor = 'not-allowed';
    }

}

//Validando Submit
function submitBoton (e) {
    e.preventDefault();

    //Mostrar Animacion
    const animation = document.querySelector('#spinner');
    animation.style.display = 'flex';
    appIniciando();
    //Despues de Time escondemos el spinner y regresamos un texto
    setTimeout( () => {
        animation.style.display = 'none';
        mensajeError('Registro Exitoso','exitoso');
        setTimeout( () => {
            resetFormulario();
            borrarError();
            
        },3000 )
    }, 3000 )
}

//Mensaje de error
function mensajeError (mensaje,clase = 'error'){
    const mensajeError = document.createElement('p');
    mensajeError.classList.add(`mensaje-${clase}`,'error');
    mensajeError.innerHTML = mensaje;

    //Validando
    const errores = formulario.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }else if(errores.length === 1){
        errores.forEach( error => {
            error.innerHTML = mensaje;
        });
    }
};
//Borrando Error
function borrarError(){
    const errores = document.querySelectorAll('.error');
    errores.forEach( error => error.remove() );
};
//Reset Formulario
function resetFormulario (){
    //Reiniciar Formulario
    formulario.reset();
    //Quitando Clases
    password.parentElement.classList.remove('true');
    email.parentElement.classList.remove('true');
    username.parentElement.classList.remove('true');
}
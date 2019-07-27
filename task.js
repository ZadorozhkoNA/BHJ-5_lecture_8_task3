'use strict';

let signin = document.getElementById( 'signin' );
let form = signin.querySelector( '#signin__form' );
let userId = document.getElementById( 'user_id' );
let welcome = document.getElementById( 'welcome' );
let exit = document.getElementById( 'exit' );

if ( localStorage.id ) {
  welcome.classList.add( 'welcome_active' );
  userId.textContent = localStorage.id;
} else {
  signin.classList.add( 'signin_active' );
}


function sendForm( event ) {
  event.preventDefault();

  let arrayInput = event.currentTarget.querySelectorAll( '.control' );
  let classFlag = true;
  arrayInput.forEach( (item) => {
    if ( item.value ) {
      classFlag = false;
    }
  });

  if ( classFlag ) return;

  let formData = new FormData( event.currentTarget );
  if ( formData ) {
    let xhr = new XMLHttpRequest();
    xhr.open( 'POST',  'https://netology-slow-rest.herokuapp.com/auth.php' );
    xhr.send( formData );
    xhr.addEventListener( 'load', ()  => {
      let answer = JSON.parse( xhr.responseText );

      if ( answer.success ) {
        signin.classList.remove( 'signin_active' );
        welcome.classList.add( 'welcome_active' );
        userId.textContent = answer.user_id;
        localStorage.id = answer.user_id;
      } else {
        alert( 'Неверный логин/пароль' );
      }

      arrayInput.forEach( (item) => { item.value = ''; });
    });
  }
}

exit.addEventListener( 'click', () => {
  signin.classList.add( 'signin_active' );
  welcome.classList.remove( 'welcome_active' );
  localStorage.clear();
});
form.addEventListener( 'submit', sendForm);

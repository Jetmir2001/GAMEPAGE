  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'auth.html';
}














const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password')


if(name.length < 3){
  alert('Name should be longer than three')
}

import { checkAuthState } from './authCheckDisplay.js';

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.navBar');
  const menuIcon = document.querySelector('.menu');

  menuIcon.addEventListener('click', function () {
    nav.classList.toggle('navBar2');
  });
});

checkAuthState();

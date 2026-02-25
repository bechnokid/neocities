/* Imports */
import { loadWebrings } from "./components/webrings.js";
import { loadFreeze } from "./components/freeze.js";
import { STATUS_CONTAINER, loadMicroblog } from "./components/microblog.js";
import { loadGuestbook } from "./components/guestbook.js";
import { loadBishieQuiz } from "./components/bishie.js";

$(themeSwitchLabel).on('click', function () {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateButtonAndTheme(themeSwitchLabel, newTheme === 'dark', newTheme);
  currentTheme = newTheme;
});

$(document).ready(function() {
  if ($('.freezeframe').length > 0) loadFreeze();
  if ($(`#${STATUS_CONTAINER}`).length > 0) loadMicroblog();
  if ($('.webrings').length > 0) loadWebrings(webringLinks);
  if ($('#bishie-btn-submit').length > 0) loadBishieQuiz();
  if ($('button#copy-btn').length > 0) loadCopyTextBtn();
  if ($("#guestbooks___guestbook-form").length > 0) loadGuestbook();

  // Loading page
  if ($('.loading-sidebar').length > 0) {
    setTimeout(function () {
      $('.loading-sidebar').addClass('d-none');
      $('.toggle-gif').removeClass('d-none');
    }, 1000);
  };
});
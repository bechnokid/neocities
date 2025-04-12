const themeSwitchCheckbox = $('#theme-switcher');
const themeSwitchLabel = $('#switcher-label');
const prismJS = $("#prismJS");
const storedTheme = localStorage.getItem('theme');
const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = 'light';
if (systemThemeDark.matches) currentTheme = 'dark';
if (storedTheme !== null) currentTheme = storedTheme;

updateButtonAndTheme(themeSwitchLabel, currentTheme === 'dark', prismJS, currentTheme);

themeSwitchCheckbox.on('change', function(){
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateButtonAndTheme(themeSwitchLabel, newTheme === 'dark', prismJS, newTheme);
  currentTheme = newTheme;
});

function updateButtonAndTheme(labelEl, isDark, prismJS, theme){
  const ariaLabel = isDark ? 'light' : 'dark';
  labelEl.attr('aria-label', `Switch to ${ariaLabel} mode`);
  labelEl.html((isDark ? "☀️" : "🌙"));
  if (prismJS.length > 0) {
    let prismHrefArr = prismJS[0].href.split('/');
    prismHrefArr.pop();
    prismHrefArr.push( isDark ? 'prismJS_dark.css' : 'prismJS.css')
    prismJS.attr('href', prismHrefArr.join('/'));
  }
  $("html").attr('data-theme', theme);
};
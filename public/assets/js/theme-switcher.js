const themeSwitchCheckbox = $('#theme-switcher');
const themeSwitchLabel = $('#switcher-label');
const storedTheme = localStorage.getItem('theme');
const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = 'light';
if (systemThemeDark.matches) currentTheme = 'dark';
if (storedTheme !== null) currentTheme = storedTheme;

updateButtonAndTheme(themeSwitchLabel, currentTheme === 'dark', currentTheme);

themeSwitchCheckbox.on('change', function(){
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  updateButtonAndTheme(themeSwitchLabel, newTheme === 'dark', newTheme);
  currentTheme = newTheme;
});

function updateButtonAndTheme(labelEl, isDark, theme){
  const ariaLabel = isDark ? 'light' : 'dark';
  labelEl.attr('aria-label', `Switch to ${ariaLabel} mode`);
  labelEl.html((isDark ? "☀️" : "🌙"));
  $("html").attr('data-theme', theme);
};
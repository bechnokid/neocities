/* Global variables */
var webringLinks = {};

/* Custom JQuery class */
class jQuery extends Array {
  constructor(el) {
    super();
    if (el == document || el instanceof HTMLElement) {
      this.push(el);
    } else {
      let elements = document.querySelectorAll(el);
      for (let i = 0; i < elements.length; i++) {
        this.push(elements[i]);
      }
    }
  }

  ready(callback) {
    this[0].addEventListener('readystatechange', e => {
      if (this[0].readyState === "complete") {
        callback();
        return true;
      }
    });
  }

  each(callback) {
    if (callback && typeof (callback) == 'function') {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i);
      }
      return this;
    }
  }

  siblings() {
    return [...this[0].parentNode.children].filter(c => c != this[0])
  }

  children() {
    return [...this[0].children];
  }

  addClass(className) {
    this.each(el => el.classList.add(className));
    return this;
  }

  removeClass(className) {
    this.each(el => el.classList.remove(className));
    return this;
  }

  toggleClass(className) {
    this.each(el => el.classList.toggle(className));
    return this;
  }

  hasClass(className) {
    return this[0].classList.contains(className);
  }

  css(propertyObject) {
    this.each(function (el) {
      Object.assign(el.style, propertyObject);
    })
    return this;
  }

  attr(attr, value = null) {
    let getattr = this;
    if (value !== null) {
      this.each(el => el.setAttribute(attr, value));
    } else {
      getattr = this[0].getAttribute(attr);
    }
    return getattr;
  }

  html(data) {
    if (data !== undefined) {
      this.each(el => el.innerHTML = data)
    } else {
      return this[0].innerHTML;
    }
    return this;
  }

  append(el) {
    this[0].append(el);
    return this;
  }

  prepend(el) {
    this[0].prepend(el);
    return this;
  }

  hide() {
    this.each(el => el.style.display = "none");
    return this;
  }

  show() {
    this.each(el => el.style.display = "block");
    return this;
  }

  remove() {
    this.each(el => el.remove());
    return this;
  }

  val(data) {
    if (data !== undefined) {
      this.each(el => el.value = data)
    } else {
      let valuesArr = [];
      this.forEach((item) => valuesArr.push(item.value));
      return valuesArr.length > 1 ? valuesArr : valuesArr[0];
    }
    return this;
  }

  on(event, child, callback = null, state = null) {
    if (callback != null) {
      let selector = child;
      this.each(function (element) {
        element.addEventListener(event, function (event) {
          if (event.target.matches(`${selector}, ${selector} *`)) {
            callback.apply(event.target.closest(selector), arguments);
          }
        }, false)
      })
    } else {
      callback = child;
      this.each(function (element) {
        if (state) {
          element.addEventListener(event, callback, state);
        } else {
          element.addEventListener(event, callback, false);
        }
      })
    }

    return this;
  }
}

const $ = function (el) {
  return new jQuery(el);
}

$.ajax = function (args) {
  let url = args["url"];
  let type = "get";
  let success = function () { };
  let fail = function () { };
  if (args['success']) success = args['success'];
  if (args['fail']) fail = args['fail'];

  let xhttp = new XMLHttpRequest();
  xhttp.onerror = function (error) {
    return fail(error);
  }

  xhttp.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = "";
      try {
        response = JSON.parse(this.responseText)
      } catch (e) {
        response = this.responseText;
      }
      return success(response);
    } else {
      return fail(this.status);
    }
  };

  let parameters = "";
  if (args) {
    type = args["type"];
    if ('data' in args) {
      parameters = new URLSearchParams(args['data']).toString();
    }
  }
  if (type && type.toUpperCase() == 'POST') {
    xhttp.open("POST", url, true);
    xhttp.send(parameters);
  } else if (!type || type.toUpperCase() == 'GET') {
    dataStr = `${url}`
    if (parameters) dataStr += parameters;
    xhttp.open("GET", dataStr, true);
    xhttp.send();
  }
}

// Freezeframe
class FreezeImages {
  constructor(options = {}) {
    // Set default params
    this.selector = options.selector || "freeze"
    this.imgCls = "ff-img";
    this.canvasCls = "ff-canvas";
    this.hover = (options.hover === true || options.hover === "true") ? true : false;
    this.noCSS = (options.no_css === true || options.hover === "true") ? true : false;
    this.smoothing = (options.smoothing === false) ? false : true;

    // Finds all images with selector class and within elements with the selected class
    //  and creates list
    const imgList = document.querySelectorAll(`img.${this.selector}, .${this.selector} img`);
    this.imgList = imgList;

    // Creates <style> tag for new elements
    if (!this.noCSS) {
      const style = document.createElement('style');
      style.textContent = `
        .ff-container {
          display: flex;
          position: relative;
        }

        .ff-container img,
        .ff-container canvas {
          align-self: end;
        }

        .ff-container.ff-hover:hover .ff-active {
          position: absolute;
          opacity: 0;
        }

        .ff-container.ff-hover:hover .ff-inactive {
          position: static;
          opacity: 1;
        }

        .ff-inactive {
          position: absolute;
          opacity: 0;
        }
      `;
      document.head.appendChild(style);
    }

    // Loops through all images
    for (const img of this.imgList) {
      // Gives <img> the inactive class, which hides GIF by default
      img.className = `${this.imgCls} ff-inactive`;

      // Creates <canvas> of GIF and copies data of first frame of animation
      let canvas = document.createElement("canvas");
      let imgWidth = img.width;
      let imgHeight = img.height;

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      canvas.className = `${this.canvasCls} ff-active`;
      canvas.getContext('2d').imageSmoothingEnabled = this.smoothing;
      canvas.getContext('2d').drawImage(img, 0, 0, imgWidth, imgHeight);

      // Creates container that will hold both <img> and <canvas>
      let wrapper = document.createElement("div");
      wrapper.className = "ff-container";
      if (this.hover) wrapper.classList.add("ff-hover");

      // Inserts container with <img> and <canvas> where <img> originally was
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      wrapper.appendChild(canvas);
    }
  }

  start() { // Starts animation
    for (const img of this.imgList) {
      img.className = `${this.imgCls} ff-active`;
      img.nextSibling.className = `${this.canvasCls} ff-inactive`;
    }
  }

  stop() { // Stops animation
    for (const img of this.imgList) {
      img.className = `${this.imgCls} ff-inactive`;
      img.nextSibling.className = `${this.canvasCls} ff-active`;
    }
  }

  toggle() { // Toggles animation based on current state
    for (const img of this.imgList) {
      let imgNewCls = (img.className.includes('ff-inactive')) ? "ff-active" : "ff-inactive";
      let canvasNewCls = (img.className.includes('ff-inactive')) ? "ff-inactive" : "ff-active";

      img.className = `${this.imgCls} ${imgNewCls}`;
      img.nextSibling.className = `${this.canvasCls} ${canvasNewCls}`;
    }
  }
}

function loadFreeze() {
  const f = new FreezeImages({ selector: "freezeframe" });

    // When .play-gif is clicked, images will play
    $('.play-gif').on('click', () => f.start());

    // When .stop-gif is clicked, images will pause
    $('.stop-gif').on('click', () => f.stop());

    // When .toggle-gif is clicked, images will play or start depending on its current state
    $('.toggle-gif').on('click', () => f.toggle());
}

// Helper functions
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Theme Toggle
function updateButtonAndTheme(labelEl, isDark, theme) {
  const themeVar = theme;
  $("html").attr('data-theme', themeVar);
  const element = $(labelEl);
  const ariaLabel = isDark ? 'light' : 'dark';
  element.attr('aria-label', `Switch to ${ariaLabel} mode`);

  const iconCls = isDark ? 'ft-sun' : 'ft-moon';
  $(labelEl + ' i').forEach(el => el.classList = [iconCls]);
};

const themeSwitchLabel = '.toggle-mode';
const storedTheme = localStorage.getItem('theme');
const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = 'light';
if (systemThemeDark.matches) currentTheme = 'dark';
if (storedTheme !== null) currentTheme = storedTheme;

function loadThemeToggle() {
  updateButtonAndTheme(themeSwitchLabel, currentTheme === 'dark', currentTheme);

  $(themeSwitchLabel).on('click', function () {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateButtonAndTheme(themeSwitchLabel, newTheme === 'dark', newTheme);
    currentTheme = newTheme;
  });
}

// Microblog
const FEED_URL = 'https://status.cafe/users/bechnokid.atom';
const STATUS_CONTAINER = "status-cafe-widget";
const EMOJI_HASH = {
  'normal': ['🙂'],
  'happy': ['😀','😛', '🥳'],
  'calm': ['😌'],
  'excited': ['😄'],
  'love': ['🥰', '❤️', '😍'],
  'sad': ['😢','😔', '😩'],
  'sobbing': ['😭'],
  'worried': ['😟', '😰', '🥺'],
  'embarrassed': [ '😂', '😅' ],
  'confused': ['❓'],
  'surprised': ['😮','😦','😧','😱'],
  'annoyed': ['😒','🫤'],
  'angry': ['😠'],
  'furious': ['😡','🤬'],
  'thinking': ['🤔'],
  'skeptical': ['🤨','🙄'],
  'dead': ['💀'],
  'hehe': ['😏'],
  'lol': ['😆','🤣','😂'],
  'sigh': ['😑']
};

const findEmoticon = (obj, fn) =>
  Object.keys(obj).find(key => fn(obj[key], key, obj));

function generateStatusHtml(el, isHome = false){
  let title, content, dateString, emoticon = ``;

  content = el.querySelector("content").textContent.trim();
  title = el.querySelector("title").innerHTML.slice(0, 12).trim();
  emoticon = findEmoticon(EMOJI_HASH, x => x.includes(title.split(' ')[1]));
  let emoticonElement = `<img class='emoticon' src='/assets/images/blog/emoticon/${emoticon}.svg' aria-hidden='true'>`

  let dateArr = new Date(el.querySelector('published').innerHTML).toDateString().split(' ');
  let month = dateArr[1];
  let day = dateArr[2].replace(/\b0/g, '');
  let year = dateArr[3];
  let dayDigit = (day.length > 1) ? day[1] : day;
  if ((day > '10' && day < '21') || dayDigit > '3') {
    day = `${day}th`
  } else if (dayDigit == '2') {
    day = `${day}nd`
  } else if (dayDigit == '3') {
    day = `${day}rd`
  } else {
    day = `${day}st`
  }
  dateString = `${month} ${day}, ${year}`;

  if (isHome) {
    html = `
    <div class="flex-shrink-0 d-flex align-items-center">${emoticonElement}</div>
    <div class="d-flex flex-column justify-content-center flex-gap-1">
      <p class='status-date'><strong>${ dateString }</strong></p>
      <p class='status-text'>${content}</p>
    </div>
    `;
  } else {
    html = `
    <div class='d-flex row g-3'>
      <div class='col-md-1 col-3 d-flex justify-content-center'>${emoticonElement}</div>
      <div class='col-md-11 col-9 d-flex flex-column flex-gap-1 py-2'>
        <p class='status-date'><strong>${dateString}</strong></p>
        <p class='status-text'>${content}</p>
      </div>
    </div>
    `;
  }
  return html;
};

function loadMicroblog() {
  $.ajax({
    method: 'GET',
    url: FEED_URL,
    success: function(response) {
      const data = new window.DOMParser().parseFromString(response, "text/xml")
      const entries = data.querySelectorAll('entry');
      let html = ``;
      let statusLimit = 5 // Default: 0
      if (entries.length < 1){
        html = `<p>No statuses yet.</p>`;
      } else if (window.location.pathname.includes('/home')){
        html = generateStatusHtml(entries[0], true);
      } else {
        if (statusLimit < 1) statusLimit = entries.length;
        for (i = 0; i < statusLimit; i++) {
          html += generateStatusHtml(entries[i]);
          if (i < statusLimit - 1) html += `<hr class='small'>`;
        }
      }
      $(`#${STATUS_CONTAINER}`).html(html);
    }
  });
}

/* Webrings */
const RESOURCERINGLIST = [
  'https://pixelsafari.neocities.org/',
  'https://www.thefrugalgamer.net/resources.php',
  'https://y2kstardust.neocities.org/resources',
  'https://foreverliketh.is/',
  'https://favicons.neocities.org/',
  'https://bechnokid.neocities.org/',
  'https://jasm1nii.xyz/',
  'https://pixelglade.net/misc/links.html',
  'https://shinyexe.neocities.org/',
  'https://trinityexe.neocities.org/homepage',
  'https://thecozy.cat/',
  'https://vesselvindicate.neocities.org/',
  'https://salvaged.nu/',
  'https://brisray.com/utils/webrings.htm',
  'https://crisis.city',
  'https://oerrorpage.neocities.org',
  'https://bettysgraphics.neocities.org/',
  'https://baccyflap.com/rsp/',
  'https://xxhalfemptyxx.neocities.org/',
  'https://emocowboy.neocities.org/',
  'https://caitsith.neocities.org/',
  'https://petrapixel.neocities.org/',
  'https://graphixbox.neocities.org/',
  'https://re-nata.neocities.org/themes',
  'https://chanteryuutai.neocities.org/ItsFreeRealState',
  'https://beaus-silly-folder.nekoweb.org/pages/hello-world.html',
  'https://dyingsignals.love',
  'https://rentryresource.neocities.org/links'
]

function setWebringLink(ringId, type, site) {
  const linkElement = type == "rand" ? 'a.link-rand' : `a:has(.${type})`;
  const element = $(`.${ringId} ${linkElement}`);
  if (element.length > 0) {
    element.attr('href', site);
  }
}

function updateWebringLinks(params) {
  const sites = params.sites;
  const idx = sites.findIndex((site) => site.includes('bechnokid'));
  if (!params.override && idx < 0) {
    $(`.${params.id}`).html(`<div class="pending"><p>Waiting to join the <a href="${params.url}">${params.name}</a> webring.</p></div>`);
    return;
  };

  const prev = (idx > 0) ? sites[idx - 1] : sites[sites.length - 1];
  const next = (idx > 0) ? sites[(idx + 1) % sites.length] : sites[0];
  const rand = sites[getRandomIndex(sites)];

  setWebringLink(params.id, "prev", prev);
  setWebringLink(params.id, "rand", rand);
  setWebringLink(params.id, "next", next);
}

function loadWebrings() {
  for (let ringId in webringLinks) {
    let webringParams = webringLinks[ringId];
    webringParams["id"] = ringId;
    updateWebringLinks(webringParams);
  }
}

// Catch a Bishie
function loadBishieQuiz() {
  const imgPath = "/assets/images/goodies/pocket_bishies/";
  $('#bishie-btn-submit').on('click', function() {
    const values = $('input[type=radio]:checked').val();
    const isCorrect = values.sort().join('') == answer.sort().join('');
    if (isCorrect) {
      $('#bishie-results').html('');
      let imgContent = '';
      if (images.length > 0) {
        imgContent = "<div class='quiz-img-container my-3'>"
        images.forEach(function(image) {
          imgContent += `<img src="${imgPath}/${image.img}" alt="I caught ${image.imgAlt}">`;
        })
        imgContent += "</div>"
      } else {
        imgContent = `<img class="my-2" src="${imgPath}/${imgInfo[0]}" alt="${imgInfo[1]}">`
      }
      let content = `<div id='bishie-results'><h1>Congratulations!</h1><p>You got all the questions correct!</p><p>${images.length > 0 ? "Pick any badge from below" : "This badge is yours"}!</p>${imgContent}<p class='text-xs'>(Please save ${images.length > 0 ? "these images" : "this image"} on your own server!)</p></div>`;
      $('#bishie-content').html(content);
    } else {
      $('#bishie-results').html(`<p>You failed to snag the bi${imgInfo[2]}! Try again!</p>`);
    }
  })
}

// Copy to clipboard
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    $('button#copy-btn').html("Code copied!");
    setTimeout(function () {
      $('button#copy-btn').html('Copy code');
    }, 5000);
  } catch(e) {
    alert('Failed to copy: ', e);
  }
}

function loadCopyTextBtn() {
  $('button#copy-btn').on('click', () => {
    const text = $('.copy-text').val();
    copyText(text);
  })
}

// Guestbook
const GUESTBOOK_MSG_LIMIT = 4;

function loadMessages() {
  $.ajax({
    method: 'GET',
    url: 'https://guestbooks.meadow.cafe/api/v1/get-guestbook-messages/484',
    success: function(response) {
      let messagesArr = [];
      for (let idx = 0; idx < response.length; idx++) {
        const hidden = idx > GUESTBOOK_MSG_LIMIT;
        const hideLine = idx > GUESTBOOK_MSG_LIMIT - 1;
        const msgContent = loadMsgContent(response[idx], hidden, hideLine);
        messagesArr.push(msgContent);
      }

      const content = (messagesArr.length > 0) ? messagesArr.join('') : `<p>There are no messages, yet.</p>`
      $(".guestbook-msg-container").html(content);

      if (messagesArr.length > 0) {
        loadPageNumbers(messagesArr);
        setCurrentPage(1);

        $('#prev-btn').on('click', function() {
          if ((currentPage - 1) > 0) setCurrentPage(currentPage - 1);
        });

        $('#next-btn').on('click', function() {
          if ((currentPage + 1) <= 5 ) setCurrentPage(currentPage + 1);
        })

        $('.pagination-num').on('click', function() {
          if (!$(this).hasClass('active')) {
            setCurrentPage(Number(this.getAttribute('data-page-index')));
          }
        });
      }
    },
    fail: function(){
      $(".guestbook-msg-container").html(`<p>Unable to obtain guestbook messages.</p>`);
    }
  });
};

function loadMsgContent(message, hidden) {
  const dateObj = new Date(message.CreatedAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const website = (message.Website) ? `<p><strong>Website: </strong><a href='${message.Website}'>${message.Website}</a></p>` : '';
  const msg = message.Text.replaceAll(/(\r\n)/g, "<br>");
  return `<div class='guestbook-msg-div sidebar p-3 pb-2 ${hidden ? "d-none" : ''}'><div class="guestbook-msg-header"><p><strong>Name: </strong>${message.Name}</p><p><strong>Sent: </strong>${formattedDate}</p>${website}</div><div class="guestbook-msg-body"><p>${msg}</p></div></div>`;
};

function loadPageNumbers(msgList) {
  const numOfPages = Math.ceil(msgList.length / GUESTBOOK_MSG_LIMIT);
  pageCount = numOfPages;

  let pageNumList = [];
  for (let i = 1; i <= numOfPages; i++) {
    const btn = `<button class='pagination-num' data-page-index='${i}' aria-label='Page ${i}'>${i}</button>`;
    pageNumList.push(btn);
  }
  $('#pagination-numbers').html(pageNumList.join(''));
  $('#guestbook-pagination').removeClass('d-none');
};

function setCurrentPage(pageNum) {
  currentPage = pageNum;
  const prevRange = (pageNum - 1) * GUESTBOOK_MSG_LIMIT;
  const currRange = pageNum * GUESTBOOK_MSG_LIMIT;
  const msgList = $('.guestbook-msg-div');

  setCurrentPageNum();

  msgList.each(function(value, i) {
    if (i >= prevRange && i < currRange) {
      $(value).removeClass('d-none')
    } else {
      $(value).addClass('d-none')
    }
  });
}

function setCurrentPageNum() {
  $('.pagination-num.active').removeClass('active');
  $('.pagination-num').each(function(val) {
    const pageIndex = Number($(val).attr('data-page-index'));
    if (pageIndex == currentPage) {
      $(val).addClass('active');
    }
  })
}

function loadGuestbook() {
  let form = $("#guestbooks___guestbook-form");
  let errorMsg = "<p class='mt-0'><strong>Please resolve the following errors:</strong></p>"

  // Validation
  const errorMsgBox = $('.guestbook-error-msg');
  const nameField = $('input#name');
  const textField = $('textarea#text');
  const questionField = $('input#question');
  const websiteField = $('input#website');
  const websiteRegex = /(^$|(http(s)?:\/\/)([\w-]+\.)+[\w-]+([\w- ;,.\/?%&=]*))$/i;

  form.on('submit', async function(e){
    e.preventDefault();

    let errorList = [];
    if (nameField.val().length == 0) errorList.push('<li>Name is missing.</li>');
    if (websiteField.val().length > 0 && !websiteRegex.test(websiteField.val())) errorList.push('<li>Invalid URL.</li>');
    if (textField.val().length == 0) errorList.push('<li>Message is empty.</li>');
    if (questionField.val() != '8') {
      let questionErr = (questionField.val().length == 0) ? "Answer is blank." : "Incorrect answer.";
      errorList.push(`<li>${questionErr}</li>`);
    }

    if (errorList.length > 0) {
      let errorListStr = '<ul>';
      for (let i = 0; i < errorList.length; i++) {
        errorListStr += errorList[i];
        if (i == errorList.length - 1) {
          errorListStr += '</ul>';
        }
      }
      errorMsgBox.html(errorMsg + errorListStr);
      errorMsgBox.removeClass('d-none');
    } else {
      let formData = new FormData(this);
      const response = await fetch('https://guestbooks.meadow.cafe/guestbook/484/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        this.reset();
        loadGuestbookMsgs();
        errorMsgBox.addClass('d-none');
        errorMsgBox.html('');
      } else {
        errorMsg = (response.status === 401) ? 'The answer is incorrect. Please try again.' : await response.text();
        errorMsgBox.html(`<p>${errorMsg}</p>`);
        errorMsgBox.removeClass('d-none');
      }
    }
  })

  loadMessages();
}

// Document on ready
$(document).ready(function() {
  loadThemeToggle();
  if ($('.freezeframe').length > 0) loadFreeze();
  if ($(`#${STATUS_CONTAINER}`).length > 0) loadMicroblog();
  if ($('.webrings').length > 0) loadWebrings();
  if ($('#bishie-btn-submit').length > 0) loadBishieQuiz();
  if ($('button#copy-btn').length > 0) loadCopyTextBtn();
  if ($("#guestbooks___guestbook-form").length > 0) loadGuestbook();

  // Loading page
  if ($('.loading-sidebar').length > 0) {
    setTimeout(function () {
      $('.loading-sidebar').addClass('d-none');
    }, 1000);
  };
});
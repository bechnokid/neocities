export const STATUS_CONTAINER = "status-cafe-widget";

const FEED_URL = 'https://status.cafe/users/bechnokid.atom';
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
  'laugh': ['😆','🤣','😂'],
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
  let html = '';

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
    <div class='sidebar rounded d-flex flex-gap-3 p-3'>
      <div class='status-mood d-flex justify-content-center'>${emoticonElement}</div>
      <div class='status-content d-flex flex-column flex-gap-1'>
        <p class='status-date h3'>${dateString}</p>
        <p class='status-text'>${content}</p>
      </div>
    </div>
    `;
  }
  return html;
};

export function loadMicroblog() {
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
        for (let i = 0; i < statusLimit; i++) {
          html += generateStatusHtml(entries[i]);
        }
      }
      $(`#${STATUS_CONTAINER}`).html(html);
    }
  });
}
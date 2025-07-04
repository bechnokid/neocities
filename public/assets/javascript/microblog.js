const feedURL = 'https://status.cafe/users/bechnokid.atom'
const findEmoticon = (obj, fn) =>
  Object.keys(obj).find(key => fn(obj[key], key, obj));
const emojiHash = {
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
}

$(document).ready(function(){
  function generateStatusHtml(el, isHome = false){
    let title, content, dateString, emoticon = ``;

    content = el.querySelector("content").textContent.trim();
    title = el.querySelector("title").innerHTML.slice(0, 12).trim();
    emoticon = findEmoticon(emojiHash, x => x.includes(title.split(' ')[1]));
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
      <div class="flex-shrink-0 p-3 m-auto">${emoticonElement}</div>
      <div class="pt-1 pe-3 pb-2">
        <p class='my-1 status-date'><strong>${ dateString }</strong></p>
        <p class='m-0 status-text'>${content}</p>
      </div>
      `;
    } else {
      html = `
      <div class='d-flex row'>
        <div class='col-lg-1 col-4 m-auto'>${emoticonElement}</div>
        <div class='col-lg-11 col-8 p-2 ps-0'>
          <p class='my-1 status-date'><strong>${dateString}</strong></p>
          <p class='m-0 status-text'>${content}</p>
        </div>
      </div>
      `;
    }
    return html;
  };

  $.ajax({
    method: 'GET',
    url: 'https://status.cafe/users/bechnokid.atom',
    success: function(response) {
      const data = new window.DOMParser().parseFromString(response, "text/xml")
      const entries = data.querySelectorAll('entry');
      let html = ``;
      let statusContainerId = 'status-cafe';
      let statusLimit = 5 // Default: 0
      if (entries.length < 1){
        html = `<p>No statuses yet.</p>`;
      } else if (window.location.pathname.includes('/home')){
        html = generateStatusHtml(entries[0], true);
      } else {
        if (statusLimit < 1) statusLimit = entries.length;
        for (i = 0; i < statusLimit; i++) {
          html += generateStatusHtml(entries[i]);
          if (i < statusLimit - 1) html += `<hr class='small my-2'>`;
        }
      }
      $(`#${statusContainerId}`).html(html);
    }
  })
});
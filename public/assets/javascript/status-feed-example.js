const feedURL = 'https://status.cafe/users/m15o.atom'
fetch(feedURL)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => {
    const entries = data.querySelectorAll("entry");
    let html = (entries.length < 1) ? `<p>No statuses yet.</p>`: ''; 
    let title, content, dateString = ``;
    if (entries.length > 1){
      entries.forEach((el) => {
        title = el.querySelector("title").innerHTML.slice(0, 7).trim();
        content = el.querySelector("content").textContent.trim();
        dateString = el.querySelector("published").innerHTML.slice(0, 10);
        html += `<p>${title} - ${dateString}<p><p>${content}</p>`;
      });
      let html2 = ``;
      let statusLimit = 3;
      if (entries.length < statusLimit) statusLimit = entries.length;
      for (i = 0; i < statusLimit; i++) {
        title = entries[i].querySelector("title").innerHTML.slice(0, 7).trim();
        content = entries[i].querySelector("content").textContent.trim();
        dateString = entries[i].querySelector("published").innerHTML.slice(0, 10);
        html2 += `<p>${title} - ${dateString}<p><p>${content}</p>`;
      }
      html2 += `<p><a href='https://status.cafe/users/bechnokid'>See more at StatusCafe</a></p>`;
      document.getElementById("feed-reader2").innerHTML = html2;
    }
    document.getElementById("feed-reader").innerHTML = html;
  });


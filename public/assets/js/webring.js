function setWidget(params) {
  const id = params.id;
  const jsonUrl = params.jsonUrl;
  const imgUrl = params.imgUrl;
  var ringSites = (id == 'resource-ring') ? resourceRingMembers : params.sites;

  if (jsonUrl) {
    const urlVar = params.urlVar || "url";
    const filter = params.filter;
    let options = {};
    $.ajax({
      url: jsonUrl,
      success: function(data) {
        if (filter) {
          ringSites = data.filter((item) => !item[urlVar].includes('tumblr') || !item[urlVar].includes('twitter') || !item[urlVar].includes('carrd'));
        }
        ringSites = data.map((item) => item[urlVar]);
        if (imgUrl) options.imgUrl = imgUrl;
        updateElements(id, ringSites, options);
      }
    })
  } else {
    let options = {};
    if (imgUrl) options.imgUrl = imgUrl;
    if (id == 'ckwr') {
      const siteData = ringSites.filter((site) => site[0].includes('bechnokid'))[0]
      ringSites = ringSites.map((site) => site[0]);
      options.cookie = siteData[2];
      options.cookie_desc = siteData[3];
    }
    updateElements(id, ringSites, options);
  }
}

function updateElements(id, ringSites, options = {}) {
  const index = ringSites.findIndex((site) => site.includes('bechnokid'))
  const prevSite = (index > 0) ? ringSites[index - 1] : ringSites[ringSites.length - 1];
  const nextSite = (index > 0) ? ringSites[index + 1] : ringSites[0];

  const prevElement = $(`#${id} a.wr-prev`).length > 0 ?  $(`#${id} a.wr-prev`) : $(`.${id} a.wr-prev`);
  if (prevElement.length > 0) {
    prevElement.attr('href', prevSite);
  } else if (id == 'pokering') {
    $(`.pokering area.wr-prev`).attr('href', prevSite);
  }

  const nextElement = $(`#${id} a.wr-next`).length > 0 ? $(`#${id} a.wr-next`) : $(`.${id} a.wr-next`);
  if (nextElement.length > 0) {
    nextElement.attr('href', nextSite);
  } else if (id == 'pokering') {
    $(`.pokering area.wr-next`).attr('href', nextSite);
  }

  const randElement = $(`#${id} a.wr-rand`).length > 0 ?  $(`#${id} a.wr-rand`) : $(`.${id} a.wr-rand`);
  const randomSite = ringSites[getRandomIndex(ringSites)];
  if (randElement.length > 0) {
    randElement.attr('href', randomSite);
  } else if (id == 'pokering') {
    $(`.pokering area.wr-rand`).attr('href', randomSite);
  }

  const imgElement = $(`#${id} img.wr-img`).length > 0 ?  $(`#${id} img.wr-img`) : $(`.${id} img.wr-img`);
  if (imgElement.length > 0 && options.imgUrl) {
    let imgName = 'bechnokid';
    if (id == 'ckwr') {
      imgName = options.cookie;
      $(`#${id} .ckwr-tooltip-content`).html(`<p>This is Bechno Kid's favorite cookie! When asked why they liked this cookie, they said: "I love his design and story so much! He makes me sob but in a good way!"</p>`);
    }
    imgElement.attr('src', options.imgUrl.replace('CHANGEME', imgName));
  }
}

const resourceRingMembers = [
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

const pendingWebrings = []

$(document).ready(function() {
    if (pendingWebrings.length > 0) {
      for (let w of pendingWebrings) {
        let ring = $(`#${w.id}`);
        let ringId = w.id;
        let ringName = w.name;
        let ringUrl = w.url;

        if (ringId == 'resourceRing') {
          let oldText = (ringId == 'resourceRing') ? '<br>' : 'the The';
          let newText = (ringId == 'resourceRing') ? ' ' : 'the';
          ring.html(ring.html().replace(oldText, newText));
        }

        if (ring.html().includes('waiting') || ring.html().includes('yet') || ring.html().includes("isn't")) {
          ring.html(ring.html().replace(ringName, `<a href='${ringUrl}'>${ringName}</a>`));
          ring.toggleClass('waiting');
        }
      }
    };
  });
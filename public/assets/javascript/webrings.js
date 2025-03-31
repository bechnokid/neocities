const CURRENT_LOCATION = 'https://bechnokid.neocities.org/outgoing/webrings/';
const WEBRINGS = {
  resourceRing: {
    name: 'Re:source',
    ringId: 'resourceRing',
    links: {
      main: {
        url: 'https://pixelsafari.neocities.org/webring/',
        img: 'https://pixelsafari.neocities.org/webring/resourcering.png',
        alt: 'Badge: resourceRing webring'
      },
      prev: {
        img: 'https://pixelsafari.neocities.org/webring/resourceringprev.png',
        alt: 'Previous'
      },
      next: {
        img: 'https://pixelsafari.neocities.org/webring/resourceringnext.png',
        alt: 'Next'
      },
      random: {
        img: 'https://pixelsafari.neocities.org/webring/resourceringrandom.png',
        alt: 'Random'
      },
    },
    members: [
      'https://pixelsafari.neocities.org/',
      'https://www.thefrugalgamer.net/resources.php',
      'https://choiyoona.neocities.org/resources',
      'https://foreverliketh.is/',
      'https://favicons.neocities.org/',
      'https://bechnokid.neocities.org/home',
      'https://jasm1nii.xyz/',
      'https://pixelglade.net/misc/links.html',
      'https://shinyexe.neocities.org/',
      'https://trinityexe.neocities.org/homepage',
      'https://thecozy.cat/',
      'https://vesselvindicate.neocities.org/',
      'https://dhampirave.neocities.org/',
      'https://salvaged.nu/',
      'https://brisray.com/utils/webrings.htm'
    ],
    widget: {
      default: `
        <div id='resourceRing'>
          <a href='MAIN_INDEX'><img src='MAIN_INDEX_IMG' alt='MAIN_INDEX_IMG_ALT'></a><br>
          <a href='PREV_INDEX'><img src='PREV_INDEX_IMG' alt='PREV_INDEX_IMG_ALT'></a>
          <a href='RANDOM_INDEX'><img src='RANDOM_INDEX_IMG' alt='RANDOM_INDEX_IMG_ALT'></a>
          <a href='NEXT_INDEX'><img src='NEXT_INDEX_IMG' alt='NEXT_INDEX_IMG_ALT'></a>
        </div>
      `,
      error: `
        <p>This website is waiting to join the WEBRING_NAME Ring!<br />If it's already a member, please contact the webring administrator.</p>
      `
    }
  }
}

function renderWebring(params, outdated = false) {
  let webring = WEBRINGS[params] || DEBUG_WEBRINGS[params];
  let members = (typeof sites === 'undefined') ? webring.members : sites;
  let siteIndex = members.findIndex(function(siteUrl){
    let urlToFind = outdated ? siteUrl.replace('/home', '') : siteUrl;
    return CURRENT_LOCATION.includes(urlToFind);
  });
  let finalHtml = `Oops, something went wrong.`;

  if (siteIndex < 0) {
    finalHtml = updateWidgetText(webring);
  } else {
    let prevIndex = siteIndex == 0 ? members.length - 1 : siteIndex - 1;
    let nextIndex = siteIndex == members.length - 1 ? 0 : siteIndex + 1;
    let data = {
      main: webring.links.main.url,
      prev: members[prevIndex],
      next: members[nextIndex]
    };
    if (webring.links.random) {
      let randomIndex = Math.floor(Math.random() * members.length);
      data.random = members[randomIndex];
    }

    finalHtml = updateWidgetText(webring, data);
  }
  document.currentScript.outerHTML = finalHtml;
}

function updateWidgetText(webring, data = null) {
  let newWidget;
  if (data) {
    newWidget = webring.widget.default;
    let webringLinks = webring.links;
    for (let link in webringLinks) {
      let altText = webringLinks[link].alt || `Link to ${(link == "prev") ? "previous" : link} ${(link == "index") ? webring.name : 'site'}`;
      newWidget = newWidget.replace(`${link.toUpperCase()}_INDEX`, webringLinks[link].url || data[link]);
      newWidget = newWidget.replace(`${link.toUpperCase()}_INDEX_IMG`, webringLinks[link].img);
      newWidget = newWidget.replace(`${link.toUpperCase()}_INDEX_IMG_ALT`, altText);
    }
  } else {
    let webringLink = webring.links.main.url;
    let webringName = webring.name
    newWidget = webring.widget.error.replace('MAIN_INDEX', webringLink);
    newWidget = newWidget.replace('WEBRING_NAME', webringName);
  }
  newWidget = newWidget.replace(/\s{2,}/g, '');
  return newWidget;
}
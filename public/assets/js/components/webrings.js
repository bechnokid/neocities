function getWebringSites(json, params) {
  $.ajax({
    url: json,
    success: function(data) {
      params["sites"] = data.map(item => item[params.attr])
      updateWebringLinks(params);
    },
    fail: function(data) {
      console.error("Error found in {{ params.name }}: ", data);
    }
  })
}

function setWebringLink(ringId, type, site) {
  const element = $(`.${ringId} a.${type}`);
  if (element.length > 0) {
    element.attr('href', site);
  }
}

function updateWebringLinks(params) {
  const sites = params.sites;
  const override = params.override === "true" || params.override === true ? true : false;
  const idx = sites.findIndex((site) => site.includes('bechnokid'));
  if (!override && idx < 0) {
    $(`.${params.id}`).html(`<div class="pending-ring"><p>Waiting to join the <a class="pending-link" href="${params.url}">${params.name}</a> webring.</p></div>`);
    return;
  };
  const prev = (idx > 0) ? sites[idx - 1] : sites[sites.length - 1];
  const next = (idx > 0) ? sites[(idx + 1) % sites.length] : (sites[0].includes(params.url) ? sites[1] : sites[0]);
  const rand = sites[getRandomIndex(sites)];

  setWebringLink(params.id, "prev", prev);
  setWebringLink(params.id, "rand", rand);
  setWebringLink(params.id, "next", next);
}

export function loadWebrings(webringLinks) {
  for (let ringId in webringLinks) {
    let webringParams = webringLinks[ringId];
    webringParams["id"] = ringId;
    if (webringParams.json) {
      getWebringSites(webringParams.json, webringParams);
    } else {
      updateWebringLinks(webringParams);
    }
  }
}
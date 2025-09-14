function setWebringSites(sites, id) {
  const index = sites.findIndex((site) => site.includes('bechnokid'))
  const prevSite = sites[index - 1];
  const nextSite = sites[index + 1];
  const randomSite = sites[getRandomIndex(sites)];

  $(`#${id}-prev`).attr('href', prevSite);
  $(`#${id}-next`).attr('href', nextSite);
  if ($(`#${id}-rand`).length > 0) $(`#${id}-rand`).attr('href', randomSite);
}
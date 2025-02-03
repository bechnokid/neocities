//=== Resource ===
var resourceRing_members = [
  'https://pixelsafari.neocities.org/',
  'https://www.thefrugalgamer.net/resources.php',
  'https://choiyoona.neocities.org/resources',
  'https://foreverliketh.is/',
  'https://favicons.neocities.org/',
  'https://bechnokid.neocities.org/home',
  'https://jasm1nii.xyz/',
  'https://pixelglade.net/',
  'https://shinyexe.neocities.org/',
  'https://trinityexe.neocities.org/homepage'
]
var resourceRing_ringurl = "https://pixelsafari.neocities.org/webring/";
var resourceRing_badgeurl = "https://pixelsafari.neocities.org/webring/resourcering.png";
var resourceRing_prevurl = "https://pixelsafari.neocities.org/webring/resourceringprev.png";
var resourceRing_nexturl = "https://pixelsafari.neocities.org/webring/resourceringnext.png";
var resourceRing_randomurl = "https://pixelsafari.neocities.org/webring/resourceringrandom.png";

var displayElement = document.getElementById("resourceRing");

// First of all, we want to check whether we are even a member of this particular webring, and if so, at which position.
var currentLocation = 'https://bechnokid.neocities.org/home';
var siteIndex = resourceRing_members.indexOf(currentLocation);

// If our current location is NOT in the webring, display an error message. The rest of the code only runs if the site has been found in the webring.
if (siteIndex == -1) {
  displayElement.innerHTML =
  "<p>This website is waiting to join the Re:source Ring!<br />If it's already a member, please contact the webring administrator.</p>";
}

// If our current location IS in the webring, this is where it continues.
else {
  // This is a readable (but technologically not very sound) way to loop around when you are either the first or last member of the webring.
  var beforeID;
  var afterID;
  if (siteIndex == 0) { beforeID = resourceRing_members.length - 1; }
  else { beforeID = siteIndex - 1; }
  if (siteIndex == resourceRing_members.length - 1) { afterID = 0; }
  else { afterID = siteIndex + 1; }

  // This chooses a random website from a copy of the member list.
  var randomID;
  randomID = Math.floor(Math.random() * resourceRing_members.length);

  // Now it is time to get to the meaty stuff. This will replace our little display container with the actual display content: a general badge, next/previous buttons, and a webring info and random link.
  // Remove, swap around or change these components as you see fit.
  displayElement.innerHTML =
  "<a href='" + resourceRing_ringurl + "'><img style='margin-bottom:-5px' alt='Badge: resourceRing webring' src='" + resourceRing_badgeurl + "' /></a><br />" +
  "<a href='" + resourceRing_members[beforeID] + "'><img class='bottom' alt='Previous' src='" + resourceRing_prevurl + "' /></a>" +
  "<a href='" + resourceRing_members[randomID] + "'><img class='bottom' alt='Random' src='" + resourceRing_randomurl + "' /></a>" +
  "<a href='" + resourceRing_members[afterID] + "'><img class='bottom' alt='Next' src='" + resourceRing_nexturl + "' /></a>";
}

// If you want to choose a text-based display instead without any images, remove or comment up the entire else block above and instead uncomment this one.
/*
else {
  // This is a readable (but technologically not very sound) way to loop around when you are either the first or last member of the webring.
  var beforeID;
  var afterID;
  if (siteIndex == 0) { beforeID = WEBRINGNAME_members.length - 1; }
  else { beforeID = siteIndex - 1; }
  if (siteIndex == WEBRINGNAME_members.length - 1) { afterID = 0; }
  else { afterID = siteIndex + 1; }

  // This chooses a random website from a copy of the member list.
  var randomID;
  randomID = Math.floor(Math.random() * WEBRINGNAME_members.length);

  // Now it is time to get to the meaty stuff. This will replace our little display container with the actual display content: a general badge, next/previous buttons, and a webring info and random link.
  // Remove, swap around or change these components as you see fit.
  displayElement.innerHTML =
  "<p><a href='" + WEBRINGNAME_ringurl + "'>This site is part of the WEBRINGNAME webring.</a></br>" +
  "<a href='" + WEBRINGNAME_members[beforeID] + "'>Previous |</a>" +
  " <a href='" + WEBRINGNAME_members[randomID] + "'>Random |</a>" +
  " <a href='https://libre.town/creative/development/librering.xhtml'>About LibreRing |</a>" +
  " <a href='" + WEBRINGNAME_members[afterID] + "'>Next</a></p>";
}
*/
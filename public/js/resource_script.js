/*
    L     I  BBB    RRRR   EEEE  RRRR   I  N   N   GGGG
    L     I  B  B   R   R  E     R   R  I  NN  N  G
    L     I  BBBB   RRRR   EEE   RRRR   I  N N N  G  GG
    L     I  B   B  R   R  E     R   R  I  N  NN  G    G
    LLLLL I  BBBB   R   R  EEEE  R   R  I  N   N   GGGG

    LIBRERING is a simple javascript webring script.
    It should be compatible with HTML and XHTML and supports rudimentary configuration options.

    Copyright 2023: Lian B. of Libre.Town

    This program is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

// è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯
// : ADMINISTRATOR SECTION :: This section contains configuration options :
// è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯

// List of all members in the webring. Add onto this manually whenever you want to add someone new to the ring.
// Please take time to go through here and use the search-and-replace feature of your favorite text editor to change all instances of WEBRINGNAME to a lower-case or camel-case version of your webring name, as well as change the configuration to your liking.
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
// Various config options that should be self-documenting.
// Again, if you're hosting this Librering, please change all the instances of resourceRing to your particular webring name in lower case, and insert valid image URLs for the badges and navigation.
var resourceRing_ringurl = "https://pixelsafari.neocities.org/webring/"; // The URL of the webring itself, for contact and information purposes.
var resourceRing_badgeurl = "https://pixelsafari.neocities.org/webring/resourcering.png"; // The URL of the main badge of the webring; 88x31 recommended, but any size goes.
var resourceRing_prevurl = "https://pixelsafari.neocities.org/webring/resourceringprev.png"; // The URL of the PREVIOUS badge of the webring; in the original design, a quarter of the main badge.
var resourceRing_nexturl = "https://pixelsafari.neocities.org/webring/resourceringnext.png"; // The URL of the NEXT badge of the webring; in the original design, a quarter of the main badge.
var resourceRing_randomurl = "https://pixelsafari.neocities.org/webring/resourceringrandom.png"; // The URL of the RANDOM badge of the webring; in the original design, a quarter of the main badge.

// è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯
// : DISPLAY SECTION :: This defines whatever happens on a member's individual site: most notably, inserting a little display. :
// è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯è·¯

// Before you can use this, please replace all instances of resourceRing with your webring name in lower case.
// This will allow you to have multiple webrings on the same site without them conflicting with each other.
// Please also carefully read through these options to see what you can (and have to) change; the design, the layout and the links.
// For more information and a step-by-step tutorial, see: https://libre.town/creative/development/librering.xhtml

// ... Let's begin.

// For displaying messages of all kinds, as well as the working webring display, we want to keep our little HTML element in mind.
// Remember to insert your webring's name here, just like everywhere, if you host this webring.
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
  "<a href='" + resourceRing_ringurl + "'><img alt='Badge: resourceRing webring' src='" + resourceRing_badgeurl + "' /></a><br />" +
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
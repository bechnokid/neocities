$(document).ready(function() {
  const imgPath = "/assets/images/goodies/pocket_bishies/";
  $('#bishie-btn-submit').on('click', function() {
    const values = $('input[type=radio]:checked').val();
    const isCorrect = values.sort().join('') == answer.sort().join('');
    if (isCorrect) {
      $('#bishie-results').html('');
      let imgContent = '';
      if (images.length > 0) {
        imgContent = "<div class='quiz-img-container'>"
        images.forEach(function(image) {
          imgContent += `<img src="${imgPath}/${image.img}" alt="I caught ${image.imgAlt}">`;
        })
        imgContent += "</div>"
      } else {
        imgContent = `<img class="mt-2" src="${imgPath}/${imgInfo[0]}" alt="${imgInfo[1]}">`
      }
      let content = `<div id='bishie-results'><h1>Congratulations!</h1><p>You got all the questions correct!</p><p>${images.length > 0 ? "Pick any badge from below" : "This badge is yours"}!</p>${imgContent}<p class='text-xs'>(Please save ${images.length > 0 ? "these images" : "this image"} on your own server!)</p></div>`;
      $('#bishie-content').html(content);
    } else {
      $('#bishie-results').html("<p>You failed to snag the bishie! Try again!</p>");
    }
  })
})
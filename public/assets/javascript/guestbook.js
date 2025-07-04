$(document).ready(function(){
  let form = $("#guestbooks___guestbook-form");

  form.on('submit', async function(e){
    e.preventDefault();

    let formData = new FormData(this);
    const response = await fetch('https://guestbooks.meadow.cafe/guestbook/484/submit', {
      method: 'POST',
      body: formData
    })

    var errorMsgBox = $(".guestbook-error-msg");
    if (response.ok) {
      this.reset();
      loadGuestbookMsgs();
      errorMsgBox.toggleClass('d-none');
      errorMsgBox.html('');
    } else {
      errorMsgBox.toggleClass('d-none');
      let errorMsg = (response.status === 401) ? 'The answer is incorrect. Please try again.' : await response.text();
      errorMsgBox.html(`<p>${errorMsg}</p>`);
    }
  })

  function loadGuestbookMsgs() {
    $.ajax({
      method: 'GET',
      url: 'https://guestbooks.meadow.cafe/api/v1/get-guestbook-messages/484',
      success: function(response) {
        let msgDivArr = []
        for (let idx = 0; idx < response.length; idx++) {
          let message = response[idx];
          let dateObj = new Date(message.CreatedAt);
          let formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          let msgArr = [
            `<div class='guestbook-msg-div'>`,
              `<div class="guestbook-msg-header">`,
                `<p><strong>Name: </strong>${message.Name}</p>`,
                `<p><strong>Sent: </strong>${formattedDate}</p>`,
              `</div>`,
              `<div class="guestbook-msg-body">`,
                `<p>${message.Text}</p>`,
              `</div>`,
            `</div>`
          ];

          if (message.Website){
            msgArr.splice(3, 0, `<p><strong>Website: </strong><a href='${message.Website}'>${message.Website}</a></p>`)
          }
          if (idx < response.length - 1 ) {
            msgArr.splice(msgArr.length - 1, 0, "<hr class='small'>");
          }

          msgDivArr.push(msgArr.join(''))
        }
        let content = (msgDivArr.length > 0) ? msgDivArr.join('') : `<p>There are no messages, yet.</p>`
        $(".guestbook-msg-container .content").html(content);
      },
      fail: function(){
        let errorMsg = 'Unable to obtain guestbook messages.'
        $(".guestbook-msg-container .content").html(`<p>${errorMsg}</p>`);
      }
    });
  }

  loadGuestbookMsgs();
})
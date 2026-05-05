const GUESTBOOK_MSG_LIMIT = 4;

async function submitMessage(form) {
  const errorMsgBox = $('.guestbook-error-msg');
  const nameField = $('input#name');
  const textField = $('textarea#text');
  const questionField = $('input#question');
  const websiteField = $('input#website');
  const websiteRegex = /(^$|(http(s)?:\/\/)([\w-]+\.)+[\w-]+([\w- ;,.\/?%&=]*))$/i;
  let errorMsg = "<p class='mt-0'><strong>Please resolve the following errors:</strong></p>"

  let errorList = [];
  if (nameField.val().length == 0) errorList.push('<li>Name is missing.</li>');
  if (websiteField.val().length > 0 && !websiteRegex.test(websiteField.val())) errorList.push('<li>Invalid URL.</li>');
  if (textField.val().length == 0) errorList.push('<li>Message is empty.</li>');
  if (questionField.val().length == 0) errorList.push(`<li>"Answer is blank."}</li>`);

  if (errorList.length > 0) {
    let errorListStr = '<ul>';
    for (let i = 0; i < errorList.length; i++) {
      errorListStr += errorList[i];
      if (i == errorList.length - 1) {
        errorListStr += '</ul>';
      }
    }
    errorMsgBox.html(errorMsg + errorListStr);
    errorMsgBox.removeClass('d-none');
  } else {
    let formData = new FormData(form[0]);
    const response = await fetch('https://guestbooks.meadow.cafe/guestbook/484/submit', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      form[0].reset();
      getMessages();
      errorMsgBox.addClass('d-none');
      errorMsgBox.html('');
    } else {
      errorMsg = (response.status === 401) ? 'The answer is incorrect. Please try again.' : await response.text();
      errorMsgBox.html(`<p>${errorMsg}</p>`);
      errorMsgBox.removeClass('d-none');
    }
  }
}

function getMessages() {
  $.ajax({
    method: 'GET',
    url: 'https://guestbooks.meadow.cafe/api/v1/get-guestbook-messages/484',
    success: function(response) {
      let messagesArr = [];
      for (let idx = 0; idx < response.length; idx++) {
        const hidden = idx > GUESTBOOK_MSG_LIMIT;
        const hideLine = idx > GUESTBOOK_MSG_LIMIT - 1;
        const msgContent = loadMsgContent(response[idx], hidden, hideLine);
        messagesArr.push(msgContent);
      }

      const content = (messagesArr.length > 0) ? messagesArr.join('') : `<p>There are no messages, yet.</p>`
      $(".guestbook-msg-container").html(content);

      if (messagesArr.length > 0) {
        // Loading pagination
        const numOfPages = Math.ceil(messagesArr.length / GUESTBOOK_MSG_LIMIT);

        let pageNumList = [];
        for (let i = 1; i <= numOfPages; i++) {
          const btn = `<button class='pagination-num' data-page-index='${i}' aria-label='Page ${i}'>${i}</button>`;
          pageNumList.push(btn);
        }
        $('#pagination-numbers').html(pageNumList.join('')).attr("data-num-of-pages", numOfPages);
        $('#guestbook-pagination').removeClass('d-none');

        // Setting current page
        setCurrentPage(1);

        $('.pagination-btn').on('click', (e) => {
          const currentPage = Number($('.pagination-num.active').attr('data-page-index'));
          const numOfPages = Number($('#pagination-numbers').attr('data-num-of-pages'));

          if (e.target.getAttribute('id') == "prev-btn" && currentPage - 1 > 0) {
            setCurrentPage(currentPage - 1);
          } else if (e.target.getAttribute('id') == "next-btn" && currentPage + 1 <= numOfPages) {
            setCurrentPage(currentPage + 1);
          }
        })

        $('.pagination-num').on('click', function() {
          if (!$(this).hasClass('active')) {
            setCurrentPage(Number(this.getAttribute('data-page-index')));
          }
        });
      }
    },
    fail: function(){
      $(".guestbook-msg-container").html(`<p>Unable to obtain guestbook messages.</p>`);
    }
  });
};

function loadMsgContent(message, hidden) {
  const dateObj = new Date(message.CreatedAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const website = (message.Website) ? `<p><strong>Website: </strong><a href='${message.Website}'>${message.Website}</a></p>` : '';
  const msg = message.Text.replaceAll(/(\r\n)/g, "<br>");
  return `<div class='guestbook-msg-div sidebar p-3 pb-2 ${hidden ? "d-none" : ''}'><div class="guestbook-msg-header"><p><strong>Name: </strong>${message.Name}</p><p><strong>Sent: </strong>${formattedDate}</p>${website}</div><div class="guestbook-msg-body"><p>${msg}</p></div></div>`;
};

function setCurrentPage(pageNum) {
  const prevRange = (pageNum - 1) * GUESTBOOK_MSG_LIMIT;
  const currRange = pageNum * GUESTBOOK_MSG_LIMIT;
  const msgList = $('.guestbook-msg-div');

  setCurrentPageNum(pageNum);

  msgList.each(function(value, i) {
    if (i >= prevRange && i < currRange) {
      $(value).removeClass('d-none')
    } else {
      $(value).addClass('d-none')
    }
  });
}

function setCurrentPageNum(currentPage) {
  $('.pagination-num.active').removeClass('active');
  $('.pagination-num').each(function(val) {
    const pageIndex = Number($(val).attr('data-page-index'));
    if (pageIndex == currentPage) {
      $(val).addClass('active');
    }
  })
}

export function loadGuestbook() {
  let form = $("#guestbooks___guestbook-form");
  form.on('submit', function(e) {
    e.preventDefault();
    submitMessage(form);
  });

  getMessages();
}
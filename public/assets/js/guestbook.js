let form = $("#guestbooks___guestbook-form");
let errorMsg = "<p class='mt-0'><strong>Please resolve the following errors:</strong></p>"

// Validation
const errorMsgBox = $('.guestbook-error-msg');
const nameField = $('input#name');
const textField = $('textarea#text');
const questionField = $('input#question');
const websiteField = $('input#website');
const websiteRegex = /(^$|(http(s)?:\/\/)([\w-]+\.)+[\w-]+([\w- ;,.\/?%&=]*))$/i;

// Pagination
const paginationNum = $('#pagination-num');
const nextBtn = $('#next-btn');
const prevBtn = $('#prev-btn');
const msgLimit = 4;
let currentPage;
let pageCount;

form.on('submit', async function(e){
  e.preventDefault();

  let errorList = [];
  if (nameField.val().length == 0) errorList.push('<li>Name is missing.</li>');
  if (websiteField.val().length > 0 && !websiteRegex.test(websiteField.val())) errorList.push('<li>Invalid URL.</li>');
  if (textField.val().length == 0) errorList.push('<li>Message is empty.</li>');
  if (questionField.val() != '8') {
    let questionErr = (questionField.val().length == 0) ? "Answer is blank." : "Incorrect answer.";
    errorList.push(`<li>${questionErr}</li>`);
  }

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
    let formData = new FormData(this);
    const response = await fetch('https://guestbooks.meadow.cafe/guestbook/484/submit', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      this.reset();
      loadGuestbookMsgs();
      errorMsgBox.addClass('d-none');
      errorMsgBox.html('');
    } else {
      errorMsg = (response.status === 401) ? 'The answer is incorrect. Please try again.' : await response.text();
      errorMsgBox.html(`<p>${errorMsg}</p>`);
      errorMsgBox.removeClass('d-none');
    }
  }
})

loadMessages();

function loadMessages() {
  $.ajax({
    method: 'GET',
    url: 'https://guestbooks.meadow.cafe/api/v1/get-guestbook-messages/484',
    success: function(response) {
      let messagesArr = [];
      for (let idx = 0; idx < response.length; idx++) {
        const hidden = idx > msgLimit;
        const hideLine = idx > msgLimit - 1;
        const msgContent = loadMsgContent(response[idx], hidden, hideLine);
        messagesArr.push(msgContent);
      }

      const content = (messagesArr.length > 0) ? messagesArr.join('') : `<p>There are no messages, yet.</p>`
      $(".guestbook-msg-container").html(content);

      if (messagesArr.length > 0) {
        loadPageNumbers(messagesArr);
        setCurrentPage(1);

        $('#prev-btn').on('click', function() {
          if ((currentPage - 1) > 0) setCurrentPage(currentPage - 1);
        });

        $('#next-btn').on('click', function() {
          if ((currentPage + 1) <= 5 ) setCurrentPage(currentPage + 1);
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

function loadPageNumbers(msgList) {
  const numOfPages = Math.ceil(msgList.length / msgLimit);
  pageCount = numOfPages;

  let pageNumList = [];
  for (let i = 1; i <= numOfPages; i++) {
    const btn = `<button class='pagination-num' data-page-index='${i}' aria-label='Page ${i}'>${i}</button>`;
    pageNumList.push(btn);
  }
  $('#pagination-numbers').html(pageNumList.join(''));
  $('#guestbook-pagination').removeClass('d-none');
};

function setCurrentPage(pageNum) {
  currentPage = pageNum;
  const prevRange = (pageNum - 1) * msgLimit;
  const currRange = pageNum * msgLimit;
  const msgList = $('.guestbook-msg-div');

  setCurrentPageNum();

  msgList.each(function(value, i) {
    if (i >= prevRange && i < currRange) {
      $(value).removeClass('d-none')
    } else {
      $(value).addClass('d-none')
    }
  });
}

function setCurrentPageNum() {
  $('.pagination-num.active').removeClass('active');
  $('.pagination-num').each(function(val) {
    const pageIndex = Number($(val).attr('data-page-index'));
    if (pageIndex == currentPage) {
      $(val).addClass('active');
    }
  })
}
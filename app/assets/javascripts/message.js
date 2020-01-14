$(function(){ 
  var buildHTML = function(message) {
    if (message.body && message.image) {
      var html = `<div class="mainBox" data-message-id="${message.id}">
        <div class="mainBox__user">
          <div class="mainBox__user__name">
            ${message.user_name}
          </div>
          <div class="mainBox__user__date">
            ${message.created_at}
          </div>
        </div>
        <div class="mainBox__message">
          <p class="mainBox__message__body">
            ${message.body}
          </p>
          <img src="${message.image}" class="mainBox__image" >
        </div>
      </div>`
    } else if (message.body) {
      var html = `<div class="mainBox" data-message-id="${message.id}">
        <div class="mainBox__user">
          <div class="mainBox__user__name">
            ${message.user_name}
          </div>
          <div class="mainBox__user__date">
            ${message.created_at}
          </div>
        </div>
        <div class="mainBox__message">
          <p class="mainBox__message__body">
            ${message.body}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = `<div class="mainBox" data-message-id="${message.id}>
        <div class="mainBox__user">
          <div class="mainBox__user__name">
            ${message.user_name}
          </div>
          <div class="mainBox__user__date">
            ${message.created_at}
          </div>
        </div>
        <div class="mainBox__message">
          <img src="${message.image}" class="mainBox__image" >
        </div>
      </div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainBody').append(html);
      $('.mainBody').animate({ scrollTop: $('.mainBody')[0].scrollHeight});
      $('form')[0].reset();
      $(".submit--btn").prop("disabled", false);
    })
    .fail(function(){
      alert("エラーが発生しました");
      $(".submit--btn").prop("disabled", false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.mainBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.mainBody').append(insertHTML);
        $('.mainBody').animate({ scrollTop: $('.mainBody')[0].scrollHeight});
        $("form")[0].reset();
        $(".submit--btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("エラーが発生しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
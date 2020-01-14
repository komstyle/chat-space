$(function(){ 
  var buildHTML = function(message) {
    if (message.body && message.image) {
      //data-idが反映されるようにしている
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
      //同様に、data-idが反映されるようにしている
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
      //同様に、data-idが反映されるようにしている
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.mainBox:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.mainBody').append(insertHTML);
        $('.mainBody').animate({ scrollTop: $('.mainBody')[0].scrollHeight});
        $("form")[0].reset();
        $(".submit--btn").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
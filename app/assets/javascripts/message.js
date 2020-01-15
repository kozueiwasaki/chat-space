$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__talker">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-content">` +
          `<p class="message-content__text">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="message-content__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__talker">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-content">` +
          `<p class="message-content__text">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__talker">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message-content">` +
          `<img src="` + message.image + `" class="message-content__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
  
  // 非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  //自動更新
  var reloadMessages = function() {
    // 最新のめっせーじのmessage-idを取得して変数に代入
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if(messages.length !== 0){
        //追加するhtmlの入れ物
        var insertHTML = '';
        //messagesの中身を順番に取り出し、
        //htmlに変換したものを入れ物に追加代入
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        //messagesの子要素に追加
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function(){
      console.log('error');
    });
  };
  if(document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
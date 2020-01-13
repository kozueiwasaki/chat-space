$(function(){
  // htmlを書き換えるメソッド
  function buildHTML(message){
    // 画像が含まれているか否かで条件分岐
    if (message.image){
      var html = 
       `<div class = "message" data-message-id=${message.id}>
          <div class = "message-info">
            <div class = "message-info__talker">
              ${message.user_name}
            </div>
            <div class = "message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class = "message-content">
            <p class = "message-content__text">
              ${message.content}
            </p>
            <img src =${message.image} >
          </div>
        </div>`
      return html;
    }else{
      var html =
       `<div class = "message" data-message-id=${message.id}>
          <div class = "message-info">
            <div class = "message-info__talker">
              ${message.user_name}
            </div>
            <div class = "message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class = "message-content">
            <p class = "message-content__text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  };
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
      // scrollTop 指定した値の分だけスクロールする
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
$(function(){
  //検索結果にユーザを追加
  function appendUser(user) {
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `;
    $('#user-search-result').append(html);
  }
  // ユーザーが見つかりません
  function appendNoUser() {
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>
               `;
    $('#user-search-result').append(html);
  }
  // チャットメンバーに追加するメソッド
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  // userをDBに保存するためのメソッド
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  // インクリメンタルサーチ
  $('#user-search-field').on('keyup', function(){
    // 入力された値を取得し、変数inputに代入
    let input = $('#user-search-field').val();
    // 以下をコントローラに送る
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    // usersには、jsonのデータが配列形式で入っている
    .done(function(users){
      $('#user-search-result').empty();
      if ( users.length !== 0 ){
        // 値が入っていた場合のhtmlを追加
        users.forEach(function(user){
          appendUser(user);
        });
      }else if(input.length == 0){
        return false;
      }else{
        appendNoUser();
      }
    })
    .fail(function(){
      alert('通信エラーです。ユーザーが表示できません。');
    });
  });

  // 追加ボタンのクリックイベント
  $(document).on('click','.chat-group-user__btn--add', function(){
    // カスタムデータの取得
    const userName = $(this).attr('data-user-name');
    const userId = $(this).attr('data-user-id');
    // 親要素を削除
    $(this)
      .parent()
      .remove();
    // 上記で削除したものをチャットメンバーに追加
    addDeleteUser(userName, userId);
    // userをDBに保存するためのメソッド
    addMember(userId);
  });

  //削除ボタンのクリックイベント
  $(document).on('click','.chat-group-user__btn--remove', function(){
    $(this)
      .parent()
      .remove();
  });

});
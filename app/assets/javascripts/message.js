$(function(){
    function buildHTML(message){
      if (message.image) {
        var html = `<div class="message__post">
                      <div class="message__post__TopBox">
                        <div class="message__post__TopBox__name">
                          ${message.user_name}
                        </div>
                        <div class="message__post__TopBox__time">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="message__post__content">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      </div>
                      <img src=${message.image}>
                    </div>`
        return html;
      } else {
        var html = `<div class="message__post">
                      <div class="message__post__TopBox">
                        <div class="message__post__TopBox__name">
                          ${message.user_name}
                        </div>
                        <div class="message__post__TopBox__time">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="message__post__content">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>`
        return html;
      };
    }

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
      $('form')[0].reset();
      $(".form__submit").prop("disabled", false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
});
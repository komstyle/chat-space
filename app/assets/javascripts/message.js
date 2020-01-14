$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="mainBox">
         <div class="mainBox__user">
           <div class="mainBox__user__name">
             ${message.user_name}
           </div>
           <div class="mainBox__user__date">
             ${message.date}
           </div>
         </div>
         <div class="mainBox__message">
           <p class="mainBox__message__body">
             ${message.body}
           </p>
         </div>
          <img src=${message.image} class="mainBox__image">
       </div>`
     return html;
   } else {
     var html =
      `<div class="mainBox">
         <div class="mainBox__user">
           <div class="mainBox__user__name">
             ${message.user_name}
           </div>
           <div class="mainBox__user__date">
             ${message.date}
           </div>
         </div>
         <div class="mainBox__message">
           <p class="mainBox__message__body">
             ${message.body}
           </p>
         </div>
       </div>`
     return html;
   };
 }
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
});
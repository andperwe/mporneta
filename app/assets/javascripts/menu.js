$(document).on('turbolinks:load', function() {
$('body').on('click','#menu0',function(e) {
  e.preventDefault();
});

$('body').on('click','main',function(){
  if ($('.cd-header').hasClass('nav-is-visible'))
  $('#menu0').click();
});
});

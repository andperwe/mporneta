$(document).on('turbolinks:load', function() {
$('#menu').hide();

$('.zmiana').click(function(event) {
   if ($('#menu_b').hasClass('glyphicon-align-justify'))
   {
     $('#menu_b').removeClass('glyphicon-align-justify').fadeIn( "slow");
     $('#menu_b').addClass('glyphicon-remove');
     $('#menu').slideDown('slow');
   }
   else{
     $('#menu_b').removeClass('glyphicon-remove');
     $('#menu_b').addClass('glyphicon-align-justify');
     $('#menu').fadeOut('slow');
   }

 });

 $('#m5').click(function(e){
   e.preventDefault();
  //alert('szukaj');

 });

});

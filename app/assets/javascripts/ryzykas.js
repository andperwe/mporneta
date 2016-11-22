$(document).on('turbolinks:load', function() {

  $('#RyzykaT').freezeTable({
       'autoHeight': false,
       'height': 166
    });



$('body').on("click","#dodaj_tu",function(){
  $('#tu_ryzyk').focus();
  $('#tu_ryzyk').val('');
  $('#grupa_ryzyk').val('');
  $('.freezetable-body > #RyzykaT tbody').empty();
  $('#dodaj_t_link').click();
});


$('#dodaj_grupe').tooltip();

$('#dodaj_ryzyko').tooltip();

$('body').on("click","#dodaj_grupe",function(){
   $('#grupa_ryzyk').focus();
  if($('#tu_ryzyk').val() == '')
  {
    alert_t('Wybierz wcześniej towarzystwo !');
  }
  else {
    $('.freezetable-body > #RyzykaT tbody').empty();
    $('#dodaj_g_link').click();
  }
});

$('body').on("click","#dodaj_ryzyko",function(){

   if($('#tu_ryzyk').val() == '')
   {
     $('#tu_ryzyk').focus();
     alert_t('Wybierz wcześniej towarzystwo !');
   }
   else if($('#grupa_ryzyk').val() == 'wybierz') {
     $('#grupa_ryzyk').focus();
     alert_t('Wybierz wcześniej grupę !');
   }
   else{
     $('#grupa_ryzyk').focus();
     $('#dodaj_np_link').click();
   }

});


$(document).on("change",'#tu_ryzyk',function(){
if ($('#tu_ryzyk').val() != ''){
$('.freezetable-body > #RyzykaT tbody').empty();
 $.ajax({
 url:'ryzyka/rysuj_grupy/',
 type:'POST',
 dataType : 'json',
 data:{towarzystwo_id:$('#tu_ryzyk').val()},
 success: function(data) {
   $('#grupa_ryzyk').empty();
   $('#grupa_ryzyk').append($('<option>', {
      text : "wybierz"
     }));


   $.each(data, function(index) {
     $('#grupa_ryzyk').append($('<option>', {
        value: data[index].id,
        text : data[index].nazwa_rodz
       }));
    });
   }
 });
 }
 else {
    $('#grupa_ryzyk').empty();
    $('#grupa_ryzyk').append($('<option>', {
       text : "wybierz"
      }));
 }
});

$(document).on("change",'#grupa_ryzyk',function(){
  //$('.freezetable-body > #RyzykaT tbody').empty();
  $.ajax({url: 'ryzyka/rysuj_ryzyka/',
  data:{rodz_pol_id: $('#grupa_ryzyk').val()},
    success: function(data){

      $('.freezetable-body > #RyzykaT tbody').html(data);
    }
  });


});

});

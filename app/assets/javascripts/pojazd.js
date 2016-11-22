$(document).ready(function() {

//dodaj_marke
$(document).on("click",'#dodaj_marke',function(e){
$('#marka').val('');
$('#marka_f').val(0);
$('#model_f').val(0);
$('#model').val('');
$('#rodzaj_f').val(0);
$('#rodzaj').val('');

e.preventDefault();

});


$(document).on("click",'#marka',function(){

var wybrana_marka=1;

$('#marka').focusout(function(){
 if (wybrana_marka == 0)
 {
   $('#marka_f').val(0);
   $('#marka').val('');
 }
});

$('#marka').autocomplete({
      source:'marki_poj/rszukaj_marka/',
      minLength:1,
      response: function(event, ui) {
      if (!ui.content.length) {
         wybrana_marka=0;
         alert_t('Brak w bazie tej marki pojazdu. Proszę dodać nową lub wybrać prawidłową !!!');
         $('#marka').val('');
         $('#marka_f').val(0);
         $('#model').val('');
         $('#model_f').val(0);
         $('#rodzaj_f').val(0);
         $('#rodzaj').val('');
       }
       else {
         wybrana_marka=1;
       }
     },
      select: function(event, ui) {
        $.ajax({
        url:'marki_poj/szukaj_marka/',
        type:'POST',
        dataType : 'json',
        data:{marka:ui.item.value},
        success: function(data) {
           $('#marka_f').val(data.id);
           $('#model_f').val(0);
           $('#model').val('');
           $('#rodzaj_f').val(0);
           $('#rodzaj').val('');
        }
        });
      }
  });
});


$(document).on("focus",'#model',function(e){
if ($('#marka').val()  == '')
 {
   $('#marka').focus();
 }
});

$(document).on("focus",'#rodzaj',function(e){
if ($('#marka').val()  == '')
 {
   $('#marka').focus();
 }
 else if($('#model').val() == '')
 {
   $('#model').focus();
 }
});

$(document).on("click",'#dodaj_model',function(e){
  $('#model_f').val(0);
  $('#model').val("");
  $('#rodzaj_f').val(0);
  $('#rodzaj').val("");
 e.preventDefault();

});

var wybrany_model=1;

$('#model').focusout(function(){
  if (wybrany_model == 0)
  {
    $('#model_f').val(0);
    $('#model').val('');
  }
});


$(document).on("click",'#model',function(){

 $('#model').autocomplete({
       source:function( request, response ) {
         $.ajax( {
                  url: "model_poj/rszukaj_model/",
                  dataType: "json",
                  data: {
                         q: request.term,
                         marki_poj_id: $('#marka_f').val()
                },
   success: function( data ) {

     // Handle 'no match' indicated by [ "" ] response
                               response( data.length === 1 && data[ 0 ].length === 0 ? [] : data );
                               if (data.length === 0)
                               {
                                 wybrany_model=0;
                                 $('#model').val('');
                                 $('#model_f').val(0);
                                 $('#rodzaj_f').val(0);
                                 $('#rodzaj').val('');
                                 alert_t('Brak w bazie tego modelu pojazdu. Proszę dodać nowy lub wybrać prawidłowy !!!');
                               }
                               else {
                                 wybrany_model=1;
                               }
                             }
             } );
           },
       minLength:1,
       select: function(event, ui) {
         $.ajax({
         url:'model_poj/szukaj_model/',
         type:'POST',
         dataType : 'json',
         data:{model:ui.item.value},
         success: function(data) {
         //$('#marka_f').val(ui.item.id);
            $('#model_f').val(data.id);
            $('#rodzaj_f').val(0);
            $('#rodzaj').val('');
         }
         });
       }
 });

});

$(document).on("click",'#dodaj_rodzaj',function(e){
  $('#rodzaj_f').val(0);
  $('#rodzaj').val('');
 e.preventDefault();

});


$(document).on("click",'#rodzaj',function(){

  var wybrany_rodzaj=1;

  $('#rodzaj').focusout(function(){
    if (wybrany_rodzaj == 0)
    {
      $('#rodzaj_f').val(0);
      $('#rodzaj').val('');
    }
  });

  $('#rodzaj').autocomplete({
        source:'rodzaj_poj/rszukaj_rodzaj/',
        minLength:1,
        response: function(event, ui) {
        if (!ui.content.length) {
           wybrany_rodzaj=0;
           alert_t('Brak w bazie tego modelu pojazdu. Proszę dodać nowy lub wybrać prawidłowy !!!');
           $('#rodzaj').val('');
           $('#rodzaj_f').val(0);
         }
         else {
           wybrany_rodzaj=1;
         }
       },
        select: function(event, ui) {
          $.ajax({
          url:'rodzaj_poj/szukaj_rodzaj/',
          type:'POST',
          dataType : 'json',
          data:{rodzaj:ui.item.value},
          success: function(data) {
          $('#rodzaj_f').val(data.id);
          }
          });
        }
  });

});



});

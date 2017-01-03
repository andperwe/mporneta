$(document).on('turbolinks:load', function() {
$('body').on('change','#rok',function(){
  //alert('"'+$('#rok').val()+':'+$('#rok').val()+'"');
   var dz = $('#rok').val()+':'+$('#rok').val();
   //$('#od, #do').datepicker({yearRange : "2005:2005"});
  //$('#od, #do').datepicker( "refresh" );
 $("#od, #do").datepicker("destroy");

$("#od").val($('#rok').val()+'-01-01');
$("#do").val($('#rok').val()+'-12-01');
  $('#od, #do').datepicker({
             changeMonth: true,
             changeYear: true,
             dateFormat: "yy-mm-dd",
             yearRange: dz,
             showOn: "button",
             buttonImage:"/assets/calendar.gif",
             buttonImageOnly: true,
             buttonText: "Wybierz date",
           });

           //$( "#od, #do" ).datepicker( "option", "yearRange", dz );
           //$('#od').datepicker("dialog", "10/12/2012");
});

  $('#od, #do, #data_wyk').datepicker({
             changeMonth: true,
             changeYear: true,
             yearRange: "2016:2016",
             dateFormat: "yy-mm-dd",
             showOn: "button",
             buttonImage:"/assets/calendar.gif",
             buttonImageOnly: true,
             buttonText: "Wybierz date",
             });
   $(".data").mask("9999-99-99");

$('body').on('change','#od', function(){
  if ($('#od').val().substr(0, 4) != $('#rok').val()){
    alert_t('Nie poprawna data !');
    $('#od').val('');
    $('#od').focus();
  }
});

$('body').on('change','#do', function(){
  if ($('#do').val().substr(0, 4) != $('#rok').val()){
    alert_t('Nie poprawna data !');
    $('#do').val('');
    $('#do').focus();
  }
});

$('body').on('click','#generate_link', function(e){
 if($('#od').val() == '') {
   e.preventDefault();
   $('#od').addClass('blad');
   $("label[for='od']").addClass('bladl');
   alert_t('Brak daty początkowej !');
  }
  else {
    $('#od').removeClass('blad');
    $("label[for='od']").removeClass('bladl');
     if ($('#do').val() == '') {
        e.preventDefault();
        $('#do').addClass('blad');
        $("label[for='do']").addClass('bladl');
        alert_t('Brak daty końcowej !');
     }else
       {
         $('#do').removeClass('blad');
         $("label[for='do']").removeClass('bladl');
        if (!PorownajDaty($('#od').val(), $('#do').val())){
            var href='?od=' + $('#od').val() + '&do=' + $('#do').val()  + '&nr_wyk=' + $('#nr_wyk').val() +'&data_wyk=' + $('#data_wyk').val();
            if ($('#towarzystwo_id').val() != "") {
                 href =  href +'&towarzystwo=' + $("#towarzystwo_id :selected").text();
            }
            if ($('#oddzial_id').val() != ""){
                 href = href + '&oddzial='+ $("#oddzial_id :selected").text() + '&oddzial_id=' +$('#oddzial_id').val();
            }

            $('#generate_link').attr('href','/excels.xlsx');
            $('#generate_link').attr('href', $('#generate_link').attr('href').substr(0,19) + href);
        }else {
               e.preventDefault();
               alert_t('Data początkowa jest póżniejsza od daty końcowe lub taka sama!');
              }
    }
  }
  });
});


function PorownajDaty(d1, d2)
{

  var blad = false;
  pom_m1 =  d1.substr(5, 2);
  pom_m2 =  d2.substr(5, 2);
  if (pom_m1 == pom_m2){
    pom_d1 =  d1.substr(8, 2);
    pom_d2 =  d2.substr(8, 2);
    if (pom_d1.substr(0, 1) == '0'){
      pom_d1=pom_d1.substr(1, 1);
    }
    if (pom_d2.substr(0, 1) == '0'){
       pom_d2=pom_d2.substr(1, 1);
    }
    if (parseInt(pom_d2) <= parseInt(pom_d1))
    {
      blad = true;
    }
  }
  else {
    if (pom_m1.substr(0, 1) == '0'){
      pom_m1=pom_m1.substr(1, 1);
    }
    if (pom_m2.substr(0, 1) == '0'){
       pom_m2=pom_m2.substr(1, 1);
    }

    if (parseInt(pom_m2) < parseInt(pom_m1))
    {
      blad = true;
    }
  }

return (blad);

}

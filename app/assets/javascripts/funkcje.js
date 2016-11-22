

function pierwsza_d(tekst)
{
 var tekst2=tekst.toLowerCase();
 var tempArray = tekst2.split(' ');                                 //tworzymy tablicę zawierającą słowa naszego tekstu
    for (var i = 0; i < tempArray.length; i++) {                 //wykonujemy pętlę po elementach tablicy
        tempArray[i] = tempArray[i].charAt(0).toUpperCase() +       //zwiększamy pierwszą literkę słowa...
        tempArray[i].substring(1);                                  //+ dodajemy dalszą część słowa
    }
 var tekst3=tempArray.join(' ');
 var tempArray2 = tekst3.split('-');                                 //tworzymy tablicę zawierającą słowa naszego tekstu
    for (var i = 0; i < tempArray2.length; i++) {                 //wykonujemy pętlę po elementach tablicy
        tempArray2[i] = tempArray2[i].charAt(0).toUpperCase() +       //zwiększamy pierwszą literkę słowa...
        tempArray2[i].substring(1);                                  //+ dodajemy dalszą część słowa
    }
  return tempArray2.join('-');
}

function wszystkie_d(tekst)
{
  var tekst2=tekst.toUpperCase();
  return tekst2
}




function daty_pl()
{
  $(".data" ).datepicker({
  changeMonth: true,
  changeYear: true,
  dateFormat: "yy-mm-dd",
  yearRange: "1960:2020",
  showOn: "button",
  buttonImage:"/assets/calendar.gif",
  buttonImageOnly: true,
  buttonText: "Wybierz date",

  });
}

function puste_pola_osoba()
{
 var puste = false;
 if ($('#osoba_typ_prawny').val() == 1)
 {
   if ($('#pesel').val() == '') {
    puste = true;
    $('#pesel').addClass('blad');
    $("label[for='pesel']").addClass('bladl');
   }
   else {
     $('#pesel').removeClass('blad');
     $("label[for='pesel']").removeClass('bladl');
   }

   if ($('#nazwisko').val() == '') {
    puste = true;
    $('#nazwisko').addClass('blad');
    $("label[for='nazwisko']").addClass('bladl');
   }
   else {
     $('#nazwisko').removeClass('blad');
     $("label[for='nazwisko']").removeClass('bladl');
   }

   if ($('#imie').val() == '') {
    puste = true;
    $('#imie').addClass('blad');
    $("label[for='imie']").addClass('bladl');
   }
   else {
     $('#imie').removeClass('blad');
     $("label[for='imie']").removeClass('bladl');
   }

 }

 if ($('#osoba_typ_prawny').val() == 2)
 {
   if ($('#n_firmy').val() == '') {
    puste = true;
    $('#n_firmy').addClass('blad');
    $("label[for='n_firmy']").addClass('bladl');
   }
   else {
     $('#n_firmy').removeClass('blad');
     $("label[for='n_firmy']").removeClass('bladl');
   }

 }

 if ($('#osoba_typ_prawny').val() == 3)
 {
   if ($('#n_firmy').val() == '') {
    puste = true;
    $('#n_firmy').addClass('blad');
    $("label[for='n_firmy']").addClass('bladl');
   }
   else {
     $('#n_firmy').removeClass('blad');
     $("label[for='n_firmy']").removeClass('bladl');
   }

   if ($('#pesel').val() == '') {
    puste = true;
    $('#pesel').addClass('blad');
    $("label[for='pesel']").addClass('bladl');
   }
   else {
     $('#pesel').removeClass('blad');
     $("label[for='pesel']").removeClass('bladl');
   }

   if ($('#nazwisko').val() == '') {
    puste = true;
    $('#nazwisko').addClass('blad');
    $("label[for='nazwisko']").addClass('bladl');
   }
   else {
     $('#nazwisko').removeClass('blad');
     $("label[for='nazwisko']").removeClass('bladl');
   }

   if ($('#imie').val() == '') {
    puste = true;
    $('#imie').addClass('blad');
    $("label[for='imie']").addClass('bladl');
   }
   else {
     $('#imie').removeClass('blad');
     $("label[for='imie']").removeClass('bladl');
   }

 }

 if ($('#kod').val() == '') {
  puste = true;
  $('#kod').addClass('blad');
  $("label[for='kod']").addClass('bladl');
 }
 else {
   $('#kod').removeClass('blad');
   $("label[for='kod']").removeClass('bladl');
 }

 if ($('#miejscowosc').val() == '') {
  puste = true;
  $('#miejscowosc').addClass('blad');
  $("label[for='miejscowosc']").addClass('bladl');
 }
 else {
   $('#miejscowosc').removeClass('blad');
   $("label[for='miejscowosc']").removeClass('bladl');
 }

 if ($('#ulica').val() == '') {
  puste = true;
  $('#ulica').addClass('blad');
  $("label[for='ulica']").addClass('bladl');
 }
 else {
   $('#ulica').removeClass('blad');
   $("label[for='ulica']").removeClass('bladl');
 }

 if(puste == true)
     {
       alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
     }
     return (puste);
 }

 function dzis()
 {
   var date_now = new Date();
   var rok = date_now.getFullYear();
   var miesiac = date_now.getMonth()+1;
   if (miesiac < 10) miesiac = '0'+miesiac;
   if (dzien < 10) dzien = '0'+dzien;
   var dzien = date_now.getDate();
   var teraz = rok+'-'+miesiac+'-'+dzien;
   return teraz;
 }


function alert_t(tekst)
{
  $( "#alert_t" ).dialog({
                autoOpen: false,
                maxWidth:450,
                maxHeight: 220,
                width: 450,
                height: 220,
                modal: true,
                buttons:[
                        {
                          id:"alert_kom",
                          text: "Ok",
                          click: function() {
                            $('#alert_t').dialog("close");
                          }
                        }
                      ]
  });
   $('#alert_t').html(
     "<div class='alert alert-danger' role='alert'>"+
     "<p class='text-center'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>"+
     "<span class='sr-only'>Error:</span>"+
     "<strong>&nbsp"+tekst+"</strong></p>"+
     "</div>"
   );

    $("#alert_kom").mouseover(function() {
          $('button').removeClass("ui-state-hover");
    });
    $("#alert_kom").focus(function () {
          $(this).removeClass("ui-state-focus");
    });
    $('#alert_kom').removeClass();
    $('#alert_kom').addClass('btn btn-danger btn-sm');
    $('#alert_t').dialog( "open" );
}

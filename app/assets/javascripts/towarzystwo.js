function puste_pola_t()
{
 var puste = false;
    if ($.trim($('#towarzystwo_nazwa_max').val()) == '') {
    puste = true;
    $('#towarzystwo_nazwa_max').addClass('blad');
    $("label[for='towarzystwo_nazwa_max']").addClass('bladl');
   }
   else {
     $('#towarzystwo_nazwa_max').removeClass('blad');
     $("label[for='towarzystwo_nazwa_max']").removeClass('bladl');
   }

   if ($.trim($('#towarzystwo_kod').val()) == '') {
   puste = true;
   $('#towarzystwo_kod').addClass('blad');
   $("label[for='towarzystwo_kod']").addClass('bladl');
  }
  else {
    $('#towarzystwo_kod').removeClass('blad');
    $("label[for='towarzystwo_kod']").removeClass('bladl');
  }

  if ($.trim($('#towarzystwo_miasto').val()) == '') {
  puste = true;
  $('#towarzystwo_miasto').addClass('blad');
  $("label[for='towarzystwo_miasto']").addClass('bladl');
 }
 else {
   $('#towarzystwo_miasto').removeClass('blad');
   $("label[for='towarzystwo_miasto']").removeClass('bladl');
 }

 if ($.trim($('#towarzystwo_ulica').val()) == '') {
 puste = true;
 $('#towarzystwo_ulica').addClass('blad');
 $("label[for='towarzystwo_ulica']").addClass('bladl');
}
else {
  $('#towarzystwo_ulica').removeClass('blad');
  $("label[for='towarzystwo_ulica']").removeClass('bladl');
}

if ($.trim($('#towarzystwo_nazwa').val()) == '') {
puste = true;
$('#towarzystwo_nazwa').addClass('blad');
$("label[for='towarzystwo_nazwa']").addClass('bladl');
}
else {
 $('#towarzystwo_nazwa').removeClass('blad');
 $("label[for='towarzystwo_nazwa']").removeClass('bladl');
}

if ($.trim($('#towarzystwo_email1').val()) == '') {
puste = true;
$('#towarzystwo_email1').addClass('blad');
$("label[for='towarzystwo_email1']").addClass('bladl');
}
else {
 $('#towarzystwo_email1').removeClass('blad');
 $("label[for='towarzystwo_email1']").removeClass('bladl');
}

if ($.trim($('#towarzystwo_tel').val()) == '') {
puste = true;
$('#towarzystwo_tel').addClass('blad');
$("label[for='towarzystwo_tel']").addClass('bladl');
}
else {
 $('#towarzystwo_tel').removeClass('blad');
 $("label[for='towarzystwo_tel']").removeClass('bladl');
}

if ($.trim($('#towarzystwo_tel_ass').val()) == '') {
puste = true;
$('#towarzystwo_tel_ass').addClass('blad');
$("label[for='towarzystwo_tel_ass']").addClass('bladl');
}
else {
 $('#towarzystwo_tel_ass').removeClass('blad');
 $("label[for='towarzystwo_tel_ass']").removeClass('bladl');
}

if ($.trim($('#towarzystwo_tel_szk').val()) == '') {
puste = true;
$('#towarzystwo_tel_szk').addClass('blad');
$("label[for='towarzystwo_tel_szk']").addClass('bladl');
}
else {
 $('#towarzystwo_tel_szk').removeClass('blad');
 $("label[for='towarzystwo_tel_szk']").removeClass('bladl');
}


if(puste == true)
    {
      alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
    }
    return (puste);

}

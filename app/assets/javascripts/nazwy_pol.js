function puste_pola_np()
{
 var puste = false;
    if ($.trim($('#nazwy_pol_nazwa_polisy').val()) == '') {
    puste = true;
    $('#nazwy_pol_nazwa_polisy').addClass('blad');
    $("label[for='nazwy_pol_nazwa_polisy']").addClass('bladl');
   }
   else {
     $('#nazwy_pol_nazwa_polisy').removeClass('blad');
     $("label[for='nazwy_pol_nazwa_polisy']").removeClass('bladl');
   }

   if(puste == true)
       {
         alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
       }
       return (puste);

}

function powtorkinp(rodz_pol_id)
{
  $.ajax({url: 'ryzyka/szukaj_np/',
  type:'POST',
  dataType : 'json',
  data:{rodz_pol_id:rodz_pol_id, nazwa_polisy:$('#nazwy_pol_nazwa_polisy').val().toUpperCase()},
    success: function(data){
       if ($.trim(data)){
         alert_t('Taka nazwa polisy już istnieje !');
         $('#nazwy_pol_nazwa_polisy').val('');
       }
       else{
         $('#form_np_grupa').submit();
       }
      }
});

}

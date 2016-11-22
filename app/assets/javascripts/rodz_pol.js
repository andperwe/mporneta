function puste_pola_rodz()
{
 var puste = false;
    if ($.trim($('#rodz_pol_nazwa_rodz').val()) == '') {
    puste = true;
    $('#rodz_pol_nazwa_rodz').addClass('blad');
    $("label[for='rodz_pol_nazwa_rodz']").addClass('bladl');
   }
   else {
     $('#rodz_pol_nazwa_rodz').removeClass('blad');
     $("label[for='rodz_pol_nazwa_rodz']").removeClass('bladl');
   }

   if ($('#rodz_pol_typ').val() == "") {
   puste = true;
   $('#rodz_pol_typ').addClass('blad');
   $("label[for='rodz_pol_typ']").addClass('bladl');
  }
  else {
    $('#rodz_pol_typ').removeClass('blad');
    $("label[for='rodz_pol_typ']").removeClass('bladl');
  }

   if(puste == true)
       {
         alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
       }
       return (puste);
   }


 function powtorki(towarzystwo_id)
 {
   //var pom = false;
   $.ajax({url: 'ryzyka/szukaj_grupy/',
   type:'POST',
   dataType : 'json',
   data:{towarzystwo_id:towarzystwo_id, nazwa_rodz:$('#rodz_pol_nazwa_rodz').val().toUpperCase()},
     success: function(data){
        if ($.trim(data)){
          //alert('pusty');
          alert_t('Taka grupa już istnieje !');
          $('#rodz_pol_nazwa_rodz').val('');
        }
        else{
          $('#form_r_grupa').submit();
        }   /*$.each(data, function(index) {
          //alert("data"+data[index].nazwa_rodz);
         if ($('#rodz_pol_nazwa_rodz').val().toUpperCase() == data[index].nazwa_rodz)
         puste = true;
        });
        */
    // return pom;
    }
 });

}

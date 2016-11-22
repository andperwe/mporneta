$(document).on('turbolinks:load', function() {

  $.rails.showConfirmationDialog = function(link){
    var message = link.data("confirm");
    //alert(message);
    $( "#confirm" ).dialog({
                  autoOpen: true,
                  maxWidth:420,
                  maxHeight: 200,
                  width: 420,
                  height: 200,
                  modal: true,
                  buttons:[
                          {
                            id:"ok_u",
                            text: "Tak",
                            click: function() {
                              $('#confirm').dialog("close");
                                $.rails.confirmed(link);
                            }
                          },
                          {
                            id:"anuluj_u",
                            text: "Anuluj",
                            click: function() {
                              $('#confirm').dialog("close");
                            }
                          }
                        ]
    });

    $('#confirm').html(
      "<div class='alert alert-warning' role='alert'>"+
       "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
       "<strong>&nbsp"+message+"</strong></p>"+
     "</div>"
    );

    $("#ok_u").mouseover(function() {
       $('button').removeClass("ui-state-hover");
    });
    $("#ok_u").focus(function () {
        $(this).removeClass("ui-state-focus");
    });
    $('#ok_u').removeClass();
    $('#ok_u').addClass('btn btn-danger btn-sm');

    $("#anuluj_u").mouseover(function() {
       $('button').removeClass("ui-state-hover");
    });
    $("#anuluj_u").focus(function () {
        $(this).removeClass("ui-state-focus");
    });
    $('#anuluj_u').removeClass();
    $('#anuluj_u').addClass('btn btn-success btn-sm');

  /*  $.fn.SimpleModal({
      model: "modal",
      title: "Please confirm",
      contents: message
    }).addButton("Confirm", "button alert", function(){
      $.rails.confirmed(link);
      this.hideModal();
    }).addButton("Cancel", "button secondary").showModal();*/
  }

  t7=$('#users-table').DataTable({
    "dom":'<tpr>',
   "ajax": $('#users-table').data('source'),
   "language":{
               "sProcessing":"Przetwarzanie...",
               "sLengthMenu":"Pokaż _MENU_ pozycji",
               "sZeroRecords":"Nie znaleziono pasujących pozycji",
               "sInfoThousands":" ",
               "sInfo":"Pozycje od _START_ do _END_ z _TOTAL_ łącznie",
               "sInfoEmpty":"Pozycji 0 z 0 dostępnych",
               "sInfoFiltered":"(filtrowanie spośród _MAX_ dostępnych pozycji)",
               "sInfoPostFix":"",
               "sSearch":"Szukaj:",
               "sUrl":"",
               "oPaginate":{
               "sFirst":"Pierwsza",
               "sPrevious":"Poprzednia",
               "sNext":"Następna",
               "sLast":"Ostatnia"
               },
               "sEmptyTable":"Brak danych",
               "sLoadingRecords":"Wczytywanie...",
               "oAria":{
               "sSortAscending":": aktywuj, by posortować kolumnę rosnąco",
               "sSortDescending":": aktywuj, by posortować kolumnę malejąco"
               }
            },
    "scrollY": 250,
    "serverSide": true,
    "order": [[2,'desc']],
     "processing": true,
     "columnDefs": [
                    {
                     "targets": [0],
                     "visible":true,
                     "orderable":false,
                     "width":"2%"
                   },
                   {
                    "targets": [1],
                    "visible":true,
                    "orderable":false,
                    "width":"2%"
                  },
                    {
                        "targets": [ 2 ],
                        "visible": false,
                        "searchable": true
                    },
                    {
                        "targets": [ 3 ],
                        "orderable": true,
                        "searchable": true
                    },
                    {
                        "targets": [ 4 ],
                        "orderable": true,
                    },
                    {
                        "targets": [ 5 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 6 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 7 ],
                        "orderable": false
                    }
                  ]
  });

  $('#t_szukaj_u').on('input', function() {
      $('#users-table tbody tr.selected').removeClass('selected');
      //osoba_id = 0;
      //$('#polisas-table tbody').hide();
     t7.search( this.value ).draw();
  });

  $( "#pokaz_user" ).button().on( "click", function() {
    t7.search( '' ).columns().search( '' ).draw();
    $('#t_szukaj_u').val('');
  });

  $('#users-table tbody').on( 'click', 'tr', function () {

     var aData = t7.row( this ).data();
     if (aData != null){
       if ( !$(this).hasClass('selected') ) {
             $('#users-table tbody tr.selected').removeClass('selected');
             $(this).addClass('selected');
           }
      }
   });



  t8=$('#agencjes-table').DataTable({
    "dom":'<tpr>',
   "ajax": $('#agencjes-table').data('source'),
   "language":{
               "sProcessing":"Przetwarzanie...",
               "sLengthMenu":"Pokaż _MENU_ pozycji",
               "sZeroRecords":"Nie znaleziono pasujących pozycji",
               "sInfoThousands":" ",
               "sInfo":"Pozycje od _START_ do _END_ z _TOTAL_ łącznie",
               "sInfoEmpty":"Pozycji 0 z 0 dostępnych",
               "sInfoFiltered":"(filtrowanie spośród _MAX_ dostępnych pozycji)",
               "sInfoPostFix":"",
               "sSearch":"Szukaj:",
               "sUrl":"",
               "oPaginate":{
               "sFirst":"Pierwsza",
               "sPrevious":"Poprzednia",
               "sNext":"Następna",
               "sLast":"Ostatnia"
               },
               "sEmptyTable":"Brak danych",
               "sLoadingRecords":"Wczytywanie...",
               "oAria":{
               "sSortAscending":": aktywuj, by posortować kolumnę rosnąco",
               "sSortDescending":": aktywuj, by posortować kolumnę malejąco"
               }
            },
    "scrollY": 250,
    "serverSide": true,
    "order": [[2,'desc']],
     "processing": true,
     "columnDefs": [
                    {
                     "targets": [0],
                     "visible":true,
                     "orderable":false,
                     "width":"2%"
                   },
                   {
                    "targets": [1],
                    "visible":true,
                    "orderable":false,
                    "width":"2%"
                  },
                    {
                        "targets": [ 2 ],
                        "visible": false,
                        "searchable": true
                    },
                    {
                          "targets": [ 3 ],
                          "visible": true,
                          "orderable": true
                    },
                    {
                          "targets": [ 4 ],
                          "visible": true,
                          "orderable": true
                    },
                    {
                        "targets": [ 5 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 6 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 7 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 8 ],
                        "orderable": false
                    },
                    {
                        "targets": [ 9 ],
                        "orderable": true
                    }
                  ]

  });

  $('#agencjes-table tbody').on( 'click', 'tr', function () {

     var aData = t8.row( this ).data();
     if (aData != null){
       if ( !$(this).hasClass('selected') ) {
             $('#agencjes-table tbody tr.selected').removeClass('selected');
             $(this).addClass('selected');
           }
      }
   });

});


function puste_pola_user()
{
 var puste = false;

    if ($('#agencje_id').val() == '') {
    puste = true;
    $('#agencje_id').addClass('blad');
    $("label[for='user_agencje_id']").addClass('bladl');
   }
   else {
     $('#agencje_id').removeClass('blad');
     $("label[for='user_agencje_id']").removeClass('bladl');
   }

   if ($('#funkcje_id').val() == '') {
   puste = true;
   $('#funkcje_id').addClass('blad');
   $("label[for='user_funkcje_id']").addClass('bladl');
  }
  else {
    $('#funkcje_id').removeClass('blad');
    $("label[for='user_funkcje_id']").removeClass('bladl');
  }

  if ($.trim($('#user_nazwa').val()) == '') {
  puste = true;
  $('#user_nazwa').addClass('blad');
  $("label[for='user_nazwa']").addClass('bladl');
 }
 else {
   $('#user_nazwa').removeClass('blad');
   $("label[for='user_nazwa']").removeClass('bladl');
 }

 if ($.trim($('#user_loginn').val()) == '') {
 puste = true;
 $('#user_loginn').addClass('blad');
 $("label[for='user_loginn']").addClass('bladl');
}
else {
  $('#user_loginn').removeClass('blad');
  $("label[for='user_loginn']").removeClass('bladl');
}

if ($.trim($('#user_email').val()) == '') {
puste = true;
$('#user_email').addClass('blad');
$("label[for='user_email']").addClass('bladl');
}
else {
 $('#user_email').removeClass('blad');
 $("label[for='user_email']").removeClass('bladl');
}

if ($.trim($('#user_password').val()) == '') {
puste = true;
$('#user_password').addClass('blad');
$("label[for='user_password']").addClass('bladl');
}
else {
 $('#user_password').removeClass('blad');
 $("label[for='user_password']").removeClass('bladl');
}


   if(puste == true)
       {
         alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
       }
       return (puste);

}


function puste_pola_agencje()
{
 var puste = false;

    if ($.trim($('#agencje_nazwa').val()) == '') {
    puste = true;
    $('#agencje_nazwa').addClass('blad');
    $("label[for='agencje_nazwa']").addClass('bladl');
   }
   else {
     $('#agencje_nazwa').removeClass('blad');
     $("label[for='agencje_nazwa']").removeClass('bladl');
   }

   if ($.trim($('#agencje_wlasciciel').val()) == '') {
   puste = true;
   $('#agencje_wlasciciel').addClass('blad');
   $("label[for='agencje_wlasciciel']").addClass('bladl');
  }
  else {
    $('#agencje_wlasciciel').removeClass('blad');
    $("label[for='agencje_wlasciciel']").removeClass('bladl');
  }

  if ($.trim($('#agencje_tel').val()) == '') {
  puste = true;
  $('#agencje_tel').addClass('blad');
  $("label[for='agencje_tel']").addClass('bladl');
 }
 else {
   $('#agencje_tel').removeClass('blad');
   $("label[for='agencje_tel']").removeClass('bladl');
 }

 if ($.trim($('#agencje_kod').val()) == '') {
 puste = true;
 $('#agencje_kod').addClass('blad');
 $("label[for='agencje_kod']").addClass('bladl');
}
else {
  $('#agencje_kod').removeClass('blad');
  $("label[for='agencje_kod']").removeClass('bladl');
}

if ($.trim($('#agencje_miasto').val()) == '') {
puste = true;
$('#agencje_miasto').addClass('blad');
$("label[for='agencje_miasto']").addClass('bladl');
}
else {
 $('#agencje_miasto').removeClass('blad');
 $("label[for='agencje_miasto']").removeClass('bladl');
}

if ($.trim($('#agencje_adres').val()) == '') {
puste = true;
$('#agencje_adres').addClass('blad');
$("label[for='agencje_adres']").addClass('bladl');
}
else {
 $('#agencje_adres').removeClass('blad');
 $("label[for='agencje_adres']").removeClass('bladl');
}

if ($.trim($('#agencje_nazwa_s').val()) == '') {
puste = true;
$('#agencje_nazwa_s').addClass('blad');
$("label[for='agencje_nazwa_s']").addClass('bladl');
}
else {
 $('#agencje_nazwa_s').removeClass('blad');
 $("label[for='agencje_nazwa_s']").removeClass('bladl');
}


   if(puste == true)
       {
         alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
       }
       return (puste);

}

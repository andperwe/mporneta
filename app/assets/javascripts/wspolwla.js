$(document).on('turbolinks:load', function() {

//  $("#dodaj_ws_link").hide();
  //$("#dodaj_tws_link").hide();
  /*$( "#dodaj_wspol" ).button({
  icons: {
  primary: "ui-icon-circle-plus"
  },
  text: false
  });

*/



  //wspolwlasciciel
/*  $( "#dodaj_wspol" ).button().on( "click", function() {
    $( "#dialog_wspol" ).dialog("open");
    $('#katw').val(2);
  });
*/
  /*$( "#usun_wsd" ).dialog({
             autoOpen: false,
             maxWidth:350,
             maxHeight: 200,
             width: 350,
             height: 200,
             modal: true,
             buttons:[ {
                         id:"usun_ws_d",
                         text: "OK",
                         click: function() {
                           $('#usun_ws_link').click();
                         }
                       },
                       {
                         id:"anuluj_usun_ws_d",
                         text: "Anuluj",
                         click: function() {
                            $('#usun_wsd').dialog( "close" );
                         }
                       }],
           open: function() {
             $('#usun_ws_d').removeClass();
             $('#usun_ws_d').addClass('btn btn-danger');
             $('#anuluj_usun_ws_d').removeClass();
             $('#anuluj_usun_ws_d').addClass('btn btn-info');
           }
  });

*/
$( "#wspolwlafd" ).dialog({
           autoOpen: false,
           maxWidth:950,
           maxHeight: 520,
           width: 950,
           height: 520,
           modal: true,
           buttons:[ {
                       id:"usun_ws",
                       text: "Usuń",
                       click: function() {
                         //$.post(this.href, {_method:'delete'}, null, "script");
                        // $("#usun_wsd").dialog( "open" );
                        $( ".komunikat_ws_u" ).dialog({
                                      autoOpen: false,
                                      maxWidth:420,
                                      maxHeight: 200,
                                      width: 420,
                                      height: 200,
                                      modal: true,
                                      buttons:[
                                              {
                                                id:"tak_kom_ws",
                                                text: "Tak",
                                                click: function() {
                                                  $('.komunikat_ws_u').dialog("close");
                                                  $('#usun_ws_link').click();
                                                }
                                              },
                                              {
                                                id:"nie_kom_ws",
                                                text: "Nie",
                                                click: function() {
                                                  $('.komunikat_ws_u').dialog("close");
                                                }
                                              }
                                            ]
                        });
                         $('div.komunikat_ws_u').html(
                           "<div class='alert alert-warning' role='alert'>"+
                            "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
                            "<strong>&nbsp Czy na pewno chcesz usunąć współwłaściciela !!!</strong></p>"+
                          "</div>"
                         );

                          $("#tak_kom_ws, #nie_kom_ws").mouseover(function() {
                                $('button').removeClass("ui-state-hover");
                          });
                          $("#tak_kom_ws, #nie_kom_ws").focus(function () {
                                $(this).removeClass("ui-state-focus");
                          });
                          $('#tak_kom_ws').removeClass();
                          $('#tak_kom_ws').addClass('btn btn-danger btn-sm');
                          $('#nie_kom_ws').removeClass();
                          $('#nie_kom_ws').addClass('btn btn-success btn-sm');
                          $('.komunikat_ws_u').dialog( "open" );
                          $("#nie_kom_ws").focus();
                      }

                   },
                   {
                     id:"zapisz_ws",
                     text: "Zapisz",
                     click: function() {
                      if (!puste_pola_wsp())
                            $('#form_r_ws').submit();
                        }
                   }
                 ],
         open: function() {

                        $('#usun_ws_link').hide();
                        $("#usun_ws, #zapisz_ws").mouseover(function() {
                              $('button').removeClass("ui-state-hover");
                        });
                        $("#usun_ws, #zapisz_ws").focus(function () {
                               $(this).removeClass("ui-state-focus");
                        });
                       $('#usun_ws').removeClass();
                       $('#usun_ws').addClass('btn btn-danger btn-sm');
                       $('#zapisz_ws').removeClass();
                       $('#zapisz_ws').addClass('btn btn-success btn-sm');

                       daty_pl();

                       $(".data").mask("9999-99-99");


                       $('#szukaj_pesel').focus(function() {
                           $('#szukaj_pesel').val('');
                           $('#szukaj_nazwisko').val('');
                        });

                        $('#szukaj_nazwisko').focus(function() {
                           $('#szukaj_pesel').val('');
                           $('#szukaj_nazwisko').val('');
                        });

                        $("#peselw").mask("99999999999");
                        $("#kodw").mask("99-999");


                        $("#nazwiskow").change(function(){
                          $("#nazwiskow").val(pierwsza_d($("#nazwiskow").val()));
                        });
                        $("#imiew").change(function(){
                          $("#imiew").val(pierwsza_d($("#imiew").val()));
                        });
                        $("#miejscowoscw").change(function(){
                           $("#miejscowoscw").val(pierwsza_d($("#miejscowoscw").val()));
                        });
                        $("#ulicaw").change(function(){
                          $("#ulicaw").val(pierwsza_d($("#ulicaw").val()));
                        });

                        szukaj_pesel();
                        szukaj_nazwisko();


                     }
                });


});

function szukaj_pesel()
{
  $('#szukaj_pesel').autocomplete({//appendTo: "#wspolwlafd",
             source:'wspolwla/rszukaj_pesel/',
            minLength:2,
             select: function(event, ui) {
            $.ajax({
             url:'wspolwla/szukaj_pesel/',
             type:'POST',
             dataType : 'json',
             data:{pesel:ui.item.value},
             success: function(data) {
                 $("#peselw").val(data['pesel']);
                 $("#nazwiskow").val(data['nazwisko']);
                 $("#imiew").val(data['imie']);
                 $("#kodw").val(data['kod']);
                 $("#miejscowoscw").val(data['miejscowosc']);
                 $("#ulicaw").val(data['ulica']);
                 $("#data_wydw").val(data['data_praw']);
                 $("#twspolwla_typ_praw_id").val(data['typ_praw_id']);
                 $("#uwagiw").val(data['uwagi']);
                 $("#peselw").focus();
              }
       });
     }
 });
}

function szukaj_nazwisko()
{
  $('#szukaj_nazwisko').autocomplete({//appendTo: "#wspolwlafd",
             source:'wspolwla/rszukaj_nazwisko/',
            minLength:2,
             select: function(event, ui) {
            $.ajax({
             url:'wspolwla/szukaj_nazwisko/',
             type:'POST',
             dataType : 'json',
             data:{id:ui.item.id},
             success: function(data) {
                 $("#peselw").val(data['pesel']);
                 $("#nazwiskow").val(data['nazwisko']);
                 $("#imiew").val(data['imie']);
                 $("#kodw").val(data['kod']);
                 $("#miejscowoscw").val(data['miejscowosc']);
                 $("#ulicaw").val(data['ulica']);
                 $("#data_wydw").val(data['data_praw']);
                 $("#twspolwla_typ_praw_id").val(data['typ_praw_id']);
                 $("#uwagiw").val(data['uwagi']);
               //  ui.item.value = '';
                 $("#peselw").focus();
              }
       });
     }
 });

}

function puste_pola_wsp()
{
  var puste = false;

  if ($('#peselw').val() == '') {
     puste = true;
     $('#peselw').addClass('blad');
     $("label[for='peselw']").addClass('bladl');
    }
    else {
      $('#peselw').removeClass('blad');
      $("label[for='peselw']").removeClass('bladl');
    }

    if ($('#nazwiskow').val() == '') {
     puste = true;
     $('#nazwiskow').addClass('blad');
     $("label[for='nazwiskow']").addClass('bladl');
    }
    else {
      $('#nazwiskow').removeClass('blad');
      $("label[for='nazwiskow']").removeClass('bladl');
    }

    if ($('#imiew').val() == '') {
     puste = true;
     $('#imiew').addClass('blad');
     $("label[for='imiew']").addClass('bladl');
    }
    else {
      $('#imiew').removeClass('blad');
      $("label[for='imiew']").removeClass('bladl');
    }

    if ($('#kodw').val() == '') {
     puste = true;
     $('#kodw').addClass('blad');
     $("label[for='kodw']").addClass('bladl');
    }
    else {
      $('#kodw').removeClass('blad');
      $("label[for='kodw']").removeClass('bladl');
    }

    if ($('#miejscowoscw').val() == '') {
     puste = true;
     $('#miejscowoscw').addClass('blad');
     $("label[for='miejscowoscw']").addClass('bladl');
    }
    else {
      $('#miejscowoscw').removeClass('blad');
      $("label[for='miejscowoscw']").removeClass('bladl');
    }

    if ($('#ulicaw').val() == '') {
     puste = true;
     $('#ulicaw').addClass('blad');
     $("label[for='ulicaw']").addClass('bladl');
    }
    else {
      $('#ulicaw').removeClass('blad');
      $("label[for='ulicaw']").removeClass('bladl');
    }

    if(puste == true)
        {
          alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
        }
        return (puste);

}

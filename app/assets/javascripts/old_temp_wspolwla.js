$(document).ready(function() {

  $( "#twspolwlafd" ).dialog({
             autoOpen: false,
             maxWidth:950,
             maxHeight: 520,
             width: 950,
             height: 520,
             modal: true,
             buttons:[ {
                         id:"usun_tws",
                         text: "Usuń",
                         click: function() {

                           //$.post(this.href, {_method:'delete'}, null, "script");
                          // $("#usun_wsd").dialog( "open" );
                          $(".komunikat_ws_u" ).dialog({
                                        autoOpen: false,
                                        maxWidth:420,
                                        maxHeight: 200,
                                        width: 420,
                                        height: 200,
                                        modal: true,
                                        buttons:[
                                                {
                                                  id:"tak_kom_tws",
                                                  text: "Tak",
                                                  click: function() {
                                                    $('.komunikat_ws_u').dialog("close");
                                                    $('#usun_tws_link').click();
                                                  }
                                                },
                                                {
                                                  id:"nie_kom_tws",
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

                            $("#tak_kom_tws, #nie_kom_tws").mouseover(function() {
                                  $('button').removeClass("ui-state-hover");
                            });
                            $("#tak_kom_tws, #nie_kom_tws").focus(function () {
                                  $(this).removeClass("ui-state-focus");
                            });
                            $('#tak_kom_tws').removeClass();
                            $('#tak_kom_tws').addClass('btn btn-danger btn-sm');
                            $('#nie_kom_tws').removeClass();
                            $('#nie_kom_tws').addClass('btn btn-success btn-sm');
                            $('.komunikat_ws_u').dialog( "open" );
                            $("#nie_kom_tws").focus();
                        }

                     },
                     {
                       id:"zapisz_tws",
                       text: "Zapisz",
                       click: function() {
                        if (!puste_pola_wsp())
                           $('#form_r_tws').submit();
                          }
                     }
                   ],
           open: function() {

                          $('#usun_tws_link').hide();
                          $("#usun_tws, #zapisz_tws").mouseover(function() {
                                $('button').removeClass("ui-state-hover");
                          });
                          $("#usun_tws, #zapisz_tws").focus(function () {
                                 $(this).removeClass("ui-state-focus");
                          });
                         $('#usun_tws').removeClass();
                         $('#usun_tws').addClass('btn btn-danger btn-sm');
                         $('#zapisz_tws').removeClass();
                         $('#zapisz_tws').addClass('btn btn-success btn-sm');

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

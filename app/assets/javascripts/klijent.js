$(document).on('turbolinks:load', function() {
t=$('#osobas-table').DataTable({
                         "dom":'<tpr>',
                        "ajax": $('#osobas-table').data('source'),
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
	                       "scrollY": 270,
                         "serverSide": true,
			                   "order": [[1,'desc']],
                         "processing": true,
                         "columnDefs": [
                                        {
                                         "targets": [0],
                                         "orderable":false,
                                         "width":"5%"
                                       },
                                        {
                                            "targets": [ 1 ],
                                            "visible": false,
                                            "searchable": false
                                        },
                                        {
                                            "targets": [ 2 ],
                                            "orderable": false,
                                            "searchable": true
                                        },
                                        {
                                            "targets": [ 3 ],
                                            "orderable": false
                                        },
                                        {
                                            "targets": [ 4 ],
                                            "orderable": false
                                        },
                                        {
                                            "targets": [ 5 ],
                                            "orderable": false
                                        },
                                        {
                                            "targets": [ 6 ],
                                            "visible": false
                                        },
                                        {
                                            "targets": [ 7 ],
                                            "orderable": false
                                        }
                                      ],
                        "createdRow": function (row, data, dataIndex){
                                                   //$('input.otworz_o').parent().find('form').addClass('test');
                                                 }
 });


//ukryj polisy przy zmianie stron
 $('#osobas-table').on( 'page.dt', function () {
   $('#polisas-table tbody').hide();
 });

 $('#osobas-table tbody').on( 'click', 'tr', function () {
 //t2.$('#polisas-table').DataTable();
    var aData = t.row( this ).data();
    if (aData != null){
      if ( !$(this).hasClass('selected') ) {
            $('#osobas-table tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');
            //$('#polisas-table').data("/polisas.json?osoba_id=10");
            //osoba_id = aData[1];
            //t2.ajax.reload();
             osoba_id = aData[1];
             osoba = aData[2];
             //alert(osoba_id);
             t2.ajax.reload();
             $('#polisas-table tbody').show();
          }
     }
    });

$('#t_szukaj_o').on('input', function() {
    $('#osobas-table tbody tr.selected').removeClass('selected');
    osoba_id = 0;
    $('#polisas-table tbody').hide();
   t.search( this.value ).draw();
});

$( "#pokaz_osoby" ).button().on( "click", function() {
  t.search( '' ).columns().search( '' ).draw();
  osoba_id = 0;
  $('#polisas-table tbody').hide();
  $('#t_szukaj_o').val('');
});

$('body').on('change',"input[type=radio][name='osoba[typ_prawny]']",function() {
       if (this.value == 1) {
         $('#osoba_typ_prawny').val(1);
         $('#firma').hide();
         $('#pesel_osoba').show();
         $('#regon').hide();
         $("label[for='regon']").hide();
       }
       if (this.value == 2) {
         $('#osoba_typ_prawny').val(2);
         $('#firma').show();
         $('#pesel_osoba').hide();
         $('#regon').show();
         $("label[for='regon']").show();
       }
       if (this.value == 3) {
         $('#osoba_typ_prawny').val(3);
         $('#firma').show();
         $('#pesel_osoba').show();
         $('#regon').show();
         $("label[for='regon']").show();
       }
   });

   $( "#osobafd" ).dialog({
              autoOpen: false,
        maxWidth:950,
              maxHeight: 645,
              width: 950,
              height: 620,
              modal: true,
              buttons:[ {
                          id:"usun_o",
                          text: "Usuń",
                          click: function() {
                            $( "#komunikat_os" ).dialog({
                                          autoOpen: false,
                                          maxWidth:420,
                                          maxHeight: 200,
                                          width: 420,
                                          height: 200,
                                          modal: true,
                                          buttons:[
                                                  {
                                                    id:"tak_kom_os",
                                                    text: "Tak",
                                                    click: function() {
                                                      $('#komunikat_os').dialog("close");
                                                      $('#usun_o_link').click();
                                                    }
                                                  },
                                                  {
                                                    id:"nie_kom_os",
                                                    text: "Nie",
                                                    click: function() {
                                                      $('#komunikat_os').dialog("close");
                                                    }
                                                  }
                                                ]
                            });
                             $('#komunikat_os').html(
                               "<div class='alert alert-warning' role='alert'>"+
                                "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
                                "<strong>&nbsp Czy na pewno chcesz usunąć osobę !!!</strong></p>"+
                              "</div>"
                             );

                              $("#tak_kom_os, #nie_kom_os").mouseover(function() {
                                    $('button').removeClass("ui-state-hover");
                              });
                              $("#tak_kom_os, #nie_kom_os").focus(function () {
                                    $(this).removeClass("ui-state-focus");
                              });
                              $('#tak_kom_os').removeClass();
                              $('#tak_kom_os').addClass('btn btn-danger btn-sm');
                              $('#nie_kom_os').removeClass();
                              $('#nie_kom_os').addClass('btn btn-success btn-sm');
                              $('#komunikat_os').dialog( "open" );
                              $("#nie_kom_os").focus();
                          }
                      },
                      {
                        id:"zapisz_o",
                        text: "Zapisz",
                        click: function() {
                          if ($('#osoba_typ_prawny').val() == 1)
                          {
                            $('#n_firmy').val('');
                          }
                          else if ($('#osoba_typ_prawny').val() == 2) {
                            $('#nazwisko').val('');
                            $('#imie').val('');
                            $('#pesel').val('');
                          }
                          if (!puste_pola_osoba())
                            $('#form_r_osoba').submit();
                        }
                      }
                    ],
        open: function() {
          $('#wyslij_email').on('click',function(e){
             e.preventDefault();
             if ($('#email').val()== null || $('#email').val() == '')
               {alert_t("Brak adresu email!");}
             else
               {window.location.href = "mailto:"+$('#email').val();}
           });

          $('#usun_o_link').hide();
          $("#usun_o, #zapisz_o").mouseover(function() {
                                             $('button').removeClass("ui-state-hover");
                                            });
          $("#usun_o, #zapisz_o").focus(function () {
                                      $(this).removeClass("ui-state-focus");
                                  });
                          $('#usun_o').removeClass();

                          //$("#item").attr('class', '');
                          $('#usun_o').addClass('btn btn-danger btn-sm');
                          $('#zapisz_o').removeClass();

                          //$("#item").attr('class', '');
                          $('#zapisz_o').addClass('btn btn-success btn-sm');
                          //maski
                           $("#kod").mask("99-999");
                           $("#nip").mask("999-999-99-99");
                           $("#kod").mask("99-999");
                           $("#pesel").mask("99999999999");
                           $("#pesel_f").mask("99999999999");
                           $("#data_wyd").mask("9999-99-99");
                           $("#kod_k").mask("99-999");
                           //z dużej
                           $('#email').change(function(){
                             if (!ValidateEmail($("#email").val())) {
                                          alert_t("Niepoprawny adres email.");
                                          $('#email').val('');
                             }
                           });

                           $('#nazwisko').change(function(){
                             $('#nazwisko').val(pierwsza_d($('#nazwisko').val()));
                           });
                           $("#imie").change(function(){
                           $("#imie").val(pierwsza_d($("#imie").val()));
                           });
                           $("#n_firmy").change(function(){
                           $("#n_firmy").val(pierwsza_d($("#n_firmy").val()));
                           });
                           $("#miejscowosc").change(function(){
                           $("#miejscowosc").val(pierwsza_d($("#miejscowosc").val()));
                           });
                           $("#ulica").change(function(){
                           $("#ulica").val(pierwsza_d($("#ulica").val()));
                           });
                           $("#miejscowosc_k").change(function(){
                           $("#miejscowosc_k").val(pierwsza_d($("#miejscowosc_k").val()));
                           });
                           $("#ulica_k").change(function(){
                           $("#ulica_k").val(pierwsza_d($("#ulica_k").val()));
                           });
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


          $('#typ_prawny > label').removeClass('active');
          if ($('#osoba_typ_prawny').val() == 1){
            $('#l1').addClass('active');
            $('#firma').hide();
            $('#pesel_osoba').show();
            $('#regon').hide();
            $("label[for='regon']").hide();
          }
          if ($('#osoba_typ_prawny').val() == 2){
            $('#l2').addClass('active');
            $('#firma').show();
            $('#pesel_osoba').hide();
            $('#regon').show();
            $("label[for='regon']").show();
         }
         if ($('#osoba_typ_prawny').val() == 3){
           $('#l3').addClass('active');
           $('#firma').show();
           $('#pesel_osoba').show();
           $('#regon').show();
           $("label[for='regon']").show();
         }

       }
   });
});

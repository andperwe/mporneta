$(document).on('turbolinks:load', function() {
  $("#m_szukaj_dataw").mask("9999-99-99");
  $("#m_szukaj_dataz").mask("9999-99-99");

  $('body').on('change',"#nr_od",function(){
    $("#nr_do").val($("#nr_od").val());
    $("#nr_do").focus();
  });

    daty_pl();

    $('#m_szukaj_num').on( 'keyup change', function () {
          t10.draw();
       });

     $('#tu').on('change',function (){
          t10.draw();
      });

    $('#dokument').on('change',function (){
          t10.draw();
      });

      $('#uzytkownik').on('change',function (){
          t10.draw();
      });

      $('#stan').on('change',function (){
        t10.draw();
      });

      $('#m_szukaj_dataw').on('keyup change',function (){
          t10.draw();
      });

      $('#m_szukaj_dataz').on('keyup change',function (){
          t10.draw();
      });

      $( "#pokaz_mag" ).button().on( "click", function() {
        $('#m_szukaj_num').val('');
        $("#tu").val("");
        $('#dokument').val("");
        $('#uzytkownik').val("");
        $('#stan').val("");
        $('#m_szukaj_dataw').val('');
        $('#m_szukaj_dataz').val('');
      });

t10=$('#magazyn').DataTable({
  "dom":'<tpr>',
  "ajax": {
    "url": "/magazyns_ajax/datatable_ajax",
    "data": function ( d ) {
      return $.extend( {}, d, {
        "numer": $('#m_szukaj_num').val(),
        "towarzystwo_id":$('#tu').val(),
        "nazwa_dr_id":$('#dokument').val(),
        "user_id":$('#uzytkownik').val(),
        "stan_id":$('#stan').val(),
        "data_wpl":$('#m_szukaj_dataw').val(),
        "data_zda":$('#m_szukaj_dataz').val()
      });
    }
  },
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
  "columnDefs": [
                       {
                         "targets": [0],
                         "orderable":false,
                         "width":"2%"
                       },
                       {
                         "targets": [1],
                         "orderable":false,
                         "width":"2%"
                       },
                       {
                              "targets": [ 2 ],
                              "visible": false
                        },
                      {
                        className: "dt-body-center",
                        "targets": [ 3 ],
                          "orderable":false,
                          "searchable":true
                      },
                      {
                        className: "dt-body-center",
                        "targets":[4],
                        "visible": true,
                        "orderable":false
                      },
                       {
                        className: "dt-body-center",
                        "targets":[5],
                        "visible": true,
                        "orderable":false
                      },
                      {
                        className: "dt-body-center",
                        "targets": [ 6 ],
                        "visible": true,
                        "orderable":false
                      },
                       {
                        className: "dt-body-center",
                        "targets":[7],
                        "visible": true,
                        "orderable":false
                      },
                      {
                        className: "dt-body-center",
                        "targets": [ 8 ],
                        "visible": true,
                        "orderable":false
                      },
                       {
                        className: "dt-body-center",
                        "targets":[9],
                        "visible": true,
                        "orderable":false
                      }
         ],
         "createdRow": function (row, data, dataIndex){
                                    //$('input.otworz_o').parent().find('form').addClass('test');
                                  }
});

$('#magazyn tbody').on( 'click', 'tr', function () {
  if ( !$(this).hasClass('selected') ) {
        $('#magazyn tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
});


});

$(document).on('turbolinks:load', function() {
t3=$('#pojazds-table').DataTable({
  "dom":'<tpr>',
  "ajax": $('#pojazds-table').data('source'),
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
  "processing": true,
  "createdRow": function (row, data, dataIndex){
                             //$('input.otworz_o').parent().find('form').addClass('test');
                           },
  "order": [[0,'desc']],
  "columnDefs": [


                 {
                  "targets": [ 0 ],
                  "visible": false,
                  "searchable":true
                 },
                 {
                     "targets": [ 1 ],
                     "orderable": false
                 },
                 {
                     "targets": [ 2 ],
                     "orderable": false
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
                     "orderable": false
                 },
                 {
                  "targets": [ 7 ],
                  "visible": false,
                  "searchable": false
                 }
          ]
});


$('#t_szukaj_rej').on('input', function() {
    $('#pojazds-table tbody tr.selected').removeClass('selected');
    polisaf_id = 0;
    $('#polisy_filtr-table tbody').hide();
   t3.search( this.value ).draw();
});

$( "#pokaz_pojazdy" ).button().on( "click", function() {
  t3.search( '' ).columns().search( '' ).draw();
  polisaf_id = 0;
  $('#polisy_filtr tbody').hide();
  $('#t_szukaj_rej').val('');
});

//ukryj polisy przy zmianie stron
 $('#pojazds-table').on( 'page.dt', function () {
   $('#polisy_filtr tbody').hide();
 });

 $('#pojazds-table tbody').on( 'click', 'tr', function () {

    var aData = t3.row( this ).data();
    if (aData != null){
      if ( !$(this).hasClass('selected') ) {
            $('#pojazds-table tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');
            polisaf_id = aData[7];
            // osoba = aData[2];
            t4.ajax.reload();
            $('#polisy_filtr tbody').show();
          }
     }
    });

  t4=$('#polisy_filtr').DataTable({
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
      "ajax":{
                "url": "/polisa_filtrs.json",
                "data": function ( d ) {
                 return $.extend( {}, d, {
                 "polisa_id": polisaf_id
} );
}
},
                               "dom":'<tr>',
	                          "scrollY": 40,
	                        "serverSide": true,
                          "createdRow": function (row, data, dataIndex){
                                                     if ( data[8] > 0  ) {
                                                                            $(row).addClass( 'stara' );
                                                                          }
                                                   },
				"order":[[1,'desc']],
				 "columnDefs": [

                        {
                          "targets": [ 0 ],
                          "orderable": false
                        },
				                {
                         "targets": [ 1 ],
                         "visible": false
                        },
                        {
                            "targets": [ 2 ],
                            "orderable": false
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
                            "orderable": false
                        },
                        {
                            "targets": [ 7 ],
                            "orderable": false
                        },
                        {
                         "targets": [ 8 ],
                         "visible": false,
                         "searchable": false
                        }
					       ]

 });
$('#polisy_filtr tbody').hide();
});

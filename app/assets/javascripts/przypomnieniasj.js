$(document).on('turbolinks:load', function() {
  $('[data-toggle="tooltip"]').tooltip(); 
     t5=$('#polisa_przyp').DataTable({
     "dom":'<tr>',
      "ajax": $('#polisa_przyp').data('source'),
      "scrollY": 219,
     "serverSide": true,
     "processing": true,
      paging: false,
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
                                 "visible": false,
                                 "orderable": false
                             },
                             {
                                 "targets": [ 6 ],
                                 "orderable": false
                             },
                             {
                              "targets": [ 7 ],
                              "searchable": false,
                              "orderable": false
                            },
                            {
                             "targets": [ 8 ],
                             "visible":false,
                             "orderable": false
                           }
                      ],
                      createdRow: function( row, data, dataIndex ) {
                                                              if ( data[7] < 5  ) {
                                                                $('td', row).eq(5).addClass('czerwony');
                                                              }
                                                              else{
												                                        if (data[7] >= 5 && data[7] <= 14){
                                                                  $('td', row).eq(5).addClass('zolty');
                                                                }
											                                          else{
                                                                  $('td', row).eq(5).addClass('zielony');
                                                                }
												                                      }
                                                            }
      //"order": [[0,'desc']]
  });


  $('#polisa_przyp tbody').on( 'click', 'tr', function () {
  //$.cookie("row_sel3",t3.row( this ).index());
  aData = t5.row( this ).data();
    if (aData != null)
    {
      if ( !$(this).hasClass('selected')  ) {
                                              t5.$('tr.selected').removeClass('selected');
                                              $(this).addClass('selected');
                                              $('input#pok_p_p').parent().attr('action', '/polisas/'+aData[0]+'/edit');
                                              $('input#pok_p_o').parent().attr('action', '/osobas/'+aData[5]+'/edit');
                                              $('#drukuj_p').attr('href', '/przypomnienias/'+aData[0]+'.pdf');
                                              if (aData[8] == '' || aData[8] == null){
                                                $('#wyslij_p').children().attr('href', '/send_polisa_mail?idp=brak');
                                              }
                                              else {
                                                 $('#wyslij_p').children().attr('href', '/send_polisa_mail?idp='+aData[0]);
                                              }
                                          }
      }
  });

$("#pok_p_pg").on('click',function(e){
   e.preventDefault();
   if ($('input#pok_p_p').parent().attr('action') == '/polisas/0/edit')
     {
       alert_t('Zaznacz którą polisę chcesz edytować !');
       e.preventDefault();
     }
    else{
       $("#pok_p_p").click();
    }
});


$("#pok_p_og").on('click',function(){
   if ($('input#pok_p_o').parent().attr('action') == '/osobas/0/edit')
     {
       alert_t('Zaznacz którą polisę chcesz edytować !');
     }
     else{
       $("#pok_p_o").click();
    }
});

$("#drukuj_p_p").on('click',function(){
  if ($('#drukuj_p').attr('href') == '/przypomnienias/0.pdf')
    {
      alert_t('Zaznacz którą polisę chcesz wydrukować !');
    }
  else {
    $('#drukuj_p').click();
  }
});

$('#wyslij_p').children().hide();

$('#wyslij_p_p').on('click',function(){
  if($('#wyslij_p').children().attr('href') == '/send_polisa_mail?class=ukryj&idp=0')
  {
    alert_t('Zaznacz którą polisę chcesz wysłać !');
  }
else {
  if ($('#wyslij_p').children().attr('href') == '/send_polisa_mail?idp=brak'){
    alert_t('Klient nie posiada adresu email !!!');
  }
  else{
    $('#wyslij_p').children().click();
  }
}
});

$('#raport_p').on('click',function(){
  $('#raport_p_l').click();
});

});

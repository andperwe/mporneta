$(document).on('turbolinks:load', function() {

var y = 0;
  if (screen.height <= 800){
    y = 135;
  }
  else {
    y = 270;
  }



  t6=$('#rata_przyp').DataTable({
     "dom":'<tr>',
      "ajax": $('#rata_przyp').data('source'),
      "scrollY": y,
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
               },

              },
              "columnDefs": [
                            {
                              "targets": [ 0 ],
                              "visible": false,
                              "searchable":false
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
                             "orderable": false
                           }
                           ,
                           {
                            "targets": [ 9 ],
                            "orderable": false,
                            "visible": false
                          },
                          {
                           "targets": [ 10 ],
                           "orderable": false
                         }
                      ],
              createdRow: function( row, data, dataIndex ) {
                                                      if ( data[10] < 5  ) {
                                                        $('td', row).eq(7).addClass('czerwony');
                                                      }
                                                      else{
                                                        if (data[10] >= 5 && data[10] <= 14){
                                                          $('td', row).eq(7).addClass('zolty');
                                                        }
                                                        else{
                                                          $('td', row).eq(7).addClass('zielony');
                                                        }
                                                      }
                                                    }
});

$('#rata_przyp tbody').on( 'click', 'tr', function () {
//$.cookie("row_sel3",t3.row( this ).index());
aData = t6.row( this ).data();
  if (aData != null)
  {
    if ( !$(this).hasClass('selected')  ) {
                                            t6.$('tr.selected').removeClass('selected');
                                            $(this).addClass('selected');
                                            $('input#pok_r_p').parent().attr('action', '/polisas/'+aData[0]+'/edit');
                                            $('input#pok_r_o').parent().attr('action', '/osobas/'+aData[1]+'/edit');
                                            $('#drukuj_r').attr('href', '/przypomnienia_rats/'+aData[0]+'.pdf');
                                            if (aData[9] == '' || aData[9] == null){
                                              $('#wyslij_r').children().attr('href', '/send_rata_mail?idp=brak');
                                            }
                                            else {
                                               $('#wyslij_r').children().attr('href', '/send_rata_mail?idp='+aData[0]);
                                            }
                                        }
    }
});

$("#pok_r_pg").on('click',function(e){
   e.preventDefault();
    $( this ).blur();
   if ($('input#pok_r_p').parent().attr('action') == '/polisas/0/edit')
     {
       alert_t('Zaznacz którą polisę chcesz edytować !');
       e.preventDefault();
     }
    else{
       $("#pok_r_p").click();
    }
});


$("#pok_r_og").on('click',function(){
   $( this ).blur();
   if ($('input#pok_r_o').parent().attr('action') == '/osobas/0/edit')
     {
       alert_t('Zaznacz którą polisę chcesz edytować !');
     }
     else{
       $("#pok_r_o").click();
    }
});

$("#drukuj_r_p").on('click',function(){
   $( this ).blur();
  if ($('#drukuj_r').attr('href') == '/przypomnienia_rats/0.pdf')
    {
      alert_t('Zaznacz którą polisę chcesz wydrukować !');
    }
  else {
    $('#drukuj_r').click();
  }
});

$('#wyslij_r').children().hide();

$('#wyslij_r_p').on('click',function(){
   $( this ).blur();
  if($('#wyslij_r').children().attr('href') == '/send_rata_mail?class=ukryj&idp=0')
  {
    alert_t('Zaznacz którą polisę chcesz wysłać !');
  }
else {
  if ($('#wyslij_r').children().attr('href') == '/send_rata_mail?idp=brak'){
    alert_t('Klient nie posiada adresu email !!!');
  }
  else{
    $('#wyslij_r').children().click();
  }
}
});


});

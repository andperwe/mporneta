$(document).on('turbolinks:load', function() {

  $('body').on("click",".nonav",function(){

     if ($('#menu_b').hasClass('glyphicon-remove'))
     {
       $('#menu_b').removeClass('glyphicon-remove');
       $('#menu_b').addClass('glyphicon-align-justify');
       $('#menu').hide();
     }
  });

t2=$('#polisas-table').DataTable({
                         "dom":'<tpr>',
                        "ajax": {
                                  "url": "/polisas.json",
                                  "data": function ( d ) {
                                   return $.extend( {}, d, {
                                   "osoba_id": osoba_id
      } );
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
			                   "order": [[1,'desc']],
                         "processing": true,
                         "columnDefs": [
                                        {
                                         "targets": [0],
                                         "orderable":false,
                                         "width":"5%",

                                       },
                                        {
                                            "targets": [ 1 ],
                                            "visible": false,
                                            "orderable": true,
                                            "searchable":true
                                        },
                                        {
                                            "targets": [ 2 ],
                                            "visible": true,
                                            "orderable": false
                                        },
                                        {
                                            "targets": [ 3 ],
                                            "orderable": false                                        }
                                        ,{
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
                                            "visible": true,
                                            "orderable": false
                                        },
                                        {
                                            "targets": [ 8 ],
                                            "visible": false
                                        },
                                        {
                                            "targets": [ 9 ],
                                            "visible": false,
                                            "searchable": true
                                        }
                                      ],
                        "createdRow": function (row, data, dataIndex){
                                                   if ( data[8] > 0  ) {
                                                                          $(row).addClass( 'stara' );
                                                                        }
                                                 }
 });


$('body').on("change",'#kto',function(){
  $('#polisa_typ_platnosci_id').val($('#kto').val());
});

$('#polisas-table tbody').hide();


 $('#polisas-table tbody').on( 'click', 'tr', function () {
      if ( !$(this).hasClass('selected') ) {
            $('#polisas-table tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
    });



   //TRyzyka table
   //kliknięty checkbox
    $('body').on("change",'[name="jest"]',function(){
    	  this.value = this.checked ? 1 : 0;
      if(this.value == 1)
      {
       $('#t2_'+$(this).parent().parent().attr('id')).show();
      }
      else {
        $('#t2_'+$(this).parent().parent().attr('id')).hide();
      }
     });

     $('body').on("focusout","select[name='cwaluta']",function(){
      $(this).hide();
      $(this).parent().children('input').val($(this).val());
      $(this).parent().children('input').show();
     });

    $('body').on("change","select[name='cwaluta']",function(){
  //alert($(this).val());
      $(this).parent().children('input').val($(this).val());
  //$(this).parent().children('input').show();
    });

    $('body').on( "focusout","input.flat",function(){
        $(this).prop('readonly', true);
    });


$('body').on("click","#TRyzyka td.edycja",function(){
      if ($(this).hasClass('blue'))
      {
        $(this).children().removeClass('blue');
        $(this).removeClass('blue');
        $(this).children().removeClass('lblue');
        $(this).removeClass('lblue');
        if ($(this).children().attr('name') == "waluta")
        {
          $(this).children('input').hide();
          $(this).children('select').show();
        }
        else
        {
          $(this).children().removeAttr('readonly');
          $(this).children().select();
         }
        }
        else
        {
         if (!$(this).children('select').is(":visible"))
         {
            $("tr > td.edycja").removeClass("lblue");
            $('#TRyzyka td > input').removeClass('lblue');
            $('#TRyzyka td').removeClass('blue');
            $('#TRyzyka td > input').removeClass('blue');
            $(this).parent().children('td.edycja').addClass('lblue');
            $(this).parent().children('td.edycja').children('input').addClass('lblue');
            $(this).removeClass('lblue');
            $(this).children('input').removeClass('lblue');
            $(this).addClass('blue');
            $(this).children('input').addClass('blue');
          }
        }
    });

$('body').on("keyup","select.ramka",function(e){
       if (e.which == 13){
         $(this).hide();
         $(this).parent().children('input').val($(this).val());
         $(this).parent().children('input').show();
         $(this).parent().addClass('lblue');
         $(this).parent().children('input').addClass('lblue');
         $(this).parent().children('input').attr('readonly', true);
         $(this).parent().next().children("input.flat").removeClass("lblue");
         $(this).parent().next().removeClass("lblue");
         $(this).parent().next().children("input.flat").removeAttr('readonly');
         $(this).parent().next().children("input.flat").focus();
         $(this).parent().next().children("input.flat").select();
       }
    });

$('body').on('focusout','input.numeric3',function(){
  var num = parseFloat($(this).val().replace(',', '.' ));
if (isNaN(num)){$(this).val('0,00')}
else
{
  $(this).val(num.toFixed(2).replace('.', ',' ));
}
});


$('body').on("keyup","input.flat",function(e){
//dol
   if (e.which == 40){new_selected=$(this).parent().parent('tr').nextAll().filter(":first");
   if(new_selected.length!=0)
     {
      $(this).removeClass('blue');
      $(this).parent().removeClass('blue');
      $('tr > td.edycja').removeClass('lblue');
      $('#TRyzyka td.edycja > input').removeClass('lblue');
      $(this).parent().parent('tr').next().children('td.edycja').addClass('lblue');
      $(this).parent().parent('tr').next().children('td.edycja').children().addClass('lblue');
      $(this).parent().parent().next().children().children('[name="'+this.name+'"]').addClass('blue');
      $(this).parent().parent().next().children().children('[name="'+this.name+'"]').parent().addClass('blue');
      $(this).parent().parent().next().children().children('[name="'+this.name+'"]').removeClass('lblue');
      $(this).parent().parent().next().children().children('[name="'+this.name+'"]').parent().removeClass('lblue');
      $(this).parent().parent().next().children().children('[name="'+this.name+'"]').focus();
        }
      }
//gora
      if (e.which == 38) {
        new_selected = $(this).parent().parent('tr').prevAll().filter(":first")
      if(new_selected.length!=0)
       {
       $(this).removeClass('blue');
       $(this).parent().removeClass('blue');
       $('tr td.edycja').removeClass('lblue');
       $('#TRyzyka td.edycja > input').removeClass('lblue');
       $(this).parent().parent().prev().children().children('input:not([name="'+this.name+'"])').addClass('lblue');
       $(this).parent().parent().prev().children().children('input:not([name="'+this.name+'"])').parent().addClass('lblue');
       $(this).parent().parent().prev().children().children('[name="'+this.name+'"]').addClass('blue');
       $(this).parent().parent().prev().children().children('[name="'+this.name+'"]').parent().addClass('blue');
       $(this).parent().parent().prev().children().children('[name="'+this.name+'"]').focus();

     }
    }
//lewo
    if (e.which == 37){
      if($(this).attr("name")!="sumau")
      {
        $(this).removeClass("blue");
        $(this).parent().removeClass("blue");
        $(this).addClass('lblue');
        $(this).parent().addClass('lblue');
        $(this).parent().prev().children("input.flat").removeClass("lblue");
        $(this).parent().prev().removeClass("lblue");
        $(this).parent().prev().children("input.flat").addClass("blue");
        $(this).parent().prev().addClass("blue");
        $(this).parent().prev().children("input.flat").addClass("blue").focus();
      }
   }
//prawo
   if (e.which == 39){
     if($(this).attr("name")!="ilosc")
     {
      $(this).removeClass("blue");
      $(this).parent().removeClass("blue");
      $(this).addClass('lblue');
      $(this).parent().addClass('lblue');
      $(this).parent().next().children("input.flat").removeClass("lblue");
      $(this).parent().next().removeClass("lblue");
      $(this).parent().next().children("input.flat").addClass("blue");
      $(this).parent().next().addClass("blue");
      $(this).parent().next().children("input.flat").addClass("blue").focus();
     }
  }
   if (e.which == 13){
     if($(this).attr("name")!="ilosc")
     {
      $(this).removeClass("blue");
      $(this).parent().removeClass("blue");
      $(this).addClass('lblue');
      $(this).attr('readonly', true);
      $(this).parent().addClass('lblue');
      $(this).parent().next().children("input.flat").removeClass("lblue");
      $(this).parent().next().removeClass("lblue");
      $(this).parent().next().children("input.flat").removeAttr('readonly');
      if ($(this).parent().next().children("input.flat").attr('name') == "waluta")
      {
        $(this).parent().next().children("input.flat").hide();
        $(this).parent().next().children("select").removeClass('lblue');
        $(this).parent().next().children("select").show();
        $(this).parent().next().children("select").focus();
      }
      else
      {
        $(this).parent().next().children("input.flat").focus();
        $(this).parent().next().children("input.flat").select();
      }
     }
   }

  if (e.which == 188 || (e.which >= 48 && e.which <= 57) )
   {

     if($(this).attr("name") == "ilosc"){
       if (e.which >= 48 && e.which <= 57){
           if ($(this).hasClass('blue')){
              $(this).removeClass('blue');
              $(this).parent().removeClass('blue');
              $(this).removeClass('lblue');
              $(this).parent().removeClass('lblue');
              $(this).removeAttr('readonly');
              $(this).val(e.key);
           }
         }
      }
      else{
        if ($(this).hasClass('blue')){
          $(this).removeClass('blue');
          $(this).parent().removeClass('blue');
          $(this).removeClass('lblue');
          $(this).parent().removeClass('lblue');
          $(this).removeAttr('readonly');
          $(this).val(e.key);
        }
   }
 }else
{
  if ($(this).attr("name") == "kodt")
  {
    if (e.which == 173 || e.which == 191 || (e.which >= 65 && e.which <= 90) )
    {
      if ($(this).hasClass('blue')){
        $(this).removeClass('blue');
        $(this).parent().removeClass('blue');
        $(this).removeClass('lblue');
        $(this).parent().removeClass('lblue');
        $(this).removeAttr('readonly');
        $(this).val(e.key);
    }

  }
}
}
});



  /*$('body').on("change",'[name="cwaluta"]',function () {
     $(this).parent().children("input").val($(this).val());
  });


  $('body').on("focusout",'[name="cwaluta"]',function () {
    $(this).hide();
    $(this).parent().children("input").show();
  });


  $('body').on("change",'[name="przypis"]',function(){
	  var sum = 0;

    $('[name="przypis"]').each(function() {
        var price = parseFloat(($(this).val()).replace(',','.'));
		if (! isNaN(price)){sum=sum+price;}
    });
	 $( "#polisafd" ).dialog( "option", "title", "Polisa "+$('#Ubezpieczony').val()+"  Suma = "+zamiana(sum.toString())+" zł" );
   $('#t2_'+$(this).parent().parent().attr('id')).children('td').children('[name="suma_rat"]').val(zamiana(this.value));
});

$('body').on("change",'[name="suma_rat"]',function(){
 $('#'+$(this).parent().parent().attr('id').substr(3)).children('td').children('[name="przypis"]').val(zamiana(this.value));
 var sum = 0;

 $('[name="przypis"]').each(function() {
     var price = parseFloat(($(this).val()).replace(',','.'));
 if (! isNaN(price)){sum=sum+price;}
 });
 $( "#polisafd" ).dialog( "option", "title", "Polisa "+$('#Ubezpieczony').val()+"  Suma = "+zamiana(sum.toString())+" zł" );
});


*/

$('body').on("change",'[name="suma_rat"]',function(){
 trr_t=$(this).parent().parent().attr('id');
 trr="#"+trr_t.substring(3);
 $(trr).children('td').children('[name="przypis"]').val(zamiana(this.value.toString()));
 var sum=0;
 $('[name="przypis"]').each(function() {
     var price = parseFloat(($(this).val()).replace(',','.'));

 if (! isNaN(price)){sum=sum+price;}
 });
  $( "#polisafd" ).dialog( "option", "title", "Polisa "+$('#Ubezpieczony').val()+"  Suma = "+zamiana(sum.toString())+" zł" );
});

$('body').on("change",'[name="przypis"]',function(){
//$(this).val(zamiana(this.value));
   var sum=0;

    $('[name="przypis"]').each(function() {
        var price = parseFloat(($(this).val()).replace(',','.'));

    if (! isNaN(price)){sum=sum+price;}
    });
	$( "#polisafd" ).dialog( "option", "title", "Polisa "+$('#Ubezpieczony').val()+"  Suma = "+zamiana(sum.toString())+" zł" );

 trr_t=$(this).parent().parent().attr('id');
 trr="#t2_"+trr_t;
  $(trr).children('td').children('[name="suma_rat"]').val(zamiana(this.value.toString()));
});

  $('body').on( "focusout","input.flat2",function(){
     $(this).prop('readonly', true);
     $(this).removeClass('edycja2');
  });

  $('body').on('change','[name="ilosc_rat"]',function(){
    $(this).parent().children('input').val($(this).find(":selected").text());
  });

  $('body').on('focusout','[name="ilosc_rat"]',function(){
    $(this).hide();
    $(this).parent().children('[name="iilosc_rat"]').show();
  });

  $('body').on( "click","input.flat2",function(e){
  if($(this).hasClass("edycja2")){e.preventDefault();}
  else{
   if(!$(this).hasClass("blue")){
	$('input.flat2').removeClass("lblue");
	$('input.flat2').removeClass("blue");
	$('.p2').removeClass("lblue");
	$('.p2').removeClass("blue");
	$(this).parent().parent().children().children('input:not([name="'+this.name+'"])').addClass('lblue');
	$(this).parent().parent().children().children('input:not([name="'+this.name+'"])').parent().addClass('lblue');
	$(this).addClass('blue');
	$(this).parent().addClass('blue');
   }
   else
   {
	$(this).parent().removeClass("blue");
	$(this).removeClass("blue");
	if (this.name == "iilosc_rat"){
	   $(this).hide();
	   $(this).parent().children("select").show();
	   $(this).parent().children("select").focus();
	}
    else{
		 	$(this).addClass('edycja2');
        	$(this).prop('readonly', false);
            $(this).select();
	}
   }
  }
});

$('body').on("change","#nr_rej",function(){
  $("#nr_rej").val(wszystkie_d($("#nr_rej").val()));
});


$('body').on("keyup","input.flat2",function(e){

  if($(this).hasClass("edycja2"))
  {
    if (e.which==37 || e.which==39){return false;}
  }
  switch(e.which)
  {
   case 37:if(this.name !='suma_rat'){
  		      $(this).removeClass('blue');
  				  $(this).parent().removeClass('blue');
  				  $(this).addClass('lblue');
  				  $(this).parent().addClass('lblue');
  				  $(this).parent().parent().children().children('[name="suma_rat"]').removeClass('lblue');
  	        $(this).parent().parent().children().children('[name="suma_rat"]').parent().removeClass('lblue');
  				  $(this).parent().parent().children().children('[name="suma_rat"]').addClass('blue');
  	        $(this).parent().parent().children().children('[name="suma_rat"]').parent().addClass('blue');
  				  $(this).parent().parent().children().children('[name="suma_rat"]').focus();
  			   }
  	       break;
    case 39:if(this.name !='iilosc_rat'){
  		       $(this).removeClass('blue');
  				   $(this).parent().removeClass('blue');
  				   $(this).addClass('lblue');
  				   $(this).parent().addClass('lblue');
  				   $(this).parent().parent().children().children('[name="iilosc_rat"]').removeClass('lblue');
  	         $(this).parent().parent().children().children('[name="iilosc_rat"]').parent().removeClass('lblue');
  				   $(this).parent().parent().children().children('[name="iilosc_rat"]').addClass('blue');
  	         $(this).parent().parent().children().children('[name="iilosc_rat"]').parent().addClass('blue');
  				   $(this).parent().parent().children().children('[name="iilosc_rat"]').focus();
  			    }
  	        break;
     case 40:{new_selected=$(this).parent().parent('tr').nextAll().filter(":visible:first");
  	          if(new_selected.length!=0)
  				 {
  					$('input.flat2').removeClass("lblue");
  	        $('select.flat2').removeClass("lblue");
  	        $('input.flat2').removeClass("blue");
  	        $('select.flat2').removeClass("blue");
  	        $('.p2').removeClass("lblue");
  	        $('.p2').removeClass("blue");
  					if(this.name=="suma_rat"){
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="suma_rat"]').addClass('blue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="suma_rat"]').parent().addClass('blue');
  				      $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="iilosc_rat"]').addClass('lblue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="iilosc_rat"]').parent().addClass('lblue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="suma_rat"]').focus();
  					}else{
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="iilosc_rat"]').addClass('blue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="iilosc_rat"]').parent().addClass('blue');
  				      $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="suma_rat"]').addClass('lblue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="suma_rat"]').parent().addClass('lblue');
  					  $(this).parent().parent('tr').nextAll(':visible:first').children('td').children('[name="iilosc_rat"]').focus();
  					}
  			  }
  			}
        break;
  case 38:{new_selected = $(this).parent().parent('tr').prevAll().filter(":visible:first")
          if(new_selected.length!=0)
  				{
  					$('input.flat2').removeClass("lblue");
  	        $('select.flat2').removeClass("lblue");
  	        $('input.flat2').removeClass("blue");
  	        $('select.flat2').removeClass("blue");
  	        $('.p2').removeClass("lblue");
  	        $('.p2').removeClass("blue");
  					if(this.name=="suma_rat"){
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="suma_rat"]').addClass('blue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="suma_rat"]').parent().addClass('blue');
  				    $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="iilosc_rat"]').addClass('lblue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="iilosc_rat"]').parent().addClass('lblue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="suma_rat"]').focus();
  					}else{
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="iilosc_rat"]').addClass('blue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="iilosc_rat"]').parent().addClass('blue');
  				    $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="suma_rat"]').addClass('lblue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="suma_rat"]').parent().addClass('lblue');
  					  $(this).parent().parent('tr').prevAll(':visible:first').children('td').children('[name="iilosc_rat"]').focus();
  					}
  			  }
  			 }
        break;
  	case 13:{if($(this).hasClass("blue")){
  					  $(this).removeClass("blue");
  					  $(this).parent().removeClass("blue");
              if (this.name == "iilosc_rat"){
  			        $(this).hide();
  			        $(this).parent().children("select").show();
  			        $(this).parent().children("select").focus();
  			      }
              else{
  						  $(this).addClass("edycja2");
  						  $(this).prop('readonly', false);
  						  $(this).select();
  						 }
  					}
  				}break;
  	 }
});

  $( "#polisafd" ).dialog({
               autoOpen: false,
               maxWidth:950,
               maxHeight: 750,//650,
               width: 950,
               height: 750,//650,
               modal: true,
               buttons:[ {
                           id:"usun_p",
                           text: "Usuń",
                           click: function() {
                             if (nowa_polisa == 1){
                               $("#komunikat_p" ).dialog({
                                             autoOpen: false,
                                             maxWidth:420,
                                             maxHeight: 220,
                                             width: 420,
                                             height: 220,
                                             modal: true,
                                             buttons:[
                                                      {
                                                       id:"nie_kom_p",
                                                       text: "Ok",
                                                       click: function() {
                                                         $('#komunikat_p').dialog("close");
                                                       }
                                                     }
                                                   ]
                              });
                              $('#komunikat_p').html(
                                "<div class='alert alert-warning' role='alert'>"+
                                 "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
                                 "<strong>&nbsp Najpierw trzeba zapisać polisę, żeby można ją było usunąć !!!</strong></p>"+
                               "</div>"
                              );
                              $("#nie_kom_p").mouseover(function() {
                                    $('button').removeClass("ui-state-hover");
                              });
                              $("#nie_kom_p").focus(function () {
                                    $(this).removeClass("ui-state-focus");
                              });
                              $('#nie_kom_p').removeClass();
                              $('#nie_kom_p').addClass('btn btn-success btn-sm');
                              $('#komunikat_p').dialog( "open" );
                              $("#nie_kom_p").focus();

                             }
                             else {
                             $("#komunikat_p" ).dialog({
                                           autoOpen: false,
                                           maxWidth:420,
                                           maxHeight: 200,
                                           width: 420,
                                           height: 200,
                                           modal: true,
                                           buttons:[
                                                   {
                                                     id:"tak_kom_p",
                                                     text: "Tak",
                                                     click: function() {
                                                       $('#komunikat_p').dialog("close");
                                                       $('#usun_pol_link').click();
                                                     }
                                                   },
                                                   {
                                                     id:"nie_kom_p",
                                                     text: "Nie",
                                                     click: function() {
                                                       $('#komunikat_p').dialog("close");
                                                     }
                                                   }
                                                 ]
                             });
                             $('#komunikat_p').html(
                               "<div class='alert alert-warning' role='alert'>"+
                                "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
                                "<strong>&nbsp Czy na pewno chcesz usunąć polisę !!!</strong></p>"+
                              "</div>"
                             );
                             $("#tak_kom_p, #nie_kom_p").mouseover(function() {
                                   $('button').removeClass("ui-state-hover");
                             });
                             $("#tak_kom_p, #nie_kom_p").focus(function () {
                                   $(this).removeClass("ui-state-focus");
                             });
                             $('#tak_kom_p').removeClass();
                             $('#tak_kom_p').addClass('btn btn-danger btn-sm');
                             $('#nie_kom_p').removeClass();
                             $('#nie_kom_p').addClass('btn btn-success btn-sm');
                             $('#komunikat_p').dialog( "open" );
                             $("#nie_kom_p").focus();
                           }
                         }
                       },
                       {
                         id:"zapisz_p",
                         text: "Zapisz",
                         click: function() {
                           if (!puste_pola_polisa()){
                             nowa_polisa = 0;
                             if ($('#wplata tbody').children().length == 0){
                               alert_t('Brak wpłat !');
                             }
                           else
                          {
                               var ryzyka=[];
                               //ZAPISZ RYZYKA
                            $('.freezetable-body > #TRyzyka tr').each(function(){
                               if($(this).find("td").eq(1).children().val()==1){
                               item={};
                               var ryz_id=$(this).attr('id');
                               item["nazwy_pol_id"] = ryz_id.substr(10,ryz_id.length);
                               item["suma_ubezp"] = $(this).find("td").eq(3).children().val();
                               item["stawka"] = $(this).find("td").eq(7).children().val();
                               item["waluta"] = $(this).find("td").eq(4).children().val();
                               item["kod_taryfy"] = $(this).find("td").eq(5).children().val();
                               item["przypis"] = $(this).find("td").eq(6).children().val();
                               item["ilosc"] = $(this).find("td").eq(8).children().val();
                               ryzyka.push(item);
                                //array
                              }
                            });
                            //  console.log(ryzyka);
                              $.ajax({
                                 url: "ryz_pol/zapisz_json",
                                 type: 'POST',
                                 contentType: 'application/json',
                                 dataType: 'json',
                                 data: JSON.stringify({"ryzykas":ryzyka})
                              });
                             $('#form_r_polisa').submit();
                          }
                        }
                      }
                    }
                     ],
         open: function() {





//zapłacił wpłatę
$("#zaplacil_rp").on("change",function(){
  this.value = this.checked ? 1 : 0;
}).change();

//usuń i zapisz buttons
$("#usun_p, #zapisz_p").mouseover(function() {
                                   $('button').removeClass("ui-state-hover");
                                  });
$("#usun_p, #zapisz_p").focus(function () {
                            $(this).removeClass("ui-state-focus");
                        });
                $('#usun_p').removeClass();

                $('#usun_p').addClass('btn btn-danger btn-sm');
                $('#zapisz_p').removeClass();

                $('#zapisz_p').addClass('btn btn-success btn-sm');

//wyłącz enter
           $('#form_r_polisa').on('keyup keypress', function(e) {
             var keyCode = e.keyCode || e.which;
             if (keyCode === 13) {
               e.preventDefault();
               //return false;
             }
           });
//datapicker
  daty_pl();
  $(".data").mask("9999-99-99");

//DATY POLISY
           $("#pocz_okr_ubez").change(function(){
                $("#d_wplaty").val($(this).val());
                 var data=$("#pocz_okr_ubez").val();
                 $("#d_wpl").val(data);
                 $("#d_wplaty").val(data);
                 var sampleDate = new Date (Date.parse (data));
                 sampleDate.setDate(sampleDate.getDate()-1);
                 var dy=sampleDate.getFullYear()+1, dm=sampleDate.getMonth()+1, dd=sampleDate.getDate();
                 if (dm<=9){dm="0"+dm;};
                 if (dd<=9){dd="0"+dd;};
                 $("#koniec_okresu_ubezp").val(dy+'-'+dm+'-'+dd);
                 sampleDate.setDate(sampleDate.getDate());
                 dy=sampleDate.getFullYear()+1, dm=sampleDate.getMonth()+1, dd=sampleDate.getDate();
                 if (dm<=9){dm="0"+dm;};
                 if (dd<=9){dd="0"+dd;};
                 $("#data_wznowienia").val(dy+'-'+dm+'-'+dd);
         });

//WSPÓŁWŁĄŚCICIEL
           $( "#dodaj_wspol" ).button().on( "click", function(e) {
              e.preventDefault();

               $("#dodaj_ws_link").click();
           });

           $(".dodaj_b").mouseover(function() {
              $('button').removeClass("ui-state-hover");
           });
           $(".dodaj_b").focus(function () {
               $(this).removeClass("ui-state-focus");
           });
           $('.dodaj_b').removeClass();
           //DLA KAZDEGO DODAĆ
           $('#dodaj_wspol').addClass('btn btn-primary btn-xs');
           $('#dodaj_wspol').tooltip();



           $('#dodaj_ws_link').hide();

           //zmiana km i kw
          $(document).on("change",'#kw',function(){
            this.value = this.checked ? 1 : 0;
            if (this.value==1){
                $("#km").val(0);
                $("#km").prop('checked', false);
             }
             else {
               $("#km").val(1);
               $("#km").prop('checked', true);
             }
           }).change();

         $(document).on("change",'#km',function(){
           this.value = this.checked ? 1 : 0;
           if (this.value==1){
              $("#kw").val(0);
              $("#kw").prop('checked', false);
           }
           else {
             $("#kw").val(1);
             $("#kw").prop('checked', true);
           }
         }).change();

         //Edycja ryzyk
         /*$('body').on( "click","input.flat",kliknij);
         $('body').on("focusout","input.flat[name=sumau]",function () {
                $(this).val(zamiana($(this).val()));
         });*/

         $("#podziel").button({
          icons: {
          primary: "ui-icon-circle-plus"
          },
          text: false
         });

         podziel();
              //var dataj=JSON.stringify(raty);
              //console.log(dataj);
             //console.log(JSON.stringify(raty));
             //var ratys=JSON.stringify(raty);
             //console.log(ratys);


       $( "#usun_p_w" ).button({
         icons: {
         primary: "ui-icon-trash"
         },
         text: false
       });

       $("#usun_p_w").on("click", function(e) {
         e.preventDefault();
         wlacz_wplaty();
         $.ajax({url: 'raty_sum/usun/',
           data:{polisa_id:$('#idpolisy').text()},
           type:'POST',
           success: function(data){
             $(".freezetable-body > #wplata tbody").empty();
             wlacz_wplaty();
           }
         });
       });

//RYSUJ NAZWY
/*
  $('#select_rp').val($('#temp_rodz_pol').val());
  var s1 = $("#select_rp option:selected").text().toLowerCase();
  if (s1.indexOf("komunikacja") >= 0 || s1.indexOf("pakietowe") >= 0)
  {
    $.ajax({
             url:  "/pojazd/rysuj_pojazd",
             type:'POST',
             data: {
                 polisa_id:$('#idpolisy').text()
             },
             success: function(data){
                $('.pojazd_partial').html(data);

             }
       });

  }
  else {
    ukryj_tab();
  }*/


//Rysuj nazwy

$.ajax({url: 'polisa/rp_select/',
  data: 'id=' + $('#select_t').val(),
  success: function(data){
    $('#rodzpol1').html(data);
    $('#select_rp').val($('#temp_rodz_pol').val());

    //RYSUJ POJAZD
    var s1 = $("#select_rp option:selected").text().toLowerCase();
    if (s1.indexOf("komunikacja") >= 0 || s1.indexOf("pakietowe") >= 0)
    {
      $.ajax({
               url:  "/pojazd/rysuj_pojazd",
               type:'POST',
               success: function(data){
                  $('.pojazd_partial').html(data);
                  daty_pl();
                  $(".data").mask("9999-99-99");
                  $('#dodaj_marke_b').addClass('btn btn-primary btn-xs');
                  $('#dodaj_marke_b').tooltip();
                  $('#dodaj_model_b').addClass('btn btn-primary btn-xs');
                  $('#dodaj_model_b').tooltip();
                  $('#dodaj_rodzaj_b').addClass('btn btn-primary btn-xs');
                  $('#dodaj_rodzaj_b').tooltip();
               }
         });
    }
    else
    {
      ukryj_tab();
    }
    }
});
//$('#temp_rodz_pol').val('');


//ZMIANA TOWAZYSTWA
           $('body').on('change','#select_t',function(){
             $('#select_rp').empty();
             $('.ttnazwy_p').empty();
             $.ajax({url: 'polisa/rp_select/',
               data: 'id=' + this.value,
               success: function(data){
                 $('#rodzpol1').html(data);

                 }
             });
             $('#temp_rodz_pol').val('');
           });

//ZMIANA NAZWY POLISY
           $('body').on("change","#select_rp",function(){
             $('#temp_rodz_pol').val(this.value);
             $('.ttnazwy_p').empty();


             $.ajax({url: 'polisa/nazwy_pol_j/',
               data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
               success: function(data){
                 $('.freezetable-body > #TRyzyka tbody').html(data);

                //  $('body').on( "change",".jest",jest);
                 $.ajax({url: 'polisa/t_rodzaj_p2/',
                   data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
                   success: function(data){
                     $('.freezetable-body > #t_rodzaj_p2 tbody').html(data);
                     $('.t2_nazwy_pol').hide();
                   }
                 });
                 }
             });
             var s1 = $("#select_rp option:selected").text().toLowerCase();
             if (s1.indexOf("komunikacja") >= 0 || s1.indexOf("pakietowe") >= 0)
             {
               pokarz_tab();
               $.ajax({
                        url:  "/pojazds/new",
                        type:'GET',
                        data: {
                            polisa_id:$('#idpolisy').text()
                        },
                        success: function(data){
                           $('.pojazd_partial').html(data);
                           daty_pl();
                           $(".data").mask("9999-99-99");
                           $('#dodaj_marke_b').addClass('btn btn-primary btn-xs');
                           $('#dodaj_marke_b').tooltip();
                           $('#dodaj_model_b').addClass('btn btn-primary btn-xs');
                           $('#dodaj_model_b').tooltip();
                           $('#dodaj_rodzaj_b').addClass('btn btn-primary btn-xs');
                           $('#dodaj_rodzaj_b').tooltip();
                        }
                  });
             }
             else {
               ukryj_tab();
             }
           });




//SZUKAJ POJAZD
$('#szukaj').autocomplete({
           source:'pojazd/rszukaj_rej/',
          minLength:2,
           select: function(event, ui) {
          $.ajax({
           url:'pojazd/szukaj_rej/',
           type:'POST',
           dataType : 'json',
           data:{nr_rej:ui.item.value},
           success: function(data) {
             daty_pl();
             $(".data").mask("9999-99-99");
               $("#nr_rej").val(data['nr_rej']);
               $('#moc').val(data['moc']);
               $('#km').val(data['km']);
               //if (data['km'] === true){$("#km").prop('checked', true);}
               //else {$("#km").prop('checked', false);}
               $('#kw').val(data['kw']);
               //if (data['kw'] == 1){$("#kw").prop('checked', true);}
               //else {$("#kw").prop('checked', false);}
               $('#marka_f').val(data['marki_poj_id']);
               $('#model_f').val(data['model_poj_id']);
               $('#rodzaj_f').val(data['rodzaj_poj_id']);
               $('#marka').val(data['marka']);
               $('#model').val(data['model']);
               $('#rodzaj').val(data['rodzaj']);
               $('#data_badan_techn').val(data['data_badan_techn']);
               $('#data_pierwszej_rej').val(data['data_pierwszej_rej']);
               $('#pojemn').val(data['pojemn']);
               $('#przebieg').val(data['przebieg']);
               $('#rok_prod').val(data['rok_prod']);
               $('#nr_nadw').val(data['nr_nadw']);
               $('#paliwo').val(data['paliwo_id']);
               $('#ilosc_miejsc').val(data['ilosc_miejsc']);
               $('#nadwozie').val(data['nadwozie_id']);
               $('#notatka').val(data['notatka']);
           }
     });
   }
});


           /*$.ajax({url: 'polisa/rp_select/',
             data: 'id=' + $('#select_t').val(),
             success: function(data){
               $('#rodzpol1').html(data);
               $('#select_rp').val($('#temp_rodz_pol').val());

               else {
                 ukryj_tab();
               }
             }
           });*/


//STARA
          if(nowa_polisa == 1){
            wlacz_wplaty();
            $('#wplata').freezeTable({
             'autoHeight': false,
             'height': 151
            });

            $('#t_wspol').freezeTable({
               'autoHeight': false,
               'height': 55
            });

          //  $('body').on( "change",".jest",jest);
            $('#TRyzyka').freezeTable({
                 'autoHeight': false,
                 'height': 101
              });

              $('#t_rodzaj_p2').freezeTable({
                 'autoHeight': false,
                  'height': 116
              });
          }
//NOWA
          else{

            $('#wplata').freezeTable({
             'autoHeight': false,
             'height': 151
            });

           $.ajax({url: 'polisa/rysuj_ws/',
             //data:{polisa_id:$('#idpolisy').text()},
             type:'POST',
             success: function(data){

               $('.twspol_p').html(data);
               $('#t_wspol').freezeTable({
                  'autoHeight': false,
                  'height': 55
               });
             }
           });


           //nazwy_ryzyk
           $.ajax({url: 'polisa/nazwy_pol_j/',
             data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
             success: function(data){
               $('.ttnazwy_p').html(data);
               $('#TRyzyka').freezeTable({
                  'autoHeight': false,
                  'height': 101
               });

               $("input.numeric3").numeric(",");
               $("input.numeric1").numeric_int();



               //rysuj_ryzyka();


               //$('body').on( "change",".jest",jest);
               $.ajax({url: 'polisa/t_rodzaj_p2/',
                 data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
                 success: function(data){
                  //freezeTable sprawdzić !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  $('.t_rodzaj_p2_tbody').html(data);
                   $('#t_rodzaj_p2').freezeTable({
                      'autoHeight': false,
                       'height': 116
                   });
                  //ukryj po wypełnieniu nazw
                   $('.t2_nazwy_pol').hide();

                   rysuj_ryzyka();
                   $("input.numeric3").numeric(",");
                   RysujWplaty();
                 }
               });
              }
             });

          /*   $.ajax({url: 'polisa/t_rodzaj_p2/',
            data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
            success: function(data){

              $('.t_rodzaj_p2_tbody').html(data);
              $('#t_rodzaj_p2').freezeTable({
                 'autoHeight': false,
                  'height': 116
              });
              $('.t2_nazwy_pol').hide();
            }
          });*/

           /**/

         }







/*

           $('body').on('focusout','input.flat',function(){
             $(this).removeClass("edycja");
             $(this).prop('readonly', true);
           });

        $('a.otworz_o').removeClass('ui-widget-content');
           //blokada tab key
        /*  $("table#TRyzyka, table#t_rodzaj_p2").keypress(function( event ) {
            if ( event.keyCode == 9 ) {
		            return false;
            }
          });*/

  /*        $('.nav.nav-tabs > li').on('click', function () {

           //$('.nav.navbar-nav > li').removeClass('active');
              var href = $(this).children("a").attr('href');//    $(this).addClass('active');
              if (href == "#tabs-3"){

                daty_pl();



                $('#kw').on('change', function(){
                 this.value = this.checked ? 1 : 0;
                 if (this.value==1){
                     $("#km").val(0);
                     $("#km").prop('checked', false);
                  }
               }).change();

               $('#km').on('change', function(){
                this.value = this.checked ? 1 : 0;
                if (this.value==1){
                   $("#kw").val(0);
                   $("#kw").prop('checked', false);
                }
              }).change();

              }
           });

	        $('body').on( "click","input.flat",kliknij);
	        $('body').on("focusout","input.flat[name=sumau]",function () {
	   			       $(this).val(zamiana($(this).val()));
	        });








          $.ajax({url: 'polisa/t_rodzaj_p2/',
            data: 'rodz_pol_id=' + $('#temp_rodz_pol').val(),
            success: function(data){

              $('.t_rodzaj_p2_tbody').html(data);
              $('#t_rodzaj_p2').freezeTable({
                 'autoHeight': false,
                  'height': 116
              });
              $('.t2_nazwy_pol').hide();
            }
          });











          //ukryj p idpolisy oraz submit
          $('#idpolisy').hide();
          $('#submit_button').hide();
           $('#usun_o_link').hide();

           $("#usun_p, #zapisz_p").mouseover(function() {
                                              $('button').removeClass("ui-state-hover");
                                             });
           $("#usun_p, #zapisz_p").focus(function () {
                                       $(this).removeClass("ui-state-focus");
                                   });
                           $('#usun_p').removeClass();

                           $('#usun_p').addClass('btn btn-danger');
                           $('#zapisz_p').removeClass();

                           $('#zapisz_p').addClass('btn btn-success');




//TEST DAT




              /*           $('#d_wpl, #d_wplaty').datepicker({
                          changeMonth: true,
                          changeYear: true,
                          dateFormat: "yy-mm-dd",
                          yearRange: "1960:2020",
                          showOn: "button",
                          buttonImage:"/assets/calendar.gif",
                          buttonImageOnly: true,
                          buttonText: "Wybierz date",
                          });
*/


    /*                      $(".data").mask("9999-99-99");
                          //TABELE SUWAK



                          RysujWplaty($('#idpolisy').text(),0);


  $("#podziel").button({
   icons: {
   primary: "ui-icon-circle-plus"
   },
   text: false
  });

  podziel();
       //var dataj=JSON.stringify(raty);
       //console.log(dataj);
      //console.log(JSON.stringify(raty));
      //var ratys=JSON.stringify(raty);
      //console.log(ratys);


$( "#usun_p_w" ).button({
  icons: {
  primary: "ui-icon-trash"
  },
  text: false
});

$("#usun_p_w").on("click", function(e) {
  e.preventDefault();
  wlacz_wplaty();
  $.ajax({url: 'raty_sum/usun/',
    data:{polisa_id:$('#idpolisy').text()},
    type:'POST',
    success: function(data){
      $(".freezetable-body > #wplata tbody").empty();
    }
  });
});


             */},
      close: function() {

         if (nowa_polisa == 1){
           $('#usun_pol_link').click();
         }
      }
    });



 });

/* function update_towarzystwos_div(towarzystwo_id) {
  jQuery.ajax({
    url: "/update_towarzystwo",
    type: "GET",
    data: {"towarzystwo_id" : towarzystwo_id},
    dataType: "html"
    success: function(data) {
      jQuery("#versionsDiv").html(data);
    }
  });
}*/

function rysuj_ryzyka()//nowa_polisa, idpol)
{
  $.ajax({
           url:  "/polisa/rysuj_ryz_pol",
            type:'POST',
      //dataType: "json",
        // data: {
          //     polisa_id:$('#idpolisy').text()
            //},
      success: function(data) {
        if (data != "")
        {
           var sum=0,przypis=0;
           //var tr_id;
           for(var i in data){
             //tr_id='#tnazwy_poli_'+data[i].tnazwy_poli_id
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="idryzyka"]').val(data[i].nazwy_pol_id);
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="jest"]').val(1);
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="jest"]').prop('checked', true);
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="jest"]').change();
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="sumau"]').val(zamiana(data[i].suma_ubezp));
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="waluta"]').val(data[i].waluta);
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="kodt"]').val(data[i].kod_taryfy);
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="przypis"]').val(zamiana(data[i].przypis));
             $('#t2_nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="suma_rat"]').val(zamiana(data[i].przypis));
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="stawka"]').val(zamiana(data[i].stawka));
             $('#nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="ilosc"]').val(data[i].ilosc);
             //trr=".trr"+data[i].idryz;
             przypis=parseFloat(data[i].przypis);
             if (! isNaN(przypis))
             sum=sum+przypis;

            //$('.freezetable-body > #t_rodzaj_p2 tr'+trr).children('td').children('[name="suma_rat"]').val(zamiana(data[i].przypis));
           }

           $( "#polisafd" ).dialog( "option", "title", "Polisa "+$('#Ubezpieczony').val()+"  Suma = "+zamiana(sum.toString())+" zł" );

           $.ajax({url: 'polisa/ilosc_rat/',
             type:'POST',
             success: function(data){
               for(var i in data){
                 if(data[i].maximum > 1){
                   $('#t2_nazwy_pol_'+data[i].nazwy_pol_id).children('td').children("select").val(data[i].maximum).change();
                   poms=$('#t2_nazwy_pol_'+data[i].nazwy_pol_id).children('td').children("select").find(":selected").text();
                   //alert(poms);
                   $('#t2_nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="iilosc_rat"]').val(poms);
                   //$('#t2_nazwy_pol_'+data[i].nazwy_pol_id).children('td').children('[name="ilosc_rat"]').val(data[i].maximum);
                    //alert('#t2_nazwy_pol_'+data[i].nazwy_pol_id);

                 }
               }
             }
           });
         }
       //var r = $.parseJSON(data);
       //console.log(r);//This is where Your users are
      }
    });
  //$('#select_rp').val($('#temp_rodz_pol').val());
  }


function zamiana(liczba)
{

	if(liczba==null)return "";
	else
	if (liczba=="")return "";
	else
	if (/[a-zA-Z]/.test(liczba)) {

	  return "0,00";

    }
	else
	{

		liczba=liczba.replace(',','.');
		liczba=liczba.replace('a','');
        liczba = parseFloat(liczba);
		if (isNaN(liczba))return "";
        liczba = liczba.toFixed(2);
        liczba = liczba.replace('.',',');
        return liczba;
	}
}


function wlacz_wplaty()
{
  $("#d_wplaty").datepicker("option", "disabled", false);
  $('#d_wplaty').attr('disabled', false);
  $('#zaplacil_rp').attr('disabled', false);
  $('#dw_wplaty').attr('disabled', false);
  $("#d_wpl").datepicker("option", "disabled", false);
  $('#d_wpl').attr('disabled', false);
  $('#kto').attr('disabled', false);
  $('#rodzaj_zaplaty').attr('disabled', false);
  $('#usun_p_w').button( "option", "disabled", true );
  $("#podziel" ).button( "option", "disabled", false );
}

function wylacz_wplaty()
{
  //
  //$('img.ui-datepicker-trigger').click(function (e) {
  //  e.preventDefault;
  //});
  $("#d_wplaty").datepicker("option", "disabled", true);
  $('#d_wplaty').attr('disabled', true);
  $('#zaplacil_rp').attr('disabled', true);
  $('#dw_wplaty').attr('disabled', true);
  $("#d_wpl").datepicker("option", "disabled", true);
  $('#d_wpl').attr('disabled', true);
  $('#kto').attr('disabled', true);
  $('#rodzaj_zaplaty').attr('disabled', true);
  $('#usun_p_w').button( "option", "disabled", false );
  $("#podziel" ).button( "option", "disabled", true );
}



function RysujWplaty(){


  $.ajax({url: 'polisa/rysuj_wplaty/',
    //data:{polisa_id:polisaid},
    type:'POST',
    success: function(data){
    //console.log(data);
      //if (ponownie == 0){
    /*  $('#wplata').freezeTable({
       'autoHeight': false,
       'height': 151
     });*/
        $('.freezetable-body > #wplata tbody').html(data);

//SUMY RAT MARTA
           var w1_suma=0, w2_suma=0, w3_suma=0, w4_suma=0, w12_suma=0;
          $('.freezetable-body > #wplata tbody > tr').each( function(){
            if ($(this).children('td.rata_nr').text() == '1') w1_suma=w1_suma+parseFloat($(this).children('td.kwota_wplaty').text().replace(',','.'));//w1_sum=w1_sum+parseFloat($(this).children('td.kwota_wplaty').text().replace(',','.n')); //w1_sum=w1_sum+parseFloat($(this).children('td.kwota_wpplaty').text());
            if ($(this).children('td.rata_nr').text() == '2') w2_suma=w2_suma+parseFloat($(this).children('td.kwota_wplaty').text().replace(',','.'));
            if ($(this).children('td.rata_nr').text() == '3') w3_suma=w3_suma+parseFloat($(this).children('td.kwota_wplaty').text().replace(',','.'));
            if ($(this).children('td.rata_nr').text() == '4') w4_suma=w4_suma+parseFloat($(this).children('td.kwota_wplaty').text().replace(',','.'));
          });

          if (w1_suma > 0 ) $('#w1_suma').html("<h6 style='color:#3f9f3f;'>Pierwsza płatność = "+ w1_suma.toFixed(2).replace('.',',') +" zł</h6>");
          if (w2_suma > 0 ) $('#w2_suma').html("<h6 style='color:#3f9f3f;'>Druga płatność = "+ w2_suma.toFixed(2).replace('.',',') +" zł</h6>");
          if (w3_suma > 0 ) $('#w3_suma').html("<h6 style='color:#3f9f3f;'>Trzecia płatność = "+ w3_suma.toFixed(2).replace('.',',') +" zł</h6>");
          if (w4_suma > 0 ) $('#w4_suma').html("<h6 style='color:#3f9f3f;'>Czwarta płatność = "+ w4_suma.toFixed(2).replace('.',',') +" zł</h6>");
          /*alert('w1='+w1_suma);
          alert('w2='+w2_suma);
          alert('w3='+w3_suma);
          alert('w4='+w4_suma);*/
      //}
      //else
      /*$('.freezetable-body > #wplata tbody').html(data);
      */
      if($(".freezetable-body > #wplata tbody > tr").length == 0){
        wlacz_wplaty();
      }
      else{
        wylacz_wplaty();
      }
    }
  });
}

function ukryj_tab()
{
    $(".pojazd_partial").empty();
  $('[href="#tabs-3"]').closest('li').hide();
  //$('#tabs-3').parent().find('li:has([href="#tabs-3"])').hide();
}

function pokarz_tab()
{
  $('[href="#tabs-3"]').closest('li').show();
}


function puste_pola_polisa()
{
 var puste_pola_polisa = false;


//POLISA

 if ($('#Ubezpieczony').val() == '') {
  puste_pola_polisa = true;
  $('#Ubezpieczony').addClass('blad');
  $("label[for='polisa_ubezpieczony']").addClass('bladl');
 }
 else {
   $('#Ubezpieczony').removeClass('blad');
   $("label[for='polisa_ubezpieczony']").removeClass('bladl');
 }

 if ($('#select_t').val() == '') {
  puste_pola_polisa = true;
  $('#select_t').addClass('blad');
  $("label[for='select_t']").addClass('bladl');
 }
 else {
   $('#select_t').removeClass('blad');
   $("label[for='select_t']").removeClass('bladl');
 }

 if ($('#numer').val() == '') {
  puste_pola_polisa = true;
  $('#numer').addClass('blad');
  $("label[for='numer']").addClass('bladl');
 }
 else {
   $('#numer').removeClass('blad');
   $("label[for='numer']").removeClass('bladl');
 }

 if ($('#data_wniosku').val() == '') {
  puste_pola_polisa = true;
  $('#data_wniosku').addClass('blad');
  $("label[for='data_wniosku']").addClass('bladl');
 }
 else {
   $('#data_wniosku').removeClass('blad');
   $("label[for='data_wniosku']").removeClass('bladl');
 }

 if ($('#select_rp').val() == '') {
  puste_pola_polisa = true;
  $('#select_rp').addClass('blad');
  $("label[for='select_rp']").addClass('bladl');
 }
 else {
   $('#select_rp').removeClass('blad');
   $("label[for='select_rp']").removeClass('bladl');
 }

 if ($('#idtypu').val() == '') {
  puste_pola_polisa = true;
  $('#idtypu').addClass('blad');
  $("label[for='idtypu']").addClass('bladl');
 }
 else {
   $('#idtypu').removeClass('blad');
   $("label[for='idtypu']").removeClass('bladl');
 }

 if ($('#pocz_okr_ubez').val() == '') {
  puste_pola_polisa = true;
  $('#pocz_okr_ubez').addClass('blad');
  $("label[for='pocz_okr_ubez']").addClass('bladl');
 }
 else {
   $('#pocz_okr_ubez').removeClass('blad');
   $("label[for='pocz_okr_ubez']").removeClass('bladl');
 }

 if ($('#koniec_okresu_ubezp').val() == '') {
  puste_pola_polisa = true;
  $('#koniec_okresu_ubezp').addClass('blad');
  $("label[for='koniec_okresu_ubezp']").addClass('bladl');
 }
 else {
   $('#koniec_okresu_ubezp').removeClass('blad');
   $("label[for='koniec_okresu_ubezp']").removeClass('bladl');
 }

 if ($('#data_wystawienia').val() == '') {
  puste_pola_polisa = true;
  $('#data_wystawienia').addClass('blad');
  $("label[for='data_wystawienia']").addClass('bladl');
 }
 else {
   $('#data_wystawienia').removeClass('blad');
   $("label[for='data_wystawienia']").removeClass('bladl');
 }

 if ($('#data_wprowadzenia').val() == '') {
  puste_pola_polisa = true;
  $('#data_wprowadzenia').addClass('blad');
  $("label[for='data_wprowadzenia']").addClass('bladl');
 }
 else {
   $('#data_wprowadzenia').removeClass('blad');
   $("label[for='data_wprowadzenia']").removeClass('bladl');
 }

 if ($('#data_wznowienia').val() == '') {
  puste_pola_polisa = true;
  $('#data_wznowienia').addClass('blad');
  $("label[for='data_wznowienia']").addClass('bladl');
 }
 else {
   $('#data_wznowienia').removeClass('blad');
   $("label[for='data_wznowienia']").removeClass('bladl');
 }

//Pojazd
var s1 = $("#select_rp option:selected").text().toLowerCase();
if (s1.indexOf("komunikacja") >= 0 || s1.indexOf("pakietowe") >= 0)
{
    if ($('#nr_rej').val() == '') {
     puste_pola_polisa = true;
     $('#nr_rej').addClass('blad');
     $("label[for='nr_rej']").addClass('bladl');
    }
    else {
      $('#nr_rej').removeClass('blad');
      $("label[for='nr_rej']").removeClass('bladl');
    }

    if ($('#marka').val() == '') {
     puste_pola_polisa = true;
     $('#marka').addClass('blad');
     $("label[for='marka']").addClass('bladl');
    }
    else {
      $('#marka').removeClass('blad');
      $("label[for='marka']").removeClass('bladl');
    }

    if ($('#model').val() == '') {
     puste_pola_polisa = true;
     $('#model').addClass('blad');
     $("label[for='model']").addClass('bladl');
    }
    else {
      $('#model').removeClass('blad');
      $("label[for='model']").removeClass('bladl');
    }

    if ($('#rodzaj').val() == '') {
     puste_pola_polisa = true;
     $('#rodzaj').addClass('blad');
     $("label[for='rodzaj']").addClass('bladl');
    }
    else {
      $('#rodzaj').removeClass('blad');
      $("label[for='rodzaj']").removeClass('bladl');
    }

    if ($('#pojemn').val() == '') {
     puste_pola_polisa = true;
     $('#pojemn').addClass('blad');
     $("label[for='pojemn']").addClass('bladl');
    }
    else {
      $('#pojemn').removeClass('blad');
      $("label[for='pojemn']").removeClass('bladl');
    }

    if ($('#rok_prod').val() == '') {
     puste_pola_polisa = true;
     $('#rok_prod').addClass('blad');
     $("label[for='rok_prod']").addClass('bladl');
    }
    else {
      $('#rok_prod').removeClass('blad');
      $("label[for='rok_prod']").removeClass('bladl');
    }

    if ($('#nr_nadw').val() == '') {
     puste_pola_polisa = true;
     $('#nr_nadw').addClass('blad');
     $("label[for='nr_nadw']").addClass('bladl');
    }
    else {
      $('#nr_nadw').removeClass('blad');
      $("label[for='nr_nadw']").removeClass('bladl');
    }
}
if(puste_pola_polisa == true)
    {
      alert_t('Wszystkie pola na żółto powinny być wypełnione. Proszę uzupełnić dane i spróbować jeszcze raz.');
    }
    return (puste_pola_polisa)
}

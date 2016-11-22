$(document).ready(function() {
$( "#platnosc" ).dialog({//formularz płatność
  autoOpen: false,
  height: 550,
  width: 580,
  modal: true,
  open: function( event, ui ) {//$.cookie("zmag_dww",null);
                               //tmag_dww=$('#dow_wpl').val();
                               $(".data" ).datepicker({
                               changeMonth: true,
                               changeYear: true,
                               dateFormat: "yy-mm-dd",
                               yearRange: "1960:2020",
                               showOn: "button",
                               buttonImage:"/assets/calendar.gif",
                               buttonImageOnly: true,
                               buttonText: "Wybierz date"
                               });

                               $("#zapisz_raty, #zapisz_rata").mouseover(function() {
                                    $('button').removeClass("ui-state-hover");
                               });
                               $("#zapisz_raty, #zapisz_rata").focus(function () {
                                  $(this).removeClass("ui-state-focus");
                               });
                               $('#zapisz_raty').removeClass();
                               $('#zapisz_raty').addClass('btn btn-default btn-sm');
                               $('#zapisz_rata').removeClass();
                               $('#zapisz_rata').addClass('btn btn-primary btn-sm');

                             },
  buttons: [
            {
             id:"zapisz_raty",
             text: "Zapisz do pozostałych rat",
             click: function() {
              /*nr_raty
              przypominac
              data_plat
              dow_wpl
              data_wpl
              zaplacil_r
              rozliczona_z_tu
              data_roz
              rozliczona_z_owca */
              $.ajax({
                 url: "raty_sum/zapisz_raty",
                 type: 'POST',
                 data:{nr_raty:$('#nr_raty').val(), przypominac:$('#przypominac').val(), data:$('#data_plat').val(), nr_dw:$('#dow_wpl').val(), data_w:$('#data_wpl').val(), zapl:$('#zaplacil_r').val(), rozliczona:$('#rozliczona_z_tu').val(), data_roz:$('#data_roz').val(), roz_owca:$('#rozliczona_z_owca').val()}
              });
              $('#kwota_r').val($('#kwota_r').val().replace(',', '.'));
              $('#form_rata').submit();
             }
            },
            {
              id:"zapisz_rata",
              text: "Zapisz",
              click: function() {

                $('#kwota_r').val($('#kwota_r').val().replace(',', '.'));
                $('#form_rata').submit();
             }
           }]

          /*'Zapisz do pozostałych rat':function(){
				                                    var nowa_polisa=$.cookie("nowa_polisa");
													$.ajax({
                                                    url:'../../php/polisa/zapisz_rate_poz.php',
                                                    type:'POST',
                                                    dataType : 'json',
                                                    data:{idpolisy:$("#idp").val(),nr_raty:$("#nr_raty").val(),nowa_polisa:nowa_polisa,data_plat:$("#data_plat").val(),zaplacil:$("#zaplacil").val(),dow_wpl:$("#dow_wpl").val(),f_platn:$("#f_platn").val(),kto_sp:$("#kto_sp").val(),data_wpl:$("#data_wpl").val(),rozliczona_z_tu:$("#rozliczona_z_tu").val(),data_roz_z_tu:$("#data_roz_z_tu").val(),rozliczona_z_owca:$("#rozliczona_z_owca").val(),przypominac:$("#przypominac_r").val()},
                                                    success: function(data) {
														         rysuj_raty($("#idp").val());
										            }
													});
			                                      },
            'Zapisz': function(){

								 /*var nowa_polisa=$.cookie("nowa_polisa");
								 var kwota=$("#kwota_r").val();
								 kwota=kwota.replace(',','.');

								 $.ajax({
                                         url:'../../php/polisa/zapisz_rate.php',
                                         type:'POST',
                                         dataType : 'json',
                                         data:{idfraty:$("#idfraty").val(),nowa_polisa:nowa_polisa,kwota_r:kwota,data_plat:$("#data_plat").val(),zaplacil:$("#zaplacil").val(),dow_wpl:$("#dow_wpl").val(),f_platn:$("#f_platn").val(),kto_sp:$("#kto_sp").val(),data_wpl:$("#data_wpl").val(),rozliczona_z_tu:$("#rozliczona_z_tu").val(),data_roz_z_tu:$("#data_roz_z_tu").val(),rozliczona_z_owca:$("#rozliczona_z_owca").val(),przypominac:$("#przypominac_r").val()},
                                         success: function(data) {
											                       kwota=data.replace('.',',');
											                       zaznaczony.find("td:eq(3)").text(kwota);
																   zaznaczony.find("td:eq(4)").text($("#data_plat").val());
																   if ($("#zaplacil").val()== 1)
																   {
																	zaznaczony.find("td:eq(5) input").prop('checked',true);
                                                                    zaznaczony.find("td:eq(5) input").val(1);
																   }
																   else
																   {
																	zaznaczony.find("td:eq(5) input").prop('checked',false);
																	zaznaczony.find("td:eq(5) input").val(0);
																   }


				                                                   zaznaczony.find("td:eq(6)").text($("#dow_wpl").val());
																    var f_platn=$("#f_platn option:selected").text();
																	zaznaczony.find("td:eq(7)").text(f_platn);
																	var kto_sp=$("#kto_sp option:selected").text();
																	zaznaczony.find("td:eq(8)").text(kto_sp);
																	if ($("#przypominac_r").val()== 1)
																	{
																	  zaznaczony.find("td:eq(12) input").prop('checked',true);
																	  zaznaczony.find("td:eq(12) input").val(1);
																	}
																   	else
																	{
																	  zaznaczony.find("td:eq(12) input").prop('checked',false);
																	  zaznaczony.find("td:eq(12) input").val(0);
																	}


																   //alert(zaznaczony.find("td:eq(3)").html());

                                                                  //$("#platnosc").dialog( "close" );
                                                                  //rysuj_wplaty($('#idp').val());
                                                                  //$("#czekaj").hide();
                                                                 }
                                        });
                                  /*$("#czekaj").show();
                                     suma=$("#kwota_r").val();
                                     suma=suma.replace(',','.');
                                     var nowa_polisa=$.cookie("nowa_polisa");
                                     $.ajax({
                                             url:'../../php/polisa/zapisz_w.php',
                                             type:'POST',
                                             dataType : 'json',
                                             data:{id:$("#idw").val(),kwota_r:suma,data_plat:$("#data_plat").val(),zaplacil:$("#zaplacil").val(),dow_wpl:$("#dow_wpl").val(),przypominac:$("#przypominac_r").val(),kto:$("#kto_sp").val(),d_wpl:$("#data_wpl").val(),nowa_polisa:nowa_polisa,zmag_dww:$.cookie("zmag_dww"),idtu:$("#TU").val(),userid:$('#iduser_t').val()},
                                             success: function(data) {
                                                                      $("#platnosc").dialog( "close" );
                                                                      rysuj_wplaty($('#idp').val());
                                                                      $("#czekaj").hide();
                                                                     }
                                           });*/


 });

 });


function podziel()
{
  $("#podziel").on("click", function(e) {
    e.preventDefault();
    //wylacz_wplaty();
    if ($('.freezetable-body > #t_rodzaj_p2 tr:visible').length == 0){alert_t("Wybierzy wcześniej ryzyka!");}
    else{
      if ($('#d_wplaty').val() == "" || $('#kto').val() == "" || $('#rodzaj_zaplaty').val() == "") alert_t("Wypełnij wszystkie pola");
      else{
         var raty=[];
         var p_rata=0;
         var o_rata=0;

         $('.freezetable-body > #t_rodzaj_p2 tr').each(function(){

         if ($(this).is(':visible')){
           //alert($(this).find("td").eq(2).children('select').val());

		       if($(this).find("td").eq(2).children('select').val()==1){
            item={};
			      item["data"]=$('#d_wplaty').val();
			      item["zapl"]=$('#zaplacil_rp').val();
			      item["nr_dw"]=$('#dw_wplaty').val();
			      item["nr_raty"]='1';
			      item["rodzaj_platnosci_id"]=$('#rodzaj_zaplaty').val();
			      item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			      var suma=$(this).find("td").eq(1).children('input').val();
			      suma=suma.replace(',','.');
			      item["kwota"]=suma;
			      item["data_w"]=$('#d_wpl').val();
			      item["typ_platnosci_id"]=$('#kto').val();
			      //item["nr_wykazu"]=$('#nr_wykazu').val();
			      raty.push(item);
		       }

		       if($(this).find("td").eq(2).children('select').val()==2){
		        item={}
			      item["data"]=$('#d_wplaty').val();
			      item["zapl"]=$('#zaplacil_rp').val();
			      item["nr_dw"]=$('#dw_wplaty').val();
			      item["nr_raty"]='1';
			      item["rodzaj_platnosci_id"]=$('#rodzaj_zaplaty').val();
			      item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			      var suma=$(this).find("td").eq(1).children('input').val();
			      suma=suma.replace(',','.');
     		    var rata=Math.round(suma / 2).toString();
            if ((suma-rata) > rata){
				      p_rata=suma-rata;
				      o_rata=rata;
			      }else{
				      o_rata=suma-rata;
				      p_rata=rata;
			      }
			      item["kwota"]=p_rata;
			      item["data"]=$('#d_wpl').val();
			      item["typ_platnosci_id"]=$('#kto').val();
			      //item["nr_wykazu"]=$('#nr_wykazu').val();
            raty.push(item);
			      item={}
			      var r2_rata = new Date($('#d_wplaty').val());
			      r2_rata.setMonth(r2_rata.getMonth() + 6);
			      r2_rata=$.datepicker.formatDate('yy-mm-dd', r2_rata);
			      item["data"]=r2_rata;
			      item["zapl"]=0;
			      item["nr_dw"]="";
			      item["nr_raty"]='2';
			      item["rodzaj_platnosci_id"]="2";
			      item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			      item["kwota"]=o_rata;
			      item["data_w"]='';
			      item["typ_platnosci_id"]='2';
			      //item["nr_wykazu"]='';
            raty.push(item);
		       }

		       if($(this).find("td").eq(2).children('select').val()==4){
		        item={}
			      item["data"]=$('#d_wplaty').val();
			      item["zapl"]=$('#zaplacil_rp').val();
			      item["nr_dw"]=$('#dw_wplaty').val();
			      item["nr_raty"]='1';
			      item["rodzaj_platnosci_id"]=$('#rodzaj_zaplaty').val();
			      item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			      var suma=$(this).find("td").eq(1).children('input').val();
			      suma=suma.replace(',','.');
			      var rata=Math.round(suma / 4).toString();
			      var t=rata * 3;

			      if (((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length))) > rata){
				      p_rata=((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length)));
				      o_rata=rata;
			      }else{
				      o_rata=((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length)));
				      p_rata=rata;
			      }

			      item["kwota"]=p_rata;
			      item["data_w"]=$('#d_wpl').val();
			      item["typ_platnosci_id"]=$('#kto').val();
			      //item["nr_wykazu"]=$('#nr_wykazu').val();
            raty.push(item);
			      for(var i=1;i < 4;i++)
			      {
		         item={}
			       var r2_rata = new Date($('#d_wplaty').val());
			       r2_rata.setMonth(r2_rata.getMonth() + (3*i));
			       r2_rata=$.datepicker.formatDate('yy-mm-dd', r2_rata);
			       item["data"]=r2_rata;
			       item["zapl"]=0;
			       item["nr_dw"]="";
			       item["nr_raty"]=i+1;
			       item["rodzaj_platnosci_id"]="2";
			       item["nazwy_pol_id"]=$(this).attr('id').substring(13);

			       if (i != 3) {
				       item["kwota"]=rata;
			       }
             else{
				       item["kwota"]=o_rata;
			       }
			       item["data_w"]='';
			       item["typ_platnosci_id"]='2';
			       //item["nr_wykazu"]='';
             raty.push(item);
			      }
		       }

           if($(this).find("td").eq(2).children('select').val()==12){
			       item={}
			       item["data"]=$('#d_wplaty').val();
			       item["zapl"]=$('#zaplacil_rp').val();
			       item["nr_dw"]=$('#dw_wplaty').val();
			       item["nr_raty"]='1';
			       item["rodzaj_platnosci_id"]=$('#rodzaj_zaplaty').val();
			       item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			       var suma=$(this).find("td").eq(1).children('input').val();
			       suma=suma.replace(',','.');
			       var rata=Math.round(suma / 12).toString();
			       var t=rata * 11;
			       if (((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length))) > rata){
				       p_rata=((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length)));
				       o_rata=rata;
			       }else{
				      o_rata=((suma.substring(0,suma.length-3)-t)+'.'+(suma.substring(suma.length-2,suma.length)));
				      p_rata=rata;
			       }
			       item["kwota"]=p_rata;
			       item["data_w"]=$('#d_wpl').val();
			       item["typ_platnosci_id"]=$('#kto').val();
			       //item["nr_wykazu"]=$('#nr_wykazu').val();
             raty.push(item);
			       for(var i=1;i < 12;i++)
			       {
		          item={}
			        var r2_rata = new Date($('#d_wplaty').val());
			        r2_rata.setMonth(r2_rata.getMonth() + i);
			        r2_rata=$.datepicker.formatDate('yy-mm-dd', r2_rata);
			        item["data"]=r2_rata;
			        item["zapl"]=0;
			        item["nr_dw"]="";
			        item["nr_raty"]=i+1;
			        item["rodzaj_platnosci_id"]="2";
			        item["nazwy_pol_id"]=$(this).attr('id').substring(13);
			        if (i != 11) {
				        item["kwota"]=rata;
			        }
              else{
				        item["kwota"]=o_rata;
			        }
			        item["data_w"]='';
			        item["typ_platnosci_id"]='2';
			        //item["nr_wykazu"]='';
              raty.push(item);
			       }
		       }
	       }
       });

       $.ajax({
          url: "raty_sum/zapisz_json",
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({"ratys":raty}),
          success: function(){
           RysujWplaty();

          /*  if (nowa_polisa == 1 && raty_sum == 0)
            {RysujWplaty(0);raty_sum=raty_sum + 1;}
            else
            {RysujWplaty(1);}*/
          }
       });

      }
    }

  });
}

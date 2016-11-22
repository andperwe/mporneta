$(document).on('turbolinks:load', function() {
$( "#szukaj_pol" ).dialog({
  autoOpen: false,
  height: 370,
  width: 600,
  modal: true,
  open: function(){
    $('input.o_szuk_pol').hide();
  },
  buttons:[
           {
             id:"szukaj_pol_b",
             text: "Szukaj",
              click: function() {
                                 if ($.trim($("#szukanapol").val())=='')
                                  {
                                   alert_t("Wprowadź szukaną polisę!");
                                   $("#szukanapol").val('');
                                  }
                                 else
                                  {
                                   switch($("input:radio[name ='polisas']:checked").val())
                                   {
                                    case '1':{
				                                       $.ajax({
						                                   url:'polisa/szukaj_nr_pol',//zmienic php wszystkie i pokaz_polise
						                                   type:'GET',
						                                   dataType : 'json',
						                                   data:{numer:$("#szukanapol").val()},
						                                   success: function(data) {
									                                                      if(data === 0)
                                                                        {
                                                                         alert_t("Nie ma takiej polisy!");
                                                                         $("#szukanapol").val('');
                                                                         }
									                                                       else
                                                                         {
                                                                          $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                                          $('input.o_szuk_pol').click();
                                                                          //pokaz_polise(data);
                                                                         }
									                                                      }
						                                     });
				                                        }break;
                                    case '2':{
				                                      $.ajax({
						                                  url:'polisa/szukaj_dw',
						                                  type:'GET',
						                                  dataType : 'json',
						                                  data:{dw:$("#szukanapol").val()},
						                                  success: function(data) {
                                                                       if(data === 0)
                                                                       {
                                                                        alert_t("Nie ma takiej polisy!");
                                                                        $("#szukanapol").val('');
                                                                       }
										                                                   else
                                                                       {
                                                                         $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                                         $('input.o_szuk_pol').click();
                                                                       }
							         	                                              }
						                                  });
				                                     }break;
                                    case '3':{
                                              $.ajax({
						                                  url:'polisa/szukaj_certyfikat',
						                                  type:'GET',
						                                  dataType : 'json',
						                                  data:{certyfikat:$("#szukanapol").val()},
						                                  success: function(data) {
                                                                       if(data === 0)
                                                                       {
                                                                        alert_t("Nie ma takiej polisy!");
                                                                        $("#szukanapol").val('');
                                                                       }
										                                                   else
                                                                       {
                                                                         $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                                         $('input.o_szuk_pol').click();
                                                                       }
									                                                    }
						                                  });
                                             }break;
                                    case '4':{
                                              $.ajax({
						                                           url:'polisa/szukaj_pl',
						                                           type:'GET',
						                                           dataType : 'json',
						                                           data:{pl:$("#szukanapol").val()},
						                                           success: function(data) {
                                                                                if(data === 0)
                                                                                 {
                                                                                  alert_t("Nie ma takiej polisy!");
                                                                                  $("#szukanapol").val('');
                                                                                 }
										                                                             else
                                                                                 {
                                                                                   $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                                                   $('input.o_szuk_pol').click();
                                                                                 }
									                                                             }
						                                   });
                                             }break;
                                    case '5':{
                                              $.ajax({
						                                          url:'polisa/szukaj_kod_typu_klienta',
						                                          type:'GET',
						                                          dataType : 'json',
						                                          data:{ktk:$("#szukanapol").val()},
						                                          success: function(data) {
                                                                               if(data === 0)
                                                                                {
                                                                                 alert_t("Nie ma takiej polisy!");
                                                                                 $("#szukanapol").val('');
                                                                                }
										                                                            else
                                                                                {
                                                                                  $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                                                  $('input.o_szuk_pol').click();
                                                                                }
									                                                             }
						          });
				             }break;
            case '6':{
					            $.ajax({
						                  url:'polisa/szukaj_nr_rej',
						                  type:'GET',
						                  dataType : 'json',
						                  data:{nr_rej:$("#szukanapol").val()},
						                  success: function(data) {
                                                        if(data === 0)
                                                        {
                                                         alert_t("Nie ma takiej polisy!");
                                                         $("#szukanapol").val('');
                                                        }
										                                    else
                                                        {
                                                          $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                          $('input.o_szuk_pol').click();
                                                        }
									                                     }
						            });
				               }break;
              case '7':{
					              $.ajax({
						                    url:'polisa/szukaj_nr_nadwozia',
						                    type:'GET',
						                    dataType : 'json',
						                    data:{nr_nadw:$("#szukanapol").val()},
						                    success: function(data) {
                                                         if(data === 0)
                                                         {
                                                          alert_t("Nie ma takiej polisy!");
                                                          $("#szukanapol").val('');
                                                         }
										                                     else
                                                         {
                                                           $('input.o_szuk_pol').parent().attr('action', '/polisas/'+data+'/edit');
                                                           $('input.o_szuk_pol').click();
                                                         }
									                                      }
						               });
				 	                }break;
                                    default:alert_t("Proszę zaznaczyć rodzaj szukanych danych!");
                                   }
                                  }
                               }
          }]
});

$("#szukaj_pol_b").mouseover(function() {
   $('button').removeClass("ui-state-hover");
});
$("#szukaj_pol_b").focus(function () {
    $(this).removeClass("ui-state-focus");
});
$('#szukaj_pol_b').removeClass();
$('#szukaj_pol_b').addClass('btn btn-primary');

});

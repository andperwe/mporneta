function podziel()
{
  $("#podziel").on("click", function(e) {
    $(this).button( "option", "disabled", true );
    e.preventDefault();
    //wylacz_wplaty();
    if ($('.freezetable-body > #t_rodzaj_p2 tr:visible').length == 0){alert_t("Wybierzy wcześniej ryzyka!");  $("#podziel" ).button( "option", "disabled", false );}
    else{
      if ($('#d_wplaty').val() == "" || $('#kto').val() == "" || $('#rodzaj_zaplaty').val() == "") {alert_t("Wypełnij wszystkie pola");   $("#podziel" ).button( "option", "disabled", false );}
      else{

        if (zmiana_tu == 1){
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
                                  podziel_i_rysuj();
                                }
                              },
                              {
                                id:"nie_kom_p",
                                text: "Nie",
                                click: function() {
                                  $('#komunikat_p').dialog("close");
                                    $("#podziel" ).button( "option", "disabled", false );
                                }
                              }
                            ]
        });
        $('#komunikat_p').html(
          "<div class='alert alert-warning' role='alert'>"+
           "<p class='text-center'><span class='glyphicon glyphicon-bell' aria-hidden='true'></span>"+
           "<strong>&nbsp Czy na pewno chcesz zmienić wpłaty? Zmiany będą nie odwracalne!!!</strong></p>"+
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
else {
  podziel_i_rysuj();
}




      }
    }

  });
}



function podziel_i_rysuj()
{
  $.ajax({
          url: 'raty_sum/usun/',
          type:'POST'
  });

   var raty=[];
   var p_rata=0;
   var o_rata=0;

   if (zmag_dw == 1)
   {
      $('#polisa_zmag_dw').val(true);
      $.ajax({
              url: "/polisa/zmiana_tu",
              type: 'POST',
              data:{numer:$('#dw_wplaty').val(),towarzystwo_id:$('#select_t').val(), nazwa_dr_id:4, zmag:1}
      });
   }

   $('.freezetable-body > #t_rodzaj_p2 tr').each(function(){

   if ($(this).is(':visible')){
     //alert($(this).find("td").eq(2).children('select').val());

     if($(this).find("td").eq(2).children('select').val()==1){
      item={};
      item["data"]=$('#d_wplaty').val();
      item["zapl"]=$('#zaplacil_rp').val();
      item["nr_dw"]=$('#dw_wplaty').val();
      item["nr_raty"]='1';
      if ($('#dw_wplaty').val() != '')
      item["zmag_dw"] = "true";
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
      if ($('#dw_wplaty').val() != '')
      item["zmag_dw"] = "true";
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
      if ($('#dw_wplaty').val() != '')
      item["zmag_dw"] = "true";
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
       if ($('#dw_wplaty').val() != '')
       item["zmag_dw"] = "true";
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

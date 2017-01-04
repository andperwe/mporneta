// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui/autocomplete
//= require jquery-ui/datepicker
//= require jquery-ui/dialog
//= require twitter/bootstrap
//= require jquery-fileupload
//= require dataTables/jquery.dataTables
//= require turbolinks
//= require_tree .

$(document).ajaxError(function(e, error) {
switch(error.status) {

   case 401: {
    window.location.href = '/users/sign_in';
    }
}
});



$.fn.dataTableExt.sErrMode = 'none';

$.rails.allowAction = function(link){
  if (link.data("confirm") == undefined){
    return true;
  }
  $.rails.showConfirmationDialog(link);
  return false;
}

$.rails.confirmed = function(link){
  link.data("confirm", null);
  link.trigger("click.rails");
}




var t, t2, t3, t4,t5, t6,t10, osoba_id=0, osoba="", nowa_polisa=1, raty_sum=0, polisaf_id=0, nowa_agencja=1;
var zmag_dw = 0;
var zapisano_pol = 0;
var zmiana_tu = 0;
$.fn.bootstrapBtn = $.fn.button.noConflict();


function ValidateEmail(email) {
       var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
       return expr.test(email);
};

$.datepicker.regional['pl'] = {
       closeText: 'Zamknij',
       prevText: '&#x3c;Poprzedni',
       nextText: 'Następny&#x3e;',
       currentText: 'Dziś',
       monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
       'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
       monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
       'Lip','Sie','Wrz','Pa','Lis','Gru'],
       dayNames: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
       dayNamesShort: ['Nie','Pn','Wt','Śr','Czw','Pt','So'],
       dayNamesMin: ['N','Pn','Wt','Śr','Cz','Pt','So'],
       weekHeader: 'Tydz',
       dateFormat: 'dd.mm.yy',
       firstDay: 1,
       isRTL: false,
       showMonthAfterYear: false,
       yearSuffix: ''};
       $.datepicker.setDefaults($.datepicker.regional['pl']);

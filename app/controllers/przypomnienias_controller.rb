class PrzypomnieniasController < ApplicationController
  before_action :authenticate_user!
  layout 'bez_dodaj_op'
  def index

    respond_to do |format|
      format.json { render json: PrzypomnieniaDatatable.new(view_context) }
      format.html
    end
  end

 def show
   respond_to do |format|
     @polisa = Polisa.select("polisas.id, ubezpieczony, numer, data_wznowienia, typ").joins(:towarzystwo, :rodz_pol ).find(params[:id])
     @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)
     @raporty = Raporty.find(1)
     unless @pol_auto.nil?
       @rej = Pojazd.find_by('id' => @pol_auto.pojazd_id)
     end
     format.pdf do
       render pdf: "file_name"   # Excluding ".pdf" extension.
     end
   end
 end


 def raport
   respond_to do |format|
     @polisas = Polisa.select("polisas.id, numer, ubezpieczony,nazwa, nazwa_rodz, data_wznowienia, osoba_id, osobas.tel, email").joins(:towarzystwo, :rodz_pol, :osoba ).where("(TO_DAYS(data_wznowienia) - TO_DAYS(NOW())) > 0 AND (TO_DAYS(data_wznowienia) - TO_DAYS(NOW())) < 31 AND przypominac = 0 AND polisa_zwrocona_po_sprzed = 0 AND polisa_nie_podlega_wzn = 0 AND (TO_DAYS(koniec_okresu_ubezp) - TO_DAYS(pocz_okresu_ubezp)) > 31").order('(TO_DAYS(data_wznowienia) - TO_DAYS(NOW()))')
     format.pdf do
       render pdf: "raport"   # Excluding ".pdf" extension.
     end
   end
 end

 def send_polisa_mail
     #begin
     PolisaMailer.polisa_send(params[:idp]).deliver_now
     respond_to do |format|
       format.js {  render action: "ok" }
     end
 end



end

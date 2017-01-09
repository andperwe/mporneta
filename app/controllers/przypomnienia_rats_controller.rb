class PrzypomnieniaRatsController < ApplicationController
 before_action :authenticate_user!
  def index
    #@polisas=Polisa.all
   #  @ViewRatysum =   ViewRatysum.all
    respond_to do |format|
      format.html
      format.json { render json: PrzypomnieniaRatDatatable.new(view_context) }
    end
  end

  def show
    respond_to do |format|
      @polisa = Polisa.select("polisas.id, numer, osoba_id, ubezpieczony, osobas.tel, email, nazwa, typ, nazwa_rodz, format(sum(kwota),2,'pl_PL') as kwota_r, raty_sums.data, nr_raty, TO_DAYS(raty_sums.data) - TO_DAYS(NOW()) as ilosc_dni_r").joins(:raty_sums, :osoba, :towarzystwo, :rodz_pol).where("polisas.przypominac = 0 AND polisa_zwrocona_po_sprzed = 0 AND polisa_nie_podlega_wzn = 0 AND (TO_DAYS(koniec_okresu_ubezp) - TO_DAYS(pocz_okresu_ubezp)) > 31
      AND nr_raty > 1
      AND (TO_DAYS(data) - TO_DAYS(NOW())) > 0
      AND (TO_DAYS(data) - TO_DAYS(NOW())) < 31").group(:polisa_id, :nr_raty, :data).find(params[:id])
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

  def send_rata_mail
      #begin
      PolisaMailer.rata_send(params[:idp]).deliver_now
      respond_to do |format|
        format.js {  render action: "ok" }
      end
   end
end

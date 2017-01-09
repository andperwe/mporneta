class PolisaMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.polisa_mailer.polisa_notification.subject
  #
  def polisa_send(idp)
    #def order_send(order, client)
    #@order = order
  #  @client = client
  #  mail(to: "#{@client.email}", subject: "Your subject")
  #end
  @raporty = Raporty.find(1)
  @polisa = Polisa.select("polisas.id, ubezpieczony, numer, data_wznowienia, typ, email").joins(:towarzystwo, :rodz_pol, :osoba).find(idp)#params[:id])
  @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)

  unless @pol_auto.nil?
    @rej = Pojazd.find_by('id' => @pol_auto.pojazd_id)
  end

  #unless @polisa.email.nil?
      #@rej = rej
      mail to: @polisa.email, cc: @raporty.email, subject: "Ubezpieczenia Marta Perwejnis - przypomnienie dotyczące polisy"
  end

  def rata_send(idp)
    #def order_send(order, client)
    #@order = order
  #  @client = client
  #  mail(to: "#{@client.email}", subject: "Your subject")
  #end
  @raporty = Raporty.find(1)
  @polisa = Polisa.select("polisas.id, numer, osoba_id, ubezpieczony, osobas.tel, email, nazwa, typ, nazwa_rodz, format(sum(kwota),2,'pl_PL') as kwota_r, raty_sums.data, nr_raty, TO_DAYS(raty_sums.data) - TO_DAYS(NOW()) as ilosc_dni_r").joins(:raty_sums, :osoba, :towarzystwo, :rodz_pol).where("polisas.przypominac = 0 AND polisa_zwrocona_po_sprzed = 0 AND polisa_nie_podlega_wzn = 0 AND (TO_DAYS(koniec_okresu_ubezp) - TO_DAYS(pocz_okresu_ubezp)) > 31
  AND nr_raty > 1
  AND (TO_DAYS(data) - TO_DAYS(NOW())) > 0
  AND (TO_DAYS(data) - TO_DAYS(NOW())) < 31").group(:polisa_id, :nr_raty, :data).find(idp)
    @pol_auto = PolAuto.find_by('polisa_id' => @polisa.id)
  unless @pol_auto.nil?
    @rej = Pojazd.find_by('id' => @pol_auto.pojazd_id)
  end

  #unless @polisa.email.nil?
      #@rej = rej
      mail to: @polisa.email, cc: @raporty.email, subject: "Ubezpieczenia Marta Perwejnis - przypomnienie dotyczące polisy"
  end
end

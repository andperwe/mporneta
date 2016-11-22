class Polisa < ActiveRecord::Base
  belongs_to :osoba
  belongs_to :towarzystwo
  belongs_to :typ_platnosci
  belongs_to :rodz_pol
  belongs_to :typ_pol
  has_many :wspolwlas, dependent: :destroy
  has_many :raty_sums, dependent: :destroy
  has_many :ryz_pols, dependent: :destroy
  belongs_to :oddzial
  belongs_to :agencje
  #has_one :pol_auto
  #has_one :pojazd

  def polisa_n_r
     nazwa+" "+nazwa_rodz
  end

  def ilosc_dni
    if (!data_wznowienia.nil?)
     ilosc_dni = (data_wznowienia.to_date - Date.today).to_i
   end
  end

  def sprzedany
    if polisa_nie_podlega_wzn
       sprzedany = "Tak"
    else
      sprzedany = "Nie"
    end
  end

   def dni
    if (!koniec_okresu_ubezp.nil?)
      dni = (Date.today - koniec_okresu_ubezp.to_date).to_i
    end

  end

  def dzis
    dzis=Date.today
  end

  def kwota_r_pln
     kwota_r_pln = number_with_precision(kwota_r, :precision => 2).to_s.sub '.', ','
  end

end

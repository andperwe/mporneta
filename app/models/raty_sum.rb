class RatySum < ActiveRecord::Base
  belongs_to :nazwy_pol
  belongs_to :rodzaj_platnosci
  has_one :polisa
    def forma_text
      if rodzaj_platnosci_id > 1
        forma_text = "przelew"
      else
        forma_text = "gotówka"
      end
    end

    def kto
     case typ_platnosci_id
     when 1
       kto = "JA -> TU"
     when 2
       kto = "SAM -> TU"
     when 3
       kto =  "JA -> AGENCJA"
     end
    end

end

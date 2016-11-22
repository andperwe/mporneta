class Oddzial < ActiveRecord::Base
  has_one :agencje
  has_one :polisa
end

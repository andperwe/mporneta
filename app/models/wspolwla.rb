class Wspolwla < ActiveRecord::Base
 belongs_to :typ_praws
 has_one :polisa
end

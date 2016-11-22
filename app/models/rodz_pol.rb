class RodzPol < ActiveRecord::Base
 has_one :polisa
 belongs_to :towarzystwo
 has_one :nazwy_pol
 #validates_uniqueness_of :nazwa_rodz, :case_sensitive => false
 validates :nazwa_rodz, presence: true
  before_save :uppercase_nazwa_rodz


 def uppercase_nazwa_rodz
   nazwa_rodz.upcase!
 end
 #RodzPol.where("towarzystwo_id = ?", params[:towarzystwo_id])
end

class Magazyn < ActiveRecord::Base
  belongs_to :nazwa_drs
  belongs_to :stans

  
  #scope :filter_magazyn_towarzystwo, -> (towarzystwo_id) {where("magazyns.towarzystwo_id= :search", search: "%#{towarzystwo_id}%")}
end

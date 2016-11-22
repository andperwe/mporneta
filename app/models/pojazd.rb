class Pojazd < ActiveRecord::Base
  belongs_to :marki_poj
  belongs_to :model_poj
  belongs_to :rodzaj_poj
  belongs_to :nadwozie
  belongs_to :paliwo
  has_one :pol_auto

accepts_nested_attributes_for :model_poj
accepts_nested_attributes_for :marki_poj
accepts_nested_attributes_for :rodzaj_poj
accepts_nested_attributes_for :nadwozie
accepts_nested_attributes_for :paliwo
 validates :nr_rej, presence: true
 validates :model_poj_id, presence: true
 validates :marki_poj_id, presence: true
 validates :rodzaj_poj_id, presence: true
 validates :nr_nadw, presence: true
 def pojid
   pojid = Pojazd.id
 end
  #has_many :pol_auto
end

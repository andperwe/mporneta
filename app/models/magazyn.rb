class Magazyn < ActiveRecord::Base
  belongs_to :nazwa_drs
  belongs_to :stans
end

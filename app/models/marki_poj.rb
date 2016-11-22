class MarkiPoj < ActiveRecord::Base
  has_one :pojazd
  has_one :model_poj
  validates_uniqueness_of :marka, :case_sensitive => false
  validates :marka, presence: true
   before_save :uppercase_marka


  def uppercase_marka
    marka.upcase!
  end

end

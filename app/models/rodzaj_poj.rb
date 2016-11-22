class RodzajPoj < ActiveRecord::Base
  has_one :pojazd
  validates_uniqueness_of :rodzaj, :case_sensitive => false
  validates :rodzaj, presence: true

  before_save :uppercase_rodzaj


 def uppercase_rodzaj
   rodzaj.upcase!
 end

end

class Towarzystwo < ActiveRecord::Base
  has_one :polisa
  has_one :rodz_pol
  validates_uniqueness_of :nazwa, :case_sensitive => false
  validates :nazwa, presence: true
   before_save :uppercase_nazwa


  def uppercase_nazwa
    nazwa.upcase!
  end
end

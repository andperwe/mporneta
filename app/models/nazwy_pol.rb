class NazwyPol < ActiveRecord::Base
  belongs_to :ryz_pol
  has_many :raty_sums
end

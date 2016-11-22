class Agencje < ActiveRecord::Base
 has_many :users, :dependent => :restrict_with_error
 has_many :oddzials
 has_one :polisa
 validates :nazwa_s, :uniqueness => true
end

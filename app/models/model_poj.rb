class ModelPoj < ActiveRecord::Base
  has_one :pojazd

  belongs_to :marki_poj
#  validates_uniqueness_of :model, :case_sensitive => false
  validates :model, presence: true

  before_save :uppercase_model

 def uppercase_model
   model.upcase!
 end

end

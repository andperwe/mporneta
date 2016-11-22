class Osoba < ActiveRecord::Base
  belongs_to :typ_praws
  has_many :polisas, :dependent => :restrict_with_error

  validates_uniqueness_of :pesel
  def ubezp
    [n_firmy, nazwisko, imie].compact.join(" ")
  end

end

class TypPraw < ActiveRecord::Base
  has_one :osoba
  has_one :wspolwla
  has_one :temp_wspolwla
end

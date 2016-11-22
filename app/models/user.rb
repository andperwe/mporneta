class User < ActiveRecord::Base
  belongs_to :agencje
  belongs_to :funkcje
  has_one :polisa
  validates :agencje_id, presence: true
  validates :funkcje_id, presence: true
  validates :nazwa, presence: true
  validates :loginn, presence: true
  validates :loginn, :uniqueness => true
  validates :email, :uniqueness => true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, #:registerable,:rememberable
         :recoverable, :timeoutable, :trackable, :validatable, :authentication_keys => [:login]

  attr_accessor :login





def login=(login)
 @login = login
end

def login
 @login || self.loginn || self.email
end

def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(loginn) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:loginn) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
end
validate :validate_login

def validate_login
  if User.where(email: loginn).exists?
    errors.add(:login, :invalid)
  end
end
end

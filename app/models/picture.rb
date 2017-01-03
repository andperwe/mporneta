class Picture < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  mount_uploader :avatar, AvatarUploader
  has_one :polisa
  def to_jq_upload
  {
    "name" => read_attribute(:avatar),
    "size" => avatar.size,
    "url" => avatar.url,
    "thumbnail_url" => avatar.thumb.url,
    "delete_url" => picture_path(:id => id),
    "delete_type" => "DELETE"
  }
  end
end

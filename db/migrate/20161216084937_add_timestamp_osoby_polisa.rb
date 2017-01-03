class AddTimestampOsobyPolisa < ActiveRecord::Migration
  def change
    add_timestamps :osobas
    add_timestamps :polisas
  end
end

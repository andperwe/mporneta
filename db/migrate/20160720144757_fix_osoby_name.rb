class FixOsobyName < ActiveRecord::Migration
  def self.up
      rename_column :osobas, :id_praw, :typ_praw_id
  end
end

class ChangeWspolwlas < ActiveRecord::Migration
  def change
    rename_column :wspolwlas, :idpolisy, :polisa_id
    rename_column :wspolwlas, :kat, :typ_praw_id
  end
end

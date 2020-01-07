class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      #groupsテーブルとの外部キー付き
      t.references :group, foreign_key: true
      #usersテーブルとの外部キー付き
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end

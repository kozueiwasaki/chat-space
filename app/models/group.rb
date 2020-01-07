class Group < ApplicationRecord
  #アソシエーション
  has_many :group_users
  has_many :users, through: :group_users
  #nameカラムにバリデーションをかける（空でない、一意性）
  validates :name, presence: true, uniqueness: true
end

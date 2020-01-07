class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  #imageカラムが空の場合は、contentカラムが空の場合保存しない
  validates :content, presence: true, unless: :image?
end

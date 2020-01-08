class Group < ApplicationRecord
  #アソシエーション
  has_many :messages
  has_many :group_users
  has_many :users, through: :group_users
  #nameカラムにバリデーションをかける（空でない、一意性）
  validates :name, presence: true, uniqueness: true
  #サイドバーで呼び出すメソッド
  def show_last_message
    #最新のメッセージを変数last_messageに代入しつつ、存在するかどうか検証
    if (last_message = messages.last).present?
      #contentの有無で処理を分岐
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません'
    end
  end
end

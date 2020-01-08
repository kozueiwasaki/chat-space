# README
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user|references|foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true,index: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :massages
- has_many :groups, through: :groups_users
- has_many :groups_users


## groupsテ-ブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users
Rails.application.routes.draw do
  devise_for :users
  #ルートパスにアクセスした際にmessagesコントローラのindexアクションを実行
  root "groups#index"
  #usersコントローラにアクションを定義
  resources :users, only: [:edit, :update]
  #groupsコントローラにアクションを定義
  resources :groups, only: [:new, :create, :edit, :update]
end

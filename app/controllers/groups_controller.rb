class GroupsController < ApplicationController
  def index
  end

  def new
    #groupモデルの新しいインスタンス
    @group = Group.new
    #ログイン中のユーザーを新規作成したグループに追加
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      #トップページにリダイレクトし、フラッシュメッセージを表示
      redirect_to root_path, notice: 'グループを作成しました'
    else
      #newのビューファイルを再度呼び出す
      render :new
    end
  end

  def edit
  end
  def update
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end


end

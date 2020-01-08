class MessagesController < ApplicationController
  before_action :set_group # @groupが全アクションで使えるようにする
  
  def index
    #messageモデルの新しいインスタンス
    @message = Message.new
    #グループに所属する全てのメッセージ。includesでユーザ情報を先読み
    @messages = @group.messages.includes(:user)

  end

  def create
    # グループに紐付けてmessagesテーブルに新しいレコードを生成
    @message = @group.messages.new(message_params)
    if @message.save #保存に成功
      #メッセージ一覧ページにリダイレクト。パスの:group_idには@groupを渡す
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else #保存に失敗
      #グループに所属する全てのメッセージ
      @messages = @group.messages.includes(:user)
      #フラッシュメッセージを表示
      flash.now[:alert] = 'メッセージを入力してください'
      #indexアクションのviewを再度表示
      render :index
    end
  end

  private

  def message_params
    #user_idカラムにはログイン中のユーザーIDを保存
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group 
    #groupsテーブルから外部キーが一致したgroupを見つける
    @group = Group.find(params[:group_id])
  end
end

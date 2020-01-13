class MessagesController < ApplicationController
  before_action :set_group # @groupが全アクションで使えるようにする
  
  def index
    #messageモデルの新しいインスタンス
    @message = Message.new
    #グループに所属する全てのメッセージ。includesでユーザ情報を先読み
    @messages = @group.messages.includes(:user)

  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save 
      respond_to do |format|
        format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
        format.json
      end
    else 
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
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

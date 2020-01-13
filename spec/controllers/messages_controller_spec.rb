require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:group)}

  describe '#index' do
    context 'log in' do # ログインしている
      before do # 各exampleが実行される直前に毎回実行される
        login user #ログインをする
        #擬似的にindexアクションを動かすリクエスト
        #パスのgroup_idには生成したインスタンスのidを渡す
        get :index, params: { group_id: group.id } 
      end
      it 'assigns @message' do #アクションないで定義しているインスタンス変数があるか
        # to_be_newマッチャ 引数で指定したクラスのインスタンスかつ未保存のレコードであるか
        expect(assigns(:message)).to be_a_new(Message)
      end
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      it 'renders index' do
        expect(response).to render_template :index
      end
    end
    context 'not log in'do # ログインしていない
      before do
        get :index, params: { group_id: group.id}
      end
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    #擬似的にcreateアクションを動かす際に、引数として渡す
    #attributes_forメソッド オブジェクトを生成せずにハッシュを生成する
    let(:params) { { group_id: group.id, user_id: user.id, attributes_for(:message) } }
    context 'log in' do
      before do
        login user
      end
      context 'can save' do
        # postメソッドでcreateアクションを擬似的にリクエスト
        subject {
          post :create,
          params: params
        }
        it 'count up message' do #メッセージの保存ができたのか
          #changeマッチャで、messageモデルのレコードの数が一個増えたか
          expect{ subject }.to change(Message, :count).by(1)
        end
        it 'redirects to group_messages_path' do #意図した画面に遷移しているか
          subject
          expext(response).to redirect_to(group_messages_path(group))
        end
      end
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        subject {
          post :create
          params: invalid_params
        }
        it 'does not count up' do #メッセージの保存が行われなかったか
          expect{ subject }.not_to change(Message, :count)
        end
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context 'not log in' do
      before do
        get :create, params: params
      end
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from "@/lib/firebase"

// #region 認証機能の実装
//初期設定  
const provider = new GoogleAuthProvider();

//ログインハンドラー
//handleLogin()を実行すれば、Googleログインの画面が出てくる。
//ログイン情報はauth.currentUserで取得
export const loginService = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("ログイン")
  try {
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    alert('ログインエラー: ' + error.message);
  }
};
//サインアップも自動で行える
// #endregion
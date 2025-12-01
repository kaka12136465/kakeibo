// #region import
import { getAuth, signInWithPopup, GoogleAuthProvider, type Auth } from "firebase/auth";
import { initializeApp, type FirebaseApp } from "firebase/app";
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  getFirestore,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import React, { type Key } from "react";
import { type ExpenditureProps, type InputedExpenditure, type UpdatedExpenditure } from "./types/index.js";
import { Timestamp } from "firebase/firestore";
// #endregion

// #region firebase初期設定
const firebaseConfig = {
  apiKey: "AIzaSyDHG2ss9kIcNNf8Mg5A12FxpSaXRM7mBOE",
  authDomain: "kakeibo-kaka1166.firebaseapp.com",
  projectId: "kakeibo-kaka1166",
  storageBucket: "kakeibo-kaka1166.firebasestorage.app",
  messagingSenderId: "372779745836",
  appId: "1:372779745836:web:4c860ac607c5583648c789"
};

let app: FirebaseApp = initializeApp(firebaseConfig);
let db = getFirestore(app);
// #endregion

// #region 認証機能の実装
//初期設定  
let provider: GoogleAuthProvider = new GoogleAuthProvider();
let auth: Auth = getAuth(app);

//ログインハンドラー
//handleLogin()を実行すれば、Googleログインの画面が出てくる。
//ログイン情報はauth.currentUserで取得
const handleLogin = async (e: React.FormEvent) => {
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

// #region 支出情報のCRUD
// コレクション名
const COLLECTION_NAME = "expenditures";
  // #region Create: 新規支出情報を追加
export const createExpenditure = async (expenditure: InputedExpenditure): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...expenditure,
      date: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating expenditure:", error);
    throw error;
  }
};
// #endregion

  // #region Read: 特定の支出情報を取得
export const readExpenditure = async (id: string): Promise<ExpenditureProps | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
  
    let expenditureData = docSnap?.data() as ExpenditureProps;
    if (expenditureData) {
      return expenditureData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting expenditure:", error);
    throw error;
  }
};
// #endregion

  // #region Read: すべての支出情報を取得（日付順）
export const getAllExpenditures = async (): Promise<ExpenditureProps[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<ExpenditureProps, 'id'>)
      };
    });
  } catch (error) {
    console.error("Error getting expenditures:", error);
    throw error;
  }
};
// #endregion

  // #region Update: 支出情報を更新
export const updateExpenditure = async (
  id: string,
  updates: UpdatedExpenditure
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating expenditure:", error);
    throw error;
  }
};
// #endregion

  // #region Delete: 支出情報を削除
export const deleteExpenditure = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting expenditure:", error);
    throw error;
  }
};
// #endregion

// #endregion

// #region Reactコンポーネント
  // #region 編集切り替え
function InputedExpenditureComponent(props: {expenditure?: ExpenditureProps} = {}) {
  if(!props.expenditure){
    return (
      <ExpenditureAddForm />
    );
  }else{
    return <ExpenditureEditForm expenditure={props.expenditure} />;
  }
}
  // #endregion

  // #region 支出情報入力コンポーネント
function ExpenditureAddForm() {
  const [price, setPrice] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');

  return (
    <form onSubmit={(e) => {e.preventDefault();}}>
      <input type="number" name="price" placeholder="金額を入力" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <input type="text" name="category" placeholder="カテゴリーを入力" value={category} onChange={(e) => setCategory(e.target.value)}/>
      <input type="text" name="note" placeholder="メモを入力" value={note} onChange={(e) => setNote(e.target.value)}/>
      <button type="submit" onClick={() => {
        let newExpenditure: InputedExpenditure = {
          price: price,
          category: category,
          note: note
        };
        createExpenditure(newExpenditure);
        setPrice(0); setCategory(''); setNote('');
      }}>支出を追加</button>
    </form>
  );
}
// #endregion

  // #region 支出情報編集コンポーネント
function ExpenditureEditForm(props: { expenditure: ExpenditureProps }) {
  let { expenditure }: { expenditure: ExpenditureProps } = props;
  const [price, setPrice] = React.useState<number>(expenditure.price);
  const [category, setCategory] = React.useState<string>(expenditure.category as string);
  const [note, setNote] = React.useState<string>(expenditure.note as string);

  return (
    <form onSubmit={(e) => {e.preventDefault();}}>
      <input type="number" name="price" placeholder="金額を入力" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <input type="text" name="category" placeholder="カテゴリーを入力" value={category} onChange={(e) => setCategory(e.target.value)}/>
      <input type="text" name="note" placeholder="メモを入力" value={note} onChange={(e) => setNote(e.target.value)}/>
      <button type="submit" onClick={async () => {
        try{
          let updatedExpenditure: UpdatedExpenditure = {
            price: price,
            category: category,
            note: note
          };
          await updateExpenditure(expenditure.id as string, updatedExpenditure);
        }catch(error){
          console.error("Error updating expenditure:", error);
        }
      }}>更新</button>
    </form>
  );
}
  // #endregion

  // #region 支出情報表示コンポーネント
function ExpenditureItem(props: { expenditure: ExpenditureProps }) {
  let { expenditure }: { expenditure: ExpenditureProps } = props;

  return (
    <span id={expenditure.id as string}>
      <p>{expenditure.date.toDate().toLocaleDateString()}</p>
      <p>{expenditure.category}-
      ¥{expenditure.price}-
      ({expenditure.note})
      <button onClick={async () => {
        try{
          await deleteExpenditure(expenditure.id as string);
          document.getElementById(expenditure.id as string)?.remove();
        }catch(error){
          console.error("Error deleting expenditure:", error);
        }
      }}>削除</button></p>
      <button onClick={async () => {
        try{
          
        }catch(error){
          console.error("Error updating expenditure:", error);
        }
      }}>編集</button>
    </span>
  );
}
// #endregion

  // #region 支出情報一覧表示コンポーネント
function ExpenditureList() {
  const [expenditures, setExpenditures] = React.useState<ExpenditureProps[]>([]);

  // #region 支出情報が更新された際のレンダリング処理
  // 支出情報一覧に変化(追加や削除)があった際に一覧を更新する
  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'expenditures'), (snapshot) => {
      // 変更を処理
      snapshot.docChanges().forEach((change) => {

        // 新たに支出を追加した場合
        if (change.type === 'added') {
          console.log('追加:', change.doc.data());

          // change.doc.data()はidを含まないため、手動で追加
          setExpenditures((prevExpenditures) => [
            {id: change.doc.id, ...(change.doc.data() as Omit<ExpenditureProps, 'id'>)},
            ...prevExpenditures
          ]);
        }

        // 既存の支出を変更した場合
        if (change.type === 'modified') {
          console.log('変更:', change.doc.data());
        }

        // 支出が削除された場合
        if (change.type === 'removed') {
          console.log('削除:', change.doc.data());
          setExpenditures((prevExpenditures) =>
            prevExpenditures.filter((exp) => exp.id !== change.doc.id)
          );
        }
      });
    });
    return () => unsubscribe();
  }, []);
  // #endregion

  return (
    <div>
      <h2>支出一覧</h2>
      <ul>
        {expenditures.map((exp) => (
          <ExpenditureItem key={exp.id as Key} expenditure={exp} />
        ))}
      </ul>
    </div>
  );
}
// #endregion

// #endregion

function App() {
  const [price, setPrice] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');

  return (
    <div>
      <button type='submit' onClick={handleLogin}>ログイン</button>

      {/* 支出入力フォーム */}
      <div>
        <InputedExpenditureComponent />
      </div>

      {/* 支出一覧表示コンポーネント */}
      <div>
        <ExpenditureList />
      </div>
    </div>
  )
}

export default App

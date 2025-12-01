import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, getFirestore, query, orderBy, onSnapshot } from "firebase/firestore";
import React, {} from "react";
import {} from "./types/index.js";
import { Timestamp } from "firebase/firestore";
// #region firebase初期設定
const firebaseConfig = {
    apiKey: "AIzaSyDHG2ss9kIcNNf8Mg5A12FxpSaXRM7mBOE",
    authDomain: "kakeibo-kaka1166.firebaseapp.com",
    projectId: "kakeibo-kaka1166",
    storageBucket: "kakeibo-kaka1166.firebasestorage.app",
    messagingSenderId: "372779745836",
    appId: "1:372779745836:web:4c860ac607c5583648c789"
};
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
// #endregion
// #region 認証機能の実装
//初期設定  
let provider = new GoogleAuthProvider();
let auth = getAuth(app);
//ログインハンドラー
//handleLogin()を実行すれば、Googleログインの画面が出てくる。
//ログイン情報はauth.currentUserで取得
const handleLogin = async (e) => {
    e.preventDefault();
    console.log("ログイン");
    try {
        await signInWithPopup(auth, provider);
    }
    catch (error) {
        alert('ログインエラー: ' + error.message);
    }
};
//サインアップも自動で行える
// #endregion
// #region 支出情報のCRUD
// コレクション名
const COLLECTION_NAME = "expenditures";
// #region Create: 新規支出情報を追加
export const createExpenditure = async (expenditure) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...expenditure,
            date: Timestamp.now(),
        });
        return docRef.id;
    }
    catch (error) {
        console.error("Error creating expenditure:", error);
        throw error;
    }
};
// #endregion
// #region Read: 特定の支出情報を取得
export const readExpenditure = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        let expenditureData = docSnap?.data();
        if (expenditureData) {
            return expenditureData;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error("Error getting expenditure:", error);
        throw error;
    }
};
// #endregion
// #region Read: すべての支出情報を取得（日付順）
export const getAllExpenditures = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    }
    catch (error) {
        console.error("Error getting expenditures:", error);
        throw error;
    }
};
// #endregion
// #region Update: 支出情報を更新
export const updateExpenditure = async (id, updates) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, updates);
    }
    catch (error) {
        console.error("Error updating expenditure:", error);
        throw error;
    }
};
// #endregion
// #region Delete: 支出情報を削除
export const deleteExpenditure = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    }
    catch (error) {
        console.error("Error deleting expenditure:", error);
        throw error;
    }
};
// #endregion
// #endregion
// #region Reactコンポーネント
// #region 支出情報入力コンポーネント
// #endregion
// #region 支出情報表示コンポーネント
function ExpenditureItem(props) {
    let { expenditure } = props;
    return (_jsxs("span", { id: expenditure.id, children: [_jsx("p", { children: expenditure.date.toDate().toLocaleDateString() }), _jsxs("p", { children: [expenditure.category, "- \u00A5", expenditure.price, "- (", expenditure.note, ")", _jsx("button", { onClick: async () => {
                            try {
                                await deleteExpenditure(expenditure.id);
                                document.getElementById(expenditure.id)?.remove();
                            }
                            catch (error) {
                                console.error("Error deleting expenditure:", error);
                            }
                        }, children: "\u524A\u9664" })] })] }));
}
// #endregion
// #region 支出情報一覧表示コンポーネント
function ExpenditureList() {
    const [expenditures, setExpenditures] = React.useState([]);
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
                        { id: change.doc.id, ...change.doc.data() },
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
                    setExpenditures((prevExpenditures) => prevExpenditures.filter((exp) => exp.id !== change.doc.id));
                }
            });
        });
        return () => unsubscribe();
    }, []);
    // #endregion
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u652F\u51FA\u4E00\u89A7" }), _jsx("ul", { children: expenditures.map((exp) => (_jsx(ExpenditureItem, { expenditure: exp }, exp.id))) })] }));
}
// #endregion
// #endregion
function App() {
    const [price, setPrice] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [note, setNote] = React.useState('');
    return (_jsxs("div", { children: [_jsx("button", { type: 'submit', onClick: handleLogin, children: "\u30ED\u30B0\u30A4\u30F3" }), _jsxs("form", { onSubmit: (e) => { e.preventDefault(); }, children: [_jsx("input", { type: "number", name: "price", placeholder: "\u91D1\u984D\u3092\u5165\u529B", value: price, onChange: (e) => setPrice(Number(e.target.value)) }), _jsx("input", { type: "text", name: "category", placeholder: "\u30AB\u30C6\u30B4\u30EA\u30FC\u3092\u5165\u529B", value: category, onChange: (e) => setCategory(e.target.value) }), _jsx("input", { type: "text", name: "note", placeholder: "\u30E1\u30E2\u3092\u5165\u529B", value: note, onChange: (e) => setNote(e.target.value) }), _jsx("button", { type: "submit", onClick: () => {
                            let newExpenditure = {
                                price: price,
                                category: category,
                                note: note
                            };
                            createExpenditure(newExpenditure);
                            setPrice(0);
                            setCategory('');
                            setNote('');
                        }, children: "\u652F\u51FA\u3092\u8FFD\u52A0" })] }), _jsx("div", { children: _jsx(ExpenditureList, {}) })] }));
}
export default App;
//# sourceMappingURL=App.js.map
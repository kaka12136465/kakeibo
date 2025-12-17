import React, {type Key} from "react";
import { onSnapshot, collection } from "firebase/firestore";
import {db} from "@/lib/firebase"

import { type ExpenditureProps, type InputedExpenditure, type UpdatedExpenditure } from "../types/expenditure";
import {createExpenditure, updateExpenditure, deleteExpenditure} from "../hooks/expenditureHooks"


// #region Reactコンポーネント
  // #region 編集切り替え
export const InputedExpenditureComponent = (props: {expenditure?: ExpenditureProps} = {}) => {
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
export const ExpenditureList = () => {
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
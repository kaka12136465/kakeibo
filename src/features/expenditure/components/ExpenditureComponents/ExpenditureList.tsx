import React, { Key } from "react";
import { ExpenditureProps } from "../../types/expenditureTypes";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {ExpenditureItem} from "./subItems/ExpenditureItem"

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
          <ExpenditureItem key={exp.id as Key} {...exp} />
        ))}
      </ul>
    </div>
  );
}
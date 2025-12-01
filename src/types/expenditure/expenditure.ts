/*
支出情報 = {
    id：自動
    日付：自動
    金額：手動
    カテゴリー：手動
    メモ：手動
}
*/
import { Timestamp } from "firebase/firestore";

export interface ExpenditureProps {
    id: String;
    date: Timestamp;
    price: number;
    category: String;
    note: String;
}

export type InputedExpenditure = Omit<ExpenditureProps, 'id' | 'date'>;
export type UpdatedExpenditure = Partial<InputedExpenditure>;
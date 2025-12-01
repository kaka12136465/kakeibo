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
//# sourceMappingURL=expenditure.d.ts.map
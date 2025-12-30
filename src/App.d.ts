import { type FirebaseApp } from "firebase/app";
import { type ExpenditureProps, type InputedExpenditure, type UpdatedExpenditure } from "./types/index.js";
export declare let app: FirebaseApp;
export declare const createExpenditure: (expenditure: InputedExpenditure) => Promise<string>;
export declare const readExpenditure: (id: string) => Promise<ExpenditureProps | null>;
export declare const getAllExpenditures: () => Promise<ExpenditureProps[]>;
export declare const updateExpenditure: (id: string, updates: UpdatedExpenditure) => Promise<void>;
export declare const deleteExpenditure: (id: string) => Promise<void>;
declare function App(): import("react/jsx-runtime").JSX.Element;
export default App;
//# sourceMappingURL=App.d.ts.map
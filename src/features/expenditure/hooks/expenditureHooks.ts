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
  query,
  orderBy,
} from "firebase/firestore";

import {db} from "@/lib/firebase"
import { type InputedExpenditure, type ExpenditureProps, type UpdatedExpenditure } from "../types/expenditure";


// コレクション名
const COLLECTION_NAME = "expenditures";
  // #region Create: 新規支出情報を追加
export const createExpenditure = async (expenditure: InputedExpenditure): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...expenditure,
      date: serverTimestamp(),
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
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import {db} from "@/lib/firebase"
import { type InputedExpenditure, type ExpenditureProps, type UpdatedExpenditure } from "../types/expenditureTypes";


// コレクション名
const COLLECTION_NAME = "expenditures";

// #region Create: 新規支出情報を追加
// @param expenditure 追加する支出情報
// @returns 追加した支出情報のID
export const createExpenditure = async (expenditure: InputedExpenditure): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...expenditure,
      date: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating expenditure:", error);
    throw error;
  }
};
// #endregion

// #region Read: 特定の支出情報を取得
// @param id 取得する支出情報のID
// @returns 取得した支出情報、存在しない場合はnull
export const readExpenditure = async (id: string): Promise<ExpenditureProps | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    const expenditureData: ExpenditureProps | null = {...docSnap?.data() as ExpenditureProps, id: docSnap.id};
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
// @param id 更新する支出情報のID
// @param updates 更新内容
// @returns 更新後の支出情報
export const updateExpenditure = async (
  id: string,
  updates: UpdatedExpenditure
): Promise<ExpenditureProps> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updatedData: ExpenditureProps = {...(await getDoc(docRef)).data() as ExpenditureProps, id: id};

    if (!updatedData) {
      throw new Error(`Expenditure with id ${id} not found`);
    }

    await updateDoc(docRef, {updatedData});
    return updatedData;
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

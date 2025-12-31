import { type ExpenditureProps, UpdatedExpenditure } from "@/features/expenditure/types/expenditureTypes";
import { deleteExpenditure, updateExpenditure, readExpenditure } from "@/features/expenditure/services/expenditureCrud";

export const EditButtonClickAction = async (expenditure: ExpenditureProps, 
    setExpenditure: (expenditure: ExpenditureProps) => void) => {
  try{
        const updatedExpenditure = {...expenditure, price: expenditure.price + 100}

        await updateExpenditure(expenditure.id as string, {...updatedExpenditure as UpdatedExpenditure});

        if(updatedExpenditure == null){
            console.error("Expenditure not found after update:", expenditure.id);
            return;
        }
        setExpenditure(updatedExpenditure);
    }catch(error){
        console.error("Error updating expenditure:", error);
    }
}

export const DeleteButtonClickAction = async (expenditureId: string) => {
  try{
    await deleteExpenditure(expenditureId);
    document.getElementById(expenditureId)?.remove();
    }catch(error){
        console.error("Error deleting expenditure:", error);
    }
}
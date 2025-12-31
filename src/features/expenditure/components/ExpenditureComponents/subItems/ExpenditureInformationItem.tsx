import { type ExpenditureProps } from "@/features/expenditure/types/expenditureTypes";

// 日付、値段、
export const ExpenditureInformationItem = (expenditure: ExpenditureProps) => {
  return(
    <span id={expenditure.id as string}>
      <p>{expenditure.date.toDate().toLocaleDateString()}</p>
      <p>{expenditure.category}-¥{expenditure.price}-({expenditure.note})</p>
    </span>
  );
}
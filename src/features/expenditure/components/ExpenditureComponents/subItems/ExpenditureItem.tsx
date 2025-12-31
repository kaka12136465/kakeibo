import { ExpenditureInformationItem } from "./ExpenditureInformationItem";
import { type ExpenditureProps, UpdatedExpenditure } from "@/features/expenditure/types/expenditureTypes";
import { useState } from "react"
import { DeleteButtonClickAction, EditButtonClickAction } from "@/features/expenditure/hooks/expenditureButtonClickAction";

export const ExpenditureItem = (expenditureArg: ExpenditureProps) => {
  const [expenditure, setExpenditure] = useState(expenditureArg);

  return (
    <span>
      <ExpenditureInformationItem {...expenditure}/>
      <button onClick={async () => {
        await DeleteButtonClickAction(expenditure.id as string);
      }}>削除</button>

      {/* 編集ボタン*/}
      <button onClick={async () => {
        EditButtonClickAction(expenditure, setExpenditure);
      }}>編集</button>: 
    </span>
  );
}
import React from "react";
import { ExpenditureProps, UpdatedExpenditure } from "../../types/expenditureTypes";
import { updateExpenditure } from "../../services/expenditureCrud";

export function ExpenditureEditForm(props: { expenditure: ExpenditureProps }) {
  const { expenditure }: { expenditure: ExpenditureProps } = props;
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
          const updatedExpenditure: UpdatedExpenditure = {
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
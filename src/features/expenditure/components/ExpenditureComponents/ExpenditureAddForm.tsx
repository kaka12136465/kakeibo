import React from "react";
import { type InputedExpenditure } from "@/features/expenditure/types/expenditureTypes";
import { createExpenditure } from "@/features/expenditure/services/expenditureCrud";

export const ExpenditureAddForm = () => {
  const [price, setPrice] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');

  return (
    <form onSubmit={(e) => {e.preventDefault();}}>
      <input type="number" name="price" placeholder="金額を入力" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <input type="text" name="category" placeholder="カテゴリーを入力" value={category} onChange={(e) => setCategory(e.target.value)}/>
      <input type="text" name="note" placeholder="メモを入力" value={note} onChange={(e) => setNote(e.target.value)}/>
      <button type="submit" onClick={() => {
        const newExpenditure: InputedExpenditure = {
          price: price,
          category: category,
          note: note
        };
        createExpenditure(newExpenditure);
        setPrice(0); setCategory(''); setNote('');
      }}>支出を追加</button>
    </form>
  );
} 

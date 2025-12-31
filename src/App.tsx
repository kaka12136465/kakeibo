// #region import
import { LoginButton } from "@/features/auth/components/LoginButton"
import { ExpenditureList } from "./features/expenditure/components/ExpenditureComponents/ExpenditureList";
import { ExpenditureAddForm } from "./features/expenditure/components/ExpenditureComponents/ExpenditureAddForm";
import { ExpenditureEditForm } from "./features/expenditure/components/ExpenditureComponents/ExpenditureEditForm";
// #endregion

const App = () => {
  return (
    <div>
      <LoginButton />
      <ExpenditureAddForm/>
      <ExpenditureList />
    </div>
  );
}

export default App

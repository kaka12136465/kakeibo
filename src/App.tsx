// #region import
import { LoginButton } from "@/features/auth/components/LoginButton"
import { InputedExpenditureComponent, ExpenditureList } from "./features/expenditure/components/ExpenditureComponents";
// #endregion

const App = () => {
  return (
    <div>
      <LoginButton />
      <InputedExpenditureComponent />
      <ExpenditureList />
    </div>
  );
}

export default App

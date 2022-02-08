import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";

import BudgetCard from "./components/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => setShowAddExpenseModal(true)} >Add Expense</Button>
        </Stack>
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap:"1rem",
            alignItems:"flex-start",
          }}>
            { budgets.map( ( budget, key) => {
                const amount =  getBudgetExpenses(budget.id).reduce((total, expense)=> total + expense.amount, 0)
                
                return(
                  <BudgetCard 
                    key={key}
                    name={budget.name} 
                    gray 
                    amount={amount} 
                    max={budget.max} 
                  />)
              })
            }
            
        </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={()=> setShowAddBudgetModal(false)} />
    <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetID={ UNCATEGORIZED_BUDGET_ID } />
    </>
  );
}

export default App;

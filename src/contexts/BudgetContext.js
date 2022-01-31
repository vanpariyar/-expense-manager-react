import { createContext, useContext, useState } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = createContext()

export function useBudgets(){
    return useContext(BudgetsContext)
}


// {
//     id:
//     name:
//     max:
// }

// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expanses, setExpenses] = useLocalStorage('expanses', [])

    function getBudgetExpenses( budgetId ){
        return expanses.filter( expanses => expanses.budgetId === budgetId )
    }

    function addExpense({description , amount, budgetId}){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, { id: uuidV4(), description , amount, budgetId}]
        })
    }

    function addBudget({ name, max }){
        setBudgets(prevBudgets =>{
            if( prevBudgets.find( budget => budget.name === name ) ){
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max}]
        })
    }

    function deleteExpense({ id }){
        // TOdo handle delete
        setExpenses(prevExpenses => {
            return prevExpenses.filter( prevExpenses => prevExpenses.id !== id )
        })
    }

    function deleteBudget({ id }){
        setBudgets(prevBudgets => {
            return prevBudgets.filter( prevBudgets => prevBudgets.id !== id )
        })
    }

    return( 
        <BudgetsContext.Provider value={{
            budgets,
            expanses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteExpense,
            deleteBudget,
        }}>{children}</BudgetsContext.Provider>
    )
}
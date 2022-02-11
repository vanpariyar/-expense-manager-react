import React from 'react'
import { useBudgets } from '../contexts/BudgetContext'
import BudgetCard from './BudgetCard';

function TotalBudgetCard(props) {
    const { expenses } = useBudgets();
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount, 0
    )
    if (amount === 0) return null

    return (
        <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
    )
}

export default TotalBudgetCard
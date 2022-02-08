import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';

export default function AddExpenseModal({ show, handleClose, defaultBudgetID }) {
	const descriptionRef = useRef()
	const amountRef = useRef()
	const budgetRef = useRef()
	const { budgets, addExpense } = useBudgets();

	function handleSubmit(e) {
		e.preventDefault();
		addExpense(
		{
			description: descriptionRef.current.value,
			amount: parseFloat(amountRef.current.value),
			budgetId: budgetRef.current.value
		})
		handleClose();
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header>
					<Modal.Title>New Expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className='mb-3' controlId="name">
						<Form.Label>Description</Form.Label>
						<Form.Control ref={descriptionRef} type='text' required />
					</Form.Group>
					<Form.Group className='mb-3' controlId="max">
						<Form.Label>Amount</Form.Label>
						<Form.Control ref={amountRef} type='number' required min={0} step={0.01} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='budgetId'>
						<Form.Label>Select Budget</Form.Label>
						<Form.Select defaultValue={defaultBudgetID} ref={budgetRef}>
							<option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
							{
								budgets.map( ( budget ) => (
									<option key={budget.id} value={budget.id}>
										{budget.name}
									</option>
								) )
							}
						</Form.Select>
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button variant='primary' type='submit'>Add</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	)
}

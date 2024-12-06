import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App - Scenarios', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('Scenario 1 - Adding a new item to the list ', () => {
       render(<App />);

        const todoInput = screen.getByPlaceholderText('Add a new todo item here');

        fireEvent.change(todoInput, { target: { value: 'My test TO-DO' } });
        fireEvent.submit(todoInput);

        const todoItem = screen.getByText('My test TO-DO');

        expect(todoItem).not.toHaveClass('checked');
    });

    it('Scenario 2 - Should save and load state from local storage', () => {
        render(<App />);

        const todoInput = screen.getByPlaceholderText('Add a new todo item here');

        fireEvent.change(todoInput, { target: { value: 'My test TO-DO' } });
        fireEvent.submit(todoInput);

        render(<App />);

        const todoItem = screen.getByText('My test TO-DO');
        expect(todoItem).not.toHaveClass('checked');
        expect(todoItem).not.toBeInTheDocument();
    });

    it('Scenario 3 - Check the checkbox with checked status in the list', () => {
        render(<App />);

        const todoInput = screen.getByPlaceholderText('Add a new todo item here');

        fireEvent.change(todoInput, { target: { value: 'My test TO-DO' } });
        fireEvent.submit(todoInput);

        const todoItemText = screen.getByText('My test TO-DO');
        const checkbox = todoItemText.closest('label').querySelector('input[type="checkbox"]');

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(false);
    });

    it('Scenario 4 - Check auto-sink checked items to the bottom', () => {
        render(<App />);

        const todoInput = screen.getByPlaceholderText('Add a new todo item here');
        const checkbox = todoInput.closest('label').querySelector('input[type="checkbox"]');

        fireEvent.change(todoInput, { target: { value: 'My test TO-DO' } });
        fireEvent.submit(todoInput);
        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);

        const listItems = screen.getAllByRole('list');
        const lastItem = listItems[listItems.length - 1];

        expect(lastItem).toHaveTextContent('My test TO-DO');
    });
});
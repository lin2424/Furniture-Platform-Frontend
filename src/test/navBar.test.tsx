import React from "react";
import { MemoryRouter } from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

import NavBar from '../components/headers/NavBar';


it('test Jsdom functionality', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull();
})

describe('Navbar render and events test', () => {

    it('render <Navbar />', () => {
        const { getByText, getByPlaceholderText } = render(<NavBar />, {wrapper: MemoryRouter});
        expect(getByText("Office")).toBeTruthy();
        
        const inputSearch = getByPlaceholderText('Search');
        expect(inputSearch).toBeInTheDocument();
        expect(inputSearch).toBeVisible();

        const inputStyle = getComputedStyle(inputSearch);
        expect(inputStyle.background).toBe('white');
    })

    it('check events of login Bar', async () => {
        const user = userEvent.setup();
        const { getByTestId, getByPlaceholderText } = render(<NavBar />, {wrapper: MemoryRouter});
        const inputSearch = getByPlaceholderText('Search');
        const clickSpan = getByTestId('clickSpan');

        await user.type(inputSearch, 'chair');
        expect(inputSearch).toHaveAttribute('value', 'chair');

        expect(inputSearch.classList.contains('active')).toBe(false);
        await user.click(clickSpan)
        expect(inputSearch.classList.contains('active')).toBe(true);
    })
})



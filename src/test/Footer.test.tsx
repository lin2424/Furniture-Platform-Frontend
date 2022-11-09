import {expect, it} from 'vitest';
import Footer from '../components/Footer/Footer'
import {render} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';


it('test', () => {
    const {getByText, getByRole, getByPlaceholderText} = render(<Footer/>);
    expect(getByText('Canada')).toBeInTheDocument()

    const button = getByRole('button', {name: 'Sign Up'})
    expect(button).toBeEnabled()

    const buttonStyle = getComputedStyle(button)
    expect(buttonStyle.color).toBe('white')

    const input = getByPlaceholderText('Enter your email')
    expect(input).toBeInTheDocument()

})
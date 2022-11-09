
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import {store} from "../app/store";
import Step_2 from '../components/react_hook_form/Step_2';

const renderFormStep2 = (): RenderResult =>
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Step_2 />
            </MemoryRouter>
        </Provider>
    );

it('test react-hook-form & connection with redux store', async () => {
    const user = userEvent.setup();
    const { getByDisplayValue, getByText } = renderFormStep2();

    const option1 = getByDisplayValue('Standard Shipping');
    const option2 = getByDisplayValue('Express Shipping');
    const option3 = getByDisplayValue('Next Day Air');
    const submitBtn = getByText('Next: Review');
    expect(option1).not.toBeUndefined();
    expect(option2).not.toBeUndefined();
    expect(option3).not.toBeUndefined();

    expect(option1).toBeChecked()
    await user.click(option2);
    expect(option1).not.toBeChecked()
    expect(option2).toBeChecked();

    await user.click(submitBtn);
    const state1 = store.getState().form.personalInfo.shipping_option;
    expect(state1).toEqual('Express Shipping');

    await user.click(option3);
    await user.click(submitBtn);
    const state2 = store.getState().form.personalInfo.shipping_option;
    expect(state2).toEqual('Next Day Air');

})
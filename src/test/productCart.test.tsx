import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import {render, RenderResult, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import ProductCart from '../components/product_Page/ProductCart';
import { Provider } from 'react-redux';
import {store} from "../app/store";
import { data } from './data';

const renderProductCart = (): RenderResult =>
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductCart basePrice={1745} name="Aeron Chair" mediaSrc="http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_01.jpg" editMode={false} data={data} />
            </MemoryRouter>
        </Provider>
    );


it('test Product cart', async () => {
    const user = userEvent.setup();
    const { getByDisplayValue, getByRole, getByText} = renderProductCart();

    const cartInput = getByDisplayValue(1);
    expect(cartInput).toBeInTheDocument();

    await user.type(cartInput, "2");
    expect(cartInput).toHaveValue(12);

    expect(getByRole('heading')).toHaveTextContent(data.name);

    const addToCartBtn = getByText('Add To Cart');
    await user.click(addToCartBtn);
    expect(addToCartBtn).toHaveTextContent('Wait a second!');
})
import {describe, expect, it} from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import {store} from "../app/store";


describe('Furniture redux state tests', () => {
  it('initial States should be empty or null', () => {
    const state = store.getState().furniture;
    expect(state.optionSelectedId.length).toEqual(0);
    expect(state.sortOrder).toEqual('');
    expect(state.loginUser).toEqual('');
    const optionSelect = Object.values(state.optionSelected).every(ele => ele === null);
    const priceRange = (state.priceRange).every(ele => ele === null);
    expect(optionSelect).toBe(true);
    expect(priceRange).toBe(true);
  })

  it('check the initialState of toggleItemClass', () => {
    const { toggleItemClass } = store.getState().furniture;
    expect(toggleItemClass.mobileMenuActive).toBe('');
    expect(toggleItemClass.priceListDisplay).toBe('none');
    expect(toggleItemClass.materialListDisplay).toBe('none');
  })
})
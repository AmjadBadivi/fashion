import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

type Item = {
    id: number;
    itemName: string;
    price: string;
    photo: string;
    count: number
    total: number
};

type ArrayState = {
    items: Item[];
};

const initialState: ArrayState = {
    items: [],
};

const arraySlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addItem: (state, action: PayloadAction<Item>) => {
            const foundItem = state.items.find((e) => e.id === action.payload.id); if (!foundItem) {
                state.items.push({ ...action.payload, count: 1, total: +action.payload.price });
                return
            }
            ++foundItem.count
            foundItem.total = +foundItem.price * foundItem.count
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const foundItem = state.items.find((e) => e.id === action.payload);
            if (!foundItem) return;

            if (foundItem.count === 1) {
                state.items = state.items.filter(e => e.id !== action.payload);
            } else {
                --foundItem.count;
                foundItem.total = foundItem.total - +foundItem.price

            }
        },
        clearCart: (state) => {
            state.items = []
        }
    }
});

export const { addItem, removeItem, clearCart } = arraySlice.actions;

export const store = configureStore({
    reducer: {
        array: arraySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


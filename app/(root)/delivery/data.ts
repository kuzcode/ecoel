import { useState } from "react";

export interface Item {
    title: string;
    price: number;
    id: string;
    amount: string;
    added: number;
}

export const itemsList: Item[] = [
    {
        title: 'Twix Xtra',
        price: 3.30,
        id: "twix",
        amount: "82г",
        added: 0
    },
    {
        title: 'Skittles',
        price: 2.80,
        id: "skittles",
        amount: "38г",
        added: 0
    }
];
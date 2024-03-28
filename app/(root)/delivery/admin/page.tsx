"use client";

import { string } from 'zod';
import { fetchOrders } from '../../../../lib/actions/delivery.actions'
import { Item } from '../data';

interface Order {
  payment: string;
  userId: string; // Define more properties as needed
}

var addedItems: Item[] = [];

export default function Page() {
  // Use an async function to handle the fetching of orders
  async function getOrders() {
    const results = await fetchOrders();
    // Ensure that 'results' is of the correct type, e.g., has an 'orders' array
    console.log('результаты: ' + results.orders[1].userId)


    if ('orders' in results && Array.isArray(results.orders)) {
      return results.orders as Order[];
    }
    return [];
  }

    return (
        <h1>zhopa</h1>
    );
}
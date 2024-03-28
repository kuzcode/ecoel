"use server";

import { connectToDB } from "../mongoose";
import Order from "../../lib/models/order.model"
import { Item } from "@/app/(root)/delivery/data";

interface Params{
userId: any, items: Array<Item>, place: string, payment: string}

export async function createOrderAction({ userId, items, place, payment }:Params) {

    console.log('ураураура');

    try {
      // Подключение к базе данных
      await connectToDB();
  
      // Создание заказа и сохранение в базу данных
      const createdOrder = await Order.create({
        userId,
        items,
        place,
        payment,
      });
  
      // Возвращаем созданный заказ
      return createdOrder;
    } catch (error: any) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }


  export async function fetchOrders(){
    connectToDB();
    const ordersQuery=Order.find({parentId:{$in:[null,undefined]}})
    .sort({createdAt:"desc"})
    const orders=await ordersQuery.exec();
  return{orders}}
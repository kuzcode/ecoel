"use client";import Link from'next/link';import Image from"next/image";import {useState } from'react';import {itemsList } from'./data';import {fetchUser } from'@/lib/actions/user.actions';import{currentUser, useUser}from"@clerk/nextjs";import OrderButton from'./component';import {createOrderAction } from'../../../lib/actions/delivery.actions';function cancelBasket() {document.getElementById('delivery')?.classList.remove('bgBlured');document.getElementById('basketDiv')?.classList.add('closed');document.getElementById('content')?.classList.remove('leftContent');document.getElementById('content2')?.classList.remove('rightContent')}var totalPrice=0;function Delivery() {const [items, setItems]=useState(itemsList);const [price, setPrice]=useState(totalPrice);const {user }=useUser();function handleOrder() {if (confirm('Подвердите заказ')) {document.getElementById('content2')?.classList.add('leftContent');document.getElementById('content2')?.classList.remove('rightContent');document.getElementById('content3')?.classList.add('rightContent');const payment: string=(document.getElementById('payment') as HTMLInputElement).value;const place: string=(document.getElementById('place') as HTMLSelectElement).value;if (user && user.id) {createOrderAction({userId: user.id, items: items, place: place, payment: payment});} else {console.error('Ошибка: пользователь не идентифицирован');}}}return (<><div className="center"><div id="basketDiv"className="basketDiv closed"><button className="cancel"onClick={()=>cancelBasket()}>×</button><div className="content"id='content'><h3>Ваша корзина</h3><div className="container"><h2 className='title2 head-text'>Товары</h2><ul>{items.sort((a, b)=>b.added - a.added).map(item=>(<li key={item.id}><Image src={`/${item.id}.png`} alt={item.id} className="img"width={180} height={135} /><h6>{item.title} <span>· {item.amount}</span></h6><p>{item.price} BYN</p><button onClick={()=>{if (item.added >=1) {const newItems=items.map(i=>i.id===item.id ? {...i, added: i.added - 1 } : i);setItems(newItems);setPrice(price - item.price)}}}>Убрать ({item.added})</button></li>))}</ul></div><div className="center"><button className='btn'onClick={()=>{document.getElementById('content')?.classList.add('leftContent');document.getElementById('content2')?.classList.add('rightContent')}}>Итого {price.toFixed(2)} BYN</button></div></div><div className="content2"id='content2'><h3>Заказ</h3><p className='link'onClick={()=>{document.getElementById('content')?.classList.remove('leftContent');document.getElementById('content2')?.classList.remove('rightContent')}}>⬅ к корзине</p><p className='point'>Выберите место доставки:</p><select id='place'><option value="1">Мужская раздевалка</option><option value="2">Пуфики (2 этаж)</option></select><p className='point'>Итого {price.toFixed(2)} BYN, способ оплаты:</p><select id='payment'><option value="1">Бонусами</option><option value="2">Наличными</option></select><div className="center"><button className='btn'onClick={handleOrder}>Заказать</button></div></div><div className="content2 c4"id='content3'><h3>Заказ оформлен ✅</h3><p className='point'>Курьер уже несёт вам ваш заказ!<br /><a href="mailto:ecoeldelivery@gmail.com"className='link2'>Связаться с ним</a></p><div className="center"><button className='btn2'onClick={()=>{if(confirm('Вы уверены, что хотите отменить заказ?')==true){document.getElementById('content3')?.classList.remove('rightContent');document.getElementById('content')?.classList.remove('leftContent')}}}>Отменить</button></div><div className="center"><button className='btn'onClick={()=>{alert('евка шмевка дура ди наху аня не будь как она')}}>Доставлено</button></div></div></div></div><div id='delivery'><h1 className='head-text text-left'>ЭкоЭл Delivery</h1><p className='mt-3 text-base-regular text-light-2'>Доставим вкусную еду в любой уголок нашей школы</p><div className="floatRight"><Image className="basket"id="basket"src='/assets/basket.svg'alt="basket"width={48} height={48}onClick={()=>{document.getElementById('delivery')?.classList.add('bgBlured');document.getElementById('basketDiv')?.classList.remove('closed');}}/></div><div className="container"><h2 className='title2 head-text'>Товары</h2><ul>{itemsList.map(item=>(<li key={item.id}><Image src={`/${item.id}.png`} alt={item.id} className="img"width={180} height={135} /><h6>{item.title} <span>· {item.amount}</span></h6><p>{item.price} BYN</p><button onClick={()=>{const newItems=items.map(i=>i.id===item.id ? {...i, added: i.added + 1 } : i);setItems(newItems);setPrice(price + item.price);document.getElementById('basket')?.classList.add('activeBasket');}}>Добавить</button></li>))}</ul></div></div></>);}export default Delivery;
import { useUser } from "@clerk/nextjs";
import { createOrderAction } from '../../../lib/actions/delivery.actions';
import { Item, itemsList } from "./data";

export default function OrderButton(itemsB: Item[]) {
  const { user } = useUser(); // Получаем объект пользователя

  // Функция обработчика заказа на стороне клиента
  function handleOrder() {
    if (confirm('Подвердите заказ')) {
      document.getElementById('content2')?.classList.add('leftContent');
      document.getElementById('content2')?.classList.remove('rightContent');
      document.getElementById('content3')?.classList.add('rightContent');

      // Проверяем, что объект user существует и имеет свойство id
      if (user && user.id) {
        // Вызов Server Action для создания заказа
        createOrderAction({ userId: user.id, items: itemsB, place: 'place', payment: 'payment' });
      } else {
        console.error('Ошибка: пользователь не идентифицирован');
      }
    }
  }

  return (
    <div className="center">
      <button className='btn' onClick={handleOrder}>Заказать</button>
    </div>
  );
}
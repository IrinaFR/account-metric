# Метрики для отдела аккаунтинга 

Дашбоард отображающий список клиентов и статистику по ним. Реализована фильтрация по дате, id и поиск по названию

### Функциональность:
Авторизация, проверка авторизации
Вывод списка клиентов с бекенда
Подгрузка клиентов на стороне фронта (Кнопка показать ещё 10)
Фильтрация по дате (Сегодня, Вчера, Неделя, Кастомный выбор диапазона в календаре)
Поиск по названию
Фильтр по внутреннему ID клиента. Формирование параметров этого фильтра, собираемых из текущего подгруженного списка клиентов
Отображение визуально статуса клиента (прибыль - зелёным, убыток - красным)
### Стек и технологии:
PixelPerfect
Vue 3 (Composition API)
Vue router
Vuex
TypeScript
плагин @vuepic/vue-datepicker
axios

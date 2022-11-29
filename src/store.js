import { reactive } from 'vue'

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

// TODO storing indices is... weird? As far as I know, you can't get item's
// index without writing ugly code and shooting yourself in the foot with O(n).
export const kanban = reactive([
	{
		name:  "План",
		items: [],
		index: 0,
		uuid:  uuidv4()
	},
	{
		name:  "В работе",
		items: [],
		index: 1,
		uuid:  uuidv4()
	},
	{
		name:  "Готово",
		items: [],
		index: 2,
		uuid:  uuidv4()
	},
	// {
	// 	name:  "Колонка1",
	// 	items: [],
	// 	uuid:  uuidv4()
	// },
	// {
	// 	name:  "Колонка2",
	// 	items: [],
	// 	uuid:  uuidv4()
	// },
	// {
	// 	name:  "Колонка3",
	// 	items: [],
	// 	uuid:  uuidv4()
	// }
])

// Archived items
export const archived = reactive([])

// Item that's being dragged right now
let draggedItem = null

// TODO it's currently assumed that columns can't be moved, created or deleted
export const API = {
	// name, desc: String, column: Object
	addItem(name, desc, column, priority=1) {
		// TODO is there a more elegant way to do this in JS?
		const newItem = {
			name      : name,
			desc      : desc,
			column    : column,
			priority  : priority,
			createdAt : new Date().toLocaleString(),
			uuid      : uuidv4()
		}

		column.items.push(newItem)
	},

	// Move from one column to another. If `toColumn` is null or greater than
	// `kanban.length - 1`, then remove the item.
	// Yes, `toColumn` and `fromColumn` can be an objects or indices.
	// It's probably bad.
	moveItem(item, fromColumn, toColumn) {
		if (typeof(fromColumn) === 'number')
			fromColumn = kanban[fromColumn]
		if (typeof(toColumn) === 'number')
			toColumn = kanban[toColumn]

		fromColumn.items.splice(fromColumn.items.indexOf(item), 1)
		if (toColumn !== undefined && toColumn !== null) {
			toColumn.items.push(item)
			item.column = toColumn
		}
		else {
			archived.push(item)
			item.column = null
		}
	},

	startDrag(item) {
		draggedItem = item
	},

	stopDrag() {
		draggedItem = null
	},

	getDraggedItem() {
		return draggedItem
	}
}

let lorem = "Lorem ipsum, dolor, sit amet consectetur adipisicing elit. Distinctio, laboriosam non ipsa ut corporis id hic ad amet eius blanditiis tempore ipsam repellat consectetur vero necessitatibus dolor aperiam error. Beatae."

API.addItem("Сходить в библиотеку", "Все прочитанные книги пора отнесни в библиотеку.", kanban[0], 2)
API.addItem("Сверстать сайт", lorem, kanban[0], 2)
// API.addItem("Пресс качат рас", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат два", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат три", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат четыре", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат пять", "Добавим описание рас два три четыре", kanban[0], 3)
API.addItem("Написать резюме", "Можно воспользоваться платформой для составления резюме или использовать готовый дизайн.", kanban[1], 1)
API.addItem("Очистить место на диске", "Удалить все ненужные файлы.", kanban[1], 3)
API.addItem("Написать курсач", "Выполнить курсовую работу - канбан-доску на Vue.", kanban[2], 1)

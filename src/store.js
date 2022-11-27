import { reactive } from 'vue'

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

// TODO storing indices is... weird? But I haven't found another easy way to get
// element index without O(n).

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

// TODO it's currently assumed that columns can't be moved, created or deleted

export const API = {
	// name, desc: String, column: Object
	addItem(name, desc, column, priority=1) {
		// TODO is there a more elegant way to do this in JS?
		const newItem = {
			name      : name,
			desc      : desc,
			column    : column, // TODO do I really need to know the column?
			// TODO store next column index or object reference?
			priority  : priority,
			createdAt : new Date().toLocaleString(),
			// index     : column.items.length,
			uuid      : uuidv4()
		}

		column.items.push(newItem)
	},

	// Move from one column to another. If `toColumn` is null or greater than
	// `kanban.length - 1`, then remove item
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
			console.log(archived)
		}
	},
}

let lorem = "Lorem ipsum, dolor, sit amet consectetur adipisicing elit. Distinctio, laboriosam non ipsa ut corporis id hic ad amet eius blanditiis tempore ipsam repellat consectetur vero necessitatibus dolor aperiam error. Beatae."

API.addItem("Сделать курсач", "Добавим описание рас два три четыре", kanban[0], 1)
API.addItem("Анжуманя", lorem, kanban[0], 2)
// API.addItem("Пресс качат рас", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат два", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат три", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат четыре", "Добавим описание рас два три четыре", kanban[0], 3)
// API.addItem("Пресс качат пять", "Добавим описание рас два три четыре", kanban[0], 3)
API.addItem("Книжки читат", "Добавим описание рас два три четыре", kanban[1], 1)
API.addItem("В магазин ходит", "Добавим описание рас два три четыре", kanban[1], 1)
API.addItem("Я сделяль", "Добавим описание рас два три четыре", kanban[2], 3)

import { reactive } from 'vue'

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

export const kanban = reactive([
	{
		name:  "План",
		items: [],
		uuid:  uuidv4()
	},
	{
		name:  "В работе",
		items: [],
		uuid:  uuidv4()
	},
	{
		name:  "Готово",
		items: [],
		uuid:  uuidv4()
	}
])


export const API = {
	// name: String, column: Object
	addItem(name, column, priority=1) {
		// TODO is there a more elegant way to do this in JS?
		const newItem = {
			name     : name,
			column   : column, // TODO do I really need to know the column?
			priority : priority,
			uuid     : uuidv4()
		}

		column.items.push(newItem)
	},
}

API.addItem("Laundry", kanban[0], 1)
API.addItem("Reading books", kanban[1], 1)

const template = document.querySelector("table");
template.remove();
template.toggleAttribute("hidden");

const rowWeekday = template.querySelector(".row");
rowWeekday.remove();

const rowWeekend = rowWeekday.cloneNode(true);
rowWeekend.classList.add("weekend");

const form = document.querySelector("form");
const tables = document.querySelector("div");

form.addEventListener("submit", e => {
	e.preventDefault();
	const data = new FormData(form);

	tables.replaceChildren();

	const partialTable = template.cloneNode(true);
	partialTable.querySelector(".norm").textContent = data.get("norm");
	partialTable.querySelector(".name").textContent = data.get("name");
	partialTable.querySelector(".occupation").textContent = data.get("occupation");

	const weekday = rowWeekday.cloneNode(true);
	weekday.querySelector(".start").value = data.get("start");
	weekday.querySelector(".end").value = data.get("end");

	const date = new Date(data.get("year"), data.get("month") - 1);
	for (let i = data.get("count"); i > 0; --i) {
		const month = date.getMonth();

		const table = partialTable.cloneNode(true);

		function pad(n) {
			return n.toString().padStart(2, "0")
		}

		table.querySelector(".year").textContent = date.getFullYear();
		table.querySelector(".month").textContent = pad(month + 1);

		while (date.getMonth() === month) {
			const dayOfWeek = date.getDay();
			const day = date.getDate();
			const row = (dayOfWeek > 0 && dayOfWeek < 6 ? weekday : rowWeekend).cloneNode(true);
			row.querySelector(".day").textContent = pad(day);
			table.children[0].appendChild(row);
			date.setDate(day + 1);
		}

		tables.append(table);
	}
});

let notes = [];
let editId = null;

const nameInput = document.getElementById("name");
const addButton = document.getElementById("add");
const notesContainer = document.getElementById("notes-container");

const API_URL = "http://localhost:3000/api/notes";

async function fetchNotes() {
    const res = await fetch(API_URL);
    notes = await res.json();
    renderNotes();
}

addButton.addEventListener("click", async () => {
    const desc = nameInput.value.trim();
    if (!desc) return;

    if (editId) {
        const res = await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ desc })
        });
        await res.json();
        editId = null;
        addButton.textContent = "Add";
    } else {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ desc })
        });
        await res.json();
    }

    nameInput.value = "";
    fetchNotes();
});


async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
}





function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note) => {
        const wrapper = document.createElement("div");
        wrapper.className = "flex gap-3 w-full";

        const div = document.createElement("div");
        div.className = "w-full p-2 flex items-center gap-2 hover:bg-gray-200 rounded";
        div.innerHTML = `<div class="text-gray-600">&#8942;&#8942;</div> ${note.desc}`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600";
        editBtn.onclick = () => {
            nameInput.value = note.desc;
            editId = note._id;
            addButton.textContent = "Save";
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600";
        deleteBtn.onclick = () => deleteNote(note._id);

        wrapper.appendChild(div);
        wrapper.appendChild(editBtn);
        wrapper.appendChild(deleteBtn);

        notesContainer.appendChild(wrapper);
    });
}

fetchNotes();


const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");

addBtn.addEventListener("click", createNote);
window.addEventListener("DOMContentLoaded", loadNotes);

async function loadNotes() {
    const response = await fetch("/api/notes");
    const notes = await response.json();

    notesList.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = note.text;

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const editBtn = document.createElement("div");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editNote(note.id, note.text));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteNote(note.id));

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        notesList.appendChild(li);
    });
}

async function createNote() {
    const text = noteInput.value.trim()

    if (!text) return;

    await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
    });

    noteInput.value = "";

    loadNotes();
}

async function editNote(id, currentText) {
    const text = prompt("Edit note:", currentText);

    if (text === null) return;

    await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
    });

    loadNotes();
}

async function deleteNote(id) {
    const confirmed = confirm("Delete this note?");

    if (!confirmed) return;

    await fetch(`/api/notes/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}
import fs from "fs";
import path from "path";

const MEMORY_DIR = "./data";
const MEMORY_FILE = path.join(MEMORY_DIR, "memory.json");

function ensureMemoryFile() {
  if (!fs.existsSync(MEMORY_DIR)) {
    fs.mkdirSync(MEMORY_DIR, { recursive: true });
  }

  if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, "[]");
  }
}

export function loadMemories() {
  try {
    ensureMemoryFile();

    const data = fs.readFileSync(MEMORY_FILE, "utf8");
    const memories = JSON.parse(data);

    if (!Array.isArray(memories)) {
      return [];
    }

    return memories;
  } catch (error) {
    console.error("Memory file is corrupted:", error.message);
    return [];
  }
}

function writeMemories(memories) {
  ensureMemoryFile();

  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memories, null, 2)
  );
}

export function saveMemory(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Memory text must be a non-empty string.");
  }

  const now = new Date().toISOString();
  const memories = loadMemories();

  memories.push({
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: now,
    updatedAt: now
  });

  writeMemories(memories);
}

export function getMemories() {
  return loadMemories();
}

export function searchMemories(query) {
  if (typeof query !== "string" || query.trim() === "") {
    return [];
  }

  const searchText = query.toLowerCase();
  const memories = loadMemories();

  return memories.filter(memory =>
    typeof memory.text === "string" &&
    memory.text.toLowerCase().includes(searchText)
  );
}

export function deleteMemories(query) {
  if (typeof query !== "string" || query.trim() === "") {
    return 0;
  }

  const searchText = query.toLowerCase();
  const memories = loadMemories();

  const remainingMemories = memories.filter(memory =>
    !(
      typeof memory.text === "string" &&
      memory.text.toLowerCase().includes(searchText)
    )
  );

  writeMemories(remainingMemories);

  return memories.length - remainingMemories.length;
}

export function updateMemory(query, newText) {
  if (typeof query !== "string" || query.trim() === "") {
    return 0;
  }

  if (typeof newText !== "string" || newText.trim() === "") {
    throw new Error("New memory text must be a non-empty string.");
  }

  const searchText = query.toLowerCase();
  const now = new Date().toISOString();
  const memories = loadMemories();

  let updatedCount = 0;

  const updatedMemories = memories.map(memory => {
    if (
      typeof memory.text === "string" &&
      memory.text.toLowerCase().includes(searchText)
    ) {
      updatedCount++;

      return {
        ...memory,
        text: newText.trim(),
        updatedAt: now
      };
    }

    return memory;
  });

  writeMemories(updatedMemories);

  return updatedCount;
}
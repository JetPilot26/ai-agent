import fs from "fs";

const MEMORY_FILE = "./data/memory.json";

export function saveMemory(text) {
  let memories = [];

  if (fs.existsSync(MEMORY_FILE)) {
    const data = fs.readFileSync(MEMORY_FILE, "utf8");
    memories = JSON.parse(data);
  }

  memories.push({
    text,
    createdAt: new Date().toISOString()
  });

  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memories, null, 2)
  );
}

export function getMemories() {
  if (!fs.existsSync(MEMORY_FILE)) {
    return [];
  }

  const data = fs.readFileSync(MEMORY_FILE, "utf8");
  return JSON.parse(data);
}
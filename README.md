AI Agent
A personal AI assistant built with Node.js, OpenAI, persistent memory, and conversation history.
Overview
AI Agent is a command-line AI assistant designed to be expandable over time. The project began as a simple chatbot and has evolved into a memory-enabled assistant capable of:
    • Conversational AI using OpenAI
    • Long-term memory storage
    • Memory search, update, and deletion
    • Short-term conversation history
    • Persistent storage using JSON
    • Modular architecture for future expansion
The long-term goal is to create a flexible AI assistant platform that can grow into a web application and eventually support additional AI skills and services.

Current Features (v0.4)
OpenAI Integration
    • Uses the OpenAI API
    • Configurable model selection via environment variables
    • Input validation
    • API timeout protection
    • Error handling and graceful recovery
Long-Term Memory
The agent can store information permanently.
Examples:
remember my favorite guitar is my PRS
remember my wife's name is Gail
Stored memories are written to:
data/memory.json
Memory Retrieval
Examples:
do you remember favorite guitar
from memory wife's name
Memory Updates
Examples:
update my favorite guitar to PRS Custom 24
Memory Deletion
Examples:
forget favorite guitar
Safety checks prevent accidental deletion of large portions of memory.
Conversation History (v0.4)
The agent maintains short-term conversation context during the current session.
Example:
You: My grandson Hunter likes Fortnite.

You: What game did I just mention?

AI: Fortnite.

You: What is my grandson's name?

AI: Hunter.
Conversation history is maintained in memory while the application is running and is automatically reset when the application exits.

Project Structure
ai-agent/
│
├── data/
│   └── memory.json
│
├── src/
│   ├── agent/
│   │   └── router.js
│   │
│   ├── ai/
│   │   └── openai.js
│   │
│   └── memory/
│       └── memory.js
│
├── index.js
├── package.json
├── .env
├── .gitignore
└── README.md

Installation
Clone the repository:
git clone https://github.com/JetPilot26/ai-agent.git
cd ai-agent
Install dependencies:
npm install
Create a .env file:
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini

Running the Agent
Start the application:
node index.js
Example session:
You: remember my favorite amp is Spark 2

AI:
Memory saved.

You: do you remember favorite amp

AI:
I found this in memory: my favorite amp is Spark 2
Exit:
exit
or
Ctrl+C

Security Features
Implemented
    • API key stored in .env
    • .env excluded via .gitignore
    • Input validation
    • Error handling
    • Corruption protection for memory.json
    • Memory file auto-creation
    • Safe update and delete operations
    • OpenAI timeout handling
Planned
    • Memory categories
    • SQLite database support
    • User authentication
    • Web interface
    • Encrypted storage
    • Cloud deployment
    • AI skills/plugins

Version History
v0.1
    • Initial OpenAI integration
    • Basic command-line interface
v0.2
    • Persistent memory system
    • Memory search functionality
v0.3
    • Improved error handling
    • Security hardening
    • Memory validation
    • Safer update and delete logic
v0.4
    • Conversation history
    • Context-aware AI responses
    • Improved routing logic
    • Enhanced memory interaction

Future Roadmap
v0.5
    • Memory categories
    • Favorites
    • Notes
    • Projects
    • Personal information
v0.6
    • Web-based chat interface
v0.7
    • AI skills framework
v1.0
    • Full personal AI assistant platform

Author
Ron
Built as a personal AI assistant project and learning platform for AI, software development, and future passive-income opportunities.
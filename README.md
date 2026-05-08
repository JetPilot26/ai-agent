\# AI Agent



A modular AI-powered personal assistant built with Node.js and the OpenAI API.



\## Project Goal



The goal of this project is to build a customizable AI assistant capable of:



\* Interactive conversations

\* Persistent memory

\* Notifications and reminders

\* Calendar and contact integration

\* File and tool access

\* Future automation and autonomous task execution



The project is designed to start simple and expand over time into a full personal assistant platform.



\---



\# Current Features



\## Working Features



\* Interactive terminal-based AI conversation loop

\* OpenAI API integration

\* Environment variable support using `.env`

\* GitHub version control

\* Persistent runtime session

\* Clean startup and shutdown handling



\---



\# Project Structure



```text

ai-agent/

│

├── data/

│

├── node\_modules/

│

├── src/

│   ├── memory/

│   ├── tools/

│   └── prompts/

│

├── .env

├── .gitignore

├── daily.js

├── index.js

├── package.json

├── package-lock.json

├── README.md

└── test.js

```



\---



\# Technologies Used



\* Node.js

\* OpenAI API

\* JavaScript ES Modules

\* dotenv

\* Git / GitHub



\---



\# Installation



\## Clone Repository



```bash

git clone https://github.com/JetPilot26/ai-agent.git

cd ai-agent

```



\---



\## Install Dependencies



```bash

npm install

```



\---



\## Create Environment File



Create a `.env` file in the root project folder.



Example:



```env

OPENAI\_API\_KEY=your\_api\_key\_here

```



\---



\# Running the Application



\## Start the AI Agent



```bash

node index.js

```



Example:



```text

AI Agent Started



You: hello



AI: Hello! How can I assist you today?

```



\---



\# Exit the Application



Type:



```text

exit

```



\---



\# Development Roadmap



\## Phase 1



\* Interactive AI runtime

\* OpenAI API integration

\* GitHub integration



\## Phase 2



\* Persistent memory system

\* Local file storage

\* User personalization



\## Phase 3



\* Tool integrations

\* Notifications

\* Calendar support

\* Contact management



\## Phase 4



\* Autonomous agent behavior

\* Background task execution

\* Android/mobile integration

\* Voice support



\---



\# Security Notes



\* Never commit `.env` files to GitHub

\* API keys should always remain private

\* `.gitignore` excludes sensitive files



\---



\# Future Goals



\* Modular plugin architecture

\* AI tool routing

\* Long-term memory

\* Scheduling system

\* Multi-agent workflows

\* Personal assistant capabilities



\---



\# License



This project is currently under private development.



```

```




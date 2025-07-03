## MailToTasks — AI-powered Task Extraction from Emails

## Overview  
MailToTasks is a simple web app prototype designed to automate extracting actionable tasks from construction and real-estate related emails. Using OpenAI’s GPT-4 model, the app parses unstructured email content and returns structured task lists including descriptions, assignees, and due dates. This helps project managers and site supervisors save time and reduce errors caused by manual task tracking.

## How to run locally

1. Clone the repo  
   git clone <github.com/Saifahmeed/MailToTask>  
   cd MailToTasks

2. Configure API key  
   Replace the placeholder API key in app.js with your OpenAI API key.  
   Alternatively, you can modify the code to load the key from an environment variable for better security.

3. Run the app  
   Open index.html in a modern browser. No backend or server required since it uses client-side JavaScript.

4. Use  
   Paste your email content into the input box, click Generate Tasks, and see the extracted tasks below. You can then save the tasks as a text file.

Key design choices

- Client-side only — to simplify deployment and avoid backend complexity, all processing and API calls happen directly in the browser.  
- File saving via Blob — allows users to download extracted tasks as text files without server storage.

## Example input:
Dear team,

please make sure the project plans are thoroughly reviewed by next monday. kindly assign saif to update the budget report and mohammed to verify the safety protocols. the final draft should be submitted by friday.

thank you,  
ibrahim

## Example output:
[
  {
    "description": "review the project plans thoroughly",
    "assignee": null,
    "dueDate": "next monday"
  },
  {
    "description": "update the budget report",
    "assignee": "saif",
    "dueDate": null
  },
  {
    "description": "verify the safety protocols",
    "assignee": "mohammed",
    "dueDate": null
  },
  {
    "description": "submit the final draft",
    "assignee": null,
    "dueDate": "friday"
  }
]

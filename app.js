const generateBtn = document.getElementById("generateBtn");
const saveBtn = document.getElementById("saveBtn");
const taskListDiv = document.getElementById("taskList");
const tasksUl = document.getElementById("tasks");
const emailInput = document.getElementById("emailInput");
const filenameInput = document.getElementById("filename");
const downloadLink = document.getElementById("downloadLink");

let currentTasks = [];

// when user clicks generate button
generateBtn.onclick = async () => {
  // get email text from textarea, trim spaces
  const email = emailInput.value.trim();
  if (!email) return alert("please enter email content");

  // disable button and show loading text
  generateBtn.disabled = true;
  generateBtn.textContent = "generating...";

  // prompt for openai api
  const prompt = `extract structured tasks from the email below. include description, assignee (if mentioned), and due date. respond only in json list of objects.\n\n${email}`;

  try {
    // call openai api with chat completions endpoint
    const res = await fetch("api", {
      method: "POST",
      headers: {
        Authorization: "API",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    // parse json response
    const data = await res.json();

    // get the text content from the response
    const text = data.choices?.[0]?.message?.content || "";

    // extract json array from text
    const tasks = JSON.parse(extractJsonArray(text));
    currentTasks = tasks;

    // show tasks in the page
    displayTasks(tasks);
    taskListDiv.classList.remove("hidden");
  } catch (err) {
    alert("error extracting tasks. check console.");
    console.error(err);
  } finally {
    // re-enable button and reset text
    generateBtn.disabled = false;
    generateBtn.textContent = "generate tasks";
  }
};

// when user clicks save button
saveBtn.onclick = () => {
  if (!currentTasks.length) return;

  // get filename or use default
  const filename = filenameInput.value.trim() || "tasks";

  // create lines of text for each task
  const lines = currentTasks.map(
    (t) =>
      `- ${t.description} (Assignee: ${t.assignee || "N/A"}, Due: ${
        t.dueDate || "N/A"
      })`
  );

  // make a text file blob from lines
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // update download link with blob url and filename
  downloadLink.href = url;
  downloadLink.download = filename + ".txt";
  downloadLink.classList.remove("hidden");
  downloadLink.textContent = "download saved file";
};

// extract json array string from the AI response text
function extractJsonArray(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("no json array found");
  return text.substring(start, end + 1);
}

//  display tasks in ul list on page
function displayTasks(tasks) {
  tasksUl.innerHTML = "";
  for (const task of tasks) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.description}</strong><br/>assigned to: ${
      task.assignee || "N/A"
    }<br/>due: ${task.dueDate || "N/A"}`;
    tasksUl.appendChild(li);
  }
}

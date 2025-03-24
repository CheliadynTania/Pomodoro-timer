const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.querySelector(".timer"); // Fix the selector

let timeLeft = 1500;
let interval = null;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    if (interval) return;

    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(interval);
            interval = null;
            alert("Time's up!");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    clearInterval(interval);
    interval = null;
    timeLeft = 1500;
    updateTimer();
};

updateTimer();

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
document.getElementById("add-task").addEventListener("click", () => {
    const taskText = document.getElementById("task-input").value;
    if (taskText.trim()) {
        const li = document.createElement("li");
        li.textContent = taskText;
        document.getElementById("task-list").appendChild(li);
        document.getElementById("task-input").value = "";
    }
});
const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
};

document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
});
window.addEventListener("beforeunload", () => {
    localStorage.setItem("timeLeft", timeLeft);
});
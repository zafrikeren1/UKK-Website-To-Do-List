
// Mengambil form login
const loginForm = document.getElementById("login-form") as HTMLFormElement | null;

// Jika sedang berada di halaman login
if (loginForm) {

    const loginName = document.getElementById("login-name") as HTMLInputElement;
    const loginEmail = document.getElementById("login-email") as HTMLInputElement;

    // Jika pengguna sudah login, langsung ke Home
    const savedUser = localStorage.getItem("todolyUser");

    if (savedUser) {
        window.location.href = "htmluuk.html";
    }

    // Proses login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = loginName.value.trim();
        const email = loginEmail.value.trim();

        if (name === "" || email === "") {
            alert("Please fill in all fields!");
            return;
        }

        // Menyimpan data pengguna
        const userData = {
            name: name,
            email: email
        };

        localStorage.setItem("todolyUser", JSON.stringify(userData));

        // Pindah ke halaman Home
        window.location.href = "htmluuk.html";
    });

}

else {

    // Memeriksa apakah pengguna sudah login
    const savedUser = localStorage.getItem("todolyUser");

    if (!savedUser) {

        window.location.href = "login.html";

    } else {

        // Mengambil data pengguna
        const userData = JSON.parse(savedUser);

        // Mengambil elemen Home
        const userName = document.getElementById("user-name") as HTMLHeadingElement;
        const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;

        // Menampilkan nama pengguna
        userName.textContent = userData.name + "!";

        // Logout
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("todolyUser");
            window.location.href = "login.html";
        });

        // Mengambil elemen HTML
        const taskInput = document.getElementById("task-input") as HTMLInputElement;
        const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;
        const taskList = document.getElementById("task-list") as HTMLUListElement;
        const emptyMessage = document.getElementById("empty-message") as HTMLParagraphElement;

        // Elemen progress
        const progressPercent = document.getElementById("progress-percent") as HTMLSpanElement;
        const progressFill = document.getElementById("progress-fill") as HTMLDivElement;
        const completedCount = document.getElementById("completed-count") as HTMLSpanElement;
        const totalCount = document.getElementById("total-count") as HTMLSpanElement;


        // Fungsi memperbarui progress
        function updateProgress(): void {

            const totalTasks = taskList.children.length;

            const completedTasks = taskList.querySelectorAll(
                ".task-checkbox:checked"
            ).length;

            let percentage = 0;

            if (totalTasks > 0) {
                percentage = Math.round((completedTasks / totalTasks) * 100);
            }

            progressPercent.textContent = percentage + "%";
            progressFill.style.width = percentage + "%";

            completedCount.textContent = completedTasks + " tasks completed";
            totalCount.textContent = totalTasks + " total tasks";
        }


        // Fungsi menambahkan task
        function addTask(): void {

            const taskText = taskInput.value.trim();

            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }

            // Membuat kotak task
            const newTask = document.createElement("li");
            newTask.className = "task-item";

            // Membuat checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";

            // Membuat nama task
            const taskName = document.createElement("span");
            taskName.className = "task-name";
            taskName.textContent = taskText;

            // Membuat tombol hapus
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerHTML = "&#128465;";
            deleteBtn.title = "Delete task";

            // Checklist task
            checkbox.addEventListener("change", function () {

                if (checkbox.checked) {
                    taskName.classList.add("completed");
                } else {
                    taskName.classList.remove("completed");
                }

                updateProgress();
            });

            // Hapus task
            deleteBtn.addEventListener("click", function () {

                newTask.remove();

                if (taskList.children.length === 0) {
                    emptyMessage.style.display = "block";
                }

                updateProgress();
            });

            // Memasukkan elemen ke dalam kotak task
            newTask.appendChild(checkbox);
            newTask.appendChild(taskName);
            newTask.appendChild(deleteBtn);

            // Menampilkan task
            taskList.appendChild(newTask);

            taskInput.value = "";
            emptyMessage.style.display = "none";

            updateProgress();
        }


        // Tombol Add Task
        addTaskBtn.addEventListener("click", addTask);

        // Menambahkan task dengan tombol Enter
        taskInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                addTask();
            }

        });

        // Mengatur progress awal
        updateProgress();

    }
}
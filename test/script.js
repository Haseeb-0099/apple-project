const questions = {
  subject1: [
    {
      question: "Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
    },
  ],
  subject2: [
    {
      question: "Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 1,
    },
  ],
  subject3: [
    {
      question: "Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 2,
    },
  ],
  subject4: [
    {
      question: "Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 3,
    },
  ],
};

function generateQuestions(subject) {
  const container = document.getElementById(subject);
  questions[subject].forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div>
                ${q.options
                  .map(
                    (option, i) => `
                    <label>
                        <input type="radio" name="${subject}_q${index}" value="${i}">
                        ${option}
                    </label>
                `
                  )
                  .join("")}
            </div>
        `;
    container.appendChild(questionDiv);
  });
}

function calculateScore() {
  let totalScore = 0;

  for (const subject in questions) {
    const answers = document.querySelectorAll(
      `input[name^="${subject}_q"]:checked`
    );
    answers.forEach((answer) => {
      const questionIndex = parseInt(answer.name.split("_")[1]);
      if (
        parseInt(answer.value) ===
        questions[subject][questionIndex].correctAnswer
      ) {
        totalScore++;
      }
    });
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Total Score: ${totalScore} out of ${
    Object.keys(questions).length * 10
  }</p>`;
}

let users = [];

document.addEventListener("DOMContentLoaded", function () {
  const savedUsersData = localStorage.getItem("usersData");
  if (savedUsersData) {
    users = JSON.parse(savedUsersData);
  }
});

function generateQuestions(subject) {
  const container = document.getElementById(subject);
  questions[subject].forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options-container">
                ${q.options
                  .map(
                    (option, i) => `
                    <label>
                        <input type="radio" name="${subject}_q${index}" value="${i}">
                        ${option}
                    </label>
                `
                  )
                  .join("")}
            </div>
        `;
    container.appendChild(questionDiv);
  });
}

function calculateScore() {
  let totalScore = 0;

  for (const subject in questions) {
    const answers = document.querySelectorAll(
      `input[name^="${subject}_q"]:checked`
    );
    answers.forEach((answer) => {
      const questionIndex = parseInt(answer.name.split("_")[1]);
      if (
        parseInt(answer.value) ===
        questions[subject][questionIndex].correctAnswer
      ) {
        totalScore++;
      }
    });
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Total Score: ${totalScore} out of ${
    Object.keys(questions).length * 10
  }</p>`;
}

function authenticateUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    alert("Login successful!");
    showQuestionContainers();
  } else {
    alert("Invalid credentials!");
  }
}

function showSignupForm() {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function signupUser() {
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;
  const newFirstName = document.getElementById("newFirstName").value;
  const newLastName = document.getElementById("newLastName").value;
  const confirmNewPassword =
    document.getElementById("confirmNewPassword").value;

  if (newFirstName && newLastName && confirmNewPassword) {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
    };

    users.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(users));

    alert("Sign up successful! You can now log in.");
    showLoginForm();
  } else {
    alert("Please fill in all fields.");
  }
}

function showLoginForm() {
  document.getElementById("auth-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
}

function showQuestionContainers() {
  const questionContainers = document.querySelectorAll(".question-container");
  questionContainers.forEach((container) => {
    container.style.display = "block";
  });
}

function toggleOptions(subject) {
  const optionsContainer = document
    .getElementById(subject)
    .querySelector(".options-container");
  if (
    optionsContainer.style.display === "none" ||
    optionsContainer.style.display === ""
  ) {
    optionsContainer.style.display = "block";
  } else {
    optionsContainer.style.display = "none";
  }
}

function showQuestionContainers() {
  const questionContainers = document.querySelectorAll(".question-container");
  questionContainers.forEach((container) => {
    container.style.display = "block";
  });
}

for (const subject in questions) {
  generateQuestions(subject);
}

function toggleOptions(subject) {
  const optionsContainer = document
    .getElementById(subject)
    .querySelector(".options-container");
  if (
    optionsContainer.style.display === "none" ||
    optionsContainer.style.display === ""
  ) {
    optionsContainer.style.display = "block";
  } else {
    optionsContainer.style.display = "none";
  }
}

const adminUser = {
  email: "admin@gmail.com",
  password: "password",
  isAdmin: true,
};

function adminLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === adminUser.email && password === adminUser.password) {
    alert("Admin login successful!");
    showQuestionContainers();
    displayUsersData();
  } else {
    alert("Invalid credentials!");
  }
}

function displayUsersData() {
  const userDataDiv = document.getElementById("userData");
  userDataDiv.innerHTML = "<h2>User Data:</h2>";

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <p>Email: ${user.email}</p>
      <p>First Name: ${user.firstName}</p>
      <p>Last Name: ${user.lastName}</p>
      <hr>
    `;
    userDataDiv.appendChild(userDiv);
  });
}
function showAdminLoginForm() {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("admin-form").style.display = "block";
}

function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if (email === adminUser.email && password === adminUser.password) {
    alert("Admin login successful!");
    showAdminView();
  } else {
    alert("Invalid credentials!");
  }
}

function showAdminView() {
  document.getElementById("admin-form").style.display = "none";
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signup-form").style.display = "none";

  const adminView = document.getElementById("userData");
  adminView.innerHTML = "<h2>Admin View</h2>";
  displayUsersData();
}
function calculateScore() {
  let totalScore = 0;

  for (const subject in questions) {
    const answers = document.querySelectorAll(
      `input[name^="${subject}_q"]:checked`
    );
    answers.forEach((answer) => {
      const questionIndex = parseInt(answer.name.split("_")[1]);
      const correctAnswerIndex =
        questions[subject][questionIndex].correctAnswer;

      if (parseInt(answer.value) === correctAnswerIndex) {
        totalScore += 10;
      } else {
        // Highlight the wrong answer
        answer.parentElement.classList.add("wrong-answer");
        // Highlight the correct answer
        document
          .querySelector(
            `input[name="${subject}_q${questionIndex}"][value="${correctAnswerIndex}"]`
          )
          .parentElement.classList.add("correct-answer");
      }
    });
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Total Score: ${totalScore} out of ${
    Object.keys(questions).length * 10
  }</p>`;
}

function addNewQuestion() {
  questionCount++;
  const newQuestionSubject =
    document.getElementById("newQuestionSubject").value;
  const newQuestion = document.getElementById("newQuestion").value;
  const newOptions = document.getElementById("newOptions").value.split(",");
  const newCorrectAnswer = parseInt(
    document.getElementById("newCorrectAnswer").value
  );

  const newQuestionData = {
    question: newQuestion,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };

  if (!questions[newQuestionSubject]) {
    questions[newQuestionSubject] = [];
  }

  questions[newQuestionSubject].push(newQuestionData);

  generateQuestions();
  handleNewQuestions();

  document.getElementById("newQuestionSubject").value = "";
  document.getElementById("newQuestion").value = "";
  document.getElementById("newOptions").value = "";
  document.getElementById("newCorrectAnswer").value = "";

  alert("New question added!");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, initializing dashboard...");

  // Placeholder data
  const users = ["Acha, Marcial Jr. M", "Alcanices, Nicanor E.", "Cortez, Maria Teresita M.", "Arellano, Rebecca S.", "Delos Reyes, Ma. Teresa C.", "Foja, Cristina E.", "Valenton, Eva B.", "Gutierrez, Eugenia M.", "Lacdao, Liberty R.", "Morada, Fenelia M."];
  const weeklySubmissions = [4, 4, 2, 4, 1, 1, 1, 1, 2, 3]; // Number of reports submitted per user
  const totalWeeks = 4;

  // Render bar chart
  const ctx = document.getElementById("submissionChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: users,
      datasets: [
        {
          label: "Weekly Submissions",
          data: weeklySubmissions,
          backgroundColor: "rgba(40, 167, 69, 0.7)",
          borderColor: "rgba(40, 167, 69, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: totalWeeks,
        },
      },
    },
  });

  // Render checkboxes for submission tracking
  const submissionStatusContainer = document.getElementById("submissionStatus");
  users.forEach((user, index) => {
    const isComplete = weeklySubmissions[index] === totalWeeks;
    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "form-check";
    checkboxDiv.innerHTML = `
      <input type="checkbox" id="user-${index}" class="form-check-input" ${isComplete ? "checked" : ""} disabled>
      <label for="user-${index}" class="form-check-label">${user}</label>
    `;
    submissionStatusContainer.appendChild(checkboxDiv);
  });

  console.log("Checkboxes rendered successfully.");

  // Dummy data for timestamps
  const sampleData = [
    { user: "Acha, Marcial Jr. M", report: "Weekly Report", time: "08:15 AM", date: "11/17/2024" },
    { user: "Alcanices, Nicanor E.", report: "Monthly Report", time: "10:30 AM", date: "11/18/2024" },
    { user: "Cortez, Maria Teresita M.", report: "Weekly Report", time: "02:45 PM", date: "11/16/2024" },
    { user: "Arellano, Rebecca S.", report: "Monthly Report", time: "09:10 AM", date: "11/19/2024" },
    { user: "Delos Reyes, Ma. Teresa C.", report: "Weekly Report", time: "04:25 PM", date: "11/15/2024" },
  ];

  console.log("Adding sample timestamp records...");
  sampleData.forEach((entry) => {
    recordTimestamp(entry.user, entry.report, entry.time, entry.date);
  });

  console.log("Timestamp records added.");
});

// Functions
function recordTimestamp(user, reportType, time = null, date = null) {
  const now = new Date();
  const submissionTime = time || now.toLocaleTimeString();
  const submissionDate = date || now.toLocaleDateString();

  const table = document.getElementById("submissionRecords");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user}</td><td>${reportType}</td><td>${submissionTime}</td><td>${submissionDate}</td>`;
  table.appendChild(row);

  console.log(`Record added for ${user}: ${reportType} at ${submissionTime} on ${submissionDate}`);
}

document.addEventListener("DOMContentLoaded", function () {
    // Load the risk data from the JSON file
    fetch("data/risk_data.json")
      .then((response) => response.json())
      .then((data) => {
        populateTable(data);
      })
      .catch((error) => console.error("Error loading data:", error));
  
    // Set up search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      filterTable(filter);
    });
  });
  
  function populateTable(data) {
    const tableBody = document.querySelector("#riskTable tbody");
    data.forEach((item) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${item.dataType}</td>
        <td>${item.dataSourceName}</td>
        <td>${item.datasetName}</td>
        <td>${item.hazardType}</td>
        <td>${item.coverageArea}</td>
        <td>${item.temporalCoverage}</td>
        <td>${item.dataFormat}</td>
        <td>${item.frequencyOfUpdates}</td>
        <td>${item.dataQuality}</td>
        <td>${item.dataAccessibility}</td>
        <td>${item.licensingRestrictions}</td>
        <td>${item.url}</td>
        <td>${item.contactInformation}</td>
        <td>${item.remarks}</td>
        <td>${item.lastUpdated}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function filterTable(filter) {
    const rows = document.querySelectorAll("#riskTable tbody tr");
    rows.forEach((row) => {
      const cells = row.getElementsByTagName("td");
      let rowText = "";
      for (let i = 0; i < cells.length; i++) {
        rowText += cells[i].textContent.toLowerCase() + " ";
      }
      row.style.display = rowText.includes(filter) ? "" : "none";
    });
  }
  
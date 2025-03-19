document.addEventListener("DOMContentLoaded", () => {
  let allData = [];

  fetch("data/risk_data.json")
    .then(res => res.json())
    .then(data => {
      allData = data;
      populateTable(allData);
    });

  const searchInput = document.getElementById("searchInput");
  const dataTypeFilter = document.getElementById("dataTypeFilter");
  const filterBtns = document.querySelectorAll(".filter-btn");

  searchInput.addEventListener("input", applyFilters);
  dataTypeFilter.addEventListener("change", applyFilters);
  filterBtns.forEach(btn => btn.addEventListener("click", (e) => {
    dataTypeFilter.value = "";
    searchInput.value = e.target.getAttribute("data-filter");
    applyFilters();
  }));

  function populateTable(data) {
    const tbody = document.querySelector("#riskTable tbody");
    tbody.innerHTML = data.map((item, index) => `
      <tr>
        <td>${item.dataType}</td>
        <td>${item.dataSourceName}</td>
        <td>${item.datasetName}</td>
        <td>${item.hazardType || "-"}</td>
        <td>${item.coverageArea}</td>
        <td>${item.dataFormat}</td>
        <td>${item.dataAccessibility}</td>
        <td><button class="info-btn" data-index="${index}">ℹ️ Details</button></td>
      </tr>`).join("");

    document.querySelectorAll(".info-btn").forEach(btn => {
      btn.addEventListener("click", () => showModal(allData[btn.dataset.index]));
    });
  }

  function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const type = dataTypeFilter.value;

    populateTable(allData.filter(item =>
      (!type || item.dataType === type) &&
      Object.values(item).some(val => val.toLowerCase().includes(query))
    ));
  }

  const modal = document.getElementById("detailModal");
  document.querySelector(".close-btn").onclick = () => modal.classList.add("hidden");

  function showModal(item) {
    document.getElementById("modalBody").innerHTML = `
      <h2>${item.datasetName}</h2>
      ${Object.entries(item).map(([key,val])=>`<p><b>${key}:</b> ${val}</p>`).join('')}
    `;
    modal.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("babyname-form");
    const genderSelect = document.getElementById("gender");
    const countInput = document.getElementById("count");
    const resultDiv = document.getElementById("babyname-result");
    const spinner = document.getElementById("babyname-spinner");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const gender = genderSelect.value;
      const count = countInput.value || 1;
  
      if (!gender) {
        resultDiv.textContent = "Please select a gender.";
        return;
      }
  
      spinner.classList.remove("d-none");
      resultDiv.innerHTML = "";
  
      await fetchData(gender, count);
  
      spinner.classList.add("d-none");
    });
  
    async function fetchData(gender, count) {
      const apiUrl = `https://api.apiverve.com/v1/babynamegenerator?gender=${gender}&count=${count}`;
      const apiKey = "91319e3d-9c2f-4a9b-bc07-0fd906146e78";
  
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": apiKey,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        displayNames(data.data.names || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        resultDiv.innerHTML = `<p class="text-danger">Failed to fetch baby names. Try again later.</p>`;
      }
    }
  
    function displayNames(names) {
      if (names.length === 0) {
        resultDiv.innerHTML = `<p class="text-warning">No names found.</p>`;
        return;
      }
  
      const list = document.createElement("ul");
      list.className = "list-group";
  
      console.log(names);
  
      names.forEach((name) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = name.fullName;
        list.appendChild(li);
      });
  
      resultDiv.appendChild(list);
    }
  });
  
  
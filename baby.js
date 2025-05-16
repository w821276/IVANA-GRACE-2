document.getElementById('babyname-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const gender = document.getElementById('gender').value;
    const count = document.getElementById('count').value;
    const spinner = document.getElementById('babyname-spinner');
    const resultDiv = document.getElementById('babyname-result');
  
    if (!gender || !count) return;
  
    resultDiv.innerHTML = '';
    spinner.classList.remove('d-none');
  
    const url = `https://api.apiverve.com/v1/babynamegenerator?gender=${gender}&count=${count}`;
  
    fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': '91319e3d-9c2f-4a9b-bc07-0fd906146e78' 
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        const names = data.names;
        let html = '<div class="row">';
        names.forEach(name => {
          html += `
            <div class="col-md-4">
              <div class="card shadow mb-3">
                <div class="card-body">
                  <h5 class="card-title">${name.fullName}</h5>
                  <p class="card-text">
                    <strong>First Name:</strong> ${name.firstName}<br>
                    <strong>Middle Name:</strong> ${name.middleName}
                  </p>
                </div>
              </div>
            </div>
          `;
        });
        html += '</div>';
        resultDiv.innerHTML = html;
      })
      .catch(error => {
        console.error('Fetch error:', error);
        resultDiv.innerHTML = `
          <div class="alert alert-danger" role="alert">
            Something went wrong. Please check your API key or try again later.
          </div>
        `;
      })
      .finally(() => {
        spinner.classList.add('d-none');
      });
  });
  
  
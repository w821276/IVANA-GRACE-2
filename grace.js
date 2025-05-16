document.getElementById('lyrics-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const artist = document.getElementById('artist').value.trim();
    const song = document.getElementById('song').value.trim();
    const spinner = document.getElementById('lyrics-spinner');
    const resultDiv = document.getElementById('lyrics-result');
  
    if (!artist || !song) return;
  
    resultDiv.innerHTML = '';
    spinner.classList.remove('d-none');
  
    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      const lyrics = response.data.lyrics.replace(/\n/g, '<br>');
  
      resultDiv.innerHTML = `
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">${song} by ${artist}</h5>
            <p class="card-text">${lyrics}</p>
          </div>
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Lyrics not found. Please check the artist and song title.
        </div>
      `;
    } finally {
      spinner.classList.add('d-none');
    }
  });
  
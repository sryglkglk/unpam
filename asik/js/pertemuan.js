        // Ambil data info pertemuan dari data.json dan render ke daftar
        fetch('./data.json')
          .then(response => response.json())
          .then(data => {
            const pertemuanList = document.getElementById('pertemuan-list');
            pertemuanList.innerHTML = '';
            // Filter hanya key yang diawali 'info.' (info pertemuan)
            Object.keys(data)
              .filter(key => key.startsWith('info.'))
              .forEach(key => {
                const info = data[key];
                let tanggalRilis = '';
                // Cek apakah ada tanggal rilis (realease)
                if (info.realease) {
                  // Parsing tanggal rilis, jika gagal tampilkan apa adanya
                  let tgl = info.realease;
                  let dateObj = null;
                  // Jika format "Senin, 2025-06-02"
                  const match = tgl.match(/^[A-Za-z]+,\s*(\d{4}-\d{2}-\d{2})$/);
                  if (match) {
                    dateObj = new Date(match[1]);
                  } else if (!isNaN(Date.parse(tgl))) {
                    dateObj = new Date(tgl);
                  }
                  if (dateObj) {
                    // Format tanggal ke bahasa Indonesia
                    tanggalRilis = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                  } else {
                    tanggalRilis = tgl;
                  }
                }
                // Render setiap info pertemuan ke dalam <li>
                const li = document.createElement('li');
                li.innerHTML = `<strong>${info.judul || ''}</strong> <br><small class="text-muted" style="color:#fff !important;">[${tanggalRilis}]</small><br>${info.isi || ''}<br><br>`;
                pertemuanList.appendChild(li);
              });
          })
          .catch(err => {
            // Jika gagal ambil data, tampilkan pesan error
            const pertemuanList = document.getElementById('pertemuan-list');
            pertemuanList.innerHTML = '<li class="text-danger">Gagal memuat info pertemuan.</li>';
          });
        // Ambil data info umum dari data.json dan render ke daftar
        fetch('./data.json')
          .then(response => response.json())
          .then(data => {
            const umumList = document.getElementById('umum-list');
            umumList.innerHTML = '';
            Object.keys(data)
              .filter(key => key.startsWith('info_umum.'))
              .forEach(key => {
                const info = data[key];
                let tanggalRilis = '';
                if (info.realease) {
                  let tgl = info.realease;
                  let dateObj = null;
                  const match = tgl.match(/^[A-Za-z]+,\s*(\d{4}-\d{2}-\d{2})$/);
                  if (match) {
                    dateObj = new Date(match[1]);
                  } else if (!isNaN(Date.parse(tgl))) {
                    dateObj = new Date(tgl);
                  }
                  if (dateObj) {
                    tanggalRilis = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                  } else {
                    tanggalRilis = tgl;
                  }
                }
                const li = document.createElement('li');
                li.innerHTML = `<strong>${info.judul || ''}</strong> <br><small class="text-muted" style="color:#fff !important;">[${tanggalRilis}]</small><br>${info.isi || ''}<br><br>`;
                umumList.appendChild(li);
              });
          })
          .catch(() => {
            document.getElementById('umum-list').innerHTML = '<li class="text-danger">Gagal memuat info umum.</li>';
          });
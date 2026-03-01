        // Ambil data info pertemuan dari data.json dan render ke daftar
        fetch('./data.json')
          .then(response => response.json())
          .then(data => {
            const pertemuanList = document.getElementById('pertemuan-list');
            pertemuanList.innerHTML = '';
            // Filter hanya key yang diawali 'info.' (info pertemuan)
Object.keys(data)
  .filter(key => key.startsWith('info.'))
  .map(key => {
    const info = data[key];

    let rawTanggal = info.realease || '';
    let dateObj = null;

    // Parsing format "Senin, 2025-06-02"
    const match = rawTanggal.match(/^[A-Za-z]+,\s*(\d{4}-\d{2}-\d{2})$/);
    if (match) {
      dateObj = new Date(match[1]);
    } else if (!isNaN(Date.parse(rawTanggal))) {
      dateObj = new Date(rawTanggal);
    }

    return {
      key,
      info,
      dateObj
    };
  })

  // 🔥 SORT: terbaru di atas
  .sort((a, b) => {
    // kalau dua-duanya ada tanggal
    if (a.dateObj && b.dateObj) {
      return b.dateObj - a.dateObj;
    }
    // kalau salah satu ga ada tanggal, yang ada tanggal diprioritaskan
    if (a.dateObj) return -1;
    if (b.dateObj) return 1;
    return 0;
  })

  // baru render
  .forEach(item => {
    const info = item.info;
    let tanggalRilis = '';

    if (item.dateObj) {
      tanggalRilis = item.dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      tanggalRilis = info.realease || '';
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${info.judul || ''}</strong><br>
      <small class="text-muted" style="color:#fff !important;">[${tanggalRilis}]</small><br>
      ${info.isi || ''}<br><br>
    `;
    pertemuanList.appendChild(li);
  });
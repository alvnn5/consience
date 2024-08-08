function beli(produk, harga) {
    localStorage.removeItem('selectedProduk');
    localStorage.setItem('selectedProduk', JSON.stringify({ produk, harga }));
    window.location.href = 'transaksi.html';
}

function buatPesanan() {
    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const jumlah = parseInt(document.getElementById('jumlah').value, 10);

    if (!nama || !alamat || isNaN(jumlah) || jumlah <= 0) {
        alert('Tolong Isi Semua Kolom!');
        return;
    }
    
    let baju = '';
    let price = 0;
    
    if (document.getElementById('bruz').checked) {
        baju = 'bruz';
        price = document.getElementById('bruz').getAttribute('data-price');
    } else if (document.getElementById('maze').checked) {
        baju = 'maze';
        price = document.getElementById('maze').getAttribute('data-price');
    } else if (document.getElementById('hoshi').checked) {
        baju = 'hoshi';
        price = document.getElementById('hoshi').getAttribute('data-price');
    } else {
        alert('Pilih Baju Anda.');
        return;
    }

    
    const totalPrice = jumlah * price;

    const params = new URLSearchParams({
        nama,
        alamat,
        baju,
        jumlah,
        price: totalPrice,
    });

    window.location.href = `invoice.html?${params.toString()}`;
}

window.addEventListener('load', () => {
    if (window.location.pathname.endsWith('invoice.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('Nama').textContent = urlParams.get('nama');
        document.getElementById('Alamat').textContent = urlParams.get('alamat');
        document.getElementById('Produk').textContent = urlParams.get('baju');
        document.getElementById('jumlah').textContent = urlParams.get('jumlah');
        document.getElementById('Total').textContent = 'Rp ' + new Intl.NumberFormat('id-ID').format(urlParams.get('price'));
    }
});

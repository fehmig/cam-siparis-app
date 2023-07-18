import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaSave, FaEdit, FaTrash } from 'react-icons/fa';


const firms = ['FİRMA 1', 'FİRMA 2', 'FİRMA 3', 'FİRMA 4', 'FİRMA 5']; // Firma listesi
const products = ['4 + 12 + 6 Buzlu +DC', '4 + 14 + 4 DC+ Yeşil', '4 + 12 +  DC+DC']; // Ürün Listesi

function Main() {
  const [siparisTarihi, setSiparisTarihi] = useState(null);
  const [sevkTarihi, setSevkTarihi] = useState(null);
  const [olcuGirisiAcik, setOlcuGirisiAcik] = useState(false);
  const [genislik, setGenislik] = useState('');
  const [yukseklik, setYukseklik] = useState('');
  const [adet, setAdet] = useState('');
  const [birimFiyat, setBirimFiyat] = useState('');
  const [toplamMkare, setToplamMkare] = useState('');
  const [tutarMkare, setTutarMkare] = useState('');
  const [toplamTutar, setToplamTutar] = useState('');
  const [uzunKenar, setUzunKenar] = useState('');
  const [ukToplami, setUkToplami] = useState('');
  const [kisaKenar, setKisaKenar] = useState('');
  const [kkToplami, setKkToplami] = useState('');
  const [toplamMiktar, setToplamMiktar] = useState('');
  const [islemTutari, setIslemTutari] = useState('');
  const [olcuBilgileri, setOlcuBilgileri] = useState([]);
  const [selectedFirma, setSelectedFirma] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(-1); // New state for highlighted row index

  useEffect(() => {
    // Calculate and update the values
    const calculatedToplamMkare = genislik * yukseklik;
    setToplamMkare(calculatedToplamMkare);

    const calculatedTutarMkare = adet * birimFiyat;
    setTutarMkare(calculatedTutarMkare);

    const calculatedToplamTutar = calculatedToplamMkare * calculatedTutarMkare;
    setToplamTutar(calculatedToplamTutar);
  }, [genislik, yukseklik, adet, birimFiyat]);

  const handleSiparisTarihiChange = (date) => {
    setSiparisTarihi(date);
  };

  const handleSevkTarihiChange = (date) => {
    setSevkTarihi(date);
  };

  const toggleOlcuGirisi = () => {
    setOlcuGirisiAcik(!olcuGirisiAcik);
  };

  const handleOlcuGirisiKaydet = () => {
    // Save the measurement entry to the array
    const olcuEntry = {
      unvan: selectedFirma,
      stokAciklamasi: selectedProduct,
      stokKodu: document.getElementById('stokKodu').value,
      yuzdeFark: document.getElementById('yuzdeFark').value,
      hesaplamaSecenekleri: document.getElementById('hesaplamaSecenekleri').value,
      pozBilgisi: document.getElementById('pozBilgisi').value,
      grinding: document.getElementById('grinding').value,
      genislik: document.getElementById('genislik').value,
      yukseklik: document.getElementById('yukseklik').value,
      adet: document.getElementById('adet').value,
      birimFiyat: document.getElementById('birimFiyat').value,
      birim: tutarMkare,
      iskonto: document.getElementById('iskonto').value,
      toplamMkare,
      tutarMkare,
      toplamTutar,
      uzunKenar: document.getElementById('uzunKenar').value,
      ukToplami,
      kisaKenar: document.getElementById('kisaKenar').value,
      kkToplami,
      toplamMiktar,
      islemTutari: document.getElementById('islemTutari').value,
    };

    if (editingRowIndex === -1) {
      setOlcuBilgileri([...olcuBilgileri, olcuEntry]);
    } else {
      const updatedOlcuBilgileri = [...olcuBilgileri];
      updatedOlcuBilgileri[editingRowIndex] = olcuEntry;
      setOlcuBilgileri(updatedOlcuBilgileri);
      setEditingRowIndex(-1);
    }
    resetInputValues();
    setHighlightedRowIndex(-1); // Reset the highlighted row index
  };

  const handleEditRow = (index) => {
    if (editedRowIndex === index) {
      setEditedRowIndex(null); // Clear the editedRowIndex if the same row is clicked again
      setEditingRowIndex(-1); // Clear the editingRowIndex as well
    } else {
      setEditedRowIndex(index);
      setEditingRowIndex(index); // Set the editingRowIndex to the clicked row index
      setHighlightedRowIndex(index); // Set the highlighted row index
    }
    const entry = olcuBilgileri[index];
    setSelectedFirma(entry.unvan);
    setSelectedProduct(entry.stokAciklamasi);
    setGenislik(entry.genislik);
    setYukseklik(entry.yukseklik);
    setAdet(entry.adet);
    setBirimFiyat(entry.birimFiyat);
    setToplamMkare(entry.toplamMkare);
    setTutarMkare(entry.tutarMkare);
    setToplamTutar(entry.toplamTutar);
    setUzunKenar(entry.uzunKenar);
    setUkToplami(entry.ukToplami);
    setKisaKenar(entry.kisaKenar);
    setKkToplami(entry.kkToplami);
    setToplamMiktar(entry.toplamMiktar);
    setIslemTutari(entry.islemTutari);
  };

  const handleDeleteRow = (index) => {
    const updatedOlcuBilgileri = [...olcuBilgileri];
    updatedOlcuBilgileri.splice(index, 1);
    setOlcuBilgileri(updatedOlcuBilgileri);
  };

  const resetInputValues = () => {
    setSelectedFirma('');
    setSelectedProduct('');
    setGenislik('');
    setYukseklik('');
    setAdet('');
    setBirimFiyat('');
    setToplamMkare('');
    setTutarMkare('');
    setToplamTutar('');
    setUzunKenar('');
    setUkToplami('');
    setKisaKenar('');
    setKkToplami('');
    setToplamMiktar('');
    setIslemTutari('');
  };

  return (

    <>
    {/* <h1 className='main-title' style={{textAlign:'center'}}>CAM APP</h1> */}
    <div className='main'>
   
     
     
      <div className='siparis-bilgileri'>
      <h3 className='siparis-bilgileri-title custom-bg'>SİPARİŞ BİLGİLERİ</h3>

        <div className='form-group-row'>
          <div className='form-group'>
            <label htmlFor='siparisKodu'>Cari Kod:</label>
            <input type='text' id='siparisKodu' className='short-input' />
          </div>
          <div className='form-group'>
            <label htmlFor='firma'>Unvan:</label>
            <select id='firma' value={selectedFirma} onChange={(e) => setSelectedFirma(e.target.value)}>
  <option value="">Firma Seçin</option>
  {firms.map((firm, index) => (
    <option key={index} value={firm}>
      {firm}
    </option>
  ))}
</select>

          </div>
          <div className='form-group'>
            <label htmlFor='siparisTarihi'>Sipariş Tarihi:</label>
            <DatePicker
              id='siparisTarihi'
              selected={siparisTarihi}
              onChange={handleSiparisTarihiChange}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        </div>
        <div className='form-group-row'>
          <div className='form-group'>
            <label htmlFor='siparisNo'>Sipariş No:</label>
            <input type='text' id='siparisNo' className='short-input' />
          </div>
          <div className='form-group'>
            <label htmlFor='musteriIsmi'>Müşteri İsmi:</label>
            <input type='text' id='musteriIsmi' />
          </div>
          <div className='form-group'>
            <label htmlFor='sevkTarihi'>Sevk Tarihi:</label>
            <DatePicker
              id='sevkTarihi'
              selected={sevkTarihi}
              onChange={handleSevkTarihiChange}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        </div>
        <div className='form-group-row'>
          <div className='form-group'>
            <label htmlFor='sevkAdresi'>Sevk Adresi:</label>
            <input type='text' id='sevkAdresi' />
          </div>
          <div className='form-group'>
            <label htmlFor='fiyatListesi'>Fiyat Listesi:</label>
            <select id='fiyatListesi'>
              <option value='Fiyat 1'>Fiyat 1</option>
              <option value='Fiyat 2'>Fiyat 2</option>
              <option value='Fiyat 2'>Fiyat 3</option>
            </select>
          </div>
        </div>
        <div className='form-group-row'>
          <div className='form-group aciklama'>
            <label htmlFor='aciklama'>Açıklama:</label>
            <textarea style={{height:'50px'}} id='aciklama' />
          </div>
        </div>
      </div>
      <div className='olcu-girisi-toggle'>
        <button onClick={toggleOlcuGirisi}>
          Ölçü / İşlem Girişi  <div style={{marginLeft:'10px' }}>{olcuGirisiAcik ? <BsChevronUp /> : <BsChevronDown />}</div>
        </button>
      </div>
      {olcuGirisiAcik && (
        <>
        <div className='ölcü-islem-alani'>
        <div className='olcu-girisi'>
          <h3 className='olcu-girisi-title custom-bg2'>Ölçü Girişi</h3>
          <div className='form-group-row'>
          <div className='form-group'>
      <label htmlFor='stokAciklamasi'>Stok Açıklaması:</label>
      <select id='stokAciklamasi' value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value=''>Ürün Seçin</option>
        {products.map((product, index) => (
          <option key={index} value={product}>
            {product}
          </option>
        ))}
      </select>
    </div>
            <div className='form-group'>
              <label htmlFor='stokKodu'>Stok Kodu:</label>
              <input type='text' id='stokKodu' />
            </div>
            <div className='form-group'>
              <label htmlFor='yuzdeFark'>Yüzde Farkı:</label>
              <input type='text' id='yuzdeFark' />
            </div>
            <div className='form-group'>
              <label htmlFor='hesaplamaSecenekleri'>Hesaplama Seç. :</label>
              <select id='hesaplamaSecenekleri'>
                <option value='net'>Net</option>
              </select>
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='pozBilgisi'>Poz Bilgisi:</label>
              <input type='text' id='pozBilgisi' />
            </div>
            <div className='form-group'>
              <label htmlFor='grinding'>Grinding:</label>
              <input type='text' id='grinding' />
            </div>
          </div>
          <div className='form-group-row'>
          <div className='form-group'>
    <label htmlFor='genislik'>Genişlik:</label>
    <div className='input-group'>
      <input
        type='text'
        id='genislik'
        value={genislik}
        onChange={(e) => setGenislik(e.target.value)}
      />
      <div className='cross-icon'>X</div>
    </div>
  </div>
  <div className='form-group'>
    <label htmlFor='yukseklik'>Yükseklik:</label>
    <input
      type='text'
      id='yukseklik'
      value={yukseklik}
      onChange={(e) => setYukseklik(e.target.value)}
    />
  </div>
            <div className='form-group'>
              <label htmlFor='adet'>Adet:</label>
              <input
                type='text'
                id='adet'
                value={adet}
                onChange={(e) => setAdet(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='birimFiyat'>Birim Fiyat:</label>
              <input
                type='text'
                id='birimFiyat'
                value={birimFiyat}
                onChange={(e) => setBirimFiyat(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='birim'>Birim:</label>
              <input type='text' id='birim'  value={tutarMkare} readOnly />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='iskonto'>İskonto:</label>
              <input type='text' id='iskonto' />
            </div>
            <div className='form-group'>
              <label htmlFor='toplamMkare'>Toplam m²:</label>
              <input type='text' id='toplamMkare' value={toplamMkare} readOnly />
            </div>
            <div className='form-group'>
              <label htmlFor='tutarMkare'>Tutar m²:</label>
              <input type='text' id='tutarMkare' value={tutarMkare} readOnly />
            </div>
            <div className='form-group'>
  <label htmlFor='toplamTutar'>Toplam Tutar:</label>
  <input type='text' id='toplamTutar' value={toplamTutar} readOnly style={{ backgroundColor: '#00a000', color:'white' }} />
</div>

          </div>
        </div>

        <div className='islem-girisi'>
  <h3 className='olcu-girisi-title custom-bg3'>İşleme Giriş</h3>
  <div className='form-group-row'>
    <div className='form-group'>
      <label htmlFor='stokAciklamasi'>Stok Açıklaması:</label>
      <input type='text' id='stokAciklamasi' />
    </div>
    <div className='form-group'>
      <label htmlFor='stokKodu'>Stok Kodu:</label>
      <input type='text' id='stokKodu' />
    </div>
    <div className='form-group'>
      <label htmlFor='birim'>Birim:</label>
      <input type='text' id='birim' value={tutarMkare} readOnly />
    </div>
    <div className='form-group'>
      <label htmlFor='toplamMkare'>Toplam m²:</label>
      <input type='text' id='toplamMkare' value={toplamMkare} readOnly />
    </div>
    <div className='form-group'>
      <label htmlFor='islemFiyati'>İşlem Fiyatı:</label>
      <input type='text' id='islemFiyati' />
    </div>
  </div>
  <div className='form-group-row'>
    <div className='form-group'>
      <label htmlFor='uzunKenar'>Uzun Kenar:</label>
      <div className='input-group'>
        <input
          type='number'
          id='uzunKenar'
          value={uzunKenar}
          onChange={(e) => setUzunKenar(e.target.value)}
        />
      
      </div>
    </div>
    <div className='form-group'>
      <label htmlFor='ukToplami'>U.K Toplamı:</label>
      <input type='text' id='ukToplami' value={ukToplami} readOnly />
    </div>
    <div className='form-group'>
      <label htmlFor='kisaKenar'>Kısa Kenar:</label>
      <div className='input-group'>
        <input
          type='number'
          id='kisaKenar'
          value={kisaKenar}
          onChange={(e) => setKisaKenar(e.target.value)}
        />
      
      </div>
    </div>
    <div className='form-group'>
      <label htmlFor='kkToplami'>K.K Toplamı:</label>
      <input type='text' id='kkToplami' value={kkToplami} readOnly />
    </div>
    <div className='form-group'>
      <label htmlFor='toplamMiktar'>Toplam Miktar:</label>
      <input type='text' id='toplamMiktar' value={toplamMiktar} readOnly />
    </div>
    <div className='form-group'>
      <label htmlFor='islemTutari'>İşlem Tutarı:</label>
      <input type='text' id='islemTutari' value={islemTutari} readOnly />
    </div>
  </div>
</div>

</div>

<div className='olcu-girisi-toggle'>
              <button onClick={handleOlcuGirisiKaydet}>
                <FaSave className='save-icon' />
                {editingRowIndex === -1 ? 'Kaydet' : 'Güncelle'}
              </button>
            </div>
            {olcuBilgileri.length === 0 ? (
  <p style={{textAlign:'center'}}> <i>Eklenen veri yok</i></p>
) : (
              <table className='olcu-bilgileri-table'>
  <thead>
    <tr>
      <th>Unvan</th>
      <th>Stok Açıklaması</th>
      <th>Genişlik</th>
      <th>Yükseklik</th>
      <th>Adet</th>
      <th>Birim m²</th>
      <th>Toplam m²</th>
      <th>Birim</th>
      <th>İskonto</th>
      <th>Tutar m²</th>
      <th>Toplam Tutar</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>
  {olcuBilgileri.map((entry, index) => (
    <tr key={index}className={index === highlightedRowIndex ? 'highlighted-row' : ''}>
      <td>{entry.unvan}</td>
      <td>{entry.stokAciklamasi}</td>
      <td>{entry.genislik}</td>
      <td>{entry.yukseklik}</td>
      <td>{entry.adet}</td>
      <td>{entry.birimFiyat}</td>
      <td>{entry.toplamMkare}</td>
      <td>{entry.birim}</td>
      <td>{entry.iskonto}</td>
      <td>{entry.tutarMkare}</td>
      <td>{entry.toplamTutar}</td>
      <td className='table-buttons'>
        <button onClick={() => handleEditRow(index)}>Düzenle</button>
        <button onClick={() => handleDeleteRow(index)}>Sil</button>
      </td>
    </tr>
  ))}
</tbody>


</table> 
)}       
        </>

      )}
    </div>
    </>
  );
}

export default Main;

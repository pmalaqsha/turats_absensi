/**
 * SISTEM ABSENSI KUTUBUTTURATS MA'HAD AL-AQSHA
 * Logika Aplikasi JavaScript Terintegrasi
 */

// =========================================================================
// KONFIGURASI URL GOOGLE APPS SCRIPT WEB APP
// Paste URL Deployment Google Apps Script Anda di bawah ini:
// =========================================================================
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxeeDjdhBQQI9lVQNvjPGHpjJltgET03Cy0L8LdDXnNQ6gRQiqNx9UjhVbPiWr9Ek/exec";

// Data Master Santri TDK dari PDF
const DEFAULT_SANTRI_MASTER = [
  // 1 PUTRI (Ula) - Pembina: Aliffia Dzikrinnisa Hayatuddin, S.Sos
  { no: 4, nama: "Shafira", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 6, nama: "Alisha tsaqila", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 7, nama: "Faza Nur Azmi Assyifa", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 8, nama: "Nur aeni", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 9, nama: "Syakila", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 11, nama: "Laura Aprilia", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 12, nama: "Putri alauna", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },
  { no: 14, nama: "Fina Aira Zahra Muttaqien", gender: "P", tingkat: "1 PUTRI (Ula)", pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos" },

  // 2A PUTRI (Wustho 1) - Pembina: Ayu Maulida Tsamrotul Jannah
  { no: 15, nama: "Afiqah Nadhira Salsabila", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 16, nama: "Zahira Octavia Suanto", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 17, nama: "Annisa Amira Azzahra", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 18, nama: "Nayka Alya", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 19, nama: "Talita ufaira", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 20, nama: "Zahida Rosyifa Nadhifa", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 21, nama: "Afifa Fitiya", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 22, nama: "Desi Humaira Syahputri", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 23, nama: "Nayla Husna Aulia", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 24, nama: "Aila Zulfa Fauziyah", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 25, nama: "Alya Yassirni Syarifah", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 26, nama: "Asyifa Husna", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },
  { no: 27, nama: "Azzahra Putri Almesya", gender: "P", tingkat: "2A PUTRI (Wustho 1)", pembina: "Ayu Maulida Tsamrotul Jannah" },

  // 2B PUTRI (Wustho 1) - Pembina: Wildan Arifin, M.Hum
  { no: 30, nama: "Aila Zulfa Fauziah", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 31, nama: "Alya Yassirni Syarifah", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 32, nama: "Asyifa Husna", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 33, nama: "Azzahra Putri Almesya", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 34, nama: "Elsa Mardhiana", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 35, nama: "Haura Azkia Ramadhani", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 36, nama: "Jelita Az Zahra", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 37, nama: "Fadillah Yasmin", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 38, nama: "Malca Khairana", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 40, nama: "Nazwa Kirana", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 41, nama: "Salwa Khairunnisa", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 42, nama: "Tami Dawa Fuadi Jaelani", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },
  { no: 43, nama: "Zahira Yumna Aufarachma", gender: "P", tingkat: "2B PUTRI (Wustho 1)", pembina: "Wildan Arifin, M.Hum" },

  // 3 PUTRI (Wustho 2) - Pembina: Ai Syarifah, M.Ag
  { no: 44, nama: "Aisha Nadira", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 45, nama: "Anita ayla Zahara", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 46, nama: "Athaya Naura syahirah", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 47, nama: "Ayu Elsi Rizki", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 48, nama: "Ghaisan fitriyatuz Zahra", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 49, nama: "Jasmine Azzahra Kusnadi", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 50, nama: "Kalila khairunnisa azahraa", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 51, nama: "Khansa Khairunnisa Ramadhani", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 52, nama: "Nayla Rafanda Musya", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 53, nama: "Pahmanazwaina Qalesya Azzahra", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 54, nama: "Refani Fuzuleha", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 55, nama: "Riska Atiyatun Nafisah", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 56, nama: "Silviana Nazwa Setiawan", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },
  { no: 57, nama: "Siti Fatimah Asy-Syi'bi", gender: "P", tingkat: "3 PUTRI (Wustho 2)", pembina: "Ai Syarifah, M.Ag" },

  // 4 PUTRI (ULYA 1) - Pembina: M. Mujabun, M.Ag
  { no: 58, nama: "AQYLLAH FARRASYAH ZHAFIRA", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 59, nama: "AULIA BILQIS SUDARNO", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 60, nama: "AULIA NUR AZIMAH ASHIHAB", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 61, nama: "DHIA AMALIA PUTRI WIYONO", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 63, nama: "HASNA SHAFAA' NAFISAH", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 64, nama: "Mega Octaviani", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 65, nama: "MUTIARA AZZAHRA ROHYANA", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 66, nama: "Nabila Esa Lestari", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 67, nama: "Regina Aulia Oktavia", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 68, nama: "SHAFA AULIA KAMILA", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },
  { no: 69, nama: "Vina Ramadhani", gender: "P", tingkat: "4 PUTRI (ULYA 1)", pembina: "M. Mujabun, M.Ag" },

  // 1 PUTRA (Ula) - Pembina: Ahmad Yusuf, M.Ag
  { no: 1, nama: "Akmal Lathif Fannan", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 2, nama: "Byan Herza Rafael", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 3, nama: "Iqbal Adittya", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 4, nama: "M.Nazwan Kamil", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 5, nama: "Muhamad Aufar Alfatih", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 6, nama: "Muhammad Alfan Al Hafiz", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 7, nama: "Muhammad Alif Haryo Al Amin", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 8, nama: "Rahlil Alkhawarizmy Mansur", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 9, nama: "Riziq Candra Hidayatullah", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 10, nama: "Satria Arysta Putra", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 11, nama: "Faza Fauzan Akbar", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 12, nama: "Husna Nuralamsyah", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 13, nama: "Khaidir Arkan Surya Lesmana", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 14, nama: "Luthfi Arfa", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },
  { no: 15, nama: "M. Farzan Azzamy", gender: "L", tingkat: "1 PUTRA (Ula)", pembina: "Ahmad Yusuf, M.Ag" },

  // 2 PUTRA (Wustho 1) - Pembina: Angga Rizidni Fauzan, S.Ag
  { no: 16, nama: "Muhamad Ramdan", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 17, nama: "Muhammad Abyan Surahman", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 18, nama: "Muhammad Hafiz Kamaludin", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 19, nama: "Muhammad Hamdi Arafat", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 20, nama: "Muhammad Zuhair Al Bahij", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 21, nama: "Rafif Taufiqurohman Haq", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 22, nama: "Taufal Ashil Abdulmuhyi Saputra", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 23, nama: "Arif Al Hafidz", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 24, nama: "Faiz Irsyad Ansori", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 25, nama: "M Risqi Pandowo", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 26, nama: "Reza Ediz Arfan", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 27, nama: "Rivan Saputra", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 28, nama: "Rizal Akbar Suherman", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 29, nama: "Sami Auliya", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 30, nama: "Sammi Adji Fatih", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" },
  { no: 31, nama: "Ustman Andika Mukarom", gender: "L", tingkat: "2 PUTRA (Wustho 1)", pembina: "Angga Rizidni Fauzan, S.Ag" }
];

// Data Jadwal Takhossus dari PDF
const DEFAULT_JADWAL_TAKHOUSUS = [
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Sabtu", kitab: "Audohul Manahij" },
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Ahad", kitab: "Matan Taqrib" },
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Senin", kitab: "Amstilah Tashrifiyah" },
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Selasa", kitab: "Jurumiyah" },
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Rabu", kitab: "Jurumiyah" },
  { tingkat: "1 PUTRA (Ula)", ustadz: "Ahmad Yusuf, M.Ag", hari: "Kamis", kitab: "Matan Taqrib" },

  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Sabtu", kitab: "Audohul Manahij" },
  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Ahad", kitab: "Fathul Qarib" },
  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Senin", kitab: "Amtsilah Tashrifiyah" },
  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Selasa", kitab: "Imrithi" },
  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Rabu", kitab: "Imrithi" },
  { tingkat: "2 PUTRA (Wustho 1)", ustadz: "Angga Rizidni Fauzan, S.Ag", hari: "Kamis", kitab: "Muhadatsah" },

  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Sabtu", kitab: "Amtsilah Tashrifiyah" },
  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Ahad", kitab: "Matan Taqrib" },
  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Senin", kitab: "Audohul Manahij" },
  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Selasa", kitab: "Audohul Manahij" },
  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Rabu", kitab: "Aqidatul Awwam" },
  { tingkat: "1 PUTRI (Ula)", ustadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos", hari: "Kamis", kitab: "Matan Taqrib" },

  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Sabtu", kitab: "Audohul Manahij" },
  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Ahad", kitab: "Matan Taqrib" },
  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Senin", kitab: "Amstilah Tashrifiyah" },
  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Selasa", kitab: "Jurumiyah" },
  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Rabu", kitab: "Jurumiyah" },
  { tingkat: "2A PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Kamis", kitab: "Matan Taqrib" },

  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Wildan Arifin, M.Hum", hari: "Sabtu", kitab: "Audohul Manahij" },
  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Ahad", kitab: "Matan Taqrib" },
  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Wildan Arifin, M.Hum", hari: "Senin", kitab: "Amstilah Tashrifiyah" },
  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Wildan Arifin, M.Hum", hari: "Selasa", kitab: "Jurumiyah" },
  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Wildan Arifin, M.Hum", hari: "Rabu", kitab: "Jurumiyah" },
  { tingkat: "2B PUTRI (Wustho 1)", ustadz: "Ayu Maulida Tsamrotul Jannah", hari: "Kamis", kitab: "Matan Taqrib" },

  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Sabtu", kitab: "Fathul Qarib" },
  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Ahad", kitab: "Fathul Qarib" },
  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Senin", kitab: "Audohul Manahij" },
  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Selasa", kitab: "Amtsilah Tashrifiyah" },
  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Rabu", kitab: "Jurumiyah" },
  { tingkat: "3 PUTRI (Wustho 2)", ustadz: "Ai Syarifah, M.Ag", hari: "Kamis", kitab: "Jurumiyah" },

  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Sabtu", kitab: "Audohul Manahij" },
  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Ahad", kitab: "Fathul Qarib" },
  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Senin", kitab: "Amtsilah Tashrifiyah" },
  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Selasa", kitab: "Imrithi" },
  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Rabu", kitab: "Imrithi" },
  { tingkat: "4 PUTRI (ULYA 1)", ustadz: "M. Mujabun, M.Ag", hari: "Kamis", kitab: "Muhadatsah" }
];

// Data Jadwal Angkatan dari PDF
const DEFAULT_JADWAL_ANGKATAN = [
  { no: 1, kelas: "1 Putra", kitab: "Safinatu Naja", ustadz: "Angga Rizinida Fuzan, S.Sos", waktu: "Kamis (sore)", hari: "Kamis", tempat: "Aula Putra", kapasitas: 25 },
  { no: 2, kelas: "1 Putri", kitab: "Risalatul Mahidl", ustadz: "Ayu Evita Maulid S. J, S.Sos", waktu: "Senin (sore)", hari: "Senin", tempat: "Aula Math'am Putri (lt.2)", kapasitas: 20 },
  { no: 3, kelas: "2 Putra", kitab: "Ta'limul Muta'allim", ustadz: "Gus Ahmad Maulana Ishaq, S.Sos", waktu: "Selasa (Malam)", hari: "Selasa", tempat: "Masjid", kapasitas: 25 },
  { no: 4, kelas: "2 Putri", kitab: "Safinatu Naja", ustadz: "Wildan Arifin, S.Hum", waktu: "Selasa (Sore)", hari: "Selasa", tempat: "Aula Math'am Putri (lt.2)", kapasitas: 30 },
  { no: 5, kelas: "3 Putra", kitab: "Bidayatul Hidayah", ustadz: "Ahmad Yusup, S.Pd.", waktu: "Rabu (sore)", hari: "Rabu", tempat: "Masjid", kapasitas: 25 },
  { no: 6, kelas: "3 Putri", kitab: "Bidayatul Hidayah", ustadz: "Ai Syaripah, M.Ag.", waktu: "Rabu (sore)", hari: "Rabu", tempat: "Aula Math'am Putri (lt.2)", kapasitas: 25 },
  { no: 7, kelas: "4 Pa & Pi", kitab: "Ayyuhal Walad", ustadz: "M. Mujabun, M.Pd", waktu: "Sabtu (sore)", hari: "Sabtu", tempat: "Masjid", kapasitas: 35 },
  { no: 8, kelas: "5 Pa & Pi", kitab: "Minhajul Arifin", ustadz: "Cical Irmansyah, Lc, M.Ag", waktu: "Kamis (sore)", hari: "Kamis", tempat: "masjid", kapasitas: 40 },
  { no: 9, kelas: "6 Pa & Pi", kitab: "Nashoih Ad-Diniyah", ustadz: "Dr. KH. Mukhlis Aliyudin, M.Ag.", waktu: "Senin (Malam)", hari: "Senin", tempat: "Masjid", kapasitas: 45 },
  { no: 10, kelas: "6 Pa & Pi", kitab: "Hadits Arba'in", ustadz: "M. Rifqi M.Ag", waktu: "Senin (Sore)", hari: "Senin", tempat: "Masjid", kapasitas: 45 }
];

// Data Riwayat Awal Multi-Bulan untuk Visualisasi Tren Bulanan
const DEFAULT_SAMPLE_HISTORY = [
  // Mei 2026
  {
    id: "rec_20260516_tak_1",
    type: "takhossus",
    tingkat: "1 PUTRA (Ula)",
    kitab: "Audohul Manahij",
    namaUstadz: "Ahmad Yusuf, M.Ag",
    pembina: "Ahmad Yusuf, M.Ag",
    tanggal: "2026-05-16",
    hari: "Sabtu",
    sesi: "Sore (16.00-17.15)",
    materi: "Muqaddimah & Fashal I'rob",
    catatan: "Kajian berjalan khidmat, pemahaman dasar santri baik",
    totalHadir: 15,
    totalSantri: 15,
    syncStatus: "synced"
  },
  {
    id: "rec_20260517_tak_2",
    type: "takhossus",
    tingkat: "2 PUTRA (Wustho 1)",
    kitab: "Fathul Qarib",
    namaUstadz: "Angga Rizinida Fauzan, S.Ag",
    pembina: "Angga Rizinida Fauzan, S.Ag",
    tanggal: "2026-05-17",
    hari: "Ahad",
    sesi: "Sore (16.00-17.15)",
    materi: "Kitab Thaharah - Bab Wudhu",
    catatan: "Praktek wudhu sesuai matan Fathul Qarib",
    totalHadir: 16,
    totalSantri: 16,
    syncStatus: "synced"
  },
  {
    id: "rec_20260521_reg_1",
    type: "reguler",
    kelas: "1 Putra",
    kitab: "Safinatu Naja",
    namaUstadz: "Angga Rizinida Fuzan, S.Sos",
    tanggal: "2026-05-21",
    hari: "Kamis",
    waktuTempat: "Kamis (sore) • Aula Putra",
    materi: "Fasal Fardhu-Fardhu Wudhu",
    catatan: "Santri antusias menyimak syarah Safinah",
    totalJamaah: 28,
    syncStatus: "synced"
  },
  // Juni 2026
  {
    id: "rec_20260613_tak_1",
    type: "takhossus",
    tingkat: "1 PUTRI (Ula)",
    kitab: "Amtsilah Tashrifiyah",
    namaUstadz: "Aliffia Dzikrinnisa Hayatuddin, S.Sos",
    pembina: "Aliffia Dzikrinnisa Hayatuddin, S.Sos",
    tanggal: "2026-06-13",
    hari: "Sabtu",
    sesi: "Sore (16.00-17.15)",
    materi: "Tashrif Ushul Fi'il Tsulatsi Mujarrad",
    catatan: "Hafalan tasrif lancar",
    totalHadir: 8,
    totalSantri: 8,
    syncStatus: "synced"
  },
  {
    id: "rec_20260616_reg_1",
    type: "reguler",
    kelas: "2 Putra",
    kitab: "Ta'limul Muta'allim",
    namaUstadz: "Gus Ahmad Maulana Ishaq, S.Sos",
    tanggal: "2026-06-16",
    hari: "Selasa",
    waktuTempat: "Selasa (Malam) • Masjid",
    materi: "Fasal Niat dalam Menuntut Ilmu",
    catatan: "Kajian malam setelah sholat Isya berjamaah",
    totalJamaah: 32,
    syncStatus: "synced"
  },
  {
    id: "rec_20260624_reg_2",
    type: "reguler",
    kelas: "3 Putra",
    kitab: "Bidayatul Hidayah",
    namaUstadz: "Ahmad Yusuf, M.Ag.",
    tanggal: "2026-06-24",
    hari: "Rabu",
    waktuTempat: "Rabu (sore) • Masjid",
    materi: "Adab Bangun Tidur & Masuk Masjid",
    catatan: "Penjelasan adab sehari-hari penuntut ilmu",
    totalJamaah: 30,
    syncStatus: "synced"
  },
  // Juli 2026
  {
    id: "rec_20260714_tak_1",
    type: "takhossus",
    tingkat: "1 PUTRA (Ula)",
    kitab: "Jurumiyah",
    namaUstadz: "Ahmad Yusuf, M.Ag",
    pembina: "Ahmad Yusuf, M.Ag",
    tanggal: "2026-07-14",
    hari: "Selasa",
    sesi: "Sore (16.00-17.15)",
    materi: "Bab Kalam & Tanda-Tanda Isim",
    catatan: "Pengenalan tanda kalimah isim dan fi'il",
    totalHadir: 15,
    totalSantri: 15,
    syncStatus: "synced"
  },
  {
    id: "rec_20260718_tak_2",
    type: "takhossus",
    tingkat: "2A PUTRI (Wustho 1)",
    kitab: "Audohul Manahij",
    namaUstadz: "Ayu Maulida Tsamrotul Jannah",
    pembina: "Ayu Maulida Tsamrotul Jannah",
    tanggal: "2026-07-18",
    hari: "Sabtu",
    sesi: "Sore (16.00-17.15)",
    materi: "Qowa'id Lughah Bab Ibtida'",
    catatan: "Santri putri aktif bertanya dan mencatat",
    totalHadir: 13,
    totalSantri: 13,
    syncStatus: "synced"
  },
  {
    id: "rec_20260723_reg_1",
    type: "reguler",
    kelas: "5 Pa & Pi",
    kitab: "Minhajul Arifin",
    namaUstadz: "Cical Irmansyah, Lc, M.Ag",
    tanggal: "2026-07-23",
    hari: "Kamis",
    waktuTempat: "Kamis (sore) • Masjid",
    materi: "Aqabah Thaharah Bathiniyyah",
    catatan: "Kajian tasawuf angkatan senior berjalan khidmat",
    totalJamaah: 35,
    syncStatus: "synced"
  },
  {
    id: "rec_20260725_reg_2",
    type: "reguler",
    kelas: "4 Pa & Pi",
    kitab: "Ayyuhal Walad",
    namaUstadz: "M. Mujabun, M.Pd",
    tanggal: "2026-07-25",
    hari: "Sabtu",
    waktuTempat: "Sabtu (sore) • Masjid",
    materi: "Nasihat Imam Al-Ghazali tentang Manfaat Ilmu",
    catatan: "Santri kelas 4 hadir lengkap di masjid",
    totalJamaah: 31,
    syncStatus: "synced"
  },
  // Agustus 2026
  {
    id: "rec_20260808_tak_1",
    type: "takhossus",
    tingkat: "3 PUTRI (Wustho 2)",
    kitab: "Fathul Qarib",
    namaUstadz: "Ai Syarifah, M.Ag",
    pembina: "Ai Syarifah, M.Ag",
    tanggal: "2026-08-08",
    hari: "Sabtu",
    sesi: "Sore (16.00-17.15)",
    materi: "Kitab Shalat - Syarat Sah Shalat",
    catatan: "Tadribat dan evaluasi bacaan kitab kuning",
    totalHadir: 14,
    totalSantri: 14,
    syncStatus: "synced"
  },
  {
    id: "rec_20260811_tak_2",
    type: "takhossus",
    tingkat: "4 PUTRI (ULYA 1)",
    kitab: "Imrithi",
    namaUstadz: "M. Mujabun, M.Pd",
    pembina: "M. Mujabun, M.Pd",
    tanggal: "2026-08-11",
    hari: "Selasa",
    sesi: "Sore (16.00-17.15)",
    materi: "Nadzom Imrithi Bab Fa'il",
    catatan: "Hafalan nadzom dan syarah nahwu",
    totalHadir: 11,
    totalSantri: 11,
    syncStatus: "synced"
  },
  {
    id: "rec_20260815_tak_3",
    type: "takhossus",
    tingkat: "2B PUTRI (Wustho 1)",
    kitab: "Audohul Manahij",
    namaUstadz: "Wildan Arifin, M.Hum",
    pembina: "Wildan Arifin, M.Hum",
    tanggal: "2026-08-15",
    hari: "Sabtu",
    sesi: "Sore (16.00-17.15)",
    materi: "Bab Af'alul Khamsah & I'rob",
    catatan: "Semua santri 2B hadir lengkap",
    totalHadir: 13,
    totalSantri: 13,
    syncStatus: "synced"
  },
  {
    id: "rec_20260817_reg_1",
    type: "reguler",
    kelas: "6 Pa & Pi",
    kitab: "Nashoih Ad-Diniyah",
    namaUstadz: "Dr. KH. Mukhlis Aliyudin, M.Ag.",
    tanggal: "2026-08-17",
    hari: "Senin",
    waktuTempat: "Senin (Malam) • Masjid",
    materi: "Wasiat Taqwa & Menjaga Hati",
    catatan: "Kajian umum angkatan 6 oleh Mudir",
    totalJamaah: 40,
    syncStatus: "synced"
  },
  {
    id: "rec_20260818_reg_2",
    type: "reguler",
    kelas: "2 Putri",
    kitab: "Safinatu Naja",
    namaUstadz: "Wildan Arifin, M.Hum",
    tanggal: "2026-08-18",
    hari: "Selasa",
    waktuTempat: "Selasa (Sore) • Aula Math'am Putri (lt.2)",
    materi: "Fasal Hal-Hal yang Membatalkan Shalat",
    catatan: "Santri putri menyimak dengan baik",
    totalJamaah: 26,
    syncStatus: "synced"
  },
  // September 2026
  {
    id: "rec_20260901_tak_1",
    type: "takhossus",
    tingkat: "1 PUTRA (Ula)",
    kitab: "Amstilah Tashrifiyah",
    namaUstadz: "Ahmad Yusuf, M.Ag",
    pembina: "Ahmad Yusuf, M.Ag",
    tanggal: "2026-09-01",
    hari: "Senin",
    sesi: "Sore (16.00-17.15)",
    materi: "Tashrif Istilahi Bab 1 Fa'ala Yaf'ulu",
    catatan: "Hafalan serempak 15 santri ula",
    totalHadir: 15,
    totalSantri: 15,
    syncStatus: "synced"
  },
  {
    id: "rec_20260902_reg_1",
    type: "reguler",
    kelas: "3 Putra",
    kitab: "Bidayatul Hidayah",
    namaUstadz: "Ahmad Yusuf, M.Ag",
    tanggal: "2026-09-02",
    hari: "Rabu",
    waktuTempat: "Rabu (sore) • Masjid",
    materi: "Adab Menghadiri Sholat Berjamaah",
    catatan: "Praktek saff shalat dan adab masbuq",
    totalJamaah: 29,
    syncStatus: "synced"
  }
];

// Konfigurasi Default Lembaga & Kop Laporan
const DEFAULT_INSTITUTION_CONFIG = {
  namaLembaga: "Pondok Modern Al-Aqsha",
  subLembaga: "Lembaga Pendidikan dan Pengajian Kutubutturats",
  tagline: "Takhossus & Kajian Angkatan Santri",
  tahunAjaran: "2026-2027",
  logoUrl: "", // Kosong berarti menggunakan emblem svg bawaan
  alamatLembaga: "Jl. Cibeusi, Cibeusi, Jatinangor, Sumedang, Jawa Barat",
  kotaLembaga: "Sumedang",
  emailLembaga: "turatscorner.alaqsha@gmail.com",
  teleponLembaga: "0822-2823-9552",
  kopBaris1: "PONDOK MODERN AL-AQSHA",
  kopBaris2: "LEMBAGA PENDIDIKAN DAN PENGAJIAN KUTUBUTTURATS",
  kopBaris3: "Pusat Kajian Turats • Jl. Cibeusi, Cibeusi, Jatinangor, Sumedang, Jawa Barat • Email: turatscorner.alaqsha@gmail.com",
  showKopLogo: true,
  namaMudir: "Dr. KH. Mukhlis Aliyudin, M.Ag.",
  jabatanMudir: "Mudir / Pengasuh Pondok Modern Al-Aqsha",
  nipMudir: "Pengasuh Pondok Pesantren",
  namaKoordinator: "M. Mujabun, M.Pd",
  jabatanKoordinator: "Koordinator Kutubutturats & Kurikulum",
  nipKoordinator: "Bagian Pengajaran & Asatidz"
};

// Kredensial Default Login Admin
const DEFAULT_ADMIN_AUTH = {
  username: "admin",
  password: "admin"
};

// Inisialisasi Master Ustadz Awal dari Data Default
function getInitialUstadzList() {
  const ustadzMap = new Map();
  
  // Pembina dari Santri Master
  DEFAULT_SANTRI_MASTER.forEach(s => {
    if (s.pembina && !ustadzMap.has(s.pembina)) {
      ustadzMap.set(s.pembina, {
        id: "ust_" + Math.random().toString(36).substr(2, 9),
        nama: s.pembina,
        peran: "takhossus",
        kontak: "",
        keterangan: `Pembina ${s.tingkat}`
      });
    }
  });

  // Pengajar dari Jadwal Angkatan
  DEFAULT_JADWAL_ANGKATAN.forEach(j => {
    if (j.ustadz) {
      if (ustadzMap.has(j.ustadz)) {
        ustadzMap.get(j.ustadz).peran = "both";
      } else {
        ustadzMap.set(j.ustadz, {
          id: "ust_" + Math.random().toString(36).substr(2, 9),
          nama: j.ustadz,
          peran: "angkatan",
          kontak: "",
          keterangan: `Pengajar ${j.kelas}`
        });
      }
    }
  });

  // Tokoh Utama: Mudir & Koordinator
  if (!ustadzMap.has("Dr. KH. Mukhlis Aliyudin, M.Ag.")) {
    ustadzMap.set("Dr. KH. Mukhlis Aliyudin, M.Ag.", {
      id: "ust_mudir",
      nama: "Dr. KH. Mukhlis Aliyudin, M.Ag.",
      peran: "both",
      kontak: "08xx-xxxx-xxxx",
      keterangan: "Mudir / Pengasuh Pondok Modern Al-Aqsha"
    });
  }
  if (!ustadzMap.has("M. Mujabun, M.Pd")) {
    ustadzMap.set("M. Mujabun, M.Pd", {
      id: "ust_koordinator",
      nama: "M. Mujabun, M.Pd",
      peran: "both",
      kontak: "0822-2823-9552",
      keterangan: "Koordinator Kutubutturats & Kurikulum"
    });
  }

  return Array.from(ustadzMap.values());
}

// Application State
let appState = {
  santriMaster: [],
  jadwalTakhossus: [],
  jadwalAngkatan: [],
  history: [],
  pendingQueue: [],
  ustadzList: [],
  institutionConfig: { ...DEFAULT_INSTITUTION_CONFIG },
  adminAuth: { ...DEFAULT_ADMIN_AUTH },
  appsScriptUrl: GOOGLE_APPS_SCRIPT_URL,
  tempCapturedPhoto: { takhossus: null, reguler: null }
};

// Fungsi helper konversi hari Indonesia dari format tanggal ISO (YYYY-MM-DD)
function getIndonesianDayName(dateInput) {
  if (!dateInput) return "Ahad";
  let d;
  if (dateInput instanceof Date) {
    d = dateInput;
  } else if (typeof dateInput === 'string') {
    const cleanStr = dateInput.trim().split('T')[0];
    const parts = cleanStr.split('-');
    if (parts.length === 3) {
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      d = new Date(dateInput);
    }
  } else {
    d = new Date(dateInput);
  }
  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayIdx = d.getDay();
  return (isNaN(dayIdx) || dayIdx < 0 || dayIdx > 6) ? "Ahad" : days[dayIdx];
}

// Inisialisasi Jam Berjalan Real-time dan Tanggal Default
function initClockAndDates() {
  const updateClock = () => {
    const now = new Date();
    const clockEl = document.getElementById('currentClock');
    const dateStrEl = document.getElementById('currentDateStr');
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false });
    }
    if (dateStrEl) {
      dateStrEl.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Set tanggal default untuk form input jika belum terisi
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayISO = `${yyyy}-${mm}-${dd}`;
  const todayDay = getIndonesianDayName(todayISO);

  const takDate = document.getElementById('takhossusTanggal');
  if (takDate && !takDate.value) takDate.value = todayISO;
  const takHari = document.getElementById('takhossusHari');
  if (takHari && !takHari.value) takHari.value = todayDay;

  const regDate = document.getElementById('regulerTanggal');
  if (regDate && !regDate.value) regDate.value = todayISO;
  const regHari = document.getElementById('regulerHari');
  if (regHari && !regHari.value) regHari.value = todayDay;

  const fStart = document.getElementById('filterStartDate');
  const fEnd = document.getElementById('filterEndDate');
  if (fStart && !fStart.value) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30);
    const py = pastDate.getFullYear();
    const pm = String(pastDate.getMonth() + 1).padStart(2, '0');
    const pd = String(pastDate.getDate()).padStart(2, '0');
    fStart.value = `${py}-${pm}-${pd}`;
  }
  if (fEnd && !fEnd.value) {
    fEnd.value = todayISO;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadStateFromLocalStorage();
  applyInstitutionBranding();
  initClockAndDates();
  populateDropdowns();
  renderDashboardStats();
  renderTeacherAnalytics();
  renderMonthlyAttendanceChart();
  renderAdminSantriTable();
  renderAdminJadwalTakhossus();
  renderAdminJadwalAngkatan();
  renderAdminUstadzList();
  renderAdminUstadzManagement();
  runDataAnomalyCheck(false);
  updateSyncStatusBadge();
  renderOfflineQueueList();
  renderAdminSessionBar();

  // Daftarkan PWA Service Worker dengan Cache-First Strategy
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
          // Check for SW updates
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] Versi baru aplikasi tersedia dan telah di-cache.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed (normal in local asset testing):', err);
        });
    });
  }

  // Pengingat toast otomatis saat aplikasi dibuka jika ada jadwal hari ini yang belum terisi
  setTimeout(() => {
    const summary = getTodayAttendanceScheduleSummary();
    if (summary.totalPending > 0) {
      showToast(`Pengingat: Terdapat ${summary.totalPending} jadwal absensi hari ini (${summary.todayDayName}) yang belum diisi.`, "warning");
    }
  }, 1200);

  // Auto sync saat aplikasi dibuka
  if (navigator.onLine && appState.pendingQueue.length > 0) {
    setTimeout(autoSyncQueue, 1500);
  }

  // Interval sync otomatis tiap 15 detik jika ada antrean
  setInterval(() => {
    if (navigator.onLine && appState.pendingQueue.length > 0) {
      autoSyncQueue();
    }
  }, 15000);
});

// Listener Event Jaringan Otomatis (Online / Offline)
window.addEventListener('online', () => {
  updateSyncStatusBadge();
  if (appState.pendingQueue.length > 0) {
    showToast("Terhubung ke internet. Mengunggah " + appState.pendingQueue.length + " data absensi offline...", "info");
    autoSyncQueue(true);
  } else {
    showToast("Aplikasi kembali online.", "success");
  }
});

window.addEventListener('offline', () => {
  updateSyncStatusBadge();
  showToast("Mode Offline aktif. Data absensi tetap tersimpan lokal & akan otomatis diunggah saat online.", "info");
});

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && navigator.onLine && appState.pendingQueue.length > 0) {
    autoSyncQueue();
  }
});

function loadStateFromLocalStorage() {
  try {
    const savedSantri = localStorage.getItem('turats_santri_master');
    appState.santriMaster = savedSantri ? JSON.parse(savedSantri) : DEFAULT_SANTRI_MASTER;

    const savedJadwalTak = localStorage.getItem('turats_jadwal_takhossus');
    appState.jadwalTakhossus = savedJadwalTak ? JSON.parse(savedJadwalTak) : DEFAULT_JADWAL_TAKHOUSUS;

    const savedJadwalAng = localStorage.getItem('turats_jadwal_angkatan');
    if (savedJadwalAng) {
      const parsedAng = JSON.parse(savedJadwalAng);
      appState.jadwalAngkatan = parsedAng.map(j => {
        if (!j.kapasitas) {
          j.kapasitas = getAngkatanClassCapacity(j.kelas, j.ustadz);
        }
        return j;
      });
    } else {
      appState.jadwalAngkatan = DEFAULT_JADWAL_ANGKATAN;
    }

    const savedHistory = localStorage.getItem('turats_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      appState.history = (Array.isArray(parsed) && parsed.length > 0) ? parsed : DEFAULT_SAMPLE_HISTORY;
    } else {
      appState.history = DEFAULT_SAMPLE_HISTORY;
    }

    const savedQueue = localStorage.getItem('turats_pending_queue');
    appState.pendingQueue = savedQueue ? JSON.parse(savedQueue) : [];

    // Master Ustadz
    const savedUstadz = localStorage.getItem('turats_ustadz_list');
    appState.ustadzList = savedUstadz ? JSON.parse(savedUstadz) : getInitialUstadzList();

    // Konfigurasi Lembaga & Kop Laporan
    const savedConfig = localStorage.getItem('turats_institution_config');
    appState.institutionConfig = savedConfig ? { ...DEFAULT_INSTITUTION_CONFIG, ...JSON.parse(savedConfig) } : { ...DEFAULT_INSTITUTION_CONFIG };

    // Kredensial Autentikasi Admin
    const savedAuth = localStorage.getItem('turats_admin_auth');
    appState.adminAuth = savedAuth ? { ...DEFAULT_ADMIN_AUTH, ...JSON.parse(savedAuth) } : { ...DEFAULT_ADMIN_AUTH };

    // URL Google Apps Script selalu diambil langsung dari variabel GOOGLE_APPS_SCRIPT_URL di kode
    appState.appsScriptUrl = GOOGLE_APPS_SCRIPT_URL;
  } catch (e) {
    console.error("Failed loading state:", e);
  }
}

function saveState() {
  localStorage.setItem('turats_santri_master', JSON.stringify(appState.santriMaster));
  localStorage.setItem('turats_jadwal_takhossus', JSON.stringify(appState.jadwalTakhossus));
  localStorage.setItem('turats_jadwal_angkatan', JSON.stringify(appState.jadwalAngkatan));
  localStorage.setItem('turats_history', JSON.stringify(appState.history));
  localStorage.setItem('turats_pending_queue', JSON.stringify(appState.pendingQueue));
  localStorage.setItem('turats_ustadz_list', JSON.stringify(appState.ustadzList));
  localStorage.setItem('turats_institution_config', JSON.stringify(appState.institutionConfig));
  localStorage.setItem('turats_admin_auth', JSON.stringify(appState.adminAuth));
}

// Terapkan Branding Lembaga (Nama & Logo) ke Seluruh Elemen UI Aplikasi
function applyInstitutionBranding() {
  const cfg = appState.institutionConfig || DEFAULT_INSTITUTION_CONFIG;

  // Header Aplikasi
  const headerTitle = document.getElementById('appHeaderTitle');
  const headerSub = document.getElementById('appHeaderSub');
  const headerLogo = document.getElementById('appHeaderLogoContainer');
  if (headerTitle) headerTitle.textContent = cfg.namaLembaga || "Ma'had Al-Aqsha";
  if (headerSub) headerSub.textContent = cfg.subLembaga || "Kutubutturats";

  if (headerLogo) {
    if (cfg.logoUrl) {
      headerLogo.innerHTML = `<img src="${cfg.logoUrl}" alt="Logo Lembaga" class="w-full h-full object-cover rounded-xl shadow-xs" />`;
    } else {
      headerLogo.innerHTML = `<i class="fa-solid fa-book-quran text-amber-300 text-lg"></i>`;
    }
  }

  // Dashboard Welcome Banner
  const dashLembaga = document.getElementById('dashBannerLembaga');
  const dashSub = document.getElementById('dashBannerSub');
  const dashLogo = document.getElementById('dashBannerLogo');
  if (dashLembaga) dashLembaga.textContent = cfg.namaLembaga || "Ma'had Al-Aqsha";
  if (dashSub) dashSub.textContent = `${cfg.subLembaga || 'Kajian Kutubutturats'} • TA ${cfg.tahunAjaran || '2026-2027'}`;
  
  if (dashLogo) {
    if (cfg.logoUrl) {
      dashLogo.innerHTML = `<img src="${cfg.logoUrl}" alt="Logo Lembaga" class="w-full h-full object-cover rounded-2xl shadow-xs" />`;
    } else {
      dashLogo.innerHTML = `<i class="fa-solid fa-mosque text-amber-300 text-xl"></i>`;
    }
  }

  // Document Title
  document.title = `${cfg.namaLembaga || "Pondok Modern Al-Aqsha"} - Absensi Kutubutturats`;
}

// ==============================================================================
// SISTEM NAVIGASI TAB UTAMA & TAB ADMIN
// ==============================================================================

function switchTab(tabId) {
  // Proteksi Akses Admin
  if (tabId === 'admin' && !isAdminAuthenticated()) {
    openAdminLoginModal('admin');
    return;
  }

  const tabMap = {
    'dashboard': 'tabDashboard',
    'takhossus': 'tabTakhossus',
    'reguler': 'tabReguler',
    'filterGuru': 'tabFilterGuru',
    'admin': 'tabAdmin'
  };

  // Sembunyikan semua tab section dan picu animasi ulang yang mulus
  Object.keys(tabMap).forEach(key => {
    const sec = document.getElementById(tabMap[key]);
    if (sec) {
      if (key === tabId) {
        sec.classList.remove('hidden');
        // Trigger CSS animation reflow agar animasi fade-in selalu berjalan mulus setiap berpindah tab
        sec.style.animation = 'none';
        void sec.offsetHeight; // Trigger reflow
        sec.style.animation = '';
      } else {
        sec.classList.add('hidden');
      }
    }
  });

  // Perbarui highlight nav bottom bar
  const navKeys = ['dashboard', 'takhossus', 'reguler', 'filterGuru', 'admin'];
  navKeys.forEach(k => {
    const btn = document.getElementById('navBtn_' + k);
    if (btn) {
      if (k === tabId) {
        btn.className = "nav-item flex flex-col items-center justify-center py-1 text-emerald-700 font-bold relative";
      } else {
        btn.className = "nav-item flex flex-col items-center justify-center py-1 text-slate-400 hover:text-slate-600 font-medium relative";
      }
    }
  });

  // Aksi khusus saat tab dibuka
  if (tabId === 'dashboard') {
    renderDashboardStats();
    renderTeacherAnalytics();
    renderMonthlyAttendanceChart();
    runDataAnomalyCheck(false);
  } else if (tabId === 'admin') {
    renderAdminSessionBar();
    populateSettingsFormFromState();
    updateLiveKopPreview();
    renderAdminSantriTable();
    renderAdminJadwalTakhossus();
    renderAdminJadwalAngkatan();
    renderAdminUstadzList();
    renderAdminUstadzManagement();
    runDataAnomalyCheck(false);
  } else if (tabId === 'filterGuru') {
    renderTeacherAnalytics();
    renderMonthlyAttendanceChart();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchAdminSection(sectionId) {
  // Pastikan admin terautentikasi
  if (!isAdminAuthenticated()) {
    openAdminLoginModal(sectionId);
    return;
  }

  const sections = ['settings', 'ustadz', 'jadwalTakhossus', 'jadwalAngkatan', 'anomali', 'santri'];

  sections.forEach(s => {
    const secEl = document.getElementById('adminSection_' + s);
    const pillEl = document.getElementById('adminPill_' + s);

    if (s === sectionId) {
      if (secEl) {
        secEl.classList.remove('hidden');
        secEl.style.animation = 'none';
        void secEl.offsetHeight;
        secEl.style.animation = '';
      }
      if (pillEl) {
        pillEl.className = "admin-pill px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition";
      }
    } else {
      if (secEl) secEl.classList.add('hidden');
      if (pillEl) {
        pillEl.className = "admin-pill px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5";
      }
    }
  });

  // Aksi saat seksi dibuka
  if (sectionId === 'settings') {
    populateSettingsFormFromState();
    updateLiveKopPreview();
  } else if (sectionId === 'anomali') {
    runDataAnomalyCheck(false);
  } else if (sectionId === 'ustadz') {
    renderAdminUstadzList();
    renderAdminUstadzManagement();
  } else if (sectionId === 'jadwalTakhossus') {
    renderAdminJadwalTakhossus();
  } else if (sectionId === 'jadwalAngkatan') {
    renderAdminJadwalAngkatan();
  } else if (sectionId === 'santri') {
    renderAdminSantriTable();
  }
}

// ==============================================================================
// SISTEM AUTENTIKASI ADMIN & PROTEKSI AKSES PENGATURAN
// ==============================================================================

let pendingAdminRoute = "admin";

function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem('turats_admin_session') === 'active';
  } catch (e) {
    return false;
  }
}

function openAdminSettingsQuickly() {
  if (appState.isAdmin || isAdminAuthenticated()) {
    appState.isAdmin = true;
    switchTab('admin');
    switchAdminSection('settings');
  } else {
    openAdminLoginModal('settings');
  }
}

function openAdminLoginModal(targetRoute = "admin") {
  pendingAdminRoute = targetRoute;
  const modal = document.getElementById('adminLoginModal');
  const errorAlert = document.getElementById('adminLoginErrorAlert');
  const userInp = document.getElementById('adminLoginUsername');
  const passInp = document.getElementById('adminLoginPassword');

  if (errorAlert) errorAlert.classList.add('hidden');
  if (userInp) userInp.value = "";
  if (passInp) passInp.value = "";

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => { if (userInp) userInp.focus(); }, 100);
  }
}

function closeAdminLoginModal() {
  const modal = document.getElementById('adminLoginModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function toggleAdminPasswordVisibility() {
  const passInp = document.getElementById('adminLoginPassword');
  const icon = document.getElementById('togglePasswordIcon');
  if (!passInp) return;

  if (passInp.type === "password") {
    passInp.type = "text";
    if (icon) icon.className = "fa-solid fa-eye-slash";
  } else {
    passInp.type = "password";
    if (icon) icon.className = "fa-solid fa-eye";
  }
}

function handleAdminLoginSubmit(e) {
  if (e) e.preventDefault();
  const usernameInput = (document.getElementById('adminLoginUsername')?.value || "").trim();
  const passwordInput = (document.getElementById('adminLoginPassword')?.value || "").trim();
  const errorAlert = document.getElementById('adminLoginErrorAlert');
  const errorMsg = document.getElementById('adminLoginErrorMsg');

  const correctUser = (appState.adminAuth?.username || "admin").trim();
  const correctPass = (appState.adminAuth?.password || "admin").trim();

  if (usernameInput === correctUser && passwordInput === correctPass) {
    // Autentikasi Sukses
    sessionStorage.setItem('turats_admin_session', 'active');
    closeAdminLoginModal();
    showToast(`Autentikasi berhasil! Selamat datang, ${correctUser}.`, "success");
    renderAdminSessionBar();

    // Arahkan ke rute yang diminta
    if (pendingAdminRoute === "settings") {
      switchTab('admin');
      switchAdminSection('settings');
    } else {
      switchTab('admin');
    }
  } else {
    // Kredensial Salah
    if (errorAlert) errorAlert.classList.remove('hidden');
    if (errorMsg) errorMsg.textContent = "Username atau password salah. Silakan coba lagi!";
    const passInp = document.getElementById('adminLoginPassword');
    if (passInp) {
      passInp.value = "";
      passInp.focus();
    }
  }
}

function logoutAdmin() {
  if (confirm("Kunci akses dan keluar dari sesi Admin?")) {
    sessionStorage.removeItem('turats_admin_session');
    renderAdminSessionBar();
    showToast("Sesi admin berhasil dikunci.", "info");
    switchTab('dashboard');
  }
}

function renderAdminSessionBar() {
  const bar = document.getElementById('adminSessionActiveBar');
  const text = document.getElementById('adminSessionStatusText');
  const isAuth = isAdminAuthenticated();

  if (bar) {
    if (isAuth) {
      bar.classList.remove('hidden');
      if (text) {
        text.innerHTML = `Sesi Aktif: <b>Administrator (${appState.adminAuth?.username || 'admin'})</b> terautentikasi`;
      }
    } else {
      bar.classList.add('hidden');
    }
  }
}

// ==============================================================================
// PENGELOLAAN PENGATURAN LEMBAGA, KOP LAPORAN, DAN KREDENSIAL ADMIN
// ==============================================================================

function populateSettingsFormFromState() {
  const cfg = appState.institutionConfig || DEFAULT_INSTITUTION_CONFIG;
  const auth = appState.adminAuth || DEFAULT_ADMIN_AUTH;

  const setVal = (ids, val) => {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        if (el.type === 'checkbox') el.checked = Boolean(val);
        else el.value = val ?? "";
        return;
      }
    }
  };

  // Nama & Identitas
  setVal(['cfgNamaLembaga', 'setNamaLembaga'], cfg.namaLembaga || "");
  setVal(['cfgSubLembaga', 'setSubLembaga'], cfg.subLembaga || "");
  setVal(['cfgTagline', 'setTagline'], cfg.tagline || "");
  setVal(['cfgTahunAjaran', 'setTahunAjaran'], cfg.tahunAjaran || "");
  setVal(['cfgLogoUrl', 'setLogoUrl'], cfg.logoUrl || "");

  // Alamat & Kontak
  setVal(['cfgAlamatLembaga', 'setAlamatLembaga'], cfg.alamatLembaga || "");
  setVal(['cfgKotaLembaga', 'setKotaLembaga'], cfg.kotaLembaga || "");
  setVal(['cfgEmailLembaga', 'setEmailLembaga'], cfg.emailLembaga || "");
  setVal(['cfgTeleponLembaga', 'setTeleponLembaga'], cfg.teleponLembaga || "");

  // Kop Laporan
  setVal(['cfgKopBaris1', 'setKopBaris1'], cfg.kopBaris1 || "");
  setVal(['cfgKopBaris2', 'setKopBaris2'], cfg.kopBaris2 || "");
  setVal(['cfgKopBaris3', 'setKopBaris3'], cfg.kopBaris3 || "");
  setVal(['cfgShowKopLogo', 'setShowKopLogo'], cfg.showKopLogo !== false);

  // Pimpinan Lembaga (Mudir & Koordinator)
  setVal(['cfgNamaMudir', 'setNamaMudir'], cfg.namaMudir || "");
  setVal(['cfgJabatanMudir', 'setJabatanMudir'], cfg.jabatanMudir || "");
  setVal(['cfgNipMudir', 'setNipMudir'], cfg.nipMudir || "");
  setVal(['cfgNamaKoordinator', 'setNamaKoordinator'], cfg.namaKoordinator || "");
  setVal(['cfgJabatanKoordinator', 'setJabatanKoordinator'], cfg.jabatanKoordinator || "");
  setVal(['cfgNipKoordinator', 'setNipKoordinator'], cfg.nipKoordinator || "");

  // Kredensial Login
  setVal(['cfgAdminUsername', 'setAdminUsername'], auth.username || "admin");
  const passInp = document.getElementById('cfgAdminNewPassword') || document.getElementById('setAdminPassword');
  const confirmInp = document.getElementById('cfgAdminConfirmPassword');
  if (passInp) passInp.value = "";
  if (confirmInp) confirmInp.value = "";

  // Integrasi Google Sheets URL
  setVal(['cfgAppsScriptUrl'], appState.appsScriptUrl || GOOGLE_APPS_SCRIPT_URL);

  // Preview Logo & Kop
  renderLogoPreview(cfg.logoUrl);
  updateLiveKopPreview();
}

function getFieldVal(ids, fallback = "") {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) {
      if (el.type === 'checkbox') return el.checked;
      return (el.value || "").trim();
    }
  }
  return fallback;
}

function saveInstitutionSettings(e) {
  if (e) e.preventDefault();

  const cfg = { ...appState.institutionConfig };
  const auth = { ...appState.adminAuth };

  // Identitas
  cfg.namaLembaga = getFieldVal(['cfgNamaLembaga', 'setNamaLembaga'], "Pondok Modern Al-Aqsha");
  cfg.subLembaga = getFieldVal(['cfgSubLembaga', 'setSubLembaga'], "Lembaga Pendidikan dan Pengajian Kutubutturats");
  cfg.tagline = getFieldVal(['cfgTagline', 'setTagline'], "Takhossus & Kajian Angkatan Santri");
  cfg.tahunAjaran = getFieldVal(['cfgTahunAjaran', 'setTahunAjaran'], "2026-2027");
  cfg.logoUrl = getFieldVal(['cfgLogoUrl', 'setLogoUrl'], "");

  // Alamat & Kontak
  cfg.alamatLembaga = getFieldVal(['cfgAlamatLembaga', 'setAlamatLembaga'], "Kompleks Pesantren Al-Aqsha Kudus");
  cfg.kotaLembaga = getFieldVal(['cfgKotaLembaga', 'setKotaLembaga'], "Kudus");
  cfg.emailLembaga = getFieldVal(['cfgEmailLembaga', 'setEmailLembaga'], "turatscorner.alaqsha@gmail.com");
  cfg.teleponLembaga = getFieldVal(['cfgTeleponLembaga', 'setTeleponLembaga'], "");

  // Kop Laporan
  cfg.kopBaris1 = getFieldVal(['cfgKopBaris1', 'setKopBaris1'], cfg.namaLembaga.toUpperCase());
  cfg.kopBaris2 = getFieldVal(['cfgKopBaris2', 'setKopBaris2'], cfg.subLembaga.toUpperCase());
  cfg.kopBaris3 = getFieldVal(['cfgKopBaris3', 'setKopBaris3'], "");
  cfg.showKopLogo = getFieldVal(['cfgShowKopLogo', 'setShowKopLogo'], true);

  // Mudir & Koordinator
  cfg.namaMudir = getFieldVal(['cfgNamaMudir', 'setNamaMudir'], "Dr. KH. Mukhlis Aliyudin, M.Ag.");
  cfg.jabatanMudir = getFieldVal(['cfgJabatanMudir', 'setJabatanMudir'], "Mudir / Pengasuh Pondok Modern Al-Aqsha");
  cfg.nipMudir = getFieldVal(['cfgNipMudir', 'setNipMudir'], "Pengasuh Pondok Pesantren");

  cfg.namaKoordinator = getFieldVal(['cfgNamaKoordinator', 'setNamaKoordinator'], "M. Rifqi, M.Ag.");
  cfg.jabatanKoordinator = getFieldVal(['cfgJabatanKoordinator', 'setJabatanKoordinator'], "Koordinator Kutubutturats & Kurikulum");
  cfg.nipKoordinator = getFieldVal(['cfgNipKoordinator', 'setNipKoordinator'], "Bagian Pengajaran & Asatidz");

  // Kredensial Admin jika diisi
  const newUsername = getFieldVal(['cfgAdminUsername', 'setAdminUsername'], "");
  const newPassword = getFieldVal(['cfgAdminNewPassword', 'setAdminPassword'], "");
  const confirmPassword = getFieldVal(['cfgAdminConfirmPassword'], "");

  if (newUsername) auth.username = newUsername;
  if (newPassword) {
    if (confirmPassword && newPassword !== confirmPassword) {
      showToast("Password baru dan konfirmasi password tidak cocok!", "error");
      return;
    }
    auth.password = newPassword;
  }

  // Google Apps Script URL
  const scriptUrl = getFieldVal(['cfgAppsScriptUrl'], "");
  if (scriptUrl) {
    appState.appsScriptUrl = scriptUrl;
  }

  // Simpan ke State dan LocalStorage
  appState.institutionConfig = cfg;
  appState.adminAuth = auth;
  saveState();

  // Terapkan perubahan visual secara live
  applyInstitutionBranding();
  updateLiveKopPreview();
  renderAdminSessionBar();

  showToast("Semua pengaturan lembaga, kop PDF, dan kredensial berhasil disimpan!", "success");
}

const handleSaveInstitutionSettings = saveInstitutionSettings;

function updateAdminPasswordOnly() {
  const username = getFieldVal(['cfgAdminUsername', 'setAdminUsername'], "").trim();
  const newPass = getFieldVal(['cfgAdminNewPassword'], "").trim();
  const confirmPass = getFieldVal(['cfgAdminConfirmPassword'], "").trim();

  if (!username) {
    showToast("Username admin tidak boleh kosong!", "warning");
    return;
  }

  if (!newPass) {
    showToast("Masukkan password baru terlebih dahulu!", "warning");
    return;
  }

  if (newPass !== confirmPass) {
    showToast("Password baru dan konfirmasi password tidak cocok!", "error");
    return;
  }

  appState.adminAuth.username = username;
  appState.adminAuth.password = newPass;
  saveState();
  renderAdminSessionBar();

  const passInp = document.getElementById('cfgAdminNewPassword');
  const confirmInp = document.getElementById('cfgAdminConfirmPassword');
  if (passInp) passInp.value = "";
  if (confirmInp) confirmInp.value = "";

  showToast(`Kredensial login admin berhasil diperbarui untuk user "${username}".`, "success");
}

function resetInstitutionSettingsToDefault() {
  if (confirm("Reset seluruh pengaturan identitas lembaga, logo, kop laporan, dan penandatangan ke nilai standar bawaan?")) {
    appState.institutionConfig = { ...DEFAULT_INSTITUTION_CONFIG };
    saveState();
    populateSettingsFormFromState();
    applyInstitutionBranding();
    updateLiveKopPreview();
    showToast("Pengaturan lembaga berhasil dikembalikan ke standar awal.", "info");
  }
}

function renderLogoPreview(url) {
  const previewBox = document.getElementById('cfgLogoPreviewContainer') || document.getElementById('logoUploadPreview');
  const previewImg = document.getElementById('cfgLogoPreviewImg');
  const previewIcon = document.getElementById('cfgLogoPreviewIcon');
  const statusText = document.getElementById('cfgLogoStatusText');

  if (url && url.trim()) {
    if (previewImg) {
      previewImg.src = url;
      previewImg.classList.remove('hidden');
    }
    if (previewIcon) previewIcon.classList.add('hidden');
    if (statusText) statusText.innerText = "Logo Khusus Digunakan";
  } else {
    if (previewImg) {
      previewImg.src = "";
      previewImg.classList.add('hidden');
    }
    if (previewIcon) previewIcon.classList.remove('hidden');
    if (statusText) statusText.innerText = "Menggunakan Ikon Bawaan";
  }
}

function handleLogoFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast("Harap pilih file gambar (PNG, JPG, SVG, WebP)!", "warning");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    showToast("Ukuran file logo maksimal 2 MB agar performa tetap cepat.", "warning");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const logoInput = document.getElementById('cfgLogoUrl') || document.getElementById('setLogoUrl');
    if (logoInput) {
      logoInput.value = dataUrl;
    }
    renderLogoPreview(dataUrl);
    updateLiveKopPreview();
    showToast("Logo berhasil dimuat. Klik 'Simpan Semua Perubahan Pengaturan' untuk menyimpan.", "info");
  };
  reader.readAsDataURL(file);
}

function handleLogoUrlInput(url) {
  renderLogoPreview(url);
  updateLiveKopPreview();
}

function resetLogoToDefaultIcon() {
  const logoInput = document.getElementById('cfgLogoUrl') || document.getElementById('setLogoUrl');
  const fileInput = document.getElementById('cfgLogoFileInput') || document.getElementById('logoFileInput');
  if (logoInput) logoInput.value = "";
  if (fileInput) fileInput.value = "";
  renderLogoPreview("");
  updateLiveKopPreview();
  showToast("Logo direset ke ikon standar. Klik simpan untuk menerapkan.", "info");
}

function previewLogoFromUrl() {
  const url = (document.getElementById('cfgLogoUrl')?.value || document.getElementById('setLogoUrl')?.value || "").trim();
  renderLogoPreview(url);
}

function clearLogoInput() {
  resetLogoToDefaultIcon();
}

function updateLiveKopPreview() {
  const container = document.getElementById('liveKopPreviewBox') || document.getElementById('liveKopPreviewContainer');
  if (!container) return;

  const baris1 = getFieldVal(['cfgKopBaris1', 'setKopBaris1'], appState.institutionConfig.kopBaris1 || "PONDOK MODERN AL-AQSHA KUDUS");
  const baris2 = getFieldVal(['cfgKopBaris2', 'setKopBaris2'], appState.institutionConfig.kopBaris2 || "LEMBAGA PENDIDIKAN DAN PENGAJIAN KUTUBUTTURATS");
  const baris3 = getFieldVal(['cfgKopBaris3', 'setKopBaris3'], appState.institutionConfig.kopBaris3 || "Pusat Kajian Turats • Kompleks Pesantren Al-Aqsha Kudus");
  const logoUrl = getFieldVal(['cfgLogoUrl', 'setLogoUrl'], appState.institutionConfig.logoUrl || "");
  const showLogo = getFieldVal(['cfgShowKopLogo', 'setShowKopLogo'], true);

  const logoHtml = (showLogo && logoUrl) ? `
    <div style="width: 52px; height: 52px; margin-right: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
      <img src="${logoUrl}" alt="Logo" style="max-width: 52px; max-height: 52px; object-fit: contain;" />
    </div>
  ` : (showLogo ? `
    <div style="width: 52px; height: 52px; margin-right: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #ecfdf5; border-radius: 10px; border: 1px dashed #059669;">
      <span style="font-size: 24px; color: #047857;">📖</span>
    </div>
  ` : '');

  container.innerHTML = `
    <div style="font-family: 'Times New Roman', serif; border-bottom: 3px double #064e3b; padding-bottom: 10px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center;">
      ${logoHtml}
      <div style="text-align: center; flex: 1;">
        <div style="font-size: 13pt; font-weight: bold; color: #064e3b; letter-spacing: 0.5px; text-transform: uppercase;">${baris1}</div>
        <div style="font-size: 10pt; font-weight: bold; color: #1f2937; margin-top: 2px; text-transform: uppercase;">${baris2}</div>
        <div style="font-size: 8pt; color: #4b5563; margin-top: 3px; font-style: italic;">${baris3}</div>
      </div>
    </div>
    <div style="text-align: center; font-size: 7.5pt; color: #64748b; font-family: sans-serif; padding-top: 4px;">
      Format Kop Resmi • Siap dicetak pada semua Rekap Guru & Laporan Bulanan PDF
    </div>
  `;
}

// ==============================================================================
// PENGELOLAAN MASTER DATA USTADZ / DEWAN PENGAJAR
// ==============================================================================

function renderAdminUstadzManagement() {
  const body = document.getElementById('adminUstadzManagementTableBody');
  const countBadge = document.getElementById('adminUstadzTotalCountBadge');
  const searchInput = (document.getElementById('adminUstadzSearchInput')?.value || "").toLowerCase().trim();
  if (!body) return;

  const list = appState.ustadzList || [];
  if (countBadge) countBadge.textContent = `${list.length} Ustadz`;

  const filtered = list.filter(u => {
    if (!searchInput) return true;
    return (u.nama || "").toLowerCase().includes(searchInput) ||
           (u.keterangan || "").toLowerCase().includes(searchInput) ||
           (u.kontak || "").toLowerCase().includes(searchInput);
  });

  if (filtered.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-400 text-xs italic">
          <i class="fa-solid fa-user-xmark text-2xl text-slate-300 mb-2 block"></i>
          Tidak ada data ustadz yang sesuai dengan pencarian "${searchInput}".
        </td>
      </tr>
    `;
    return;
  }

  let html = "";
  filtered.forEach((u, idx) => {
    let roleBadge = "";
    if (u.peran === "takhossus") {
      roleBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Takhossus</span>`;
    } else if (u.peran === "angkatan") {
      roleBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">Angkatan</span>`;
    } else {
      roleBadge = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Keduanya</span>`;
    }

    // Cari jadwal yang diampu
    const taks = (appState.jadwalTakhossus || []).filter(j => (j.ustadz || "").toLowerCase() === (u.nama || "").toLowerCase());
    const angs = (appState.jadwalAngkatan || []).filter(j => (j.ustadz || "").toLowerCase() === (u.nama || "").toLowerCase());

    const scheduleTags = [];
    if (taks.length > 0) scheduleTags.push(`<span class="text-[10px] text-emerald-700 font-semibold">${taks.length} Sesi Takhossus</span>`);
    if (angs.length > 0) scheduleTags.push(`<span class="text-[10px] text-teal-700 font-semibold">${angs.length} Jadwal Angkatan</span>`);
    const scheduleStr = scheduleTags.length > 0 ? scheduleTags.join(" • ") : `<span class="text-slate-400 text-[10px] italic">Belum terjadwal</span>`;

    html += `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-2.5 text-center text-xs font-semibold text-slate-500">${idx + 1}</td>
        <td class="p-2.5">
          <div class="font-bold text-xs text-slate-800">${u.nama}</div>
          <div class="text-[11px] text-slate-500">${u.keterangan || '-'}</div>
        </td>
        <td class="p-2.5">${roleBadge}</td>
        <td class="p-2.5">
          <div>${scheduleStr}</div>
          <div class="text-[10px] text-slate-400 mt-0.5"><i class="fa-solid fa-phone text-[9px] mr-1"></i>${u.kontak || '-'}</div>
        </td>
        <td class="p-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button onclick="openEditUstadzModal('${u.id}')" class="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit Data Ustadz">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>
            <button onclick="deleteUstadz('${u.id}')" class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Hapus Ustadz">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  body.innerHTML = html;
}

function filterAdminUstadzList() {
  renderAdminUstadzManagement();
}

function openAddUstadzModal() {
  const modal = document.getElementById('modalManageUstadz');
  const title = document.getElementById('modalManageUstadzTitle');
  const btnDel = document.getElementById('manageUstadzBtnDelete');

  if (title) title.textContent = "Tambah Ustadz Baru";
  if (btnDel) btnDel.classList.add('hidden');

  document.getElementById('manageUstadzId').value = "";
  document.getElementById('manageUstadzNama').value = "";
  document.getElementById('manageUstadzPeran').value = "both";
  document.getElementById('manageUstadzKontak').value = "";
  document.getElementById('manageUstadzKeterangan').value = "";

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => document.getElementById('manageUstadzNama')?.focus(), 100);
  }
}

function openEditUstadzModal(ustadzId) {
  const ustadz = (appState.ustadzList || []).find(u => u.id === ustadzId);
  if (!ustadz) return;

  const modal = document.getElementById('modalManageUstadz');
  const title = document.getElementById('modalManageUstadzTitle');
  const btnDel = document.getElementById('manageUstadzBtnDelete');

  if (title) title.textContent = "Edit Data Ustadz";
  if (btnDel) btnDel.classList.remove('hidden');

  document.getElementById('manageUstadzId').value = ustadz.id;
  document.getElementById('manageUstadzNama').value = ustadz.nama || "";
  document.getElementById('manageUstadzPeran').value = ustadz.peran || "both";
  document.getElementById('manageUstadzKontak').value = ustadz.kontak || "";
  document.getElementById('manageUstadzKeterangan').value = ustadz.keterangan || "";

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeManageUstadzModal() {
  const modal = document.getElementById('modalManageUstadz');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSaveUstadz(e) {
  if (e) e.preventDefault();

  const id = document.getElementById('manageUstadzId')?.value;
  const nama = (document.getElementById('manageUstadzNama')?.value || "").trim();
  const peran = document.getElementById('manageUstadzPeran')?.value || "both";
  const kontak = (document.getElementById('manageUstadzKontak')?.value || "").trim();
  const keterangan = (document.getElementById('manageUstadzKeterangan')?.value || "").trim();

  if (!nama) {
    showToast("Nama ustadz wajib diisi!", "warning");
    return;
  }

  if (id) {
    // Mode Update
    const idx = appState.ustadzList.findIndex(u => u.id === id);
    if (idx !== -1) {
      const oldNama = appState.ustadzList[idx].nama;
      appState.ustadzList[idx] = { id, nama, peran, kontak, keterangan };

      // Sinkronisasi update nama di jadwal jika nama berubah
      if (oldNama !== nama) {
        (appState.jadwalTakhossus || []).forEach(j => {
          if (j.ustadz === oldNama) j.ustadz = nama;
        });
        (appState.jadwalAngkatan || []).forEach(j => {
          if (j.ustadz === oldNama) j.ustadz = nama;
        });
        (appState.santriMaster || []).forEach(s => {
          if (s.pembina === oldNama) s.pembina = nama;
        });
      }
      showToast(`Data Ustadz ${nama} berhasil diperbarui.`, "success");
    }
  } else {
    // Mode Create Baru
    const newId = "ust_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 5);
    appState.ustadzList.push({ id: newId, nama, peran, kontak, keterangan });
    showToast(`Ustadz ${nama} berhasil ditambahkan ke daftar dewan asatidz.`, "success");
  }

  saveState();
  populateDropdowns();
  renderAdminUstadzManagement();
  renderAdminUstadzList();
  renderAdminJadwalTakhossus();
  renderAdminJadwalAngkatan();
  closeManageUstadzModal();
}

function handleDeleteCurrentUstadz() {
  const id = document.getElementById('manageUstadzId')?.value;
  if (!id) return;
  deleteUstadz(id);
  closeManageUstadzModal();
}

function deleteUstadz(id) {
  const ustadz = (appState.ustadzList || []).find(u => u.id === id);
  if (!ustadz) return;

  if (confirm(`Hapus ustadz "${ustadz.nama}" dari daftar pengajar master?`)) {
    appState.ustadzList = appState.ustadzList.filter(u => u.id !== id);
    saveState();
    populateDropdowns();
    renderAdminUstadzManagement();
    renderAdminUstadzList();
    showToast(`Ustadz ${ustadz.nama} telah dihapus.`, "info");
  }
}

// ==============================================================================
// PENGELOLAAN JADWAL TAKHOSSUS & JADWAL ANGKATAN
// ==============================================================================

function populateModalUstadzOptions(selectId, selectedValue = "") {
  const sel = document.getElementById(selectId);
  if (!sel) return;

  sel.innerHTML = '<option value="">-- Pilih Pengajar / Ustadz --</option>';
  const sorted = [...(appState.ustadzList || [])].sort((a, b) => a.nama.localeCompare(b.nama));
  
  sorted.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.nama;
    opt.textContent = u.nama;
    if (u.nama === selectedValue) opt.selected = true;
    sel.appendChild(opt);
  });
}

function openAddJadwalTakhossusModal() {
  const modal = document.getElementById('modalManageJadwalTakhossus');
  const title = document.getElementById('modalManageJadwalTakTitle');
  const btnDel = document.getElementById('manageJadwalTakBtnDelete');

  if (title) title.textContent = "Tambah Jadwal Takhossus";
  if (btnDel) btnDel.classList.add('hidden');

  document.getElementById('manageJadwalTakIndex').value = "-1";
  document.getElementById('manageJadwalTakKitab').value = "";
  populateModalUstadzOptions('manageJadwalTakUstadz');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function openEditJadwalTakhossusModal(index) {
  const j = appState.jadwalTakhossus[index];
  if (!j) return;

  const modal = document.getElementById('modalManageJadwalTakhossus');
  const title = document.getElementById('modalManageJadwalTakTitle');
  const btnDel = document.getElementById('manageJadwalTakBtnDelete');

  if (title) title.textContent = "Edit Jadwal Takhossus";
  if (btnDel) btnDel.classList.remove('hidden');

  document.getElementById('manageJadwalTakIndex').value = index;
  document.getElementById('manageJadwalTakTingkat').value = j.tingkat;
  document.getElementById('manageJadwalTakHari').value = j.hari;
  document.getElementById('manageJadwalTakKitab').value = j.kitab;
  populateModalUstadzOptions('manageJadwalTakUstadz', j.ustadz);

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeManageJadwalTakModal() {
  const modal = document.getElementById('modalManageJadwalTakhossus');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSaveJadwalTakhossus(e) {
  if (e) e.preventDefault();

  const idx = parseInt(document.getElementById('manageJadwalTakIndex')?.value, 10);
  const tingkat = document.getElementById('manageJadwalTakTingkat')?.value;
  const hari = document.getElementById('manageJadwalTakHari')?.value;
  const kitab = (document.getElementById('manageJadwalTakKitab')?.value || "").trim();
  const ustadz = document.getElementById('manageJadwalTakUstadz')?.value;

  if (!kitab || !ustadz) {
    showToast("Kitab dan pembina wajib diisi!", "warning");
    return;
  }

  const newEntry = { tingkat, hari, kitab, ustadz };

  if (idx >= 0 && idx < appState.jadwalTakhossus.length) {
    appState.jadwalTakhossus[idx] = newEntry;
    showToast("Jadwal Takhossus berhasil diperbarui.", "success");
  } else {
    appState.jadwalTakhossus.push(newEntry);
    showToast("Jadwal Takhossus baru berhasil ditambahkan.", "success");
  }

  saveState();
  renderAdminJadwalTakhossus();
  renderAdminUstadzManagement();
  closeManageJadwalTakModal();
}

function handleDeleteCurrentJadwalTak() {
  const idx = parseInt(document.getElementById('manageJadwalTakIndex')?.value, 10);
  if (idx >= 0 && idx < appState.jadwalTakhossus.length) {
    deleteJadwalTakhossusRow(idx);
    closeManageJadwalTakModal();
  }
}

function openAddJadwalAngkatanModal() {
  const modal = document.getElementById('modalManageJadwalAngkatan');
  const title = document.getElementById('modalManageJadwalAngTitle');
  const btnDel = document.getElementById('manageJadwalAngBtnDelete');

  if (title) title.textContent = "Tambah Jadwal Angkatan";
  if (btnDel) btnDel.classList.add('hidden');

  document.getElementById('manageJadwalAngIndex').value = "-1";
  document.getElementById('manageJadwalAngKelas').value = "";
  document.getElementById('manageJadwalAngWaktu').value = "";
  document.getElementById('manageJadwalAngKitab').value = "";
  document.getElementById('manageJadwalAngTempat').value = "Masjid";
  const capInp = document.getElementById('manageJadwalAngKapasitas');
  if (capInp) capInp.value = "30";
  populateModalUstadzOptions('manageJadwalAngUstadz');

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function openEditJadwalAngkatanModal(index) {
  const j = appState.jadwalAngkatan[index];
  if (!j) return;

  const modal = document.getElementById('modalManageJadwalAngkatan');
  const title = document.getElementById('modalManageJadwalAngTitle');
  const btnDel = document.getElementById('manageJadwalAngBtnDelete');

  if (title) title.textContent = "Edit Jadwal Angkatan";
  if (btnDel) btnDel.classList.remove('hidden');

  document.getElementById('manageJadwalAngIndex').value = index;
  document.getElementById('manageJadwalAngKelas').value = j.kelas || "";
  document.getElementById('manageJadwalAngWaktu').value = j.waktu || "";
  document.getElementById('manageJadwalAngKitab').value = j.kitab || "";
  document.getElementById('manageJadwalAngTempat').value = j.tempat || "";
  const capInp = document.getElementById('manageJadwalAngKapasitas');
  if (capInp) capInp.value = j.kapasitas || getAngkatanClassCapacity(j.kelas, j.ustadz);
  populateModalUstadzOptions('manageJadwalAngUstadz', j.ustadz);

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeManageJadwalAngModal() {
  const modal = document.getElementById('modalManageJadwalAngkatan');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSaveJadwalAngkatan(e) {
  if (e) e.preventDefault();

  const idx = parseInt(document.getElementById('manageJadwalAngIndex')?.value, 10);
  const kelas = (document.getElementById('manageJadwalAngKelas')?.value || "").trim();
  const waktu = (document.getElementById('manageJadwalAngWaktu')?.value || "").trim();
  const kitab = (document.getElementById('manageJadwalAngKitab')?.value || "").trim();
  const ustadz = document.getElementById('manageJadwalAngUstadz')?.value;
  const tempat = (document.getElementById('manageJadwalAngTempat')?.value || "").trim() || "Masjid";
  const kapasitas = parseInt(document.getElementById('manageJadwalAngKapasitas')?.value || "30", 10) || 30;

  if (!kelas || !waktu || !kitab || !ustadz) {
    showToast("Semua bidang bertanda bintang wajib diisi!", "warning");
    return;
  }

  // Tentukan hari dari teks waktu
  let hari = "Senin";
  const waktuLower = waktu.toLowerCase();
  if (waktuLower.includes("sabtu")) hari = "Sabtu";
  else if (waktuLower.includes("ahad") || waktuLower.includes("minggu")) hari = "Ahad";
  else if (waktuLower.includes("senin")) hari = "Senin";
  else if (waktuLower.includes("selasa")) hari = "Selasa";
  else if (waktuLower.includes("rabu")) hari = "Rabu";
  else if (waktuLower.includes("kamis")) hari = "Kamis";
  else if (waktuLower.includes("jumat")) hari = "Jumat";

  const newEntry = { no: idx >= 0 ? appState.jadwalAngkatan[idx].no : (appState.jadwalAngkatan.length + 1), kelas, kitab, ustadz, waktu, hari, tempat, kapasitas };

  if (idx >= 0 && idx < appState.jadwalAngkatan.length) {
    appState.jadwalAngkatan[idx] = newEntry;
    showToast("Jadwal Angkatan berhasil diperbarui.", "success");
  } else {
    appState.jadwalAngkatan.push(newEntry);
    showToast("Jadwal Angkatan baru berhasil ditambahkan.", "success");
  }

  saveState();
  populateDropdowns();
  renderAdminJadwalAngkatan();
  renderAdminUstadzManagement();
  closeManageJadwalAngModal();
}

function handleDeleteCurrentJadwalAng() {
  const idx = parseInt(document.getElementById('manageJadwalAngIndex')?.value, 10);
  if (idx >= 0 && idx < appState.jadwalAngkatan.length) {
    deleteJadwalAngkatanRow(idx);
    closeManageJadwalAngModal();
  }
}

function populateDropdowns() {
  const takUstadzSelect = document.getElementById('takhossusUstadz');
  if (takUstadzSelect) {
    const ustadzSet = new Set(appState.santriMaster.map(s => s.pembina).filter(Boolean));
    takUstadzSelect.innerHTML = '<option value="">-- Pilih Pembina / Ustadz --</option>';
    Array.from(ustadzSet).sort().forEach(u => {
      const opt = document.createElement('option');
      opt.value = u;
      opt.textContent = u;
      takUstadzSelect.appendChild(opt);
    });
  }

  const regUstadzSelect = document.getElementById('regulerUstadz');
  if (regUstadzSelect) {
    regUstadzSelect.innerHTML = '<option value="">-- Pilih Pengajar / Ustadz --</option>';
    appState.jadwalAngkatan.forEach(j => {
      const opt = document.createElement('option');
      opt.value = j.ustadz;
      opt.textContent = j.ustadz + " (" + j.kelas + " - " + j.kitab + ")";
      regUstadzSelect.appendChild(opt);
    });
  }

  const guruFilterSelect = document.getElementById('guruFilterSelect');
  if (guruFilterSelect) {
    const allTeachers = new Set([
      ...appState.santriMaster.map(s => s.pembina),
      ...appState.jadwalAngkatan.map(j => j.ustadz)
    ].filter(Boolean));
    guruFilterSelect.innerHTML = '<option value="all">-- Semua Ustadz / Guru --</option>';
    Array.from(allTeachers).sort().forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      guruFilterSelect.appendChild(opt);
    });
  }

  // Populasi dropdown filter Ustadz & Santri pada Riwayat Absensi Beranda
  populateHistoryFilters(true);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function populateHistoryFilters(preserveSelection = true) {
  const ustadzSelect = document.getElementById('filterHistoryUstadz');
  const santriSelect = document.getElementById('filterHistorySantri');
  if (!ustadzSelect && !santriSelect) return;

  const prevUstadz = preserveSelection && ustadzSelect ? ustadzSelect.value : "all";
  const prevSantri = preserveSelection && santriSelect ? santriSelect.value : "all";

  // 1. Kumpulkan daftar Ustadz unik
  if (ustadzSelect) {
    const ustadzSet = new Set();
    (appState.ustadzList || []).forEach(u => { if (u && u.nama) ustadzSet.add(u.nama.trim()); });
    (appState.santriMaster || []).forEach(s => { if (s && s.pembina) ustadzSet.add(s.pembina.trim()); });
    (appState.jadwalAngkatan || []).forEach(j => { if (j && j.ustadz) ustadzSet.add(j.ustadz.trim()); });
    (appState.history || []).forEach(h => {
      if (h && h.namaUstadz) ustadzSet.add(h.namaUstadz.trim());
      if (h && h.pembina) ustadzSet.add(h.pembina.trim());
    });

    const sortedUstadz = Array.from(ustadzSet).filter(Boolean).sort((a, b) => a.localeCompare(b, 'id'));

    let uHtml = '<option value="all">Semua Ustadz / Pengajar</option>';
    sortedUstadz.forEach(u => {
      const isSel = (prevUstadz === u) ? ' selected' : '';
      uHtml += `<option value="${escapeHtml(u)}"${isSel}>${escapeHtml(u)}</option>`;
    });
    ustadzSelect.innerHTML = uHtml;
  }

  // 2. Kumpulkan daftar Santri unik
  if (santriSelect) {
    const santriMap = new Map();

    (appState.santriMaster || []).forEach(s => {
      if (s && s.nama) {
        const key = s.nama.trim();
        santriMap.set(key, {
          nama: key,
          tingkat: s.tingkat || "",
          pembina: s.pembina || ""
        });
      }
    });

    (appState.history || []).forEach(h => {
      if (h && Array.isArray(h.detailSantri)) {
        h.detailSantri.forEach(ds => {
          if (ds && ds.nama) {
            const key = ds.nama.trim();
            if (!santriMap.has(key)) {
              santriMap.set(key, {
                nama: key,
                tingkat: h.tingkat || "",
                pembina: h.namaUstadz || h.pembina || ""
              });
            }
          }
        });
      }
    });

    const allSantri = Array.from(santriMap.values()).sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
    const selectedUstadz = ustadzSelect ? ustadzSelect.value : "all";

    let sHtml = '<option value="all">Semua Santri</option>';

    if (selectedUstadz && selectedUstadz !== "all") {
      const uNorm = selectedUstadz.trim().toLowerCase();
      const binaan = allSantri.filter(s => (s.pembina || "").trim().toLowerCase() === uNorm);
      const others = allSantri.filter(s => (s.pembina || "").trim().toLowerCase() !== uNorm);

      if (binaan.length > 0) {
        sHtml += `<optgroup label="Santri Binaan ${escapeHtml(selectedUstadz)} (${binaan.length})">`;
        binaan.forEach(s => {
          const isSel = (prevSantri === s.nama) ? ' selected' : '';
          const info = s.tingkat ? ` (${s.tingkat})` : '';
          sHtml += `<option value="${escapeHtml(s.nama)}"${isSel}>${escapeHtml(s.nama)}${escapeHtml(info)}</option>`;
        });
        sHtml += `</optgroup>`;
      }

      if (others.length > 0) {
        sHtml += `<optgroup label="Santri Lainnya (${others.length})">`;
        others.forEach(s => {
          const isSel = (prevSantri === s.nama) ? ' selected' : '';
          const info = s.tingkat ? ` (${s.tingkat})` : '';
          sHtml += `<option value="${escapeHtml(s.nama)}"${isSel}>${escapeHtml(s.nama)}${escapeHtml(info)}</option>`;
        });
        sHtml += `</optgroup>`;
      }
    } else {
      allSantri.forEach(s => {
        const isSel = (prevSantri === s.nama) ? ' selected' : '';
        const info = s.tingkat ? ` (${s.tingkat})` : '';
        sHtml += `<option value="${escapeHtml(s.nama)}"${isSel}>${escapeHtml(s.nama)}${escapeHtml(info)}</option>`;
      });
    }

    santriSelect.innerHTML = sHtml;
  }
}

function onFilterHistoryUstadzChange() {
  populateHistoryFilters(true);
  renderDashboardStats();
}

function onFilterHistorySantriChange() {
  renderDashboardStats();
}

// ==============================================================================
// SISTEM VALIDASI REAL-TIME KAPASITAS KELAS (TAKHOUSSUS & ANGKATAN)
// ==============================================================================

function getAngkatanClassCapacity(kelasName, ustadzName) {
  if (appState.jadwalAngkatan && appState.jadwalAngkatan.length > 0) {
    const match = appState.jadwalAngkatan.find(j => 
      (ustadzName && j.ustadz === ustadzName) || 
      (kelasName && j.kelas && j.kelas.toLowerCase() === String(kelasName).toLowerCase())
    );
    if (match && match.kapasitas && Number(match.kapasitas) > 0) {
      return Number(match.kapasitas);
    }
  }
  if (!kelasName) return 30;
  const k = String(kelasName).toLowerCase();
  if (k.includes("1 putri")) return 20;
  if (k.includes("1 putra")) return 25;
  if (k.includes("2 putri")) return 30;
  if (k.includes("2 putra")) return 25;
  if (k.includes("3 putri")) return 25;
  if (k.includes("3 putra")) return 25;
  if (k.includes("4")) return 35;
  if (k.includes("5")) return 40;
  if (k.includes("6")) return 45;
  return 30;
}

function getTakhossusClassCapacity(tingkatName, ustadzName) {
  if (ustadzName) {
    const byPembina = (appState.santriMaster || []).filter(s => s.pembina === ustadzName);
    if (byPembina.length > 0) return byPembina.length;
  }
  if (tingkatName) {
    const byTingkat = (appState.santriMaster || []).filter(s => s.tingkat === tingkatName);
    if (byTingkat.length > 0) return byTingkat.length;
  }
  return 15;
}

let pendingOverCapacitySubmitAction = null;

function showOverCapacityConfirmModal({ formType, className, capacity, entered, onConfirm }) {
  const modal = document.getElementById('modalConfirmOverCapacity');
  const elClass = document.getElementById('overCapModalClass');
  const elCapacity = document.getElementById('overCapModalCapacity');
  const elEntered = document.getElementById('overCapModalEntered');
  const elMessage = document.getElementById('overCapModalMessage');

  const diff = entered - capacity;
  const typeLabel = formType === 'takhossus' ? 'Takhossus' : 'Kajian Angkatan';

  if (elClass) elClass.innerText = `${typeLabel} - ${className || 'Kelas'}`;
  if (elCapacity) elCapacity.innerText = `${capacity} Santri`;
  if (elEntered) elEntered.innerText = `${entered} Santri (+${diff > 0 ? diff : 0})`;
  if (elMessage) {
    elMessage.innerHTML = `Jumlah santri/jamaah yang dimasukkan (<b>${entered} santri</b>) melebihi kapasitas kelas terdaftar (<b>${capacity} santri</b> untuk ${className || 'kelas ini'}). Pastikan data kehadiran telah diverifikasi sebelum formulir dikirim.`;
  }

  pendingOverCapacitySubmitAction = onConfirm;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeOverCapacityConfirmModal() {
  const modal = document.getElementById('modalConfirmOverCapacity');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  pendingOverCapacitySubmitAction = null;
}

function confirmProceedOverCapacitySubmit() {
  const action = pendingOverCapacitySubmitAction;
  closeOverCapacityConfirmModal();
  if (typeof action === 'function') {
    action();
  }
}

function onTakhossusUstadzChange() {
  const ustadzVal = document.getElementById('takhossusUstadz').value;
  const badge = document.getElementById('takhossusTingkatBadge');
  const text = document.getElementById('takhossusTingkatText');
  const capText = document.getElementById('takhossusKapasitasText');
  const container = document.getElementById('takhossusSantriListContainer');

  if (!ustadzVal) {
    if (badge) badge.classList.add('hidden');
    if (capText) capText.innerText = "0";
    if (container) {
      container.innerHTML = '<div class="text-center py-6 text-slate-400 text-xs"><i class="fa-solid fa-user-clock text-2xl mb-1.5 text-slate-300"></i><p>Silakan pilih Pembina / Ustadz di atas untuk menampilkan daftar santri.</p></div>';
    }
    updateTakhossusCounts();
    return;
  }

  const santriList = appState.santriMaster.filter(s => s.pembina === ustadzVal);
  const tingkatList = Array.from(new Set(santriList.map(s => s.tingkat))).join(", ");
  const capacity = getTakhossusClassCapacity(tingkatList, ustadzVal);

  if (badge) {
    badge.classList.remove('hidden');
    badge.classList.add('flex');
  }
  if (text) text.innerText = tingkatList || "Takhossus";
  if (capText) capText.innerText = capacity;

  if (santriList.length === 0) {
    if (container) {
      container.innerHTML = '<div class="text-center py-6 text-slate-400 text-xs"><p>Belum ada daftar santri untuk pembina ini.</p></div>';
    }
    updateTakhossusCounts();
    return;
  }

  let html = "";
  santriList.forEach((s, idx) => {
    html += `
      <div class="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm" data-santri-name="${s.nama}">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">${idx + 1}</span>
          <div>
            <div class="text-xs font-bold text-slate-800">${s.nama}</div>
            <div class="text-[10px] text-slate-400">${s.tingkat} • ${s.gender === 'P' ? 'Putri' : 'Putra'}</div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <label class="cursor-pointer">
            <input type="radio" name="santriStatus_${idx}" value="H" checked onchange="updateTakhossusCounts()" class="peer hidden" />
            <span class="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 text-slate-500 peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:border-emerald-600 transition">H</span>
          </label>
          <label class="cursor-pointer">
            <input type="radio" name="santriStatus_${idx}" value="I" onchange="updateTakhossusCounts()" class="peer hidden" />
            <span class="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 text-slate-500 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition">I</span>
          </label>
          <label class="cursor-pointer">
            <input type="radio" name="santriStatus_${idx}" value="S" onchange="updateTakhossusCounts()" class="peer hidden" />
            <span class="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 text-slate-500 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-amber-500 transition">S</span>
          </label>
          <label class="cursor-pointer">
            <input type="radio" name="santriStatus_${idx}" value="A" onchange="updateTakhossusCounts()" class="peer hidden" />
            <span class="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 text-slate-500 peer-checked:bg-rose-600 peer-checked:text-white peer-checked:border-rose-600 transition">A</span>
          </label>
        </div>
      </div>
    `;
  });
  if (container) container.innerHTML = html;
  updateTakhossusCounts();
}

function setAllTakhossusStatus(statusVal) {
  const radios = document.querySelectorAll('#takhossusSantriListContainer input[type="radio"]');
  radios.forEach(r => {
    if (r.value === statusVal) r.checked = true;
  });
  updateTakhossusCounts();
}

function updateTakhossusCounts() {
  const radios = document.querySelectorAll('#takhossusSantriListContainer input[type="radio"]:checked');
  let h = 0, i = 0, s = 0, a = 0;
  radios.forEach(r => {
    if (r.value === 'H') h++;
    else if (r.value === 'I') i++;
    else if (r.value === 'S') s++;
    else if (r.value === 'A') a++;
  });

  const tambahanInput = document.getElementById('takhossusSantriTambahan');
  const santriTambahan = parseInt(tambahanInput?.value || "0", 10) || 0;
  const totalHadir = h + (santriTambahan > 0 ? santriTambahan : 0);

  const elHadir = document.getElementById('rekapHadirCount');
  const elIzin = document.getElementById('rekapIzinCount');
  const elSakit = document.getElementById('rekapSakitCount');
  const elAlfa = document.getElementById('rekapAlfaCount');
  const elHadirCard = document.getElementById('rekapHadirCard');

  if (elHadir) elHadir.innerText = totalHadir;
  if (elIzin) elIzin.innerText = i;
  if (elSakit) elSakit.innerText = s;
  if (elAlfa) elAlfa.innerText = a;

  // Real-time capacity validation check
  const ustadzVal = document.getElementById('takhossusUstadz')?.value;
  const tingkatText = document.getElementById('takhossusTingkatText')?.innerText || "";
  const capacity = getTakhossusClassCapacity(tingkatText, ustadzVal);

  const alertBox = document.getElementById('takhossusCapacityAlert');
  const alertMsg = document.getElementById('takhossusCapacityAlertMsg');
  const statusBadge = document.getElementById('takhossusCapacityStatusBadge');

  if (ustadzVal && totalHadir > capacity) {
    if (alertBox) alertBox.classList.remove('hidden');
    if (alertMsg) {
      alertMsg.innerHTML = `Jumlah santri hadir yang dimasukkan (<b>${totalHadir} santri</b>${santriTambahan > 0 ? ` termasuk ${santriTambahan} santri tambahan` : ''}) melebihi kapasitas kelas terdaftar (<b>${capacity} santri</b> untuk tingkatan <b>${tingkatText}</b>). Pastikan data kehadiran benar sebelum formulir dikirim.`;
    }
    if (elHadirCard) {
      elHadirCard.classList.add('border-amber-400', 'bg-amber-50/70', 'ring-2', 'ring-amber-300');
      elHadirCard.classList.remove('border-emerald-200', 'bg-white');
    }
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> ${totalHadir} / ${capacity} Santri (Kelebihan ${totalHadir - capacity})</span>`;
    }
    return { isOver: true, totalHadir, capacity, tingkat: tingkatText, ustadz: ustadzVal };
  } else {
    if (alertBox) alertBox.classList.add('hidden');
    if (elHadirCard) {
      elHadirCard.classList.remove('border-amber-400', 'bg-amber-50/70', 'ring-2', 'ring-amber-300');
      elHadirCard.classList.add('border-emerald-200', 'bg-white');
    }
    if (statusBadge) {
      if (ustadzVal && capacity > 0) {
        statusBadge.innerHTML = `<span class="text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${totalHadir} / ${capacity} Santri (Sesuai Kuota)</span>`;
      } else {
        statusBadge.innerHTML = "";
      }
    }
    return { isOver: false, totalHadir, capacity, tingkat: tingkatText, ustadz: ustadzVal };
  }
}

function onRegulerUstadzChange() {
  const ustadzVal = document.getElementById('regulerUstadz').value;
  const kelasInput = document.getElementById('regulerKelas');
  const kitabInput = document.getElementById('regulerKitab');
  const waktuTempatInput = document.getElementById('regulerWaktuTempat');
  const hariInput = document.getElementById('regulerHari');
  const capBadge = document.getElementById('regulerKapasitasBadge');

  if (!ustadzVal) {
    if (kelasInput) kelasInput.value = "";
    if (kitabInput) kitabInput.value = "";
    if (waktuTempatInput) waktuTempatInput.value = "";
    if (capBadge) capBadge.innerText = "-";
    validateRegulerCapacityRealtime();
    return;
  }

  const match = appState.jadwalAngkatan.find(j => j.ustadz === ustadzVal);
  if (match) {
    if (kelasInput) kelasInput.value = match.kelas || "-";
    if (kitabInput) kitabInput.value = match.kitab || "-";
    if (waktuTempatInput) waktuTempatInput.value = (match.waktu || "") + " @ " + (match.tempat || "");
    if (match.hari && hariInput) hariInput.value = match.hari;

    const capacity = getAngkatanClassCapacity(match.kelas, ustadzVal);
    if (capBadge) capBadge.innerText = `${capacity} Santri`;
  } else {
    if (capBadge) capBadge.innerText = "-";
  }

  validateRegulerCapacityRealtime();
}

function validateRegulerCapacityRealtime() {
  const jumlahInput = document.getElementById('regulerJumlah');
  const ustadzVal = document.getElementById('regulerUstadz')?.value;
  const kelasVal = document.getElementById('regulerKelas')?.value;
  const alertBox = document.getElementById('regulerCapacityAlert');
  const alertMsg = document.getElementById('regulerCapacityAlertMsg');
  const statusBadge = document.getElementById('regulerCapacityStatusBadge');

  if (!jumlahInput) return { isOver: false, entered: 0, capacity: 0 };

  const rawVal = (jumlahInput.value || "").trim();
  const capacity = getAngkatanClassCapacity(kelasVal, ustadzVal);

  if (rawVal === "") {
    if (alertBox) alertBox.classList.add('hidden');
    jumlahInput.classList.remove('border-amber-500', 'bg-amber-50/50', 'text-amber-950', 'ring-2', 'ring-amber-400');
    jumlahInput.classList.add('border-slate-200', 'bg-slate-50');
    if (statusBadge) {
      statusBadge.innerHTML = ustadzVal ? `<span class="text-slate-500 text-[10px] font-semibold">Kapasitas: ${capacity} Santri</span>` : '';
    }
    return { isOver: false, entered: 0, capacity, kelas: kelasVal, ustadz: ustadzVal };
  }

  const entered = parseInt(rawVal, 10);
  if (isNaN(entered)) {
    return { isOver: false, entered: 0, capacity, kelas: kelasVal, ustadz: ustadzVal };
  }

  if (entered > capacity) {
    if (alertBox) alertBox.classList.remove('hidden');
    if (alertMsg) {
      alertMsg.innerHTML = `Jumlah santri/jamaah hadir yang dimasukkan (<b>${entered} orang</b>) melebihi kapasitas kelas terdaftar (<b>${capacity} santri</b> untuk kelas <b>${kelasVal || 'Angkatan'}</b>). Mohon periksa kembali sebelum formulir dikirim.`;
    }
    jumlahInput.classList.add('border-amber-500', 'bg-amber-50/50', 'text-amber-950', 'ring-2', 'ring-amber-400');
    jumlahInput.classList.remove('border-slate-200', 'bg-slate-50');
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> ${entered} / ${capacity} (Kelebihan ${entered - capacity})</span>`;
    }
    return { isOver: true, entered, capacity, kelas: kelasVal, ustadz: ustadzVal };
  } else if (entered >= 0) {
    if (alertBox) alertBox.classList.add('hidden');
    jumlahInput.classList.remove('border-amber-500', 'bg-amber-50/50', 'text-amber-950', 'ring-2', 'ring-amber-400');
    jumlahInput.classList.add('border-slate-200', 'bg-slate-50');
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${entered} / ${capacity} (Sesuai Kuota)</span>`;
    }
    return { isOver: false, entered, capacity, kelas: kelasVal, ustadz: ustadzVal };
  }

  return { isOver: false, entered, capacity, kelas: kelasVal, ustadz: ustadzVal };
}

function handleCameraCapture(inputEl, formType) {
  if (!inputEl.files || !inputEl.files[0]) return;
  const file = inputEl.files[0];

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const maxDim = 1000;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, height - 28, width, 28);
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Al-Aqsha Turats • " + new Date().toLocaleString('id-ID'), 10, height - 10);

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
      appState.tempCapturedPhoto[formType] = compressedBase64;

      const previewContainer = document.getElementById(formType + 'PhotoPreviewContainer');
      const previewImg = document.getElementById(formType + 'PhotoPreview');
      const timeText = document.getElementById(formType + 'PhotoTime');
      const retakeBtn = document.getElementById(formType + 'RetakeBtn');

      if (previewContainer && previewImg) {
        previewImg.src = compressedBase64;
        previewContainer.classList.remove('hidden');
        if (timeText) timeText.innerText = new Date().toLocaleTimeString('id-ID');
        if (retakeBtn) retakeBtn.classList.remove('hidden');
      }
      showToast("Foto kamera langsung berhasil diambil!", "success");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function handleTakhossusSubmit(e) {
  if (e) e.preventDefault();

  const formEl = e?.target || document.getElementById('formAbsenTakhossus');

  const tanggalInput = document.getElementById('takhossusTanggal');
  const tanggal = (tanggalInput?.value || "").trim();
  if (!tanggal) {
    showValidationError('takhossusTanggal', 'Tanggal absensi Takhossus wajib diisi!');
    return;
  }

  const namaUstadzSelect = document.getElementById('takhossusUstadz');
  const namaUstadz = (namaUstadzSelect?.value || "").trim();
  if (!namaUstadz) {
    showValidationError('takhossusUstadz', 'Mohon pilih Pembina / Ustadz terlebih dahulu!');
    return;
  }

  const kitabSelect = document.getElementById('takhossusKitab');
  const kitab = (kitabSelect?.value || "").trim();
  if (!kitab) {
    showValidationError('takhossusKitab', 'Mohon pilih Kitab kajian yang diajarkan!');
    return;
  }

  const santriElements = document.querySelectorAll('#takhossusSantriListContainer > div[data-santri-name]');
  if (santriElements.length === 0) {
    showValidationError('takhossusUstadz', 'Daftar santri belum termuat. Silakan pilih Pembina/Ustadz yang sesuai!');
    return;
  }

  if (!appState.tempCapturedPhoto.takhossus) {
    showValidationError('takhossusCameraInput', 'Wajib mengambil foto bukti kajian langsung menggunakan kamera!');
    return;
  }

  const hari = document.getElementById('takhossusHari').value || getIndonesianDayName(tanggal);
  const sesi = document.getElementById('takhossusSesi').value || "Sore";
  const materi = document.getElementById('takhossusMateri').value || "";
  const catatan = document.getElementById('takhossusCatatan').value || "";

  const detailSantri = [];
  let totalHadir = 0, totalIzin = 0, totalSakit = 0, totalAlfa = 0;

  santriElements.forEach((el) => {
    const name = el.getAttribute('data-santri-name');
    const checkedRadio = el.querySelector('input[type="radio"]:checked');
    const status = checkedRadio ? checkedRadio.value : 'H';
    if (status === 'H') totalHadir++;
    else if (status === 'I') totalIzin++;
    else if (status === 'S') totalSakit++;
    else if (status === 'A') totalAlfa++;
    detailSantri.push({ name, status });
  });

  const tambahanInput = document.getElementById('takhossusSantriTambahan');
  const santriTambahan = parseInt(tambahanInput?.value || "0", 10) || 0;
  if (santriTambahan > 0) {
    totalHadir += santriTambahan;
  }

  const totalSantri = detailSantri.length + (santriTambahan > 0 ? santriTambahan : 0);
  const tingkatText = document.getElementById('takhossusTingkatText')?.innerText || "";
  const capacity = getTakhossusClassCapacity(tingkatText, namaUstadz);

  const savePayload = {
    formEl,
    tanggal,
    hari,
    sesi,
    namaUstadz,
    kitab,
    materi,
    catatan,
    totalHadir,
    totalIzin,
    totalSakit,
    totalAlfa,
    totalSantri,
    detailSantri
  };

  // Pengecekan apakah jumlah santri hadir melebihi kapasitas kelas terdaftar
  if (totalHadir > capacity) {
    showOverCapacityConfirmModal({
      formType: 'takhossus',
      className: tingkatText ? `Tingkat ${tingkatText}` : 'Takhossus',
      capacity,
      entered: totalHadir,
      onConfirm: () => executeTakhossusSave(savePayload)
    });
    return;
  }

  executeTakhossusSave(savePayload);
}

function executeTakhossusSave({
  formEl,
  tanggal,
  hari,
  sesi,
  namaUstadz,
  kitab,
  materi,
  catatan,
  totalHadir,
  totalIzin,
  totalSakit,
  totalAlfa,
  totalSantri,
  detailSantri
}) {
  // DEDUPLIKASI: Hapus data lama jika guru yang sama mengirim absensi Takhossus di hari yang sama
  const isDuplicate = appState.history.some(item => 
    item.type === "takhossus" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  );

  appState.history = appState.history.filter(item => !(
    item.type === "takhossus" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  ));

  appState.pendingQueue = appState.pendingQueue.filter(item => !(
    item.type === "takhossus" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  ));

  const record = {
    id: "TAK_" + Date.now(),
    type: "takhossus",
    timestamp: new Date().toISOString(),
    tanggal,
    hari,
    sesi,
    namaUstadz,
    kitab,
    materi,
    totalHadir,
    totalIzin,
    totalSakit,
    totalAlfa,
    totalSantri,
    detailSantri,
    catatan,
    fotoBukti: appState.tempCapturedPhoto.takhossus,
    syncStatus: "pending"
  };

  appState.history.unshift(record);
  appState.pendingQueue.push(record);
  saveState();
  updateSyncStatusBadge();

  if (isDuplicate) {
    showToast("Absensi Takhossus hari ini diperbarui (menggantikan data sebelumnya).", "success");
  } else {
    showToast("Data Absensi Takhossus berhasil disimpan.", "success");
  }

  if (formEl && typeof formEl.reset === 'function') formEl.reset();
  const tambahanInput = document.getElementById('takhossusSantriTambahan');
  if (tambahanInput) tambahanInput.value = "0";
  appState.tempCapturedPhoto.takhossus = null;
  document.getElementById('takhossusPhotoPreviewContainer')?.classList.add('hidden');
  document.getElementById('takhossusRetakeBtn')?.classList.add('hidden');
  onTakhossusUstadzChange();

  if (navigator.onLine) {
    sendRecordToCloud(record);
  }
  renderDashboardStats();
  renderTeacherAnalytics();
  runDataAnomalyCheck(false);
  switchTab('dashboard');
}

async function handleRegulerSubmit(e) {
  if (e) e.preventDefault();

  const formEl = e?.target || document.getElementById('formAbsenReguler');

  const tanggalInput = document.getElementById('regulerTanggal');
  const tanggal = (tanggalInput?.value || "").trim();
  if (!tanggal) {
    showValidationError('regulerTanggal', 'Tanggal absensi kajian angkatan wajib diisi!');
    return;
  }

  const ustadzSelect = document.getElementById('regulerUstadz');
  const namaUstadz = (ustadzSelect?.value || "").trim();
  if (!namaUstadz) {
    showValidationError('regulerUstadz', 'Mohon pilih Pengajar / Ustadz kajian angkatan!');
    return;
  }

  const kelas = (document.getElementById('regulerKelas')?.value || "").trim();
  const kitab = (document.getElementById('regulerKitab')?.value || "").trim();
  if (!kelas || !kitab) {
    showValidationError('regulerUstadz', 'Jadwal kelas atau kitab untuk Ustadz ini tidak ditemukan!');
    return;
  }

  const jumlahInput = document.getElementById('regulerJumlah');
  const rawJumlah = jumlahInput ? jumlahInput.value.trim() : "";
  if (rawJumlah === "" || isNaN(Number(rawJumlah)) || Number(rawJumlah) < 0) {
    showValidationError('regulerJumlah', 'Mohon masukkan jumlah santri/jamaah yang hadir!');
    return;
  }
  const totalJamaah = parseInt(rawJumlah, 10);

  if (!appState.tempCapturedPhoto.reguler) {
    showValidationError('regulerCameraInput', 'Wajib mengambil foto bukti kajian langsung menggunakan kamera!');
    return;
  }

  const hari = document.getElementById('regulerHari').value || getIndonesianDayName(tanggal);
  const waktuTempat = document.getElementById('regulerWaktuTempat').value || "";
  const materi = document.getElementById('regulerMateri').value || "";
  const catatan = document.getElementById('regulerCatatan').value || "";

  const capacity = getAngkatanClassCapacity(kelas, namaUstadz);

  const savePayload = {
    formEl,
    tanggal,
    hari,
    namaUstadz,
    kelas,
    kitab,
    waktuTempat,
    totalJamaah,
    materi,
    catatan
  };

  // Pengecekan apakah jumlah santri/jamaah melebihi kapasitas kelas terdaftar
  if (totalJamaah > capacity) {
    showOverCapacityConfirmModal({
      formType: 'reguler',
      className: kelas || 'Kajian Angkatan',
      capacity,
      entered: totalJamaah,
      onConfirm: () => executeRegulerSave(savePayload)
    });
    return;
  }

  executeRegulerSave(savePayload);
}

function executeRegulerSave({
  formEl,
  tanggal,
  hari,
  namaUstadz,
  kelas,
  kitab,
  waktuTempat,
  totalJamaah,
  materi,
  catatan
}) {
  // DEDUPLIKASI: Hapus data lama jika guru yang sama mengirim absensi Angkatan di hari yang sama
  const isDuplicate = appState.history.some(item => 
    item.type === "reguler" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  );

  appState.history = appState.history.filter(item => !(
    item.type === "reguler" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  ));

  appState.pendingQueue = appState.pendingQueue.filter(item => !(
    item.type === "reguler" && 
    item.tanggal === tanggal && 
    (item.namaUstadz || "").trim().toLowerCase() === (namaUstadz || "").trim().toLowerCase()
  ));

  const record = {
    id: "REG_" + Date.now(),
    type: "reguler",
    timestamp: new Date().toISOString(),
    tanggal,
    hari,
    namaUstadz,
    kelas,
    kitab,
    waktuTempat,
    totalJamaah,
    totalHadir: totalJamaah,
    materi,
    catatan,
    fotoBukti: appState.tempCapturedPhoto.reguler,
    syncStatus: "pending"
  };

  appState.history.unshift(record);
  appState.pendingQueue.push(record);
  saveState();
  updateSyncStatusBadge();

  if (isDuplicate) {
    showToast("Absensi Angkatan hari ini diperbarui (menggantikan data sebelumnya).", "success");
  } else {
    showToast("Data Absensi Angkatan berhasil disimpan.", "success");
  }

  if (formEl && typeof formEl.reset === 'function') formEl.reset();
  appState.tempCapturedPhoto.reguler = null;
  document.getElementById('regulerPhotoPreviewContainer')?.classList.add('hidden');
  document.getElementById('regulerRetakeBtn')?.classList.add('hidden');
  onRegulerUstadzChange();

  if (navigator.onLine) {
    sendRecordToCloud(record);
  }
  renderDashboardStats();
  renderTeacherAnalytics();
  runDataAnomalyCheck(false);
  switchTab('dashboard');
}

let isSyncing = false;

async function sendRecordToCloud(record) {
  if (!appState.appsScriptUrl || !appState.appsScriptUrl.startsWith("http")) {
    return false;
  }
  if (!navigator.onLine) {
    updateSyncStatusBadge();
    return false;
  }

  try {
    const response = await fetch(appState.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(record)
    });

    const resData = await response.json();
    if (resData.status === "success" || response.ok) {
      record.syncStatus = "synced";
      // Update status on history item as well
      const histItem = appState.history.find(h => h.id === record.id);
      if (histItem) histItem.syncStatus = "synced";
      
      appState.pendingQueue = appState.pendingQueue.filter(q => q.id !== record.id);
      saveState();
      updateSyncStatusBadge();
      renderDashboardStats();
      renderOfflineQueueList();
      console.log("Successfully synced record to Google Sheets:", record.id);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Offline or sync deferred for:", record.id, err);
    updateSyncStatusBadge();
    return false;
  }
}

async function autoSyncQueue(isTriggeredByOnline = false) {
  if (isSyncing || appState.pendingQueue.length === 0 || !navigator.onLine) {
    updateSyncStatusBadge();
    return;
  }

  isSyncing = true;
  updateSyncStatusBadge();
  renderOfflineQueueList();

  let successCount = 0;
  const queueToProcess = [...appState.pendingQueue];

  for (const item of queueToProcess) {
    const ok = await sendRecordToCloud(item);
    if (ok) successCount++;
  }

  isSyncing = false;
  updateSyncStatusBadge();
  renderOfflineQueueList();

  if (successCount > 0 && (isTriggeredByOnline || successCount === queueToProcess.length)) {
    showToast(successCount + " data absensi offline berhasil diunggah ke Google Sheets!", "success");
  }
}

function manualSync() {
  if (!navigator.onLine) {
    showToast("Perangkat sedang offline. Antrean tetap aman dan akan otomatis diunggah saat terhubung internet.", "warning");
    return;
  }
  if (appState.pendingQueue.length === 0) {
    showToast("Semua data absensi sudah tersinkronisasi ke Google Sheets.", "info");
    return;
  }
  showToast("Memulai sinkronisasi " + appState.pendingQueue.length + " antrean absensi...", "info");
  autoSyncQueue(true);
}

function updateSyncStatusBadge() {
  const dot = document.getElementById('syncStatusDot');
  const text = document.getElementById('syncStatusText');
  const alertBanner = document.getElementById('offlineQueueAlertBanner');
  const queueCountBadge = document.getElementById('queueCountBadge');
  const queueDesc = document.getElementById('queueDescriptionText');
  const modalQueueCount = document.getElementById('modalQueueItemCount');
  
  const count = appState.pendingQueue ? appState.pendingQueue.length : 0;
  const online = navigator.onLine;

  if (dot && text) {
    if (!online) {
      text.innerText = count > 0 ? "Offline (" + count + " antrean)" : "Offline";
      dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
    } else if (isSyncing) {
      text.innerText = "Mengunggah (" + count + ")...";
      dot.className = "w-2.5 h-2.5 rounded-full bg-teal-300 animate-spin";
    } else if (count > 0) {
      text.innerText = count + " Antrean";
      dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse";
    } else {
      text.innerText = "Online";
      dot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400";
    }
  }

  // Update Offline Queue Alert Banner
  if (alertBanner) {
    if (count > 0) {
      alertBanner.classList.remove('hidden');
      if (queueCountBadge) queueCountBadge.innerText = count + " Tertunda";
      if (queueDesc) {
        queueDesc.innerText = online 
          ? `Terdapat ${count} data absensi sedang dalam antrean sinkronisasi ke server Google Sheets.`
          : `Perangkat Offline: ${count} data absensi disimpan aman secara lokal dan akan diunggah otomatis ketika online.`;
      }
    } else {
      alertBanner.classList.add('hidden');
    }
  }

  if (modalQueueCount) {
    modalQueueCount.innerText = count + " Data Menunggu";
  }
}

function toggleOfflineQueueModal(show = true) {
  const modal = document.getElementById('offlineQueueModal');
  if (!modal) return;
  if (show) {
    renderOfflineQueueList();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  } else {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
}

function renderOfflineQueueList() {
  const container = document.getElementById('offlineQueueListContainer');
  if (!container) return;

  const queue = appState.pendingQueue || [];
  if (queue.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-slate-400">
        <i class="fa-solid fa-cloud-check text-3xl text-emerald-500 mb-2"></i>
        <p class="text-xs font-semibold text-slate-700">Tidak ada antrean absensi offline</p>
        <p class="text-[11px] text-slate-500 mt-0.5">Semua data formulir absensi telah berhasil disinkronkan ke Google Sheets.</p>
      </div>
    `;
    return;
  }

  let html = "";
  queue.forEach((item, index) => {
    const isTak = item.type === "takhossus";
    const hadirText = isTak ? `${item.totalHadir}/${item.totalSantri} Santri Hadir` : `${item.totalJamaah} Jamaah Hadir`;

    html += `
      <div class="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition flex items-center justify-between gap-2">
        <div class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-xl ${isTak ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-100 text-teal-700'} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            <i class="${isTak ? 'fa-solid fa-user-graduate' : 'fa-solid fa-users'}"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs font-bold text-slate-900">${item.namaUstadz || 'Tanpa Nama'}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded ${isTak ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}">
                ${isTak ? 'Takhossus' : 'Angkatan'}
              </span>
            </div>
            <div class="text-[11px] text-emerald-800 font-semibold mt-0.5">
              ${item.kitab || '-'} ${item.materi ? '• ' + item.materi : ''}
            </div>
            <div class="text-[10px] text-slate-500">
              ${item.hari || ''}, ${item.tanggal || ''} • <b class="text-slate-700">${hadirText}</b>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button 
            type="button" 
            onclick="syncSingleQueueItem('${item.id}')" 
            class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
            title="Kirim item ini sekarang"
          >
            <i class="fa-solid fa-paper-plane"></i>
          </button>
          <button 
            type="button" 
            onclick="deleteQueueItem('${item.id}')" 
            class="px-2.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl text-xs font-bold transition"
            title="Hapus dari antrean"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

async function syncSingleQueueItem(id) {
  const item = (appState.pendingQueue || []).find(q => q.id === id);
  if (!item) return;

  if (!navigator.onLine) {
    showToast("Perangkat offline. Tidak dapat mengirim data saat ini.", "warning");
    return;
  }

  showToast("Mengirim absensi " + (item.namaUstadz || "") + "...", "info");
  const ok = await sendRecordToCloud(item);
  if (ok) {
    showToast("Data absensi berhasil disinkronkan!", "success");
    renderOfflineQueueList();
  } else {
    showToast("Gagal mengirim data. Akan dicoba lagi otomatis.", "error");
  }
}

function deleteQueueItem(id) {
  if (confirm("Hapus absensi ini dari antrean pengiriman offline?")) {
    appState.pendingQueue = appState.pendingQueue.filter(q => q.id !== id);
    saveState();
    updateSyncStatusBadge();
    renderDashboardStats();
    renderOfflineQueueList();
    showToast("Item berhasil dihapus dari antrean offline.", "info");
  }
}

function clearAllFailedQueue() {
  if (appState.pendingQueue.length === 0) return;
  if (confirm("Apakah Anda yakin ingin mengosongkan semua antrean offline (" + appState.pendingQueue.length + " data)?")) {
    appState.pendingQueue = [];
    saveState();
    updateSyncStatusBadge();
    renderDashboardStats();
    renderOfflineQueueList();
    showToast("Semua antrean offline telah dikosongkan.", "info");
  }
}

function onSearchLogsInput() {
  const input = document.getElementById('inputSearchLogs');
  const clearBtn = document.getElementById('btnClearSearchLogs');
  if (input && clearBtn) {
    if (input.value.trim().length > 0) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }
  renderDashboardStats();
}

function clearLogSearch() {
  const input = document.getElementById('inputSearchLogs');
  const clearBtn = document.getElementById('btnClearSearchLogs');
  if (input) {
    input.value = "";
    if (clearBtn) clearBtn.classList.add('hidden');
    renderDashboardStats();
    input.focus();
  }
}

function resetDashboardFilters() {
  const sDate = document.getElementById('filterStartDate');
  const eDate = document.getElementById('filterEndDate');
  const typeF = document.getElementById('filterType');
  const ustadzF = document.getElementById('filterHistoryUstadz');
  const santriF = document.getElementById('filterHistorySantri');

  if (sDate) sDate.value = "";
  if (eDate) eDate.value = "";
  if (typeF) typeF.value = "all";
  if (ustadzF) ustadzF.value = "all";
  if (santriF) santriF.value = "all";

  clearLogSearch();
  populateHistoryFilters(false);
  renderDashboardStats();
}

function resetHistoryFiltersOnly() {
  const ustadzF = document.getElementById('filterHistoryUstadz');
  const santriF = document.getElementById('filterHistorySantri');

  if (ustadzF) ustadzF.value = "all";
  if (santriF) santriF.value = "all";

  clearLogSearch();
  populateHistoryFilters(false);
  renderDashboardStats();
}

function clearHistoryUstadzFilter() {
  const el = document.getElementById('filterHistoryUstadz');
  if (el) el.value = "all";
  populateHistoryFilters(true);
  renderDashboardStats();
}

function clearHistorySantriFilter() {
  const el = document.getElementById('filterHistorySantri');
  if (el) el.value = "all";
  renderDashboardStats();
}

function clearDateFilters() {
  const sDate = document.getElementById('filterStartDate');
  const eDate = document.getElementById('filterEndDate');
  if (sDate) sDate.value = "";
  if (eDate) eDate.value = "";
  renderDashboardStats();
}

function clearTypeFilter() {
  const el = document.getElementById('filterType');
  if (el) el.value = "all";
  renderDashboardStats();
}

function renderHistoryFilterPills(ustadzFilter, santriFilter, searchQuery, startDate, endDate, typeFilter) {
  const container = document.getElementById('activeHistoryFilterPills');
  const resetBtn = document.getElementById('btnResetHistoryFilters');
  if (!container) return;

  const pills = [];

  if (ustadzFilter && ustadzFilter !== "all") {
    pills.push(`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-medium shadow-2xs">
        <i class="fa-solid fa-chalkboard-user text-[10px] text-emerald-700"></i>
        <span>Ustadz: <b>${escapeHtml(ustadzFilter)}</b></span>
        <button type="button" onclick="clearHistoryUstadzFilter()" class="hover:text-rose-600 ml-0.5 text-xs font-bold" title="Hapus filter ustadz">&times;</button>
      </span>
    `);
  }

  if (santriFilter && santriFilter !== "all") {
    pills.push(`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-medium shadow-2xs">
        <i class="fa-solid fa-user-graduate text-[10px] text-emerald-700"></i>
        <span>Santri: <b>${escapeHtml(santriFilter)}</b></span>
        <button type="button" onclick="clearHistorySantriFilter()" class="hover:text-rose-600 ml-0.5 text-xs font-bold" title="Hapus filter santri">&times;</button>
      </span>
    `);
  }

  if (searchQuery) {
    pills.push(`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium shadow-2xs">
        <i class="fa-solid fa-magnifying-glass text-[10px] text-amber-700"></i>
        <span>Cari: "<b>${escapeHtml(searchQuery)}</b>"</span>
        <button type="button" onclick="clearLogSearch()" class="hover:text-rose-600 ml-0.5 text-xs font-bold" title="Hapus pencarian">&times;</button>
      </span>
    `);
  }

  if (startDate || endDate) {
    const rangeText = (startDate && endDate) ? `${startDate} s/d ${endDate}` : (startDate ? `Dari ${startDate}` : `Sampai ${endDate}`);
    pills.push(`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-medium shadow-2xs">
        <i class="fa-solid fa-calendar-day text-[10px] text-blue-700"></i>
        <span>Tanggal: <b>${escapeHtml(rangeText)}</b></span>
        <button type="button" onclick="clearDateFilters()" class="hover:text-rose-600 ml-0.5 text-xs font-bold" title="Hapus filter tanggal">&times;</button>
      </span>
    `);
  }

  if (typeFilter && typeFilter !== "all") {
    const typeLabel = typeFilter === 'takhossus' ? 'Takhossus Saja' : 'Angkatan Saja';
    pills.push(`
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-medium shadow-2xs">
        <i class="fa-solid fa-tag text-[10px] text-purple-700"></i>
        <span>Kategori: <b>${escapeHtml(typeLabel)}</b></span>
        <button type="button" onclick="clearTypeFilter()" class="hover:text-rose-600 ml-0.5 text-xs font-bold" title="Hapus filter kategori">&times;</button>
      </span>
    `);
  }

  const hasHistoryFilters = (ustadzFilter && ustadzFilter !== "all") || (santriFilter && santriFilter !== "all") || Boolean(searchQuery);

  if (resetBtn) {
    if (hasHistoryFilters) resetBtn.classList.remove('hidden');
    else resetBtn.classList.add('hidden');
  }

  if (pills.length > 0) {
    container.classList.remove('hidden');
    container.innerHTML = `
      <span class="text-[10px] font-bold text-slate-500 mr-1 flex items-center gap-1">
        <i class="fa-solid fa-filter text-[9px] text-emerald-600"></i> Filter Aktif:
      </span>
      ${pills.join("")}
      <button type="button" onclick="resetDashboardFilters()" class="text-[10px] text-rose-600 hover:text-rose-800 font-bold ml-1.5 transition underline">
        Hapus Semua
      </button>
    `;
  } else {
    container.classList.add('hidden');
    container.innerHTML = "";
  }
}

function renderDashboardStats() {
  const startDate = document.getElementById('filterStartDate')?.value;
  const endDate = document.getElementById('filterEndDate')?.value;
  const typeFilter = document.getElementById('filterType')?.value || "all";
  const ustadzFilter = document.getElementById('filterHistoryUstadz')?.value || "all";
  const santriFilter = document.getElementById('filterHistorySantri')?.value || "all";
  const searchInput = document.getElementById('inputSearchLogs');
  const searchQuery = (searchInput ? searchInput.value : "").trim().toLowerCase();

  const dateFiltered = appState.history.filter(item => {
    if (startDate && item.tanggal < startDate) return false;
    if (endDate && item.tanggal > endDate) return false;
    if (typeFilter !== "all" && item.type !== typeFilter) return false;

    // Filter Ustadz Spesifik
    if (ustadzFilter && ustadzFilter !== "all") {
      const uNorm = ustadzFilter.trim().toLowerCase();
      const itemUstadz = (item.namaUstadz || item.pembina || "").trim().toLowerCase();
      if (itemUstadz !== uNorm) return false;
    }

    // Filter Santri Spesifik
    if (santriFilter && santriFilter !== "all") {
      const sNorm = santriFilter.trim().toLowerCase();
      if (item.type === "takhossus") {
        if (Array.isArray(item.detailSantri) && item.detailSantri.length > 0) {
          const found = item.detailSantri.some(ds => (ds.nama || "").trim().toLowerCase() === sNorm);
          if (!found) return false;
        } else {
          // Fallback untuk data historis/sample tanpa array detailSantri
          const ms = (appState.santriMaster || []).find(s => (s.nama || "").trim().toLowerCase() === sNorm);
          if (ms) {
            const matchPembina = ms.pembina && (item.namaUstadz || item.pembina || "").trim().toLowerCase() === ms.pembina.trim().toLowerCase();
            const matchTingkat = ms.tingkat && item.tingkat && item.tingkat.trim().toLowerCase() === ms.tingkat.trim().toLowerCase();
            if (!matchPembina && !matchTingkat) return false;
          } else {
            return false;
          }
        }
      } else {
        // Kajian Angkatan: cocokkan santri berdasarkan kelas tingkatnya
        const ms = (appState.santriMaster || []).find(s => (s.nama || "").trim().toLowerCase() === sNorm);
        if (ms && ms.tingkat) {
          const santriTingkatClean = ms.tingkat.toLowerCase().replace(/[^a-z0-9]/g, '');
          const regulerKelasClean = (item.kelas || "").toLowerCase().replace(/[^a-z0-9]/g, '');
          const matchKelas = regulerKelasClean && (santriTingkatClean.includes(regulerKelasClean) || regulerKelasClean.includes(santriTingkatClean));
          if (!matchKelas) return false;
        } else {
          return false;
        }
      }
    }

    return true;
  });

  let totalSesi = dateFiltered.length;
  let totalHadir = 0, totalIzin = 0, totalSakit = 0;

  dateFiltered.forEach(item => {
    if (item.type === "takhossus") {
      totalHadir += Number(item.totalHadir || 0);
      totalIzin += Number(item.totalIzin || 0);
      totalSakit += Number(item.totalSakit || 0);
    } else {
      totalHadir += Number(item.totalJamaah || 0);
    }
  });

  const statTotalSesiEl = document.getElementById('statTotalSesi');
  const statTotalHadirEl = document.getElementById('statTotalHadir');
  const statTotalIzinSakitEl = document.getElementById('statTotalIzinSakit');
  const statPendingQueueEl = document.getElementById('statPendingQueue');

  if (statTotalSesiEl) statTotalSesiEl.innerText = totalSesi;
  if (statTotalHadirEl) statTotalHadirEl.innerText = totalHadir;
  if (statTotalIzinSakitEl) statTotalIzinSakitEl.innerText = (totalIzin + totalSakit);
  if (statPendingQueueEl) statPendingQueueEl.innerText = (appState.pendingQueue || []).length;

  // Hitung ringkasan rata-rata kehadiran santri 7 hari terakhir
  const now = new Date();
  const d7Ago = new Date();
  d7Ago.setDate(now.getDate() - 6);
  const formatDateISO = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const todayISO = formatDateISO(now);
  const start7ISO = formatDateISO(d7Ago);

  let totalHadir7Hari = 0;
  let totalSesi7Hari = 0;
  const activeDays7Hari = new Set();

  (appState.history || []).forEach(item => {
    if (item.tanggal && item.tanggal >= start7ISO && item.tanggal <= todayISO) {
      totalSesi7Hari++;
      activeDays7Hari.add(item.tanggal);
      if (item.type === "takhossus") {
        totalHadir7Hari += Number(item.totalHadir || 0);
      } else {
        totalHadir7Hari += Number(item.totalJamaah || 0);
      }
    }
  });

  const avgHadir7HariEl = document.getElementById('statAvgHadir7Hari');
  const subAvg7HariEl = document.getElementById('statSubAvg7Hari');
  if (avgHadir7HariEl && subAvg7HariEl) {
    if (totalSesi7Hari > 0) {
      const avgPerSesi = (totalHadir7Hari / totalSesi7Hari).toFixed(1);
      const cleanAvg = avgPerSesi.endsWith('.0') ? parseInt(avgPerSesi, 10) : avgPerSesi;
      avgHadir7HariEl.innerHTML = `${cleanAvg} <span class="text-[10px] font-normal text-slate-500">santri/sesi</span>`;
      subAvg7HariEl.innerText = `${totalHadir7Hari} hadir • ${totalSesi7Hari} sesi (${activeDays7Hari.size} hari)`;
    } else {
      avgHadir7HariEl.innerHTML = `0 <span class="text-[10px] font-normal text-slate-500">santri/sesi</span>`;
      subAvg7HariEl.innerText = `Belum ada sesi 7 hari ini`;
    }
  }

  const searchFiltered = dateFiltered.filter(item => {
    if (!searchQuery) return true;
    const u = (item.namaUstadz || "").toLowerCase();
    const k = (item.kitab || "").toLowerCase();
    const m = (item.materi || "").toLowerCase();
    const c = (item.catatan || "").toLowerCase();
    const inSantri = Array.isArray(item.detailSantri) && item.detailSantri.some(ds => (ds.nama || "").toLowerCase().includes(searchQuery));
    return u.includes(searchQuery) || k.includes(searchQuery) || m.includes(searchQuery) || c.includes(searchQuery) || inSantri;
  });

  // Simpan hasil filter aktif untuk ekspor CSV
  window._currentFilteredHistory = searchFiltered;

  renderHistoryFilterPills(ustadzFilter, santriFilter, searchQuery, startDate, endDate, typeFilter);
  renderHistoryCards(searchFiltered, searchQuery, santriFilter, ustadzFilter);
  renderTodayAttendanceReminder();
  renderMonthlyCalendar();
  updateSyncStatusBadge();
}

let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth(); // 0 - 11
let selectedCalendarDate = null; // 'YYYY-MM-DD' or null

function changeCalendarMonth(delta) {
  currentCalendarMonth += delta;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear -= 1;
  } else if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear += 1;
  }
  renderMonthlyCalendar();
}

function resetCalendarToCurrentMonth() {
  const now = new Date();
  currentCalendarYear = now.getFullYear();
  currentCalendarMonth = now.getMonth();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  selectedCalendarDate = `${y}-${m}-${d}`;
  renderMonthlyCalendar();
}

function renderMonthlyCalendar() {
  const container = document.getElementById('calendarMonthlyGridContainer');
  const monthYearLabel = document.getElementById('calendarCurrentMonthYear');
  if (!container) return;

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dayNamesShort = ["Ahd", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  if (monthYearLabel) {
    monthYearLabel.innerText = `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;
  }

  const now = new Date();
  const todayY = now.getFullYear();
  const todayM = now.getMonth();
  const todayD = now.getDate();
  const todayISO = `${todayY}-${String(todayM + 1).padStart(2, '0')}-${String(todayD).padStart(2, '0')}`;

  const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const startDayIndex = firstDay.getDay(); // 0 = Ahad, 1 = Senin, ...
  const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();

  let gridHtml = `
    <div class="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
      ${dayNamesShort.map((dn, idx) => `
        <div class="text-[11px] font-bold py-1 ${idx === 0 ? 'text-rose-600' : 'text-slate-600'}">
          ${dn}
        </div>
      `).join('')}
  `;

  // Empty leading cells
  for (let i = 0; i < startDayIndex; i++) {
    gridHtml += `<div class="p-1 min-h-[44px] sm:min-h-[50px] rounded-xl bg-slate-50/40 opacity-30"></div>`;
  }

  // Days in month
  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = String(currentCalendarMonth + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');
    const dateISO = `${currentCalendarYear}-${monthStr}-${dayStr}`;
    const dayOfWeekIndo = getIndonesianDayName(dateISO);

    // 1. Jadwal rutin pada hari ini
    const scheduledTak = (appState.jadwalTakhossus || []).filter(j => 
      (j.hari || "").trim().toLowerCase() === dayOfWeekIndo.toLowerCase()
    );
    const scheduledAng = (appState.jadwalAngkatan || []).filter(j => 
      (j.hari || "").trim().toLowerCase() === dayOfWeekIndo.toLowerCase()
    );
    const totalScheduled = scheduledTak.length + scheduledAng.length;

    // 2. Data absensi di history
    const dayRecords = (appState.history || []).filter(h => h.tanggal === dateISO);
    const totalRecords = dayRecords.length;

    let status = "empty"; // "empty" | "complete" | "partial"
    let dotHtml = "";
    let cellBg = "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80 text-slate-700";

    if (totalRecords > 0) {
      if (totalScheduled > 0) {
        const takFilledCount = scheduledTak.filter(j => 
          dayRecords.some(h => h.type === 'takhossus' && (h.namaUstadz || '').trim().toLowerCase() === (j.ustadz || '').trim().toLowerCase())
        ).length;
        const angFilledCount = scheduledAng.filter(j => 
          dayRecords.some(h => h.type === 'reguler' && (h.namaUstadz || '').trim().toLowerCase() === (j.ustadz || '').trim().toLowerCase())
        ).length;
        const totalFilledSlots = takFilledCount + angFilledCount;

        if (totalFilledSlots >= totalScheduled || totalRecords >= totalScheduled) {
          status = "complete";
          cellBg = "bg-emerald-50/80 border-emerald-300/80 hover:bg-emerald-100/70 text-emerald-950 font-bold";
          dotHtml = `<span class="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shadow-xs"></span>`;
        } else {
          status = "partial";
          cellBg = "bg-amber-50/80 border-amber-300/80 hover:bg-amber-100/70 text-amber-950 font-bold";
          dotHtml = `<span class="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-200 shadow-xs"></span>`;
        }
      } else {
        status = "complete";
        cellBg = "bg-emerald-50/80 border-emerald-300/80 hover:bg-emerald-100/70 text-emerald-950 font-bold";
        dotHtml = `<span class="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shadow-xs"></span>`;
      }
    }

    const isToday = (dateISO === todayISO);
    const isSelected = (selectedCalendarDate === dateISO);
    const isSunday = (new Date(currentCalendarYear, currentCalendarMonth, d).getDay() === 0);

    let ringClasses = "";
    if (isSelected) {
      ringClasses = "ring-2 ring-emerald-600 shadow-md transform scale-[1.02] z-10";
    } else if (isToday) {
      ringClasses = "ring-2 ring-blue-500";
    }

    gridHtml += `
      <button 
        type="button" 
        onclick="selectCalendarDate('${dateISO}')"
        class="relative flex flex-col items-center justify-between p-1 sm:p-1.5 min-h-[44px] sm:min-h-[50px] rounded-xl border transition active:scale-95 text-xs ${cellBg} ${ringClasses}"
        title="${dateISO} (${dayOfWeekIndo}): ${totalRecords} sesi tercatat"
      >
        <div class="w-full flex items-center justify-between">
          <span class="text-[11px] sm:text-xs font-semibold ${isSunday && status === 'empty' ? 'text-rose-600' : ''}">
            ${d}
          </span>
          ${isToday ? '<span class="text-[8px] bg-blue-600 text-white font-bold px-1 rounded-sm leading-tight scale-90 sm:scale-100">Hari ini</span>' : ''}
        </div>
        <div class="w-full flex items-center justify-center gap-1 my-0.5 min-h-[8px]">
          ${dotHtml}
        </div>
        <div class="text-[9px] text-slate-500 leading-none">
          ${totalRecords > 0 ? `${totalRecords} sesi` : ''}
        </div>
      </button>
    `;
  }

  // Trailing empty cells
  const totalCells = startDayIndex + daysInMonth;
  const trailingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailingCells; i++) {
    gridHtml += `<div class="p-1 min-h-[44px] sm:min-h-[50px] rounded-xl bg-slate-50/40 opacity-30"></div>`;
  }

  gridHtml += `</div>`;
  container.innerHTML = gridHtml;

  renderSelectedCalendarDateDetail();
}

function selectCalendarDate(dateISO) {
  if (selectedCalendarDate === dateISO) {
    selectedCalendarDate = null;
  } else {
    selectedCalendarDate = dateISO;
  }
  renderMonthlyCalendar();
}

function filterLogsToDate(dateISO) {
  const startInput = document.getElementById('filterStartDate');
  const endInput = document.getElementById('filterEndDate');
  if (startInput && endInput) {
    startInput.value = dateISO;
    endInput.value = dateISO;
    renderDashboardStats();
    showToast(`Memfilter log riwayat ke tanggal ${dateISO}`, "info");
    const logSection = document.getElementById('inputSearchLogs');
    if (logSection) {
      logSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function renderSelectedCalendarDateDetail() {
  const detailContainer = document.getElementById('calendarSelectedDateDetail');
  if (!detailContainer) return;

  if (!selectedCalendarDate) {
    detailContainer.classList.add('hidden');
    detailContainer.innerHTML = '';
    return;
  }

  const [y, m, d] = selectedCalendarDate.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const dateFormatted = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dayOfWeekIndo = getIndonesianDayName(selectedCalendarDate);

  const dayRecords = (appState.history || []).filter(h => h.tanggal === selectedCalendarDate);
  const scheduledTak = (appState.jadwalTakhossus || []).filter(j => 
    (j.hari || "").trim().toLowerCase() === dayOfWeekIndo.toLowerCase()
  );
  const scheduledAng = (appState.jadwalAngkatan || []).filter(j => 
    (j.hari || "").trim().toLowerCase() === dayOfWeekIndo.toLowerCase()
  );
  const totalScheduled = scheduledTak.length + scheduledAng.length;

  let statusBadge = "";
  if (dayRecords.length === 0) {
    statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">Belum Ada Catatan</span>`;
  } else if (totalScheduled > 0 && dayRecords.length >= totalScheduled) {
    statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900"><i class="fa-solid fa-circle-check mr-1"></i>Lengkap (${dayRecords.length}/${totalScheduled} Sesi)</span>`;
  } else if (totalScheduled > 0) {
    statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900"><i class="fa-solid fa-clock-rotate-left mr-1"></i>Parsial (${dayRecords.length}/${totalScheduled} Sesi)</span>`;
  } else {
    statusBadge = `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">${dayRecords.length} Sesi Tercatat</span>`;
  }

  let listHtml = "";
  if (dayRecords.length === 0) {
    listHtml = `
      <div class="text-xs text-slate-500 py-1.5 flex items-center gap-1.5 mt-2">
        <i class="fa-solid fa-circle-info text-slate-400"></i> Tidak ada sesi absensi yang tercatat pada tanggal ini.
      </div>
    `;
  } else {
    listHtml = `
      <div class="space-y-1.5 mt-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
        ${dayRecords.map(item => {
          const isTak = item.type === "takhossus";
          return `
            <div class="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-xs">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9px] font-bold px-1.5 py-0.2 rounded ${isTak ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}">
                    ${isTak ? 'Takhossus' : 'Angkatan'}
                  </span>
                  <span class="font-bold text-slate-800">${item.namaUstadz}</span>
                </div>
                <div class="text-[11px] text-slate-600 mt-0.5">
                  <i class="fa-solid fa-book-open text-emerald-600 text-[10px] mr-1"></i>${item.kitab} ${item.materi ? '• ' + item.materi : ''}
                </div>
              </div>
              <div class="text-right">
                <span class="font-extrabold text-emerald-700 text-xs">${isTak ? item.totalHadir + ' Hadir' : item.totalJamaah + ' Hadir'}</span>
                <div class="text-[10px] text-slate-400">${isTak ? (item.sesi || 'Sore') : (item.waktuTempat || '')}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  detailContainer.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-2">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
          <i class="fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <div class="text-xs font-bold text-slate-900">${dateFormatted}</div>
          <div class="text-[10px] text-slate-500">${dayRecords.length} sesi kajian tercatat</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        ${statusBadge}
        <button 
          type="button" 
          onclick="filterLogsToDate('${selectedCalendarDate}')" 
          class="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-xs flex items-center gap-1"
        >
          <i class="fa-solid fa-filter text-[10px]"></i> Filter Log
        </button>
        <button 
          type="button" 
          onclick="selectCalendarDate('${selectedCalendarDate}')" 
          class="text-slate-400 hover:text-slate-600 text-xs p-1"
          title="Tutup detail"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    ${listHtml}
  `;
  detailContainer.classList.remove('hidden');
}

let todayReminderActiveFilter = 'pending';

function getTodayAttendanceScheduleSummary() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayISO = `${year}-${month}-${day}`;
  const todayDayName = getIndonesianDayName(todayISO);

  // 1. Jadwal Takhossus hari ini
  const takhossusToday = (appState.jadwalTakhossus || [])
    .filter(j => (j.hari || "").trim().toLowerCase() === todayDayName.toLowerCase())
    .map((j, idx) => {
      const isFilled = (appState.history || []).some(h => 
        h.type === "takhossus" &&
        h.tanggal === todayISO &&
        (h.namaUstadz || "").trim().toLowerCase() === (j.ustadz || "").trim().toLowerCase()
      );
      return {
        id: "tak_sched_" + idx,
        category: "takhossus",
        categoryLabel: "Takhossus",
        ustadz: j.ustadz,
        tingkatKelas: j.tingkat,
        kitab: j.kitab,
        waktuTempat: "Sore • Ruang Takhossus",
        hari: j.hari,
        isFilled: isFilled
      };
    });

  // 2. Jadwal Angkatan hari ini
  const angkatanToday = (appState.jadwalAngkatan || [])
    .filter(j => (j.hari || "").trim().toLowerCase() === todayDayName.toLowerCase())
    .map((j, idx) => {
      const isFilled = (appState.history || []).some(h => 
        h.type === "reguler" &&
        h.tanggal === todayISO &&
        (h.namaUstadz || "").trim().toLowerCase() === (j.ustadz || "").trim().toLowerCase()
      );
      return {
        id: "ang_sched_" + idx,
        category: "reguler",
        categoryLabel: "Kajian Angkatan",
        ustadz: j.ustadz,
        tingkatKelas: j.kelas,
        kitab: j.kitab,
        waktuTempat: (j.waktu || "") + (j.tempat ? " @ " + j.tempat : ""),
        hari: j.hari,
        isFilled: isFilled
      };
    });

  const allSchedules = [...takhossusToday, ...angkatanToday];
  const pendingSchedules = allSchedules.filter(s => !s.isFilled);
  const filledSchedules = allSchedules.filter(s => s.isFilled);

  return {
    todayISO,
    todayDayName,
    allSchedules,
    pendingSchedules,
    filledSchedules,
    totalScheduled: allSchedules.length,
    totalPending: pendingSchedules.length,
    totalFilled: filledSchedules.length,
    pendingTakCount: pendingSchedules.filter(s => s.category === "takhossus").length,
    pendingAngCount: pendingSchedules.filter(s => s.category === "reguler").length,
    percentage: allSchedules.length > 0 ? Math.round((filledSchedules.length / allSchedules.length) * 100) : 100
  };
}

let isTodayReminderCollapsed = false;

function toggleTodayReminderCollapse() {
  isTodayReminderCollapsed = !isTodayReminderCollapsed;
  renderTodayAttendanceReminder();
}

function setTodayReminderFilter(filterType) {
  todayReminderActiveFilter = filterType;
  renderTodayAttendanceReminder();
}

function updateNavigationReminderBadges(summary) {
  const dashDot = document.getElementById('navDashboardReminderDot');
  const dashDotSolid = document.getElementById('navDashboardReminderDotSolid');
  const takBadge = document.getElementById('navTakhossusReminderBadge');
  const regBadge = document.getElementById('navRegulerReminderBadge');

  if (dashDot && dashDotSolid) {
    if (summary.totalPending > 0) {
      dashDot.classList.remove('hidden');
      dashDotSolid.classList.remove('hidden');
    } else {
      dashDot.classList.add('hidden');
      dashDotSolid.classList.add('hidden');
    }
  }

  if (takBadge) {
    if (summary.pendingTakCount > 0) {
      takBadge.textContent = summary.pendingTakCount;
      takBadge.classList.remove('hidden');
    } else {
      takBadge.classList.add('hidden');
    }
  }

  if (regBadge) {
    if (summary.pendingAngCount > 0) {
      regBadge.textContent = summary.pendingAngCount;
      regBadge.classList.remove('hidden');
    } else {
      regBadge.classList.add('hidden');
    }
  }
}

function fillAttendanceQuick(category, encodedUstadz, encodedKitab, encodedTingkat) {
  const ustadz = decodeURIComponent(encodedUstadz || "");
  const kitab = decodeURIComponent(encodedKitab || "");
  const tingkat = decodeURIComponent(encodedTingkat || "");

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayISO = `${yyyy}-${mm}-${dd}`;
  const todayDay = getIndonesianDayName(todayISO);

  if (category === "takhossus") {
    switchTab('takhossus');

    const dateInput = document.getElementById('takhossusTanggal');
    const hariInput = document.getElementById('takhossusHari');
    if (dateInput) dateInput.value = todayISO;
    if (hariInput) hariInput.value = todayDay;

    const ustadzSelect = document.getElementById('takhossusUstadz');
    if (ustadzSelect && ustadz) {
      let matched = false;
      for (let i = 0; i < ustadzSelect.options.length; i++) {
        const optVal = ustadzSelect.options[i].value.toLowerCase().trim();
        const targetVal = ustadz.toLowerCase().trim();
        if (optVal === targetVal || optVal.includes(targetVal) || targetVal.includes(optVal)) {
          ustadzSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        ustadzSelect.value = ustadz;
      }
      onTakhossusUstadzChange();
    }

    const kitabSelect = document.getElementById('takhossusKitab');
    if (kitabSelect && kitab) {
      let matched = false;
      for (let i = 0; i < kitabSelect.options.length; i++) {
        if (kitabSelect.options[i].value.toLowerCase() === kitab.toLowerCase() || kitabSelect.options[i].text.toLowerCase().includes(kitab.toLowerCase())) {
          kitabSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && kitab) {
        const newOpt = document.createElement('option');
        newOpt.value = kitab;
        newOpt.textContent = kitab;
        kitabSelect.appendChild(newOpt);
        kitabSelect.value = kitab;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("Membuka formulir Takhossus: " + ustadz, "info");
  } else if (category === "reguler") {
    switchTab('reguler');

    const dateInput = document.getElementById('regulerTanggal');
    const hariInput = document.getElementById('regulerHari');
    if (dateInput) dateInput.value = todayISO;
    if (hariInput) hariInput.value = todayDay;

    const ustadzSelect = document.getElementById('regulerUstadz');
    if (ustadzSelect && ustadz) {
      let matched = false;
      for (let i = 0; i < ustadzSelect.options.length; i++) {
        const optVal = ustadzSelect.options[i].value.toLowerCase().trim();
        const targetVal = ustadz.toLowerCase().trim();
        if (optVal === targetVal || optVal.includes(targetVal) || targetVal.includes(optVal)) {
          ustadzSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        ustadzSelect.value = ustadz;
      }
      onRegulerUstadzChange();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("Membuka formulir Kajian Angkatan: " + ustadz, "info");
  }
}

function renderTodayAttendanceReminder() {
  const container = document.getElementById('todayAttendanceReminderContainer');
  if (!container) return;

  const summary = getTodayAttendanceScheduleSummary();
  updateNavigationReminderBadges(summary);

  const d = new Date();
  const dateFormatted = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Kasus 1: Tidak ada jadwal untuk hari ini
  if (summary.totalScheduled === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-lg">
            <i class="fa-solid fa-calendar-day"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>Jadwal Hari Ini: ${summary.todayDayName}</span>
              <span class="text-[10px] text-slate-400 font-normal">(${dateFormatted})</span>
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5">Tidak ada jadwal rutin kajian yang diagendakan untuk hari ${summary.todayDayName}.</div>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end sm:self-auto">
          <button type="button" onclick="switchTab('takhossus')" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 transition flex items-center gap-1">
            <i class="fa-solid fa-plus text-[10px]"></i> Absen Takhossus
          </button>
          <button type="button" onclick="switchTab('reguler')" class="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-xl border border-teal-200 transition flex items-center gap-1">
            <i class="fa-solid fa-plus text-[10px]"></i> Absen Angkatan
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Kasus 2: Semua jadwal hari ini sudah terisi
  if (summary.totalPending === 0) {
    container.innerHTML = `
      <div class="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 rounded-2xl p-4 sm:p-5 border border-emerald-300/90 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm flex-shrink-0">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs sm:text-sm font-bold text-emerald-950">Semua Jadwal Absensi Hari Ini Lengkap!</span>
                <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">100% Selesai</span>
              </div>
              <p class="text-[11px] text-emerald-800 mt-1">
                Alhamdulillah, seluruh <b>${summary.totalScheduled} sesi</b> jadwal kajian hari ini (${summary.todayDayName}, ${dateFormatted}) telah tercatat absensinya secara tertib.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button type="button" onclick="switchTab('filterGuru')" class="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 shadow-xs transition flex items-center gap-1.5">
              <i class="fa-solid fa-chart-pie text-[11px]"></i> Rekap Guru
            </button>
            <button type="button" onclick="document.getElementById('attendanceHistoryContainer')?.scrollIntoView({ behavior: 'smooth' })" class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-[11px]"></i> Lihat Log
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Kasus 3: Ada jadwal yang belum terisi hari ini (Pengingat Aktif)
  let itemsToDisplay = summary.allSchedules;
  if (todayReminderActiveFilter === 'pending') {
    itemsToDisplay = summary.pendingSchedules;
  } else if (todayReminderActiveFilter === 'filled') {
    itemsToDisplay = summary.filledSchedules;
  }

  let scheduleListHtml = "";
  if (itemsToDisplay.length === 0) {
    scheduleListHtml = `
      <div class="text-center py-5 text-xs text-slate-400 bg-white/60 rounded-xl border border-dashed border-amber-200">
        <i class="fa-solid fa-check-double text-emerald-500 text-lg mb-1 block"></i>
        Tidak ada jadwal pada kategori filter ini.
      </div>
    `;
  } else {
    scheduleListHtml = itemsToDisplay.map(item => {
      const isTak = item.category === "takhossus";
      const ustadzEnc = encodeURIComponent(item.ustadz);
      const kitabEnc = encodeURIComponent(item.kitab || "");
      const tingkatEnc = encodeURIComponent(item.tingkatKelas || "");

      if (item.isFilled) {
        return `
          <div class="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
                <i class="fa-solid fa-check"></i>
              </span>
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${isTak ? 'bg-emerald-200 text-emerald-900' : 'bg-teal-200 text-teal-900'}">
                    ${item.categoryLabel}
                  </span>
                  <span class="text-xs font-bold text-slate-800">${escapeHtml(item.ustadz)}</span>
                </div>
                <div class="text-[11px] text-emerald-800 font-medium mt-0.5">
                  <i class="fa-solid fa-book-open text-emerald-600 text-[10px] mr-1"></i>${escapeHtml(item.kitab)} • <span class="text-slate-600">${escapeHtml(item.tingkatKelas)}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 self-end sm:self-auto">
              <span class="text-[10px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 shadow-2xs">
                <i class="fa-solid fa-circle-check text-emerald-500"></i> Sudah Terisi
              </span>
            </div>
          </div>
        `;
      }

      return `
        <div class="p-3.5 bg-white rounded-xl border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500 hover:shadow transition">
          <div class="space-y-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md ${isTak ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-teal-100 text-teal-900 border border-teal-300'}">
                ${item.categoryLabel}
              </span>
              <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                <i class="fa-solid fa-clock-rotate-left"></i> Belum Diisi
              </span>
              <span class="text-xs font-bold text-slate-900">${escapeHtml(item.ustadz)}</span>
            </div>
            <div class="text-[11px] text-slate-700 font-semibold flex items-center gap-1.5 flex-wrap">
              <span class="inline-flex items-center gap-1 text-emerald-800">
                <i class="fa-solid fa-book-bookmark text-emerald-600 text-[11px]"></i> ${escapeHtml(item.kitab)}
              </span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-600 font-medium">${escapeHtml(item.tingkatKelas)}</span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-500 text-[10px] font-normal">${escapeHtml(item.waktuTempat)}</span>
            </div>
          </div>
          <button 
            type="button"
            onclick="fillAttendanceQuick('${item.category}', '${ustadzEnc}', '${kitabEnc}', '${tingkatEnc}')"
            class="self-stretch sm:self-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs rounded-xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <i class="fa-solid fa-pen-to-square text-xs"></i>
            <span>Isi Absen ${item.categoryLabel}</span>
          </button>
        </div>
      `;
    }).join("");
  }

  container.innerHTML = `
    <div class="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/15 rounded-2xl p-4 sm:p-5 border-2 border-amber-400/90 shadow-sm space-y-3.5">
      <!-- Header Banner Pengingat -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-start sm:items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow flex-shrink-0 relative">
            <i class="fa-solid fa-bell"></i>
            <span class="w-3 h-3 rounded-full bg-rose-500 absolute -top-1 -right-1 animate-ping"></span>
            <span class="w-3 h-3 rounded-full bg-rose-500 absolute -top-1 -right-1 border-2 border-white"></span>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-sm sm:text-base font-extrabold text-slate-900">Pengingat Jadwal Absensi Hari Ini</h3>
              <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-xs flex items-center gap-1">
                <i class="fa-solid fa-triangle-exclamation text-[9px]"></i> ${summary.totalPending} Sesi Belum Diisi
              </span>
            </div>
            <p class="text-[11px] text-slate-600 mt-0.5">
              <b>${summary.todayDayName}, ${dateFormatted}</b> • Telah terisi <b>${summary.totalFilled} dari ${summary.totalScheduled}</b> sesi (${summary.percentage}% selesai).
            </p>
          </div>
        </div>

        <!-- Tombol Aksi Cepat ke Tab Form -->
        <div class="flex items-center gap-2 flex-wrap self-stretch sm:self-auto">
          ${summary.pendingTakCount > 0 ? `
            <button 
              type="button" 
              onclick="switchTab('takhossus')" 
              class="flex-1 sm:flex-none px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <i class="fa-solid fa-user-graduate text-[11px]"></i>
              <span>Isi Takhossus (${summary.pendingTakCount})</span>
            </button>
          ` : ''}
          ${summary.pendingAngCount > 0 ? `
            <button 
              type="button" 
              onclick="switchTab('reguler')" 
              class="flex-1 sm:flex-none px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <i class="fa-solid fa-users text-[11px]"></i>
              <span>Isi Angkatan (${summary.pendingAngCount})</span>
            </button>
          ` : ''}
          <button 
            type="button" 
            onclick="toggleTodayReminderCollapse()" 
            class="px-2.5 py-1.5 bg-white/90 hover:bg-white text-slate-600 text-xs font-semibold rounded-xl border border-amber-200 transition flex items-center gap-1"
            title="${isTodayReminderCollapsed ? 'Tampilkan Rincian' : 'Kecilkan Rincian'}"
          >
            <i class="fa-solid ${isTodayReminderCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'} text-[11px]"></i>
          </button>
        </div>
      </div>

      <!-- Content Rincian (Bisa di-toggle) -->
      ${!isTodayReminderCollapsed ? `
        <!-- Filter Tab Pill & Progress Bar -->
        <div class="space-y-2 pt-1 border-t border-amber-200/60">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center bg-white/90 p-1 rounded-xl border border-amber-200 text-[10px] font-bold">
              <button 
                type="button" 
                onclick="setTodayReminderFilter('pending')" 
                class="px-3 py-1 rounded-lg transition ${todayReminderActiveFilter === 'pending' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                Belum Diisi (${summary.totalPending})
              </button>
              <button 
                type="button" 
                onclick="setTodayReminderFilter('all')" 
                class="px-3 py-1 rounded-lg transition ${todayReminderActiveFilter === 'all' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                Semua (${summary.totalScheduled})
              </button>
              <button 
                type="button" 
                onclick="setTodayReminderFilter('filled')" 
                class="px-3 py-1 rounded-lg transition ${todayReminderActiveFilter === 'filled' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                Selesai (${summary.totalFilled})
              </button>
            </div>

            <div class="text-[10px] font-bold text-slate-700">
              Progress Hari Ini: <span class="text-amber-800 font-extrabold">${summary.percentage}%</span> (${summary.totalFilled}/${summary.totalScheduled} Sesi)
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden p-0.5">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all duration-500" style="width: ${summary.percentage}%"></div>
          </div>
        </div>

        <!-- List Jadwal Hari Ini -->
        <div class="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
          ${scheduleListHtml}
        </div>
      ` : `
        <div class="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-amber-200/60">
          <span class="font-medium text-[11px]"><i class="fa-solid fa-list text-amber-700 mr-1"></i> Rincian ${summary.totalPending} jadwal belum diisi sedang disembunyikan.</span>
          <button type="button" onclick="toggleTodayReminderCollapse()" class="text-amber-800 font-bold underline text-[11px]">Buka Rincian</button>
        </div>
      `}
    </div>
  `;
}

function renderHistoryCards(records, searchQuery, selectedSantri = "all", selectedUstadz = "all") {
  const container = document.getElementById('attendanceHistoryContainer');
  const badge = document.getElementById('logCountBadge');
  if (!container) return;

  const isFiltered = (selectedSantri && selectedSantri !== "all") || 
                     (selectedUstadz && selectedUstadz !== "all") || 
                     (searchQuery && searchQuery.length > 0);

  if (badge) {
    badge.innerText = records.length + (isFiltered ? " Data (Tersaring)" : " Data");
  }

  if (records.length === 0) {
    let emptyMsg = "Belum ada riwayat absensi.";
    if (isFiltered) {
      const parts = [];
      if (selectedUstadz && selectedUstadz !== "all") parts.push(`Ustadz "${escapeHtml(selectedUstadz)}"`);
      if (selectedSantri && selectedSantri !== "all") parts.push(`Santri "${escapeHtml(selectedSantri)}"`);
      if (searchQuery) parts.push(`Kata kunci "${escapeHtml(searchQuery)}"`);
      emptyMsg = `Tidak ditemukan riwayat absensi yang cocok untuk ${parts.join(" & ")}.`;
    }

    container.innerHTML = `
      <div class="py-8 text-center text-slate-400">
        <i class="fa-solid fa-filter-circle-xmark text-3xl mb-2 text-slate-300"></i>
        <p class="text-xs font-semibold text-slate-600 px-4">${emptyMsg}</p>
        ${isFiltered ? '<button type="button" onclick="resetHistoryFiltersOnly()" class="mt-2.5 text-xs text-emerald-700 hover:text-emerald-800 font-bold underline inline-flex items-center gap-1"><i class="fa-solid fa-rotate-left text-[10px]"></i> Reset Filter Riwayat</button>' : ''}
      </div>
    `;
    return;
  }

  let html = "";
  records.forEach(item => {
    const isTak = item.type === "takhossus";
    const isSynced = item.syncStatus === "synced";

    let santriHighlightHtml = "";
    if (selectedSantri && selectedSantri !== "all") {
      const sNorm = selectedSantri.trim().toLowerCase();
      if (isTak) {
        if (Array.isArray(item.detailSantri) && item.detailSantri.length > 0) {
          const ds = item.detailSantri.find(s => (s.nama || "").trim().toLowerCase() === sNorm);
          if (ds) {
            let statusBadge = "";
            if (ds.status === 'H') statusBadge = '<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-md text-[10px]"><i class="fa-solid fa-check mr-1"></i>Hadir</span>';
            else if (ds.status === 'I') statusBadge = '<span class="bg-blue-100 text-blue-800 border border-blue-300 font-bold px-2 py-0.5 rounded-md text-[10px]"><i class="fa-solid fa-envelope mr-1"></i>Izin</span>';
            else if (ds.status === 'S') statusBadge = '<span class="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-md text-[10px]"><i class="fa-solid fa-notes-medical mr-1"></i>Sakit</span>';
            else if (ds.status === 'A') statusBadge = '<span class="bg-rose-100 text-rose-800 border border-rose-300 font-bold px-2 py-0.5 rounded-md text-[10px]"><i class="fa-solid fa-xmark mr-1"></i>Alfa</span>';
            else statusBadge = `<span class="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md text-[10px]">${escapeHtml(ds.status)}</span>`;

            santriHighlightHtml = `
              <div class="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] bg-emerald-50/80 -mx-3 -mb-3 px-3 py-1.5 rounded-b-xl">
                <span class="text-slate-700 font-medium flex items-center gap-1.5 truncate">
                  <i class="fa-solid fa-user-check text-emerald-700 text-xs shrink-0"></i>
                  <span>Status Kehadiran <b>${escapeHtml(selectedSantri)}</b>:</span>
                </span>
                <span class="shrink-0">${statusBadge}</span>
              </div>
            `;
          }
        } else {
          santriHighlightHtml = `
            <div class="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] bg-emerald-50/80 -mx-3 -mb-3 px-3 py-1.5 rounded-b-xl">
              <span class="text-slate-700 font-medium flex items-center gap-1.5 truncate">
                <i class="fa-solid fa-user-check text-emerald-700 text-xs shrink-0"></i>
                <span>Sesi Takhossus <b>${escapeHtml(selectedSantri)}</b>:</span>
              </span>
              <span class="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-md text-[10px] shrink-0"><i class="fa-solid fa-check mr-1"></i>Hadir Tercatat</span>
            </div>
          `;
        }
      } else {
        santriHighlightHtml = `
          <div class="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] bg-teal-50/80 -mx-3 -mb-3 px-3 py-1.5 rounded-b-xl">
            <span class="text-slate-700 font-medium flex items-center gap-1.5 truncate">
              <i class="fa-solid fa-users text-teal-700 text-xs shrink-0"></i>
              <span>Kajian Angkatan <b>${escapeHtml(selectedSantri)}</b> (${escapeHtml(item.kelas || '')}):</span>
            </span>
            <span class="bg-teal-100 text-teal-800 border border-teal-300 font-bold px-2 py-0.5 rounded-md text-[10px] shrink-0"><i class="fa-solid fa-users mr-1"></i>Jama'ah (${item.totalJamaah})</span>
          </div>
        `;
      }
    }

    const isUstadzMatch = selectedUstadz && selectedUstadz !== "all" && (item.namaUstadz || "").trim().toLowerCase() === selectedUstadz.trim().toLowerCase();

    html += `
      <div class="p-3 bg-slate-50 hover:bg-slate-100/90 rounded-xl border ${isUstadzMatch ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'} transition shadow-2xs">
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${isTak ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}">
                ${isTak ? 'Takhossus' : 'Angkatan'}
              </span>
              <span class="text-xs font-bold text-slate-800 truncate">${escapeHtml(item.namaUstadz)}</span>
              ${isUstadzMatch ? '<span class="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">Ustadz Terpilih</span>' : ''}
            </div>
            <div class="text-[11px] text-emerald-800 font-semibold mt-0.5 truncate">
              <i class="fa-solid fa-book-open text-[10px] mr-1"></i>${escapeHtml(item.kitab)} ${item.materi ? '• ' + escapeHtml(item.materi) : ''}
            </div>
            <div class="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 flex-wrap">
              <span>${escapeHtml(item.hari)}, ${escapeHtml(item.tanggal)}</span>
              <span>•</span>
              <span>${isTak ? escapeHtml(item.sesi || 'Sore') : escapeHtml(item.waktuTempat || '')}</span>
              ${item.catatan ? `<span class="italic text-slate-400 truncate max-w-[200px]" title="${escapeHtml(item.catatan)}">• "${escapeHtml(item.catatan)}"</span>` : ''}
            </div>
          </div>
          <div class="text-right flex flex-col items-end shrink-0">
            <span class="text-xs font-extrabold text-slate-800">${isTak ? item.totalHadir + '/' + item.totalSantri : item.totalJamaah} Hadir</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded font-medium mt-1 ${isSynced ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
              ${isSynced ? '<i class="fa-solid fa-cloud-check"></i> Terkirim' : '<i class="fa-solid fa-clock"></i> Antrean'}
            </span>
          </div>
        </div>
        ${santriHighlightHtml}
      </div>
    `;
  });
  container.innerHTML = html;
}

let monthlyBarChartInstance = null;

function renderMonthlyAttendanceChart() {
  const canvas = document.getElementById('monthlyAttendanceBarChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (monthlyBarChartInstance) {
    monthlyBarChartInstance.destroy();
    monthlyBarChartInstance = null;
  }

  const yearFilter = document.getElementById('monthlyChartYearFilter')?.value || '2026/2027';
  const modeSelect = document.getElementById('monthlyChartModeSelect')?.value || 'stacked';
  const showTrendLine = document.getElementById('monthlyChartShowTrendLine')?.checked ?? true;
  const isStacked = modeSelect === 'stacked';

  const allHistory = appState.history || [];
  const monthNamesID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

  let monthSlots = [];
  if (yearFilter === "2026/2027") {
    // Tahun Ajaran 2026/2027: Juli 2026 s/d Juni 2027
    const academicDefs = [
      { y: 2026, m: 7 }, { y: 2026, m: 8 }, { y: 2026, m: 9 }, { y: 2026, m: 10 }, { y: 2026, m: 11 }, { y: 2026, m: 12 },
      { y: 2027, m: 1 }, { y: 2027, m: 2 }, { y: 2027, m: 3 }, { y: 2027, m: 4 }, { y: 2027, m: 5 }, { y: 2027, m: 6 }
    ];
    academicDefs.forEach(d => {
      const pad = d.m < 10 ? `0${d.m}` : `${d.m}`;
      monthSlots.push({ key: `${d.y}-${pad}`, label: `${monthNamesID[d.m - 1]} ${d.y}` });
    });
  } else if (yearFilter === "2026") {
    for (let m = 1; m <= 12; m++) {
      const pad = m < 10 ? `0${m}` : `${m}`;
      monthSlots.push({ key: `2026-${pad}`, label: `${monthNamesID[m - 1]} 2026` });
    }
  } else if (yearFilter === "2027") {
    for (let m = 1; m <= 12; m++) {
      const pad = m < 10 ? `0${m}` : `${m}`;
      monthSlots.push({ key: `2027-${pad}`, label: `${monthNamesID[m - 1]} 2027` });
    }
  } else {
    // Semua Tahun Tercatat
    const uniqueKeys = new Set();
    allHistory.forEach(r => {
      if (r.tanggal && r.tanggal.length >= 7) {
        uniqueKeys.add(r.tanggal.substring(0, 7));
      }
    });
    if (uniqueKeys.size === 0) {
      uniqueKeys.add("2026-07");
      uniqueKeys.add("2026-08");
      uniqueKeys.add("2026-09");
    }
    const sortedKeys = Array.from(uniqueKeys).sort();
    sortedKeys.forEach(k => {
      const parts = k.split('-');
      const y = parts[0];
      const m = parseInt(parts[1], 10);
      monthSlots.push({ key: k, label: `${monthNamesID[m - 1] || parts[1]} ${y}` });
    });
  }

  // Agregasi Data per Bulan
  const monthMap = {};
  monthSlots.forEach(slot => {
    monthMap[slot.key] = {
      key: slot.key,
      label: slot.label,
      takhossus: 0,
      angkatan: 0,
      totalSesi: 0,
      totalSantri: 0,
      teachers: new Set(),
      dates: new Set(),
      records: []
    };
  });

  let totalPeriodSesi = 0;
  let totalPeriodTak = 0;
  let totalPeriodAng = 0;
  let totalPeriodSantri = 0;

  allHistory.forEach(r => {
    if (!r.tanggal || r.tanggal.length < 7) return;
    const monthKey = r.tanggal.substring(0, 7);
    if (monthMap[monthKey]) {
      const entry = monthMap[monthKey];
      const isTak = r.type === "takhossus";
      if (isTak) {
        entry.takhossus++;
        totalPeriodTak++;
        const hadir = Number(r.totalHadir || 0);
        entry.totalSantri += hadir;
        totalPeriodSantri += hadir;
      } else {
        entry.angkatan++;
        totalPeriodAng++;
        const jamaah = Number(r.totalJamaah || 0);
        entry.totalSantri += jamaah;
        totalPeriodSantri += jamaah;
      }
      entry.totalSesi++;
      totalPeriodSesi++;
      if (r.namaUstadz) entry.teachers.add(r.namaUstadz.trim());
      entry.dates.add(r.tanggal);
      entry.records.push(r);
    }
  });

  // Hitung Metrik Statistik Bulanan
  const activeMonths = monthSlots.filter(s => monthMap[s.key].totalSesi > 0);
  const activeMonthsCount = activeMonths.length || (totalPeriodSesi > 0 ? 1 : 0);
  const avgSesiPerMonth = activeMonthsCount > 0 ? (totalPeriodSesi / activeMonthsCount).toFixed(1) : "0.0";
  const avgSantriPerSesi = totalPeriodSesi > 0 ? (totalPeriodSantri / totalPeriodSesi).toFixed(1) : "0";

  let peakMonth = "-";
  let peakCount = 0;
  monthSlots.forEach(s => {
    const count = monthMap[s.key].totalSesi;
    if (count > peakCount) {
      peakCount = count;
      peakMonth = s.label;
    }
  });

  // Perbarui Kartu Ringkasan Metrik
  const elTotalSesi = document.getElementById('metricMonthlyTotalSesi');
  const elTakRatio = document.getElementById('metricMonthlyTakhossusRatio');
  const elAvgSesi = document.getElementById('metricMonthlyAvgSesi');
  const elActiveMonths = document.getElementById('metricMonthlyActiveMonths');
  const elPeakMonth = document.getElementById('metricMonthlyPeakMonth');
  const elPeakCount = document.getElementById('metricMonthlyPeakCount');
  const elTotalSantri = document.getElementById('metricMonthlyTotalSantri');
  const elAvgSantri = document.getElementById('metricMonthlyAvgSantriPerSession');

  if (elTotalSesi) elTotalSesi.innerText = `${totalPeriodSesi} Sesi`;
  if (elTakRatio) elTakRatio.innerText = `${totalPeriodTak} Tak • ${totalPeriodAng} Angk`;
  if (elAvgSesi) elAvgSesi.innerText = `${avgSesiPerMonth} Sesi/Bln`;
  if (elActiveMonths) elActiveMonths.innerText = `${activeMonthsCount} Bulan Aktif`;
  if (elPeakMonth) elPeakMonth.innerText = peakCount > 0 ? peakMonth : "-";
  if (elPeakCount) elPeakCount.innerText = peakCount > 0 ? `${peakCount} Sesi Terbanyak` : "0 Sesi";
  if (elTotalSantri) elTotalSantri.innerText = `${totalPeriodSantri.toLocaleString('id-ID')} Santri`;
  if (elAvgSantri) elAvgSantri.innerText = `Rerata: ${avgSantriPerSesi} / Sesi`;

  // Siapkan Data untuk Chart.js
  const labels = monthSlots.map(s => s.label);
  const dataTakhossus = monthSlots.map(s => monthMap[s.key].takhossus);
  const dataAngkatan = monthSlots.map(s => monthMap[s.key].angkatan);
  const dataSantri = monthSlots.map(s => monthMap[s.key].totalSantri);

  const datasets = [
    {
      type: 'bar',
      label: 'Sesi Takhossus',
      data: dataTakhossus,
      backgroundColor: '#10b981', // emerald-500
      hoverBackgroundColor: '#059669',
      borderRadius: 6,
      borderSkipped: false,
      maxBarThickness: 36,
      order: 2,
      yAxisID: 'y'
    },
    {
      type: 'bar',
      label: 'Kajian Angkatan',
      data: dataAngkatan,
      backgroundColor: '#14b8a6', // teal-500
      hoverBackgroundColor: '#0d9488',
      borderRadius: 6,
      borderSkipped: false,
      maxBarThickness: 36,
      order: 3,
      yAxisID: 'y'
    }
  ];

  if (showTrendLine) {
    datasets.push({
      type: 'line',
      label: 'Akumulasi Santri Hadir',
      data: dataSantri,
      borderColor: '#f59e0b', // amber-500
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
      pointBackgroundColor: '#f59e0b',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5,
      tension: 0.35,
      fill: false,
      order: 1,
      yAxisID: 'y1'
    });
  }

  monthlyBarChartInstance = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, elements) => {
        if (elements && elements.length > 0) {
          const index = elements[0].index;
          const selectedSlot = monthSlots[index];
          if (selectedSlot) {
            handleMonthChartClick(selectedSlot);
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              family: 'Inter, system-ui, sans-serif',
              size: 11,
              weight: '600'
            },
            color: '#e2e8f0',
            padding: 12
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleFont: { family: 'Inter', size: 12, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 12,
          cornerRadius: 12,
          borderColor: 'rgba(16, 185, 129, 0.4)',
          borderWidth: 1,
          boxPadding: 4,
          callbacks: {
            title: function(context) {
              const idx = context[0].dataIndex;
              return `📅 Periode: ${monthSlots[idx]?.label || context[0].label}`;
            },
            afterBody: function(context) {
              const idx = context[0].dataIndex;
              const slot = monthSlots[idx];
              const entry = monthMap[slot?.key];
              if (!entry) return '';
              const avg = entry.totalSesi > 0 ? (entry.totalSantri / entry.totalSesi).toFixed(1) : 0;
              return [
                `-------------------------------`,
                `📊 Total Sesi   : ${entry.totalSesi} Sesi (${entry.takhossus} Tak • ${entry.angkatan} Angk)`,
                `👥 Total Santri  : ${entry.totalSantri.toLocaleString('id-ID')} Santri`,
                `📈 Rerata Hadir  : ${avg} Santri/Sesi`,
                `👨‍🏫 Pengajar Aktif: ${entry.teachers.size} Asatidz`,
                `🗓️ Hari Aktif    : ${entry.dates.size} Hari Kajian`,
                `💡 Klik batang ini untuk filter data riwayat`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          stacked: isStacked,
          grid: {
            display: false,
            color: 'rgba(255, 255, 255, 0.06)'
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 10
            },
            color: '#94a3b8',
            maxRotation: 45,
            minRotation: 0
          }
        },
        y: {
          stacked: isStacked,
          beginAtZero: true,
          position: 'left',
          title: {
            display: true,
            text: 'Jumlah Sesi Hadir',
            color: '#10b981',
            font: { size: 10, weight: 'bold' }
          },
          ticks: {
            precision: 0,
            stepSize: 1,
            font: {
              family: 'Inter',
              size: 10
            },
            color: '#cbd5e1'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.08)'
          }
        },
        y1: {
          display: showTrendLine,
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Akumulasi Santri Hadir',
            color: '#f59e0b',
            font: { size: 10, weight: 'bold' }
          },
          ticks: {
            precision: 0,
            font: {
              family: 'Inter',
              size: 10
            },
            color: '#fcd34d'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

function handleMonthChartClick(slot) {
  if (!slot || !slot.key) return;
  const parts = slot.key.split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);

  const startDate = `${parts[0]}-${parts[1]}-01`;
  const lastDay = new Date(y, m, 0).getDate();
  const lastDayStr = lastDay < 10 ? `0${lastDay}` : `${lastDay}`;
  const endDate = `${parts[0]}-${parts[1]}-${lastDayStr}`;

  const startInput = document.getElementById('guruFilterStartDate');
  const endInput = document.getElementById('guruFilterEndDate');

  if (startInput) startInput.value = startDate;
  if (endInput) endInput.value = endDate;

  renderTeacherAnalytics();
  showToast(`Menyaring absensi untuk bulan ${slot.label} (${startDate} s/d ${endDate})`, "info");

  // Scroll to summary subtab smoothly
  const summaryEl = document.getElementById('btnSubTabTeacherSummary');
  if (summaryEl) {
    summaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

let teacherBarChartInstance = null;

function renderTeacherBarChart(summaryList) {
  const canvas = document.getElementById('teacherAttendanceBarChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (teacherBarChartInstance) {
    teacherBarChartInstance.destroy();
    teacherBarChartInstance = null;
  }

  if (!summaryList || summaryList.length === 0) {
    // Tampilkan placeholder jika kosong
    teacherBarChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Belum Ada Data'],
        datasets: [{
          label: 'Sesi',
          data: [0],
          backgroundColor: '#e2e8f0'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          y: { beginAtZero: true, max: 5 }
        }
      }
    });
    return;
  }

  // Siapkan label ustadz (persingkat jika terlalu panjang untuk tampilan mobile)
  const labels = summaryList.map(item => {
    const raw = item.name || "Ustadz";
    if (raw.length > 18) {
      return raw.substring(0, 16) + '...';
    }
    return raw;
  });

  const dataTakhossus = summaryList.map(item => item.countTakhossus || 0);
  const dataAngkatan = summaryList.map(item => item.countAngkatan || 0);

  teacherBarChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Takhossus',
          data: dataTakhossus,
          backgroundColor: '#059669', // emerald-600
          hoverBackgroundColor: '#047857',
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 32
        },
        {
          label: 'Kajian Angkatan',
          data: dataAngkatan,
          backgroundColor: '#14b8a6', // teal-500
          hoverBackgroundColor: '#0d9488',
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 32
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, elements) => {
        if (elements && elements.length > 0) {
          const index = elements[0].index;
          const teacher = summaryList[index];
          if (teacher && teacher.name) {
            openTeacherProfileModal(encodeURIComponent(teacher.name));
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              family: 'Inter',
              size: 11,
              weight: '600'
            },
            color: '#334155'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          titleFont: { family: 'Inter', size: 12, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 10,
          cornerRadius: 10,
          callbacks: {
            title: function(context) {
              const idx = context[0].dataIndex;
              return summaryList[idx]?.name || context[0].label;
            },
            afterBody: function(context) {
              const idx = context[0].dataIndex;
              const item = summaryList[idx];
              if (!item) return '';
              const total = (item.countTakhossus || 0) + (item.countAngkatan || 0);
              return `Total Kehadiran: ${total} Sesi (${item.dates ? item.dates.size : 0} Hari Aktif)`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Inter',
              size: 10
            },
            color: '#64748b',
            maxRotation: 45,
            minRotation: 0
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            precision: 0,
            stepSize: 1,
            font: {
              family: 'Inter',
              size: 10
            },
            color: '#64748b'
          },
          grid: {
            color: '#f1f5f9'
          }
        }
      }
    }
  });
}

function switchTeacherSubTab(subTabId) {
  const summarySec = document.getElementById('subTabTeacherSummary');
  const chartSec = document.getElementById('subTabTeacherChart');
  const dailySec = document.getElementById('subTabTeacherDaily');
  const btnSummary = document.getElementById('btnSubTabTeacherSummary');
  const btnChart = document.getElementById('btnSubTabTeacherChart');
  const btnDaily = document.getElementById('btnSubTabTeacherDaily');

  if (summarySec) summarySec.classList.add('hidden');
  if (chartSec) chartSec.classList.add('hidden');
  if (dailySec) dailySec.classList.add('hidden');

  const inactiveClass = "py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap border-b-2 border-transparent";
  const activeClass = "py-2.5 px-4 text-xs font-bold border-b-2 border-emerald-600 text-emerald-700 whitespace-nowrap";

  if (btnSummary) btnSummary.className = inactiveClass;
  if (btnChart) btnChart.className = inactiveClass;
  if (btnDaily) btnDaily.className = inactiveClass;

  if (subTabId === 'summary') {
    if (summarySec) summarySec.classList.remove('hidden');
    if (btnSummary) btnSummary.className = activeClass;
  } else if (subTabId === 'chart') {
    if (chartSec) chartSec.classList.remove('hidden');
    if (btnChart) btnChart.className = activeClass;
  } else {
    if (dailySec) dailySec.classList.remove('hidden');
    if (btnDaily) btnDaily.className = activeClass;
  }
  renderTeacherAnalytics();
}

function renderTeacherAnalytics() {
  const startDate = document.getElementById('guruFilterStartDate').value;
  const endDate = document.getElementById('guruFilterEndDate').value;
  const selectedUstadz = document.getElementById('guruFilterSelect').value;

  const filteredRecords = appState.history.filter(item => {
    if (startDate && item.tanggal < startDate) return false;
    if (endDate && item.tanggal > endDate) return false;
    if (selectedUstadz !== "all" && item.namaUstadz !== selectedUstadz) return false;
    return true;
  });

  const summaryMap = {};
  filteredRecords.forEach(r => {
    const u = r.namaUstadz || "Tanpa Nama";
    if (!summaryMap[u]) {
      summaryMap[u] = { name: u, countTakhossus: 0, countAngkatan: 0, totalHadirSantri: 0, dates: new Set() };
    }
    if (r.type === "takhossus") {
      summaryMap[u].countTakhossus++;
      summaryMap[u].totalHadirSantri += Number(r.totalHadir || 0);
    } else {
      summaryMap[u].countAngkatan++;
      summaryMap[u].totalHadirSantri += Number(r.totalJamaah || 0);
    }
    summaryMap[u].dates.add(r.tanggal);
  });

  const summaryContainer = document.getElementById('teacherSummaryContainer');
  const summaryList = Object.values(summaryMap).sort((a, b) => (b.countTakhossus + b.countAngkatan) - (a.countTakhossus + a.countAngkatan));

  if (summaryList.length === 0) {
    summaryContainer.innerHTML = '<div class="py-6 text-center text-slate-400 text-xs">Tidak ada data kehadiran ustadz pada rentang filter ini.</div>';
  } else {
    let sHtml = "";
    summaryList.forEach((t, i) => {
      const totalSesi = t.countTakhossus + t.countAngkatan;
      const encodedName = encodeURIComponent(t.name);
      sHtml += `
        <div 
          onclick="openTeacherProfileModal('${encodedName}')"
          class="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 flex items-center justify-between cursor-pointer transition shadow-xs group"
          title="Klik untuk melihat profil lengkap & histori ${t.name}"
        >
          <div class="flex items-center gap-2.5">
            <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center group-hover:bg-amber-200 transition">${i + 1}</span>
            <div>
              <div class="text-xs font-bold text-slate-800 group-hover:text-emerald-900 transition flex items-center gap-1.5">
                ${t.name}
                <span class="text-[9px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-semibold opacity-0 group-hover:opacity-100 transition">
                  <i class="fa-solid fa-arrow-up-right-from-square text-[8px] mr-0.5"></i> Profil
                </span>
              </div>
              <div class="text-[11px] text-slate-500">${t.countTakhossus} Takhossus • ${t.countAngkatan} Kajian Angkatan</div>
            </div>
          </div>
          <div class="text-right flex items-center gap-3">
            <div>
              <span class="text-sm font-extrabold text-emerald-700">${totalSesi} Sesi Hadir</span>
              <div class="text-[10px] text-slate-400">${t.dates.size} Hari Aktif</div>
            </div>
            <div class="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-emerald-700 group-hover:border-emerald-300 flex items-center justify-center text-xs transition">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      `;
    });
    summaryContainer.innerHTML = sHtml;
  }

  const dailyMap = {};
  filteredRecords.forEach(r => {
    const d = r.tanggal || "Tanpa Tanggal";
    if (!dailyMap[d]) dailyMap[d] = [];
    dailyMap[d].push(r);
  });

  const dailyContainer = document.getElementById('teacherDailyContainer');
  const sortedDates = Object.keys(dailyMap).sort().reverse();

  if (sortedDates.length === 0) {
    dailyContainer.innerHTML = '<div class="py-6 text-center text-slate-400 text-xs">Belum ada data guru hadir pada filter tanggal ini.</div>';
  } else {
    let dHtml = "";
    sortedDates.forEach(dateStr => {
      const recordsOnDate = dailyMap[dateStr];
      const uniqueTeachers = Array.from(new Set(recordsOnDate.map(r => r.namaUstadz)));

      dHtml += `
        <div class="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-sm">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <i class="fa-regular fa-calendar-check text-emerald-600"></i> ${getIndonesianDayName(dateStr)}, ${dateStr}
            </div>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">${uniqueTeachers.length} Guru Hadir</span>
          </div>
          <div class="space-y-1.5">
            ${recordsOnDate.map(rec => {
              const encName = encodeURIComponent(rec.namaUstadz);
              return `
                <div 
                  onclick="openTeacherProfileModal('${encName}')"
                  class="flex items-center justify-between text-xs p-2 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-transparent hover:border-emerald-200 cursor-pointer transition group"
                  title="Lihat profil ${rec.namaUstadz}"
                >
                  <div class="flex items-center gap-2">
                    <i class="fa-solid fa-user-tie text-emerald-700 text-xs"></i>
                    <div>
                      <span class="font-bold text-slate-800 group-hover:text-emerald-900">${rec.namaUstadz}</span>
                      <span class="text-slate-500 text-[11px]"> (${rec.type === 'takhossus' ? 'Takhossus' : 'Angkatan'} - ${rec.kitab})</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-slate-400 font-mono">${rec.type === 'takhossus' ? (rec.sesi || 'Sore') : (rec.waktuTempat || '')}</span>
                    <i class="fa-solid fa-chevron-right text-[10px] text-slate-300 group-hover:text-emerald-600"></i>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    dailyContainer.innerHTML = dHtml;
  }

  // Render Visualisasi Grafik Batang Chart.js
  renderTeacherBarChart(summaryList);
  renderMonthlyAttendanceChart();
}

let currentActiveTeacherProfile = "";

function openTeacherProfileModal(encodedName) {
  const ustadzName = decodeURIComponent(encodedName || "").trim();
  if (!ustadzName) return;
  currentActiveTeacherProfile = ustadzName;

  const modal = document.getElementById('teacherProfileModal');
  if (!modal) return;

  // Filter all history records for this ustadz
  const ustadzRecords = (appState.history || [])
    .filter(r => (r.namaUstadz || "").trim().toLowerCase() === ustadzName.toLowerCase())
    .sort((a, b) => (b.tanggal || "").localeCompare(a.tanggal || ""));

  // Check schedules in master data
  const takSchedules = (appState.jadwalTakhossus || []).filter(j => 
    (j.ustadz || "").trim().toLowerCase() === ustadzName.toLowerCase()
  );
  const angSchedules = (appState.jadwalAngkatan || []).filter(j => 
    (j.ustadz || "").trim().toLowerCase() === ustadzName.toLowerCase()
  );

  // Statistics calculation
  const totalSesi = ustadzRecords.length;
  const takCount = ustadzRecords.filter(r => r.type === "takhossus").length;
  const angCount = ustadzRecords.filter(r => r.type === "reguler").length;
  
  let totalSantriHadir = 0;
  ustadzRecords.forEach(r => {
    if (r.type === "takhossus") {
      totalSantriHadir += Number(r.totalHadir || 0);
    } else {
      totalSantriHadir += Number(r.totalJamaah || 0);
    }
  });

  const avgSantriPerSesi = totalSesi > 0 ? (totalSantriHadir / totalSesi).toFixed(1) : "0";
  const cleanAvg = avgSantriPerSesi.endsWith(".0") ? parseInt(avgSantriPerSesi, 10) : avgSantriPerSesi;
  const uniqueDates = new Set(ustadzRecords.map(r => r.tanggal));
  const activeDays = uniqueDates.size;

  // Header & Identity
  const nameEl = document.getElementById('modalTeacherName');
  const roleBadge = document.getElementById('modalTeacherRoleBadge');
  const scheduleInfo = document.getElementById('modalTeacherScheduleInfo');

  if (nameEl) nameEl.innerText = ustadzName;

  let roleText = "Ustadz / Pengajar";
  if (takSchedules.length > 0 && angSchedules.length > 0) {
    roleText = "Pembina Takhossus & Pengajar Angkatan";
  } else if (takSchedules.length > 0) {
    roleText = "Pembina Kajian Takhossus";
  } else if (angSchedules.length > 0) {
    roleText = "Pengajar Kajian Angkatan";
  }
  if (roleBadge) roleBadge.innerText = roleText;

  const allBooks = Array.from(new Set([
    ...takSchedules.map(s => s.kitab),
    ...angSchedules.map(s => s.kitab),
    ...ustadzRecords.map(r => r.kitab)
  ].filter(Boolean)));

  if (scheduleInfo) {
    if (allBooks.length > 0) {
      scheduleInfo.innerHTML = `<i class="fa-solid fa-book-open text-amber-300 mr-1"></i> Kitab: ${allBooks.join(', ')}`;
    } else {
      scheduleInfo.innerText = "Pengajar Kajian Turats Al-Aqsha";
    }
  }

  // Stats Grid (Rata-rata performa & metrik kehadiran)
  const statsGrid = document.getElementById('modalTeacherStatsGrid');
  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 shadow-xs">
        <div class="text-[10px] text-emerald-800 font-bold uppercase tracking-wide">Total Sesi Hadir</div>
        <div class="text-lg sm:text-xl font-extrabold text-emerald-950 mt-1">${totalSesi} <span class="text-xs font-normal text-emerald-700">Sesi</span></div>
        <div class="text-[10px] text-emerald-700 mt-0.5">${takCount} Takhossus • ${angCount} Angkatan</div>
      </div>
      <div class="bg-indigo-50/80 p-3 rounded-2xl border border-indigo-200 shadow-xs">
        <div class="text-[10px] text-indigo-800 font-bold uppercase tracking-wide">Rerata Jamaah / Sesi</div>
        <div class="text-lg sm:text-xl font-extrabold text-indigo-950 mt-1">${cleanAvg} <span class="text-xs font-normal text-indigo-700">santri</span></div>
        <div class="text-[10px] text-indigo-700 mt-0.5">Rata-rata santri hadir</div>
      </div>
      <div class="bg-teal-50/80 p-3 rounded-2xl border border-teal-200 shadow-xs">
        <div class="text-[10px] text-teal-800 font-bold uppercase tracking-wide">Total Jamaah</div>
        <div class="text-lg sm:text-xl font-extrabold text-teal-950 mt-1">${totalSantriHadir} <span class="text-xs font-normal text-teal-700">santri</span></div>
        <div class="text-[10px] text-teal-700 mt-0.5">Akumulasi kehadiran</div>
      </div>
      <div class="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 shadow-xs">
        <div class="text-[10px] text-amber-800 font-bold uppercase tracking-wide">Hari Aktif Mengajar</div>
        <div class="text-lg sm:text-xl font-extrabold text-amber-950 mt-1">${activeDays} <span class="text-xs font-normal text-amber-700">Hari</span></div>
        <div class="text-[10px] text-amber-700 mt-0.5">Frekuensi tanggal mengajar</div>
      </div>
    `;
  }

  // Schedule list
  const schedList = document.getElementById('modalTeacherScheduleList');
  if (schedList) {
    const combinedSchedules = [
      ...takSchedules.map(s => ({ type: 'Takhossus', badgeClass: 'bg-emerald-100 text-emerald-800', ...s })),
      ...angSchedules.map(s => ({ type: 'Angkatan', badgeClass: 'bg-teal-100 text-teal-800', ...s }))
    ];

    if (combinedSchedules.length === 0) {
      schedList.innerHTML = `<div class="text-xs text-slate-400 italic py-1">Tidak ada jadwal tetap yang terdaftar di master data.</div>`;
    } else {
      schedList.innerHTML = combinedSchedules.map(s => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/80 gap-1.5">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-md ${s.badgeClass}">
              ${s.type}
            </span>
            <div>
              <span class="font-bold text-slate-800">${s.kitab}</span>
              <span class="text-slate-500 text-[11px]"> • ${s.tingkat || s.kelas || 'Semua Kelas'}</span>
            </div>
          </div>
          <div class="text-left sm:text-right text-[11px] font-semibold text-slate-600">
            <i class="fa-regular fa-clock text-slate-400 mr-1"></i>${s.hari || '-'} ${s.waktu ? '• ' + s.waktu : ''} ${s.tempat ? ' (' + s.tempat + ')' : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // History list
  const historyList = document.getElementById('modalTeacherHistoryList');
  const countBadge = document.getElementById('modalTeacherHistoryCountBadge');
  if (countBadge) countBadge.innerText = `${totalSesi} Sesi Tercatat`;

  if (historyList) {
    if (ustadzRecords.length === 0) {
      historyList.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-xs">
          <i class="fa-regular fa-folder-open text-3xl text-slate-300 mb-2"></i>
          <p>Belum ada rekaman histori kehadiran absensi untuk ustadz ini.</p>
        </div>
      `;
    } else {
      historyList.innerHTML = ustadzRecords.map((r, idx) => {
        const isTak = r.type === "takhossus";
        const hadirCount = isTak ? (r.totalHadir || 0) : (r.totalJamaah || 0);
        const maxSantri = isTak ? (r.totalSantri || 0) : null;
        
        return `
          <div class="p-3 bg-slate-50 hover:bg-slate-100/90 rounded-2xl border border-slate-200 transition">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-2.5">
                <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center mt-0.5 shrink-0">
                  ${idx + 1}
                </span>
                <div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${isTak ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}">
                      ${isTak ? 'Takhossus' : 'Angkatan'}
                    </span>
                    <span class="text-xs font-bold text-slate-900">${r.hari}, ${r.tanggal}</span>
                    <span class="text-[10px] text-slate-500 font-medium">(${isTak ? (r.sesi || 'Sore') : (r.waktuTempat || '')})</span>
                  </div>
                  <div class="text-xs text-emerald-900 font-semibold mt-1">
                    <i class="fa-solid fa-book-open text-[10px] mr-1 text-emerald-600"></i>${r.kitab || 'Kitab'} 
                    ${r.materi ? `<span class="text-slate-600 font-normal">• Bab: ${r.materi}</span>` : ''}
                  </div>
                  ${r.catatan ? `<div class="text-[11px] text-slate-500 mt-1 italic"><i class="fa-regular fa-comment-dots mr-1"></i>"${r.catatan}"</div>` : ''}
                </div>
              </div>
              <div class="text-right flex flex-col items-end shrink-0">
                <span class="text-xs font-extrabold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200 shadow-xs">
                  ${isTak && maxSantri ? `${hadirCount}/${maxSantri} Hadir` : `${hadirCount} Hadir`}
                </span>
                ${r.fotoBukti ? `
                  <span class="mt-1 text-[9px] text-teal-700 font-semibold flex items-center gap-1">
                    <i class="fa-solid fa-camera"></i> Foto Bukti
                  </span>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeTeacherProfileModal() {
  const modal = document.getElementById('teacherProfileModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Setup event listeners for closing modal with ESC or Backdrop click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTeacherProfileModal();
  }
});
const teacherModalBackdrop = document.getElementById('teacherProfileModal');
if (teacherModalBackdrop) {
  teacherModalBackdrop.addEventListener('click', (e) => {
    if (e.target === teacherModalBackdrop) {
      closeTeacherProfileModal();
    }
  });
}

function renderAdminSantriTable() {
  const searchVal = (document.getElementById('adminSantriSearch')?.value || "").toLowerCase();
  const body = document.getElementById('adminSantriTableBody');
  const countEl = document.getElementById('adminSantriCountText');
  if (!body) return;

  const filtered = appState.santriMaster.filter(s => {
    if (!searchVal) return true;
    return (s.nama || "").toLowerCase().includes(searchVal) || (s.tingkat || "").toLowerCase().includes(searchVal) || (s.pembina || "").toLowerCase().includes(searchVal);
  });

  if (countEl) countEl.innerText = "Total " + appState.santriMaster.length + " Santri (" + filtered.length + " Ditampilkan)";

  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-slate-400">Tidak ada data santri ditemukan.</td></tr>';
    return;
  }

  let html = "";
  filtered.forEach((s, idx) => {
    html += `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-2.5 font-mono text-slate-500">${idx + 1}</td>
        <td class="p-2.5 font-bold text-slate-800">${s.nama}</td>
        <td class="p-2.5"><span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${s.gender === 'P' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}">${s.gender || 'L'}</span></td>
        <td class="p-2.5 text-slate-600">${s.tingkat}</td>
        <td class="p-2.5 font-semibold text-emerald-800">${s.pembina}</td>
        <td class="p-2.5 text-center">
          <button onclick="deleteSantriRow(${idx})" class="text-rose-500 hover:text-rose-700 text-xs px-2 py-1"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  body.innerHTML = html;
}

function addSingleSantriManual() {
  const namaEl = document.getElementById('adminNewSantriNama');
  const nama = (namaEl?.value || "").trim();
  const gender = document.getElementById('adminNewSantriGender')?.value || "L";
  const tingkat = document.getElementById('adminNewSantriTingkat')?.value;

  if (!nama) {
    showValidationError('adminNewSantriNama', 'Nama lengkap santri wajib diisi!');
    return;
  }
  if (!tingkat) {
    showValidationError('adminNewSantriTingkat', 'Pilih tingkatan takhossus santri!');
    return;
  }

  const match = appState.santriMaster.find(s => s.tingkat === tingkat);
  const pembina = match ? match.pembina : "Pembina Takhossus";

  appState.santriMaster.push({ no: appState.santriMaster.length + 1, nama, gender, tingkat, pembina });
  saveState();
  populateDropdowns();
  renderAdminSantriTable();
  if (namaEl) namaEl.value = "";
  showToast("Santri berhasil ditambahkan!", "success");
}

function deleteSantriRow(index) {
  if (confirm("Hapus santri ini dari daftar?")) {
    appState.santriMaster.splice(index, 1);
    saveState();
    populateDropdowns();
    renderAdminSantriTable();
    showToast("Santri telah dihapus.", "info");
  }
}

function handleExcelSantriUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

      if (!jsonData || jsonData.length === 0) {
        showToast("File Excel kosong atau tidak terbaca!", "error");
        return;
      }

      const newSantriList = [];
      jsonData.forEach((row, idx) => {
        const nama = row["NAMA"] || row["Nama"] || row["nama"] || Object.values(row)[1] || "";
        const gender = row["JENIS KELAMIN"] || row["Gender"] || row["gender"] || "L";
        const tingkat = row["TINGKAT TAKHOSSUS"] || row["Tingkat"] || row["tingkat"] || "1 PUTRA (Ula)";
        const pembina = row["PEMBINA TAKHOSSUS"] || row["Pembina"] || row["pembina"] || "Pembina";

        if (nama && String(nama).trim().length > 1) {
          newSantriList.push({
            no: idx + 1,
            nama: String(nama).trim(),
            gender: String(gender).trim().toUpperCase().startsWith("P") ? "P" : "L",
            tingkat: String(tingkat).trim(),
            pembina: String(pembina).trim()
          });
        }
      });

      if (newSantriList.length > 0) {
        appState.santriMaster = newSantriList;
        saveState();
        populateDropdowns();
        renderAdminSantriTable();
        showToast("Berhasil mengimpor " + newSantriList.length + " santri dari Excel!", "success");
      } else {
        showToast("Format kolom Excel tidak sesuai!", "error");
      }
    } catch (err) {
      console.error("Excel import error:", err);
      showToast("Gagal membaca file Excel: " + err.message, "error");
    }
  };
  reader.readAsArrayBuffer(file);
}

function exportSantriMasterToExcel() {
  const ws = XLSX.utils.json_to_sheet(appState.santriMaster.map(s => ({
    "NO": s.no,
    "NAMA": s.nama,
    "JENIS KELAMIN": s.gender,
    "TINGKAT TAKHOSSUS": s.tingkat,
    "PEMBINA TAKHOSSUS": s.pembina
  })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Santri TDK");
  XLSX.writeFile(wb, "Data_Santri_Takhossus_AlAqsha.xlsx");
}

function renderAdminJadwalTakhossus() {
  const body = document.getElementById('adminJadwalTakhossusBody');
  if (!body) return;

  let html = "";
  appState.jadwalTakhossus.forEach((j, i) => {
    html += `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-2.5 font-bold text-slate-800">${j.tingkat}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">${j.hari}</span></td>
        <td class="p-2.5 text-slate-700">${j.kitab}</td>
        <td class="p-2.5 text-slate-800 font-medium">${j.ustadz}</td>
        <td class="p-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button onclick="openEditJadwalTakhossusModal(${i})" class="p-1 text-indigo-600 hover:text-indigo-800 transition" title="Edit Jadwal"><i class="fa-solid fa-pen-to-square text-xs"></i></button>
            <button onclick="deleteJadwalTakhossusRow(${i})" class="p-1 text-rose-500 hover:text-rose-700 text-xs" title="Hapus Jadwal"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
  body.innerHTML = html;
}

function deleteJadwalTakhossusRow(idx) {
  if (confirm("Hapus jadwal takhossus ini?")) {
    appState.jadwalTakhossus.splice(idx, 1);
    saveState();
    renderAdminJadwalTakhossus();
    showToast("Jadwal Takhossus dihapus.", "info");
  }
}

function renderAdminJadwalAngkatan() {
  const body = document.getElementById('adminJadwalAngkatanBody');
  if (!body) return;

  let html = "";
  appState.jadwalAngkatan.forEach((j, i) => {
    const cap = j.kapasitas || getAngkatanClassCapacity(j.kelas, j.ustadz);
    html += `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-2.5 font-bold text-slate-800">${j.kelas}</td>
        <td class="p-2.5 font-bold text-teal-700">
          <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 rounded-lg text-[11px] inline-flex items-center gap-1">
            <i class="fa-solid fa-users text-teal-600 text-[10px]"></i> ${cap} Santri
          </span>
        </td>
        <td class="p-2.5 text-teal-800 font-bold">${j.kitab}</td>
        <td class="p-2.5 text-slate-800 font-semibold">${j.ustadz}</td>
        <td class="p-2.5 text-slate-600">${j.waktu}</td>
        <td class="p-2.5 text-slate-500 text-[11px]">${j.tempat || '-'}</td>
        <td class="p-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button onclick="openEditJadwalAngkatanModal(${i})" class="p-1 text-teal-600 hover:text-teal-800 transition" title="Edit Jadwal"><i class="fa-solid fa-pen-to-square text-xs"></i></button>
            <button onclick="deleteJadwalAngkatanRow(${i})" class="p-1 text-rose-500 hover:text-rose-700 text-xs" title="Hapus Jadwal"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
  body.innerHTML = html;
}

function deleteJadwalAngkatanRow(idx) {
  if (confirm("Hapus jadwal angkatan ini?")) {
    appState.jadwalAngkatan.splice(idx, 1);
    saveState();
    populateDropdowns();
    renderAdminJadwalAngkatan();
    showToast("Jadwal Angkatan dihapus.", "info");
  }
}

function renderAdminUstadzList() {
  const takList = document.getElementById('adminListPembinaTakhossus');
  const angList = document.getElementById('adminListPengajarAngkatan');

  if (takList) {
    const pemSet = new Set([
      ...appState.santriMaster.map(s => s.pembina),
      ...(appState.ustadzList || []).filter(u => u.peran === 'takhossus' || u.peran === 'both').map(u => u.nama)
    ].filter(Boolean));
    takList.innerHTML = Array.from(pemSet).sort().map(u => `<li class="p-2 bg-white rounded-xl border border-slate-200 font-medium flex items-center justify-between text-xs"><span><i class="fa-solid fa-user-check text-emerald-600 mr-1.5"></i>${u}</span></li>`).join("");
  }

  if (angList) {
    const pengSet = new Set([
      ...appState.jadwalAngkatan.map(j => j.ustadz),
      ...(appState.ustadzList || []).filter(u => u.peran === 'angkatan' || u.peran === 'both').map(u => u.nama)
    ].filter(Boolean));
    angList.innerHTML = Array.from(pengSet).sort().map(u => `<li class="p-2 bg-white rounded-xl border border-slate-200 font-medium flex items-center justify-between text-xs"><span><i class="fa-solid fa-chalkboard-user text-teal-600 mr-1.5"></i>${u}</span></li>`).join("");
  }
}

// ==============================================================================
// MODUL SISTEM DETEKSI ANOMALI & AUDIT INTEGRITAS DATA OTOMATIS
// ==============================================================================

let cachedAnomalies = [];

function detectDataAnomalies() {
  const anomalies = [];
  const allHistory = appState.history || [];
  const santriMaster = appState.santriMaster || [];

  // Hitung jumlah master santri per tingkatan
  const masterCountByTingkat = {};
  santriMaster.forEach(s => {
    if (s.tingkat) {
      masterCountByTingkat[s.tingkat] = (masterCountByTingkat[s.tingkat] || 0) + 1;
    }
  });

  // 1. Kelompokkan untuk mendeteksi Duplikasi Data pada tanggal & sesi sama
  const duplicatesMap = {};

  allHistory.forEach(r => {
    if (!r.tanggal) return;

    const subTarget = r.type === "takhossus" ? (r.tingkat || "").trim().toLowerCase() : (r.kelas || "").trim().toLowerCase();
    const timeSlot = r.type === "takhossus" ? (r.sesi || "").trim().toLowerCase() : (r.waktuTempat || "").trim().toLowerCase();
    const ustadzNorm = (r.namaUstadz || "").trim().toLowerCase();

    // Group key untuk duplikasi kelas/sesi
    const groupKey = `${r.tanggal}__${r.type}__${subTarget}__${timeSlot}`;
    if (!duplicatesMap[groupKey]) duplicatesMap[groupKey] = [];
    duplicatesMap[groupKey].push(r);

    // Group key untuk ustadz yang sama di jam/tanggal yang sama
    if (ustadzNorm && ustadzNorm !== "tanpa nama") {
      const ustadzGroupKey = `ustadz__${r.tanggal}__${ustadzNorm}__${timeSlot}`;
      if (!duplicatesMap[ustadzGroupKey]) duplicatesMap[ustadzGroupKey] = [];
      duplicatesMap[ustadzGroupKey].push(r);
    }
  });

  const duplicateRecordIdSet = new Set();
  const duplicateGroupPairs = [];

  Object.entries(duplicatesMap).forEach(([key, group]) => {
    const uniqueRecords = [];
    const seenIds = new Set();
    group.forEach(item => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueRecords.push(item);
      }
    });

    if (uniqueRecords.length > 1) {
      duplicateGroupPairs.push(uniqueRecords);
      uniqueRecords.forEach(item => duplicateRecordIdSet.add(item.id));
    }
  });

  // 2. Evaluasi setiap record riwayat absensi
  allHistory.forEach((r, idx) => {
    const isTak = r.type === "takhossus";
    const recordId = r.id || `rec_${idx}`;
    const tanggal = r.tanggal || "";
    const ustadz = (r.namaUstadz || "").trim();
    const kitab = (r.kitab || "").trim();

    // A. ANOMALI DUPLIKASI DATA PADA TANGGAL SAMA
    if (duplicateRecordIdSet.has(recordId)) {
      const partnerGroup = duplicateGroupPairs.find(g => g.some(item => item.id === recordId)) || [];
      const duplicateCount = partnerGroup.length;
      
      anomalies.push({
        id: `anom_dup_${recordId}`,
        recordId: recordId,
        record: r,
        category: "duplicate",
        categoryLabel: "Duplikasi Sesi Absensi",
        severity: "kritis",
        severityLabel: "Kritis",
        title: `Data Ganda pada Tanggal ${tanggal}`,
        description: `Ditemukan ${duplicateCount} catatan absensi ganda untuk ${ustadz || 'Ustadz'} (${kitab || 'Kitab'} - ${isTak ? (r.tingkat || '') : (r.kelas || '')}) pada tanggal dan sesi yang sama.`,
        suggestedFix: "Hapus salah satu entri duplikat atau ubah tanggal/sesi jika merupakan pertemuan berbeda.",
        duplicatePartnerIds: partnerGroup.map(item => item.id).filter(id => id !== recordId)
      });
    }

    // B. ANOMALI KUOTA KELAS TERLAMPAUI (JUMLAH HADIR MELEBIHI KUOTA)
    if (isTak) {
      const hadir = Number(r.totalHadir ?? 0);
      const totalSantriRec = Number(r.totalSantri ?? 0);
      const masterCount = masterCountByTingkat[r.tingkat] || 0;
      const effectiveCap = totalSantriRec > 0 ? totalSantriRec : (masterCount > 0 ? masterCount : 15);

      if (hadir > effectiveCap && effectiveCap > 0) {
        anomalies.push({
          id: `anom_cap_${recordId}`,
          recordId: recordId,
          record: r,
          category: "over_capacity",
          categoryLabel: "Kelebihan Kuota Santri",
          severity: "kritis",
          severityLabel: "Kritis",
          title: `Jumlah Hadir (${hadir}) Melebihi Kuota (${effectiveCap})`,
          description: `Jumlah santri hadir sebanyak ${hadir} santri melebihi kuota terdaftar (${effectiveCap} santri) untuk tingkatan ${r.tingkat || 'Takhossus'}.`,
          suggestedFix: "Koreksi angka kehadiran atau perbarui kuota master santri di menu Edit Santri.",
          currentValue: hadir,
          expectedMax: effectiveCap
        });
      } else if (hadir < 0) {
        anomalies.push({
          id: `anom_neg_${recordId}`,
          recordId: recordId,
          record: r,
          category: "over_capacity",
          categoryLabel: "Nilai Kehadiran Negatif",
          severity: "kritis",
          severityLabel: "Kritis",
          title: `Angka Kehadiran Tidak Valid (${hadir})`,
          description: `Jumlah kehadiran santri tidak boleh bernilai negatif.`,
          suggestedFix: "Koreksi nilai kehadiran santri menjadi 0 atau angka positif yang sesuai.",
          currentValue: hadir
        });
      }
    } else {
      // Program Kajian Angkatan
      const jamaah = Number(r.totalJamaah ?? 0);
      const normalCap = 45;

      if (jamaah > 60) {
        anomalies.push({
          id: `anom_cap_reg_${recordId}`,
          recordId: recordId,
          record: r,
          category: "over_capacity",
          categoryLabel: "Estimasi Kuota Terlampaui",
          severity: "peringatan",
          severityLabel: "Peringatan",
          title: `Jumlah Jamaah (${jamaah}) Tidak Wajar`,
          description: `Jumlah santri jamaah ${jamaah} orang melebihi batas kapasitas wajar per kelas (${normalCap} santri) untuk kelas ${r.kelas || 'Angkatan'}.`,
          suggestedFix: "Pastikan tidak ada salah ketik penambahan angka nol atau penggabungan kelas.",
          currentValue: jamaah,
          expectedMax: normalCap
        });
      } else if (jamaah < 0) {
        anomalies.push({
          id: `anom_neg_reg_${recordId}`,
          recordId: recordId,
          record: r,
          category: "over_capacity",
          categoryLabel: "Nilai Kehadiran Negatif",
          severity: "kritis",
          severityLabel: "Kritis",
          title: `Angka Jamaah Tidak Valid (${jamaah})`,
          description: `Jumlah jamaah tidak boleh bernilai negatif.`,
          suggestedFix: "Sesuaikan jumlah jamaah yang hadir.",
          currentValue: jamaah
        });
      }
    }

    // C. ANOMALI DATA KOSONG / KEHADIRAN 0 TANPA KETERANGAN
    const hadirNum = isTak ? Number(r.totalHadir ?? 0) : Number(r.totalJamaah ?? 0);
    const hasCatatan = r.catatan && r.catatan.trim().length > 3;
    const hasIzinSakit = isTak && (Number(r.totalIzin || 0) > 0 || Number(r.totalSakit || 0) > 0);

    if (hadirNum === 0 && !hasCatatan && !hasIzinSakit) {
      anomalies.push({
        id: `anom_zero_${recordId}`,
        recordId: recordId,
        record: r,
        category: "zero_or_empty",
        categoryLabel: "Kehadiran Nol Tanpa Keterangan",
        severity: "peringatan",
        severityLabel: "Peringatan",
        title: `Kehadiran Tercatat 0 Santri`,
        description: `Sesi kajian tercatat dengan 0 santri hadir tanpa adanya catatan alasan/keterangan pembatalan atau data izin/sakit.`,
        suggestedFix: "Tambahkan catatan keterangan sesi atau sesuaikan jumlah hadir santri yang sebenarnya."
      });
    }

    // D. DATA ESENSIAL TIDAK LENGKAP
    if (!ustadz || ustadz === "Tanpa Nama" || !kitab || !tanggal) {
      anomalies.push({
        id: `anom_empty_${recordId}`,
        recordId: recordId,
        record: r,
        category: "zero_or_empty",
        categoryLabel: "Data Esensial Tidak Lengkap",
        severity: "info",
        severityLabel: "Info",
        title: `Identitas Sesi Belum Lengkap`,
        description: `Nama ustadz pengajar atau kitab yang dikaji belum diisi dengan lengkap.`,
        suggestedFix: "Lengkapi nama ustadz pengampu dan nama kitab turats."
      });
    }

    // E. ANOMALI TANGGAL MASA DEPAN / DI LUAR TAHUN AJARAN
    if (tanggal) {
      if (tanggal > "2027-07-31" || tanggal < "2025-01-01") {
        anomalies.push({
          id: `anom_date_${recordId}`,
          recordId: recordId,
          record: r,
          category: "future_date",
          categoryLabel: "Tanggal Tidak Sesuai",
          severity: "peringatan",
          severityLabel: "Peringatan",
          title: `Tanggal di Luar Tahun Ajaran (${tanggal})`,
          description: `Tanggal sesi (${tanggal}) berada di luar rentang kalender akademik Tahun Ajaran 2026/2027.`,
          suggestedFix: "Perbaiki tanggal sesuai waktu pelaksanaan kajian riil."
        });
      }
    }
  });

  return anomalies;
}

function runDataAnomalyCheck(showFeedbackToast = false) {
  cachedAnomalies = detectDataAnomalies();
  const totalChecked = (appState.history || []).length;
  const totalFound = cachedAnomalies.length;
  const overCapCount = cachedAnomalies.filter(a => a.category === "over_capacity").length;
  const duplicateCount = cachedAnomalies.filter(a => a.category === "duplicate").length;
  const validRatio = totalChecked > 0 ? Math.max(0, Math.round(((totalChecked - totalFound) / totalChecked) * 100)) : 100;

  // Update Badges & Counters
  const dotEl = document.getElementById('navAdminAnomalyDot');
  if (dotEl) {
    if (totalFound > 0) dotEl.classList.remove('hidden');
    else dotEl.classList.add('hidden');
  }

  const pillBadge = document.getElementById('adminAnomalyBadgeCount');
  if (pillBadge) {
    if (totalFound > 0) {
      pillBadge.innerText = totalFound;
      pillBadge.classList.remove('hidden');
    } else {
      pillBadge.classList.add('hidden');
    }
  }

  // Update Summary Cards
  const elTotalChecked = document.getElementById('anomalyStatTotalChecked');
  const elTotalValid = document.getElementById('anomalyStatTotalValid');
  const elTotalFound = document.getElementById('anomalyStatTotalFound');
  const elStatusSummary = document.getElementById('anomalyStatStatusSummary');
  const elOverCap = document.getElementById('anomalyStatOverCapacity');
  const elDuplicates = document.getElementById('anomalyStatDuplicates');

  if (elTotalChecked) elTotalChecked.innerText = `${totalChecked} Sesi`;
  if (elTotalValid) elTotalValid.innerText = `${Math.max(0, totalChecked - totalFound)} Valid (${validRatio}%)`;
  if (elTotalFound) elTotalFound.innerText = `${totalFound}`;
  if (elStatusSummary) {
    elStatusSummary.innerText = totalFound === 0 ? "100% Data Bersih" : `${totalFound} Perlu Ditinjau`;
  }
  if (elOverCap) elOverCap.innerText = `${overCapCount}`;
  if (elDuplicates) elDuplicates.innerText = `${duplicateCount}`;

  // Enable / Disable Clean Duplicates Button
  const btnClean = document.getElementById('btnCleanDuplicates');
  if (btnClean) {
    btnClean.disabled = duplicateCount === 0;
  }

  // Render Banner Notifikasi Otomatis
  renderAnomalyAlertBanner(cachedAnomalies);

  // Render List Anomali
  renderAnomalyList();

  if (showFeedbackToast) {
    if (totalFound === 0) {
      showToast("Pemindaian Integritas Data Selesai: 100% data absensi valid tanpa anomali!", "success");
    } else {
      showToast(`Peringatan: Ditemukan ${totalFound} ketidakwajaran data (anomali) pada riwayat absensi.`, "warning");
    }
  }
}

function renderAnomalyAlertBanner(anomalies) {
  const banner = document.getElementById('adminAnomalyAlertBanner');
  if (!banner) return;

  if (!anomalies || anomalies.length === 0) {
    banner.classList.remove('hidden');
    banner.innerHTML = `
      <div class="p-3.5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-300/80 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base font-bold shrink-0">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span>Integritas Data Sempurna (100% Valid)</span>
              <span class="text-[9px] px-2 py-0.2 bg-emerald-200/70 text-emerald-800 rounded-full font-bold">Auto-Audit Aktif</span>
            </div>
            <p class="text-[11px] text-emerald-800/80 mt-0.5">Seluruh catatan kehadiran santri dan jadwal asatidz tervalidasi tanpa duplikasi atau kelebihan kuota.</p>
          </div>
        </div>
        <button 
          type="button" 
          onclick="runDataAnomalyCheck(true)" 
          class="shrink-0 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1"
        >
          <i class="fa-solid fa-rotate text-[10px]"></i> Scan Ulang
        </button>
      </div>
    `;
    return;
  }

  const overCapCount = anomalies.filter(a => a.category === "over_capacity").length;
  const dupCount = anomalies.filter(a => a.category === "duplicate").length;
  const otherCount = anomalies.length - overCapCount - dupCount;

  banner.classList.remove('hidden');
  banner.innerHTML = `
    <div class="p-4 bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 text-white rounded-2xl shadow-lg border border-rose-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-xl text-amber-200 shrink-0 shadow-inner">
          <i class="fa-solid fa-triangle-exclamation animate-bounce"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">
              Peringatan Integritas: ${anomalies.length} Ketidakwajaran Data Ditemukan!
            </h3>
            <span class="text-[9px] px-2 py-0.5 bg-rose-950/40 border border-white/20 text-amber-200 rounded-full font-bold">
              Perlu Tindakan Admin
            </span>
          </div>
          <p class="text-[11px] text-amber-100 mt-1">
            Terdeteksi: <b>${overCapCount}</b> kelebihan kuota santri, <b>${dupCount}</b> data ganda di hari sama, dan <b>${otherCount}</b> data tidak lengkap.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
        <button 
          type="button" 
          onclick="switchAdminSection('anomali')" 
          class="px-3.5 py-2 bg-white text-rose-900 text-xs font-bold rounded-xl shadow hover:bg-amber-50 transition flex items-center gap-1.5 active:scale-95"
        >
          <i class="fa-solid fa-wrench text-rose-700"></i> Tinjau & Perbaiki Sekarang
        </button>
      </div>
    </div>
  `;
}

function renderAnomalyList() {
  const container = document.getElementById('adminAnomalyListContainer');
  if (!container) return;

  const categoryFilter = document.getElementById('anomalyFilterCategory')?.value || "all";
  
  let list = cachedAnomalies;
  if (categoryFilter !== "all") {
    list = cachedAnomalies.filter(a => a.category === categoryFilter);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mx-auto mb-2.5">
          <i class="fa-solid fa-shield-check"></i>
        </div>
        <h4 class="text-sm font-bold text-slate-800">Tidak Ditemukan Anomali untuk Kategori Ini</h4>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Seluruh catatan kehadiran pada kategori terpilih dalam kondisi valid dan sesuai kuota master data.</p>
      </div>
    `;
    return;
  }

  let html = "";
  list.forEach((anom, idx) => {
    const r = anom.record;
    const isTak = r.type === "takhossus";
    const hadirStr = isTak ? `${r.totalHadir}/${r.totalSantri || '-'} Santri` : `${r.totalJamaah || 0} Santri`;

    let sevBadge = "bg-rose-100 text-rose-800 border-rose-200";
    let iconClass = "fa-solid fa-circle-exclamation text-rose-600";
    if (anom.severity === "peringatan") {
      sevBadge = "bg-amber-100 text-amber-800 border-amber-200";
      iconClass = "fa-solid fa-triangle-exclamation text-amber-600";
    } else if (anom.severity === "info") {
      sevBadge = "bg-blue-100 text-blue-800 border-blue-200";
      iconClass = "fa-solid fa-circle-info text-blue-600";
    }

    html += `
      <div class="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs transition space-y-2.5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${sevBadge}">
              <i class="${iconClass}"></i> ${anom.severityLabel.toUpperCase()}
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              ${anom.categoryLabel}
            </span>
            <span class="text-xs font-bold text-slate-900">${anom.title}</span>
          </div>
          <span class="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <i class="fa-regular fa-calendar text-slate-400"></i> ${r.tanggal || '-'} (${r.hari || ''})
          </span>
        </div>

        <div class="text-xs text-slate-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
          <div class="font-semibold text-rose-950 flex items-start gap-1.5">
            <i class="fa-solid fa-circle-dot text-[10px] text-rose-500 mt-1 shrink-0"></i>
            <span>${anom.description}</span>
          </div>
          <div class="text-[11px] text-slate-600 mt-1.5 flex items-center gap-1.5 pl-4">
            <i class="fa-solid fa-lightbulb text-amber-500"></i>
            <span>Saran Perbaikan: <b>${anom.suggestedFix}</b></span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
          <div class="flex items-center gap-3 text-slate-600 flex-wrap">
            <span><i class="fa-solid fa-user-tie text-emerald-700 mr-1"></i><b>${r.namaUstadz || 'Tanpa Nama'}</b></span>
            <span><i class="fa-solid fa-book-open text-teal-700 mr-1"></i>${r.kitab || '-'}</span>
            <span><i class="fa-solid fa-users text-indigo-700 mr-1"></i>Hadir: <b class="text-slate-800">${hadirStr}</b></span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded ${isTak ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}">
              ${isTak ? (r.tingkat || 'Takhossus') : (r.kelas || 'Angkatan')}
            </span>
          </div>

          <div class="flex items-center gap-2 justify-end">
            ${anom.category === "duplicate" ? `
              <button 
                type="button" 
                onclick="deleteSingleDuplicateRecord('${anom.recordId}')" 
                class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1"
                title="Hapus record duplikat ini"
              >
                <i class="fa-solid fa-trash-can text-[10px]"></i> Hapus Duplikat
              </button>
            ` : ''}
            <button 
              type="button" 
              onclick="openAnomalyFixModal('${anom.id}', '${anom.recordId}')" 
              class="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <i class="fa-solid fa-pen-to-square text-[10px]"></i> Perbaiki Data
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openAnomalyFixModal(anomalyId, recordId) {
  const modal = document.getElementById('adminAnomalyFixModal');
  if (!modal) return;

  const record = (appState.history || []).find(r => r.id === recordId);
  if (!record) {
    showToast("Data record absensi tidak ditemukan!", "error");
    return;
  }

  const anom = cachedAnomalies.find(a => a.id === anomalyId) || cachedAnomalies.find(a => a.recordId === recordId);
  const isTak = record.type === "takhossus";

  const elId = document.getElementById('anomalyFixRecordId');
  const elType = document.getElementById('anomalyFixType');
  const elTanggal = document.getElementById('anomalyFixTanggal');
  const elProgram = document.getElementById('anomalyFixProgram');
  const elUstadz = document.getElementById('anomalyFixUstadz');
  const elKitab = document.getElementById('anomalyFixKitab');
  const elTotalHadir = document.getElementById('anomalyFixTotalHadir');
  const elTotalSantri = document.getElementById('anomalyFixTotalSantri');
  const elCatatan = document.getElementById('anomalyFixCatatan');
  const elProblemBox = document.getElementById('anomalyModalProblemBox');
  const elHadirLabel = document.getElementById('anomalyFixHadirLabel');
  const elCapLabel = document.getElementById('anomalyFixCapacityLabel');

  if (elId) elId.value = record.id;
  if (elType) elType.value = record.type || "takhossus";
  if (elTanggal) elTanggal.value = record.tanggal || "";
  if (elProgram) elProgram.value = isTak ? `Takhossus (${record.tingkat || ''})` : `Kajian Angkatan (${record.kelas || ''})`;
  if (elUstadz) elUstadz.value = record.namaUstadz || "";
  if (elKitab) elKitab.value = record.kitab || "";
  if (elCatatan) elCatatan.value = record.catatan || "";

  if (isTak) {
    if (elHadirLabel) elHadirLabel.innerText = "Jumlah Santri Hadir";
    if (elCapLabel) elCapLabel.innerText = "Total Kuota Santri Kelas";
    if (elTotalHadir) elTotalHadir.value = record.totalHadir ?? 0;
    if (elTotalSantri) elTotalSantri.value = record.totalSantri ?? 15;
  } else {
    if (elHadirLabel) elHadirLabel.innerText = "Jumlah Jamaah Hadir";
    if (elCapLabel) elCapLabel.innerText = "Estimasi Kapasitas";
    if (elTotalHadir) elTotalHadir.value = record.totalJamaah ?? 0;
    if (elTotalSantri) elTotalSantri.value = 45;
  }

  if (elProblemBox) {
    if (anom) {
      elProblemBox.innerHTML = `
        <div class="font-bold text-rose-950 flex items-center gap-1.5">
          <i class="fa-solid fa-triangle-exclamation text-rose-600"></i> ${anom.title}
        </div>
        <div class="text-[11px] text-rose-800 mt-1">${anom.description}</div>
      `;
    } else {
      elProblemBox.innerHTML = `
        <div class="text-xs text-slate-700">Sesuaikan formulir di bawah ini untuk memperbaiki data.</div>
      `;
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAnomalyFixModal() {
  const modal = document.getElementById('adminAnomalyFixModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveAnomalyFixChanges() {
  const recordId = document.getElementById('anomalyFixRecordId')?.value;
  if (!recordId) return;

  const idx = (appState.history || []).findIndex(r => r.id === recordId);
  if (idx === -1) {
    showToast("Record tidak ditemukan!", "error");
    return;
  }

  const record = appState.history[idx];
  const isTak = record.type === "takhossus";

  const newTanggal = document.getElementById('anomalyFixTanggal')?.value || record.tanggal;
  const newUstadz = (document.getElementById('anomalyFixUstadz')?.value || "").trim();
  const newKitab = (document.getElementById('anomalyFixKitab')?.value || "").trim();
  const newHadir = Number(document.getElementById('anomalyFixTotalHadir')?.value || 0);
  const newTotalSantri = Number(document.getElementById('anomalyFixTotalSantri')?.value || 0);
  const newCatatan = (document.getElementById('anomalyFixCatatan')?.value || "").trim();

  if (!newUstadz) {
    showToast("Nama Ustadz tidak boleh kosong!", "warning");
    return;
  }
  if (!newKitab) {
    showToast("Nama Kitab tidak boleh kosong!", "warning");
    return;
  }
  if (newHadir < 0) {
    showToast("Angka kehadiran tidak boleh negatif!", "warning");
    return;
  }

  // Update properties
  record.tanggal = newTanggal;
  record.namaUstadz = newUstadz;
  record.kitab = newKitab;
  record.catatan = newCatatan;

  if (isTak) {
    record.totalHadir = newHadir;
    record.totalSantri = newTotalSantri > 0 ? newTotalSantri : record.totalSantri;
  } else {
    record.totalJamaah = newHadir;
  }

  saveState();
  closeAnomalyFixModal();
  runDataAnomalyCheck(false);
  renderDashboardStats();
  renderTeacherAnalytics();
  showToast("Perbaikan data absensi berhasil disimpan!", "success");
}

function deleteRecordFromAnomalyModal() {
  const recordId = document.getElementById('anomalyFixRecordId')?.value;
  if (!recordId) return;

  if (confirm("Apakah Anda yakin ingin menghapus data absensi ini secara permanen?")) {
    appState.history = (appState.history || []).filter(r => r.id !== recordId);
    saveState();
    closeAnomalyFixModal();
    runDataAnomalyCheck(false);
    renderDashboardStats();
    renderTeacherAnalytics();
    showToast("Data absensi bermasalah berhasil dihapus.", "info");
  }
}

function deleteSingleDuplicateRecord(recordId) {
  if (confirm("Hapus entri duplikat ini dari daftar riwayat absensi?")) {
    appState.history = (appState.history || []).filter(r => r.id !== recordId);
    saveState();
    runDataAnomalyCheck(false);
    renderDashboardStats();
    renderTeacherAnalytics();
    showToast("Satu entri duplikat berhasil dihapus.", "success");
  }
}

function autoCleanAllDuplicateRecords() {
  const duplicateAnoms = cachedAnomalies.filter(a => a.category === "duplicate");
  if (duplicateAnoms.length === 0) {
    showToast("Tidak ada data ganda (duplikat) yang perlu dibersihkan!", "info");
    return;
  }

  const dupGroups = {};
  duplicateAnoms.forEach(a => {
    const r = a.record;
    const subTarget = r.type === "takhossus" ? (r.tingkat || "") : (r.kelas || "");
    const timeSlot = r.type === "takhossus" ? (r.sesi || "") : (r.waktuTempat || "");
    const key = `${r.tanggal}__${r.type}__${subTarget}__${timeSlot}__${r.namaUstadz}`;
    if (!dupGroups[key]) dupGroups[key] = [];
    dupGroups[key].push(r.id);
  });

  const idsToRemove = new Set();
  Object.values(dupGroups).forEach(group => {
    // Sisakan elemen pertama, hapus sisanya
    if (group.length > 1) {
      group.slice(1).forEach(id => idsToRemove.add(id));
    }
  });

  if (idsToRemove.size === 0) {
    showToast("Tidak ada duplikasi identik yang dapat dibersihkan otomatis.", "info");
    return;
  }

  if (confirm(`Sistem mendeteksi ${idsToRemove.size} entri rekaman duplikat. Bersihkan semua entri duplikat dan pertahankan 1 entri utama?`)) {
    appState.history = (appState.history || []).filter(r => !idsToRemove.has(r.id));
    saveState();
    runDataAnomalyCheck(true);
    renderDashboardStats();
    renderTeacherAnalytics();
    showToast(`Berhasil membersihkan ${idsToRemove.size} rekaman duplikat otomatis!`, "success");
  }
}

function exportAnomalyAuditToCSV() {
  if (cachedAnomalies.length === 0) {
    showToast("Tidak ada data anomali untuk diekspor!", "info");
    return;
  }

  const rows = [
    ["No", "Tanggal", "Tingkat Keparahan", "Kategori Anomali", "Judul Masalah", "Ustadz", "Kitab", "Program/Kelas", "Deskripsi Masalah", "Saran Perbaikan"]
  ];

  cachedAnomalies.forEach((a, idx) => {
    const r = a.record;
    const prog = r.type === "takhossus" ? `Takhossus (${r.tingkat || ''})` : `Angkatan (${r.kelas || ''})`;
    rows.push([
      idx + 1,
      r.tanggal || "-",
      a.severityLabel,
      a.categoryLabel,
      a.title,
      r.namaUstadz || "-",
      r.kitab || "-",
      prog,
      a.description,
      a.suggestedFix
    ]);
  });

  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(i => `"${String(i).replace(/"/g, '""')}"`).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Laporan_Audit_Anomali_Data_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Laporan audit anomali berhasil diekspor ke CSV.", "success");
}

function resetAllMasterDataToDefault() {
  if (confirm("Kembalikan semua data master santri & jadwal ke data PDF bawaan?")) {
    appState.santriMaster = DEFAULT_SANTRI_MASTER;
    appState.jadwalTakhossus = DEFAULT_JADWAL_TAKHOUSUS;
    appState.jadwalAngkatan = DEFAULT_JADWAL_ANGKATAN;
    saveState();
    populateDropdowns();
    renderAdminSantriTable();
    renderAdminJadwalTakhossus();
    renderAdminJadwalAngkatan();
    renderAdminUstadzList();
    showToast("Data master berhasil direset ke standar PDF.", "success");
  }
}

function exportHistoryToCSV() {
  const recordsToExport = (window._currentFilteredHistory !== undefined && window._currentFilteredHistory !== null) 
    ? window._currentFilteredHistory 
    : appState.history;

  if (!recordsToExport || recordsToExport.length === 0) {
    showToast("Belum ada data riwayat untuk diekspor!", "info");
    return;
  }

  const rows = [
    ["ID", "Kategori", "Tanggal", "Hari", "Ustadz", "Kitab", "Materi", "Total Hadir", "Total Santri/Jamaah", "Catatan"]
  ];

  recordsToExport.forEach(h => {
    rows.push([
      h.id,
      h.type,
      h.tanggal,
      h.hari,
      h.namaUstadz,
      h.kitab,
      h.materi || "-",
      h.totalHadir,
      h.type === "takhossus" ? h.totalSantri : h.totalJamaah,
      h.catatan || "-"
    ]);
  });

  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(i => `"${String(i).replace(/"/g, '""')}"`).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Log_Absensi_Turats_" + new Date().toISOString().slice(0, 10) + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (recordsToExport.length < appState.history.length) {
    showToast(`Mengekspor ${recordsToExport.length} data riwayat (sesuai filter aktif).`, "success");
  } else {
    showToast(`Mengekspor semua (${recordsToExport.length}) data riwayat.`, "success");
  }
}

function exportTeacherRecapToCSV() {
  const summaryMap = {};
  appState.history.forEach(r => {
    const u = r.namaUstadz || "Tanpa Nama";
    if (!summaryMap[u]) summaryMap[u] = { name: u, countTakhossus: 0, countAngkatan: 0, totalSesi: 0 };
    if (r.type === "takhossus") summaryMap[u].countTakhossus++;
    else summaryMap[u].countAngkatan++;
    summaryMap[u].totalSesi++;
  });

  const rows = [["Nama Ustadz", "Sesi Takhossus", "Sesi Kajian Angkatan", "Total Kehadiran"]];
  Object.values(summaryMap).forEach(s => {
    rows.push([s.name, s.countTakhossus, s.countAngkatan, s.totalSesi]);
  });

  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(i => `"${String(i).replace(/"/g, '""')}"`).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Rekap_Kehadiran_Ustadz_" + new Date().toISOString().slice(0, 10) + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==================== PDF EXPORT & PHYSICAL ARCHIVE SYSTEM ====================

function buildKopSuratHTML() {
  const cfg = appState.institutionConfig || DEFAULT_INSTITUTION_CONFIG;
  const baris1 = cfg.kopBaris1 || (cfg.namaLembaga ? cfg.namaLembaga.toUpperCase() : "MA'HAD AL-AQSHA KUDUS");
  const baris2 = cfg.kopBaris2 || (cfg.subLembaga ? cfg.subLembaga.toUpperCase() : "LEMBAGA PENDIDIKAN DAN PENGAJIAN KUTUBUTTURATS");
  const baris3 = cfg.kopBaris3 || [cfg.alamatLembaga, cfg.emailLembaga ? 'Email: ' + cfg.emailLembaga : ''].filter(Boolean).join(' • ') || "Pusat Kajian Turats & Pembinaan Bahasa Arab";
  
  const showLogo = cfg.showKopLogo !== false && cfg.logoUrl;
  const logoHtml = showLogo ? `
    <td style="width: 72px; vertical-align: middle; text-align: center; padding-right: 14px;">
      <img src="${cfg.logoUrl}" alt="Logo" style="max-width: 65px; max-height: 65px; object-fit: contain;" />
    </td>
  ` : '';

  return `
    <!-- KOP SURAT RESMI DINAMIS -->
    <table style="width: 100%; border-bottom: 3px double #064e3b; padding-bottom: 8px; margin-bottom: 14px; border-collapse: collapse;">
      <tr>
        ${logoHtml}
        <td style="text-align: center; vertical-align: middle;">
          <div style="font-size: 14pt; font-weight: bold; color: #064e3b; letter-spacing: 0.5px; text-transform: uppercase;">
            ${baris1}
          </div>
          <div style="font-size: 11pt; font-weight: bold; color: #1f2937; margin-top: 2px; text-transform: uppercase;">
            ${baris2}
          </div>
          <div style="font-size: 8.5pt; color: #4b5563; margin-top: 3px; font-style: italic;">
            ${baris3}
          </div>
        </td>
      </tr>
    </table>
  `;
}

function buildLaporanSignaturesHTML(printDateStr, rightSignerType = 'koordinator', ustadzName = '') {
  const cfg = appState.institutionConfig || DEFAULT_INSTITUTION_CONFIG;
  const kota = cfg.kotaLembaga || "Kudus";
  const mudirNama = cfg.namaMudir || "Dr. KH. Mukhlis Aliyudin, M.Ag.";
  const mudirJabatan = cfg.jabatanMudir || "Mudir / Pengasuh Pondok Modern Al-Aqsha";
  const mudirNip = cfg.nipMudir ? `NIP/NIY: ${cfg.nipMudir}` : "Pengasuh Pondok Pesantren";

  let rightTitle = cfg.jabatanKoordinator || "Koordinator Kutubutturats & Kurikulum";
  let rightName = cfg.namaKoordinator || "M. Rifqi, M.Ag.";
  let rightSub = cfg.nipKoordinator ? `NIP/NIY: ${cfg.nipKoordinator}` : "Bagian Kurikulum & Asatidz";

  if (rightSignerType === 'ustadz') {
    rightTitle = "Ustadz Pengajar Terkait";
    rightName = ustadzName || "( ..................................................... )";
    rightSub = "Asatidz Kutubutturats";
  }

  const now = new Date();

  return `
    <!-- LEMBAR PENGESAHAN & TANDA TANGAN RESMI DINAMIS -->
    <div style="margin-top: 24px; page-break-inside: avoid;">
      <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
        <tr>
          <td style="width: 50%; text-align: center; vertical-align: top;">
            <div>Mengetahui,</div>
            <div style="font-weight: bold; margin-top: 2px;">${mudirJabatan}</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">( ${mudirNama} )</div>
            <div style="font-size: 8pt; color: #475569; margin-top: 2px;">${mudirNip}</div>
          </td>
          <td style="width: 50%; text-align: center; vertical-align: top;">
            <div>${kota}, ${printDateStr}</div>
            <div style="font-weight: bold; margin-top: 2px;">${rightTitle}</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">( ${rightName} )</div>
            <div style="font-size: 8pt; color: #475569; margin-top: 2px;">${rightSub}</div>
          </td>
        </tr>
      </table>
      <div style="text-align: center; font-size: 7.5pt; color: #94a3b8; margin-top: 18px; border-top: 1px solid #e2e8f0; padding-top: 4px;">
        ${cfg.namaLembaga} • Sistem Manajemen & Absensi Kutubutturats • Dicetak otomatis pada ${now.toISOString().slice(0, 19).replace('T', ' ')}
      </div>
    </div>
  `;
}

function exportTeacherRecapToPDF() {
  const startDate = document.getElementById('guruFilterStartDate')?.value || "";
  const endDate = document.getElementById('guruFilterEndDate')?.value || "";
  const selectedUstadz = document.getElementById('guruFilterSelect')?.value || "all";

  // Filter records
  const filteredRecords = (appState.history || []).filter(item => {
    if (startDate && item.tanggal < startDate) return false;
    if (endDate && item.tanggal > endDate) return false;
    if (selectedUstadz !== "all" && item.namaUstadz !== selectedUstadz) return false;
    return true;
  }).sort((a, b) => (a.tanggal || "").localeCompare(b.tanggal || ""));

  if (filteredRecords.length === 0) {
    showToast("Tidak ada data kehadiran ustadz pada rentang filter ini untuk diekspor!", "warning");
    return;
  }

  // Summary aggregation
  const summaryMap = {};
  let totalTakhossusSessions = 0;
  let totalAngkatanSessions = 0;
  let totalSantriAttendance = 0;

  filteredRecords.forEach(r => {
    const u = (r.namaUstadz || "Tanpa Nama").trim();
    if (!summaryMap[u]) {
      summaryMap[u] = {
        name: u,
        countTakhossus: 0,
        countAngkatan: 0,
        totalSantri: 0,
        dates: new Set(),
        kitabList: new Set()
      };
    }

    if (r.kitab) summaryMap[u].kitabList.add(r.kitab);
    summaryMap[u].dates.add(r.tanggal);

    if (r.type === "takhossus") {
      summaryMap[u].countTakhossus++;
      totalTakhossusSessions++;
      const santriHadir = Number(r.totalHadir || 0);
      summaryMap[u].totalSantri += santriHadir;
      totalSantriAttendance += santriHadir;
    } else {
      summaryMap[u].countAngkatan++;
      totalAngkatanSessions++;
      const santriHadir = Number(r.totalJamaah || 0);
      summaryMap[u].totalSantri += santriHadir;
      totalSantriAttendance += santriHadir;
    }
  });

  const summaryList = Object.values(summaryMap).sort((a, b) => 
    (b.countTakhossus + b.countAngkatan) - (a.countTakhossus + a.countAngkatan)
  );

  const totalAllSessions = totalTakhossusSessions + totalAngkatanSessions;
  const avgSantriPerSession = totalAllSessions > 0 ? (totalSantriAttendance / totalAllSessions).toFixed(1) : "0";

  // Date formatting for header
  const now = new Date();
  const printDateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let periodText = "Semua Riwayat Tercatat";
  if (startDate && endDate) {
    periodText = `${startDate} s/d ${endDate}`;
  } else if (startDate) {
    periodText = `Mulai ${startDate}`;
  } else if (endDate) {
    periodText = `Sampai ${endDate}`;
  }

  const ustadzFilterText = selectedUstadz === "all" ? "Semua Asatidz / Pengajar" : selectedUstadz;

  // Build Report HTML
  const reportContainer = document.createElement('div');
  reportContainer.className = "pdf-report-document";
  reportContainer.style.cssText = "font-family: 'Times New Roman', Times, serif, sans-serif; color: #111827; background: #ffffff; padding: 20px 24px; max-width: 800px; margin: 0 auto; line-height: 1.4;";

  reportContainer.innerHTML = `
    ${buildKopSuratHTML()}

    <!-- JUDUL DOKUMEN -->
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 12pt; font-weight: bold; color: #111827; text-transform: uppercase; text-decoration: underline; letter-spacing: 0.3px;">
        LAPORAN REKAPITULASI KEHADIRAN ASATIDZ PENGAJAR KAJIAN TURATS
      </div>
      <div style="font-size: 9pt; color: #374151; margin-top: 3px;">
        Dokumen Resmi Arsip Kehadiran & Monitoring Pembelajaran
      </div>
    </div>

    <!-- METADATA LAPORAN -->
    <table style="width: 100%; font-size: 9pt; margin-bottom: 12px; border-collapse: collapse;">
      <tr>
        <td style="width: 18%; font-weight: bold; color: #374151; padding: 2px 0;">Periode Laporan</td>
        <td style="width: 2%;">:</td>
        <td style="width: 40%; font-weight: bold; color: #064e3b;">${periodText}</td>
        <td style="width: 18%; font-weight: bold; color: #374151; padding: 2px 0;">Tanggal Cetak</td>
        <td style="width: 2%;">:</td>
        <td style="width: 20%;">${printDateStr}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; color: #374151; padding: 2px 0;">Filter Ustadz</td>
        <td>:</td>
        <td style="font-weight: bold; color: #111827;">${ustadzFilterText}</td>
        <td style="font-weight: bold; color: #374151; padding: 2px 0;">Status Arsip</td>
        <td>:</td>
        <td style="color: #059669; font-weight: bold;">Terverifikasi Sistem</td>
      </tr>
    </table>

    <!-- RINGKASAN EKSEKUTIF -->
    <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 14px;">
      <div style="font-size: 8.5pt; font-weight: bold; color: #064e3b; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">
        Ringkasan Statistik Kehadiran
      </div>
      <table style="width: 100%; font-size: 9pt; text-align: center; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 20%;">
            <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Total Sesi Hadir</div>
            <div style="font-size: 13pt; font-weight: bold; color: #064e3b; margin-top: 1px;">${totalAllSessions}</div>
          </td>
          <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 20%;">
            <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Sesi Takhossus</div>
            <div style="font-size: 13pt; font-weight: bold; color: #059669; margin-top: 1px;">${totalTakhossusSessions}</div>
          </td>
          <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 20%;">
            <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Kajian Angkatan</div>
            <div style="font-size: 13pt; font-weight: bold; color: #0d9488; margin-top: 1px;">${totalAngkatanSessions}</div>
          </td>
          <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 20%;">
            <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Asatidz Aktif</div>
            <div style="font-size: 13pt; font-weight: bold; color: #b45309; margin-top: 1px;">${summaryList.length}</div>
          </td>
          <td style="padding: 4px; width: 20%;">
            <div style="font-size: 7.5pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Rerata Santri/Sesi</div>
            <div style="font-size: 13pt; font-weight: bold; color: #4338ca; margin-top: 1px;">${avgSantriPerSession}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- TABEL REKAPITULASI ASATIDZ -->
    <div style="margin-bottom: 16px;">
      <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px;">
        I. TABEL REKAPITULASI TOTAL KEHADIRAN ASATIDZ
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
        <thead>
          <tr style="background-color: #064e3b; color: #ffffff; text-align: center;">
            <th style="border: 1px solid #064e3b; padding: 6px 4px; width: 5%;">NO</th>
            <th style="border: 1px solid #064e3b; padding: 6px 6px; text-align: left; width: 26%;">NAMA ASATIDZ / GURU</th>
            <th style="border: 1px solid #064e3b; padding: 6px 6px; text-align: left; width: 25%;">KITAB YANG DIJADWALKAN</th>
            <th style="border: 1px solid #064e3b; padding: 6px 4px; width: 10%;">TAKHOSSUS</th>
            <th style="border: 1px solid #064e3b; padding: 6px 4px; width: 10%;">ANGKATAN</th>
            <th style="border: 1px solid #064e3b; padding: 6px 4px; width: 10%;">TOTAL SESI</th>
            <th style="border: 1px solid #064e3b; padding: 6px 4px; width: 14%;">TOTAL SANTRI</th>
          </tr>
        </thead>
        <tbody>
          ${summaryList.map((item, idx) => {
            const totalSesi = item.countTakhossus + item.countAngkatan;
            const books = Array.from(item.kitabList).join(', ') || '-';
            const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            return `
              <tr style="background-color: ${rowBg};">
                <td style="border: 1px solid #cbd5e1; padding: 5px 4px; text-align: center; font-weight: bold;">${idx + 1}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 6px; font-weight: bold; color: #0f172a;">${item.name}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 6px; color: #334155;">${books}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 4px; text-align: center; font-weight: bold; color: #059669;">${item.countTakhossus}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 4px; text-align: center; font-weight: bold; color: #0d9488;">${item.countAngkatan}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 4px; text-align: center; font-weight: bold; color: #064e3b; background-color: #ecfdf5;">${totalSesi}</td>
                <td style="border: 1px solid #cbd5e1; padding: 5px 4px; text-align: center; color: #334155;">${item.totalSantri} Santri</td>
              </tr>
            `;
          }).join('')}
        </tbody>
        <tfoot>
          <tr style="background-color: #e2e8f0; font-weight: bold; text-align: center;">
            <td colspan="3" style="border: 1px solid #94a3b8; padding: 6px 8px; text-align: right; text-transform: uppercase;">TOTAL KESELURUHAN :</td>
            <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #059669;">${totalTakhossusSessions}</td>
            <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #0d9488;">${totalAngkatanSessions}</td>
            <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #064e3b; background-color: #d1fae5;">${totalAllSessions}</td>
            <td style="border: 1px solid #94a3b8; padding: 6px 4px;">${totalSantriAttendance} Santri</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- TABEL LOG RINCIAN SESI -->
    <div style="margin-bottom: 20px;">
      <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px;">
        II. LOG RINCIAN SESI KAJIAN TERLAKSANA
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
        <thead>
          <tr style="background-color: #334155; color: #ffffff; text-align: center;">
            <th style="border: 1px solid #334155; padding: 5px 3px; width: 4%;">NO</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 14%;">TANGGAL & HARI</th>
            <th style="border: 1px solid #334155; padding: 5px 6px; text-align: left; width: 22%;">NAMA USTADZ</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 11%;">KATEGORI</th>
            <th style="border: 1px solid #334155; padding: 5px 6px; text-align: left; width: 26%;">KITAB & MATERI / BAB</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 10%;">KEHADIRAN</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; text-align: left; width: 13%;">CATATAN</th>
          </tr>
        </thead>
        <tbody>
          ${filteredRecords.map((r, idx) => {
            const isTak = r.type === "takhossus";
            const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            const santriStr = isTak ? `${r.totalHadir}/${r.totalSantri || '-'}` : `${r.totalJamaah || 0} Santri`;
            return `
              <tr style="background-color: ${rowBg};">
                <td style="border: 1px solid #cbd5e1; padding: 4px 3px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center;">${r.tanggal}<br><span style="font-size: 7.5pt; color: #64748b;">${r.hari}</span></td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 6px; font-weight: bold; color: #0f172a;">${r.namaUstadz}</td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center;">
                  <span style="font-size: 7pt; font-weight: bold; padding: 1px 4px; border-radius: 3px; background-color: ${isTak ? '#d1fae5; color: #065f46;' : '#ccfbf1; color: #115e59;'}">
                    ${isTak ? 'Takhossus' : 'Angkatan'}
                  </span>
                </td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 6px;">
                  <b>${r.kitab || '-'}</b>
                  ${r.materi ? `<br><span style="color: #475569; font-size: 7.5pt;">${r.materi}</span>` : ''}
                </td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #047857;">${santriStr}</td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 4px; color: #475569; font-size: 7.5pt;">${r.catatan || '-'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    ${buildLaporanSignaturesHTML(printDateStr, 'koordinator')}
  `;

  const filename = `Laporan_Rekap_Kehadiran_Ustadz_Turats_${now.toISOString().slice(0, 10)}.pdf`;
  generateAndDownloadPDF(reportContainer, filename, "Laporan Rekapitulasi Kehadiran Asatidz");
}

function exportCurrentTeacherProfileToPDF() {
  if (!currentActiveTeacherProfile) {
    showToast("Silakan buka profil ustadz terlebih dahulu!", "warning");
    return;
  }
  exportTeacherProfileToPDF(currentActiveTeacherProfile);
}

function exportTeacherProfileToPDF(ustadzName) {
  const name = (ustadzName || "").trim();
  if (!name) return;

  const ustadzRecords = (appState.history || [])
    .filter(r => (r.namaUstadz || "").trim().toLowerCase() === name.toLowerCase())
    .sort((a, b) => (a.tanggal || "").localeCompare(b.tanggal || ""));

  const takSchedules = (appState.jadwalTakhossus || []).filter(j => 
    (j.ustadz || "").trim().toLowerCase() === name.toLowerCase()
  );
  const angSchedules = (appState.jadwalAngkatan || []).filter(j => 
    (j.ustadz || "").trim().toLowerCase() === name.toLowerCase()
  );

  const totalSesi = ustadzRecords.length;
  const takCount = ustadzRecords.filter(r => r.type === "takhossus").length;
  const angCount = ustadzRecords.filter(r => r.type === "reguler").length;
  
  let totalSantriHadir = 0;
  ustadzRecords.forEach(r => {
    if (r.type === "takhossus") totalSantriHadir += Number(r.totalHadir || 0);
    else totalSantriHadir += Number(r.totalJamaah || 0);
  });

  const avgSantri = totalSesi > 0 ? (totalSantriHadir / totalSesi).toFixed(1) : "0";
  const uniqueDates = new Set(ustadzRecords.map(r => r.tanggal));

  const allBooks = Array.from(new Set([
    ...takSchedules.map(s => s.kitab),
    ...angSchedules.map(s => s.kitab),
    ...ustadzRecords.map(r => r.kitab)
  ].filter(Boolean)));

  const now = new Date();
  const printDateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const reportContainer = document.createElement('div');
  reportContainer.className = "pdf-report-document";
  reportContainer.style.cssText = "font-family: 'Times New Roman', Times, serif, sans-serif; color: #111827; background: #ffffff; padding: 20px 24px; max-width: 800px; margin: 0 auto; line-height: 1.4;";

  reportContainer.innerHTML = `
    ${buildKopSuratHTML()}

    <!-- JUDUL DOKUMEN -->
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 12pt; font-weight: bold; color: #111827; text-transform: uppercase; text-decoration: underline; letter-spacing: 0.3px;">
        PORTOFOLIO & REKAPITULASI KEHADIRAN PENGAJAR
      </div>
      <div style="font-size: 9pt; color: #374151; margin-top: 3px;">
        Lembar Evaluasi dan Histori Mengajar Ustadz
      </div>
    </div>

    <!-- PROFIL USTADZ -->
    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px;">
      <table style="width: 100%; font-size: 9.5pt; border-collapse: collapse;">
        <tr>
          <td style="width: 22%; font-weight: bold; color: #065f46; padding: 2px 0;">Nama Lengkap Ustadz</td>
          <td style="width: 2%;">:</td>
          <td style="width: 46%; font-weight: bold; font-size: 11pt; color: #064e3b;">${name}</td>
          <td style="width: 15%; font-weight: bold; color: #065f46; padding: 2px 0;">Hari Aktif</td>
          <td style="width: 2%;">:</td>
          <td style="width: 13%; font-weight: bold;">${uniqueDates.size} Hari</td>
        </tr>
        <tr>
          <td style="font-weight: bold; color: #065f46; padding: 2px 0;">Kitab yang Diampu</td>
          <td>:</td>
          <td style="color: #111827;">${allBooks.join(', ') || '-'}</td>
          <td style="font-weight: bold; color: #065f46; padding: 2px 0;">Total Kehadiran</td>
          <td>:</td>
          <td style="font-weight: bold; color: #064e3b;">${totalSesi} Sesi</td>
        </tr>
      </table>
    </div>

    <!-- METRIK PERFORMA -->
    <table style="width: 100%; font-size: 9pt; text-align: center; border-collapse: collapse; margin-bottom: 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px;">
      <tr>
        <td style="padding: 6px; border-right: 1px solid #e2e8f0; width: 25%;">
          <div style="font-size: 7.5pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Sesi Takhossus</div>
          <div style="font-size: 13pt; font-weight: bold; color: #059669; margin-top: 1px;">${takCount} Sesi</div>
        </td>
        <td style="padding: 6px; border-right: 1px solid #e2e8f0; width: 25%;">
          <div style="font-size: 7.5pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Kajian Angkatan</div>
          <div style="font-size: 13pt; font-weight: bold; color: #0d9488; margin-top: 1px;">${angCount} Sesi</div>
        </td>
        <td style="padding: 6px; border-right: 1px solid #e2e8f0; width: 25%;">
          <div style="font-size: 7.5pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Rerata Santri / Sesi</div>
          <div style="font-size: 13pt; font-weight: bold; color: #4338ca; margin-top: 1px;">${avgSantri} Santri</div>
        </td>
        <td style="padding: 6px; width: 25%;">
          <div style="font-size: 7.5pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Total Akumulasi Jamaah</div>
          <div style="font-size: 13pt; font-weight: bold; color: #b45309; margin-top: 1px;">${totalSantriHadir} Santri</div>
        </td>
      </tr>
    </table>

    <!-- JADWAL RUTIN -->
    <div style="margin-bottom: 14px;">
      <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px;">
        I. JADWAL RUTIN MENGAJAR YANG TERDAFTAR
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
        <thead>
          <tr style="background-color: #064e3b; color: #ffffff; text-align: center;">
            <th style="border: 1px solid #064e3b; padding: 5px; width: 6%;">NO</th>
            <th style="border: 1px solid #064e3b; padding: 5px 6px; width: 14%;">PROGRAM</th>
            <th style="border: 1px solid #064e3b; padding: 5px 6px; text-align: left; width: 35%;">KITAB & TINGKATAN</th>
            <th style="border: 1px solid #064e3b; padding: 5px 6px; width: 20%;">HARI & WAKTU</th>
            <th style="border: 1px solid #064e3b; padding: 5px 6px; width: 25%;">TEMPAT</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ...takSchedules.map(s => ({ prog: 'Takhossus', ...s })),
            ...angSchedules.map(s => ({ prog: 'Angkatan', ...s }))
          ].map((s, idx) => `
            <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: bold;">${idx + 1}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: bold; color: #065f46;">${s.prog}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 6px;"><b>${s.kitab}</b> <span style="color: #64748b;">(${s.tingkat || s.kelas || 'Semua Kelas'})</span></td>
              <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center;">${s.hari || '-'} ${s.waktu ? '• ' + s.waktu : ''}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center;">${s.tempat || '-'}</td>
            </tr>
          `).join('') || '<tr><td colspan="5" style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; color: #94a3b8; font-style: italic;">Tidak ada jadwal tetap terdaftar di master data.</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- TABEL DETAIL HISTORI KEHADIRAN -->
    <div style="margin-bottom: 20px;">
      <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px;">
        II. HISTORI LENGKAP REKAMAN KEHADIRAN MENGAJAR (${totalSesi} SESI)
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
        <thead>
          <tr style="background-color: #334155; color: #ffffff; text-align: center;">
            <th style="border: 1px solid #334155; padding: 5px 3px; width: 5%;">NO</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 15%;">TANGGAL & HARI</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 12%;">KATEGORI</th>
            <th style="border: 1px solid #334155; padding: 5px 6px; text-align: left; width: 35%;">KITAB & MATERI / BAB KAJIAN</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; width: 15%;">KEHADIRAN</th>
            <th style="border: 1px solid #334155; padding: 5px 4px; text-align: left; width: 18%;">CATATAN PEMBELAJARAN</th>
          </tr>
        </thead>
        <tbody>
          ${ustadzRecords.map((r, idx) => {
            const isTak = r.type === "takhossus";
            const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            const santriStr = isTak ? `${r.totalHadir}/${r.totalSantri || '-'} Santri` : `${r.totalJamaah || 0} Santri`;
            return `
              <tr style="background-color: ${rowBg};">
                <td style="border: 1px solid #cbd5e1; padding: 4px 3px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center;">${r.tanggal}<br><span style="font-size: 7.5pt; color: #64748b;">${r.hari} (${isTak ? (r.sesi || 'Sore') : (r.waktuTempat || '')})</span></td>
                <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center;">
                  <span style="font-size: 7pt; font-weight: bold; padding: 1px 4px; border-radius: 3px; background-color: ${isTak ? '#d1fae5; color: #065f46;' : '#ccfbf1; color: #115e59;'}">
                    ${isTak ? 'Takhossus' : 'Angkatan'}
                  </span>
                </td>
                <td style="border: 1px solid #cbd5e1; padding: 4px 6px;">
                  <b>${r.kitab || '-'}</b>
                  ${r.materi ? `<br><span style="color: #475569; font-size: 7.5pt;">${r.materi}</span>` : ''}
                </td>
                <td style="border: 1px solid #cbd5e1; padding: 4px; text-align: center; font-weight: bold; color: #047857;">${santriStr}</td>
                <td style="border: 1px solid #cbd5e1; padding: 4px; font-size: 7.5pt; color: #475569;">${r.catatan || '-'}</td>
              </tr>
            `;
          }).join('') || '<tr><td colspan="6" style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; color: #94a3b8; font-style: italic;">Belum ada catatan histori kehadiran.</td></tr>'}
        </tbody>
      </table>
    </div>

    ${buildLaporanSignaturesHTML(printDateStr, 'ustadz', name)}
  `;

  const cleanFileName = `Portofolio_Kehadiran_${name.replace(/[^a-zA-Z0-9]/g, '_')}_${now.toISOString().slice(0, 10)}.pdf`;
  generateAndDownloadPDF(reportContainer, cleanFileName, `Portofolio Kehadiran - ${name}`);
}

function generateAndDownloadPDF(containerElement, filename, titleText) {
  showToast("Menyiapkan dokumen PDF arsip...", "info");

  // If html2pdf library is available, trigger PDF generation directly
  if (typeof html2pdf !== "undefined") {
    // Append temporarily to DOM body hidden for rendering
    containerElement.style.position = "absolute";
    containerElement.style.left = "-9999px";
    containerElement.style.top = "0";
    document.body.appendChild(containerElement);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(containerElement)
      .save()
      .then(() => {
        if (containerElement.parentNode) {
          containerElement.parentNode.removeChild(containerElement);
        }
        showToast("PDF laporan berhasil diunduh!", "success");
      })
      .catch(err => {
        console.error("html2pdf generation error:", err);
        if (containerElement.parentNode) {
          containerElement.parentNode.removeChild(containerElement);
        }
        // Fallback to print window
        openPrintWindow(containerElement.innerHTML, titleText);
      });
  } else {
    // Fallback: Open formatted print window
    openPrintWindow(containerElement.innerHTML, titleText);
  }
}

function openPrintWindow(htmlContent, title) {
  const printWin = window.open('', '_blank', 'width=900,height=750,top=50,left=50');
  if (!printWin) {
    showToast("Popup terblokir oleh browser. Izinkan popup untuk mencetak laporan.", "warning");
    return;
  }

  printWin.document.open();
  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>${title || 'Laporan Absensi Kutubutturats'}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        body {
          font-family: 'Times New Roman', Times, serif, sans-serif;
          color: #111827;
          background: #ffffff;
          padding: 0;
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
        .print-btn-bar {
          background: #064e3b;
          color: white;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: sans-serif;
          font-size: 13px;
        }
        .btn-action {
          background: #ffffff;
          color: #064e3b;
          border: none;
          padding: 6px 14px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="print-btn-bar no-print">
        <span><b>${title || 'Laporan Kehadiran Ustadz'}</b> — Siap untuk dicetak / disimpan PDF</span>
        <button class="btn-action" onclick="window.print()">Cetak / Simpan PDF Sekarang</button>
      </div>
      <div style="padding: 15px 20px;">
        ${htmlContent}
      </div>
      <script>
        setTimeout(() => {
          window.print();
        }, 500);
      </script>
    </body>
    </html>
  `);
  printWin.document.close();
}

// ==============================================================================
// MODUL LAPORAN REKAPITULASI KEHADIRAN BULANAN (PDF & PRINT)
// ==============================================================================

const MONTH_NAMES_INDONESIA = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function populateMonthlyPdfMonthOptions(preselectKey = "") {
  const select = document.getElementById('monthlyPdfMonthSelect');
  if (!select) return;

  const allHistory = appState.history || [];
  const monthMap = {};

  // Default daftar bulan untuk Tahun Ajaran 2026/2027
  const defaultMonths = [
    "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10", "2026-11", "2026-12",
    "2027-01", "2027-02", "2027-03", "2027-04", "2027-05", "2027-06"
  ];

  defaultMonths.forEach(k => {
    monthMap[k] = 0;
  });

  // Hitung jumlah sesi riil per bulan
  allHistory.forEach(r => {
    if (r.tanggal && r.tanggal.length >= 7) {
      const k = r.tanggal.substring(0, 7);
      monthMap[k] = (monthMap[k] || 0) + 1;
    }
  });

  const sortedKeys = Object.keys(monthMap).sort((a, b) => b.localeCompare(a));
  
  let html = "";
  // Opsi semua bulan dalam tahun ajaran
  html += `<option value="ALL_2026_2027">Semua Bulan (Tahun Ajaran 2026/2027)</option>`;

  sortedKeys.forEach(k => {
    const parts = k.split('-');
    const y = parts[0];
    const m = parseInt(parts[1], 10);
    const mName = MONTH_NAMES_INDONESIA[m - 1] || parts[1];
    const count = monthMap[k] || 0;
    const label = `${mName} ${y} (${count} Sesi)`;
    const isSelected = preselectKey === k ? 'selected' : '';
    html += `<option value="${k}" ${isSelected}>${label}</option>`;
  });

  select.innerHTML = html;

  if (preselectKey && sortedKeys.includes(preselectKey)) {
    select.value = preselectKey;
  } else {
    // Default pilih bulan terbaru yang memiliki data atau bulan berjalan
    const activeKey = sortedKeys.find(k => monthMap[k] > 0) || "2026-08";
    select.value = activeKey;
  }
}

function openMonthlyPdfExportModal(preselectedMonth = "") {
  const modal = document.getElementById('monthlyPdfExportModal');
  if (!modal) return;

  populateMonthlyPdfMonthOptions(preselectedMonth);
  onMonthlyPdfConfigChange();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeMonthlyPdfExportModal() {
  const modal = document.getElementById('monthlyPdfExportModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function getMonthlyPdfFilteredData() {
  const monthKey = document.getElementById('monthlyPdfMonthSelect')?.value || "2026-08";
  const category = document.getElementById('monthlyPdfCategoryFilter')?.value || "all";
  const allHistory = appState.history || [];

  const isAllYear = monthKey.startsWith("ALL_");

  const filtered = allHistory.filter(r => {
    if (!r.tanggal) return false;
    if (!isAllYear) {
      if (!r.tanggal.startsWith(monthKey)) return false;
    } else {
      // Filter tahun ajaran 2026/2027: 2026-07 s/d 2027-06 atau ada di riwayat
      if (r.tanggal < "2026-05-01" || r.tanggal > "2027-06-30") return false;
    }

    if (category === "takhossus" && r.type !== "takhossus") return false;
    if (category === "reguler" && r.type === "takhossus") return false;
    return true;
  }).sort((a, b) => (a.tanggal || "").localeCompare(b.tanggal || ""));

  let periodLabel = "";
  if (isAllYear) {
    periodLabel = "Tahun Ajaran 2026/2027 (Penuh)";
  } else {
    const parts = monthKey.split('-');
    const m = parseInt(parts[1], 10);
    const mName = MONTH_NAMES_INDONESIA[m - 1] || parts[1];
    periodLabel = `${mName} ${parts[0]}`;
  }

  // Agregasi Statistik
  let totalSesi = filtered.length;
  let countTak = 0;
  let countAng = 0;
  let totalSantri = 0;
  const teachers = new Set();
  const books = new Set();
  const activeDates = new Set();

  filtered.forEach(r => {
    if (r.type === "takhossus") {
      countTak++;
      totalSantri += Number(r.totalHadir || 0);
    } else {
      countAng++;
      totalSantri += Number(r.totalJamaah || 0);
    }
    if (r.namaUstadz) teachers.add(r.namaUstadz.trim());
    if (r.kitab) books.add(r.kitab.trim());
    if (r.tanggal) activeDates.add(r.tanggal);
  });

  const avgSantri = totalSesi > 0 ? (totalSantri / totalSesi).toFixed(1) : "0";

  return {
    monthKey,
    periodLabel,
    category,
    records: filtered,
    totalSesi,
    countTak,
    countAng,
    totalSantri,
    avgSantri,
    teacherCount: teachers.size,
    bookCount: books.size,
    activeDays: activeDates.size,
    teachersList: Array.from(teachers),
    booksList: Array.from(books)
  };
}

function onMonthlyPdfConfigChange() {
  const data = getMonthlyPdfFilteredData();

  const elPeriod = document.getElementById('monthlyPdfPeriodLabel');
  const elTotal = document.getElementById('monthlyPdfPreviewTotalSesi');
  const elRatio = document.getElementById('monthlyPdfPreviewTakAngkRatio');
  const elTeachers = document.getElementById('monthlyPdfPreviewTeachers');
  const elDays = document.getElementById('monthlyPdfPreviewActiveDays');
  const elSantri = document.getElementById('monthlyPdfPreviewTotalSantri');
  const elAvg = document.getElementById('monthlyPdfPreviewAvgSantri');
  const elBooks = document.getElementById('monthlyPdfPreviewBooks');

  if (elPeriod) elPeriod.innerText = data.periodLabel;
  if (elTotal) elTotal.innerText = `${data.totalSesi} Sesi`;
  if (elRatio) elRatio.innerText = `${data.countTak} Tak • ${data.countAng} Angk`;
  if (elTeachers) elTeachers.innerText = `${data.teacherCount} Ustadz`;
  if (elDays) elDays.innerText = `${data.activeDays} Hari Kajian`;
  if (elSantri) elSantri.innerText = `${data.totalSantri.toLocaleString('id-ID')} Santri`;
  if (elAvg) elAvg.innerText = `Rerata: ${data.avgSantri} / sesi`;
  if (elBooks) elBooks.innerText = `${data.bookCount} Kitab`;
}

function buildMonthlyRecapReportHTML() {
  const data = getMonthlyPdfFilteredData();

  const includeStats = document.getElementById('monthlyPdfOptStats')?.checked ?? true;
  const includeTeacherRecap = document.getElementById('monthlyPdfOptTeacherRecap')?.checked ?? true;
  const includeSessionLog = document.getElementById('monthlyPdfOptSessionLog')?.checked ?? true;
  const includeSignatures = document.getElementById('monthlyPdfOptSignatures')?.checked ?? true;

  if (data.records.length === 0) {
    showToast(`Tidak ada data riwayat absensi untuk periode ${data.periodLabel}!`, "warning");
    return null;
  }

  // Agregasi Rekap Ustadz
  const teacherRecapMap = {};
  data.records.forEach(r => {
    const u = (r.namaUstadz || "Tanpa Nama").trim();
    if (!teacherRecapMap[u]) {
      teacherRecapMap[u] = {
        name: u,
        countTak: 0,
        countAng: 0,
        totalSesi: 0,
        totalSantri: 0,
        kitabSet: new Set(),
        dates: new Set()
      };
    }
    if (r.type === "takhossus") {
      teacherRecapMap[u].countTak++;
      teacherRecapMap[u].totalSantri += Number(r.totalHadir || 0);
    } else {
      teacherRecapMap[u].countAng++;
      teacherRecapMap[u].totalSantri += Number(r.totalJamaah || 0);
    }
    teacherRecapMap[u].totalSesi++;
    if (r.kitab) teacherRecapMap[u].kitabSet.add(r.kitab);
    if (r.tanggal) teacherRecapMap[u].dates.add(r.tanggal);
  });

  const teacherRecapList = Object.values(teacherRecapMap).sort((a, b) => b.totalSesi - a.totalSesi);

  // Agregasi Kitab & Materi Capaian
  const bookSummaryMap = {};
  data.records.forEach(r => {
    const k = (r.kitab || "Kitab Belum Terdefinisi").trim();
    if (!bookSummaryMap[k]) {
      bookSummaryMap[k] = {
        kitab: k,
        ustadzSet: new Set(),
        categorySet: new Set(),
        totalPertemuan: 0,
        totalSantri: 0,
        lastMateri: ""
      };
    }
    bookSummaryMap[k].totalPertemuan++;
    if (r.namaUstadz) bookSummaryMap[k].ustadzSet.add(r.namaUstadz);
    bookSummaryMap[k].categorySet.add(r.type === "takhossus" ? "Takhossus" : "Angkatan");
    if (r.type === "takhossus") bookSummaryMap[k].totalSantri += Number(r.totalHadir || 0);
    else bookSummaryMap[k].totalSantri += Number(r.totalJamaah || 0);
    if (r.materi) bookSummaryMap[k].lastMateri = r.materi;
  });

  const bookSummaryList = Object.values(bookSummaryMap).sort((a, b) => b.totalPertemuan - a.totalPertemuan);

  const now = new Date();
  const printDateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let categoryDesc = "Semua Kategori (Takhossus & Kajian Angkatan)";
  if (data.category === "takhossus") categoryDesc = "Khusus Program Kajian Takhossus";
  if (data.category === "reguler") categoryDesc = "Khusus Program Kajian Angkatan";

  const container = document.createElement('div');
  container.className = "pdf-monthly-report-document";
  container.style.cssText = "font-family: 'Times New Roman', Times, serif, sans-serif; color: #111827; background: #ffffff; padding: 20px 24px; max-width: 820px; margin: 0 auto; line-height: 1.35;";

  container.innerHTML = `
    ${buildKopSuratHTML()}

    <!-- JUDUL DOKUMEN REKAPITULASI BULANAN -->
    <div style="text-align: center; margin-bottom: 14px;">
      <div style="font-size: 12.5pt; font-weight: bold; color: #111827; text-transform: uppercase; text-decoration: underline; letter-spacing: 0.4px;">
        LAPORAN REKAPITULASI KEHADIRAN BULANAN KAJIAN KUTUBUTTURATS
      </div>
      <div style="font-size: 9.5pt; font-weight: bold; color: #064e3b; margin-top: 3px;">
        PERIODE: ${data.periodLabel.toUpperCase()} (TAHUN AJARAN 2026/2027)
      </div>
      <div style="font-size: 8.5pt; color: #4b5563; margin-top: 2px;">
        Dokumen Arsip & Monitoring Pembelajaran Kutubutturats Terverifikasi
      </div>
    </div>

    <!-- METADATA DOKUMEN -->
    <table style="width: 100%; font-size: 8.5pt; margin-bottom: 12px; border-collapse: collapse;">
      <tr>
        <td style="width: 18%; font-weight: bold; color: #374151; padding: 2px 0;">Periode Bulan</td>
        <td style="width: 2%;">:</td>
        <td style="width: 40%; font-weight: bold; color: #064e3b;">${data.periodLabel}</td>
        <td style="width: 18%; font-weight: bold; color: #374151; padding: 2px 0;">Tanggal Terbit</td>
        <td style="width: 2%;">:</td>
        <td style="width: 20%;">${printDateStr}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; color: #374151; padding: 2px 0;">Cakupan Program</td>
        <td>:</td>
        <td style="color: #111827;">${categoryDesc}</td>
        <td style="font-weight: bold; color: #374151; padding: 2px 0;">Status Arsip</td>
        <td>:</td>
        <td style="color: #059669; font-weight: bold;">Valid & Tersinkronisasi</td>
      </tr>
    </table>

    ${includeStats ? `
      <!-- RINGKASAN STATISTIK EKSEKUTIF BULANAN -->
      <div style="background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 14px;">
        <div style="font-size: 8.5pt; font-weight: bold; color: #064e3b; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">
          Ringkasan Statistik & Indikator Kinerja Bulanan
        </div>
        <table style="width: 100%; font-size: 9pt; text-align: center; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Total Sesi</div>
              <div style="font-size: 13pt; font-weight: bold; color: #064e3b; margin-top: 1px;">${data.totalSesi}</div>
              <div style="font-size: 7pt; color: #64748b;">Terlaksana</div>
            </td>
            <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Takhossus</div>
              <div style="font-size: 13pt; font-weight: bold; color: #059669; margin-top: 1px;">${data.countTak}</div>
              <div style="font-size: 7pt; color: #059669;">Sesi Hadir</div>
            </td>
            <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Kajian Angkatan</div>
              <div style="font-size: 13pt; font-weight: bold; color: #0d9488; margin-top: 1px;">${data.countAng}</div>
              <div style="font-size: 7pt; color: #0d9488;">Sesi Hadir</div>
            </td>
            <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Asatidz Aktif</div>
              <div style="font-size: 13pt; font-weight: bold; color: #b45309; margin-top: 1px;">${data.teacherCount}</div>
              <div style="font-size: 7pt; color: #b45309;">Pengajar</div>
            </td>
            <td style="padding: 4px; border-right: 1px solid #e2e8f0; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Total Santri</div>
              <div style="font-size: 13pt; font-weight: bold; color: #4338ca; margin-top: 1px;">${data.totalSantri}</div>
              <div style="font-size: 7pt; color: #4338ca;">Akumulasi</div>
            </td>
            <td style="padding: 4px; width: 16.6%;">
              <div style="font-size: 7pt; color: #64748b; text-transform: uppercase; font-weight: bold;">Rerata Santri</div>
              <div style="font-size: 13pt; font-weight: bold; color: #7c3aed; margin-top: 1px;">${data.avgSantri}</div>
              <div style="font-size: 7pt; color: #7c3aed;">per Sesi</div>
            </td>
          </tr>
        </table>
      </div>
    ` : ''}

    ${includeTeacherRecap ? `
      <!-- BAGIAN I: TABEL REKAPITULASI ASATIDZ BULANAN -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px; display: flex; justify-content: space-between;">
          <span>I. REKAPITULASI KEHADIRAN ASATIDZ / PENGAJAR BULAN ${data.periodLabel.toUpperCase()}</span>
          <span style="font-size: 8pt; color: #64748b; font-weight: normal;">Total: ${teacherRecapList.length} Pengajar Aktif</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
          <thead>
            <tr style="background-color: #064e3b; color: #ffffff; text-align: center;">
              <th style="border: 1px solid #064e3b; padding: 5px 3px; width: 4%;">NO</th>
              <th style="border: 1px solid #064e3b; padding: 5px 6px; text-align: left; width: 26%;">NAMA USTADZ / PENGAJAR</th>
              <th style="border: 1px solid #064e3b; padding: 5px 6px; text-align: left; width: 24%;">KITAB YANG DIKAJI</th>
              <th style="border: 1px solid #064e3b; padding: 5px 4px; width: 10%;">TAKHOSSUS</th>
              <th style="border: 1px solid #064e3b; padding: 5px 4px; width: 10%;">ANGKATAN</th>
              <th style="border: 1px solid #064e3b; padding: 5px 4px; width: 10%;">TOTAL SESI</th>
              <th style="border: 1px solid #064e3b; padding: 5px 4px; width: 16%;">TOTAL SANTRI</th>
            </tr>
          </thead>
          <tbody>
            ${teacherRecapList.map((item, idx) => {
              const books = Array.from(item.kitabSet).join(', ') || '-';
              const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
              return `
                <tr style="background-color: ${rowBg};">
                  <td style="border: 1px solid #cbd5e1; padding: 4px 3px; text-align: center; font-weight: bold;">${idx + 1}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 6px; font-weight: bold; color: #0f172a;">${item.name}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 6px; color: #334155;">${books}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #059669;">${item.countTak}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #0d9488;">${item.countAng}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #064e3b; background-color: #ecfdf5;">${item.totalSesi}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; color: #334155;">${item.totalSantri} Santri</td>
                </tr>
              `;
            }).join('')}
          </tbody>
          <tfoot>
            <tr style="background-color: #e2e8f0; font-weight: bold; text-align: center;">
              <td colspan="3" style="border: 1px solid #94a3b8; padding: 6px 8px; text-align: right; text-transform: uppercase;">TOTAL KESELURUHAN BULAN INI :</td>
              <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #059669;">${data.countTak}</td>
              <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #0d9488;">${data.countAng}</td>
              <td style="border: 1px solid #94a3b8; padding: 6px 4px; color: #064e3b; background-color: #d1fae5;">${data.totalSesi}</td>
              <td style="border: 1px solid #94a3b8; padding: 6px 4px;">${data.totalSantri} Santri</td>
            </tr>
          </tfoot>
        </table>
      </div>
    ` : ''}

    ${includeSessionLog ? `
      <!-- BAGIAN II: LOG RINCIAN KRONOLOGIS SESI KAJIAN TERLAKSANA -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px; display: flex; justify-content: space-between;">
          <span>II. LOG RINCIAN KRONOLOGIS SESI KAJIAN YANG TELAH TERLAKSANA (${data.totalSesi} SESI)</span>
          <span style="font-size: 8pt; color: #64748b; font-weight: normal;">Diurutkan berdasarkan tanggal</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
          <thead>
            <tr style="background-color: #1e293b; color: #ffffff; text-align: center;">
              <th style="border: 1px solid #1e293b; padding: 5px 3px; width: 4%;">NO</th>
              <th style="border: 1px solid #1e293b; padding: 5px 4px; width: 14%;">TANGGAL & HARI</th>
              <th style="border: 1px solid #1e293b; padding: 5px 6px; text-align: left; width: 22%;">NAMA USTADZ</th>
              <th style="border: 1px solid #1e293b; padding: 5px 4px; width: 10%;">PROGRAM</th>
              <th style="border: 1px solid #1e293b; padding: 5px 6px; text-align: left; width: 26%;">KITAB & MATERI / BAB</th>
              <th style="border: 1px solid #1e293b; padding: 5px 4px; width: 10%;">KEHADIRAN</th>
              <th style="border: 1px solid #1e293b; padding: 5px 4px; text-align: left; width: 14%;">CATATAN SESI</th>
            </tr>
          </thead>
          <tbody>
            ${data.records.map((r, idx) => {
              const isTak = r.type === "takhossus";
              const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
              const santriStr = isTak ? `${r.totalHadir}/${r.totalSantri || '-'} Santri` : `${r.totalJamaah || 0} Santri`;
              const tingkatStr = isTak ? (r.tingkat || '') : (r.kelas || '');
              return `
                <tr style="background-color: ${rowBg};">
                  <td style="border: 1px solid #cbd5e1; padding: 4px 3px; text-align: center;">${idx + 1}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center;">
                    <b>${r.tanggal}</b><br>
                    <span style="font-size: 7pt; color: #64748b;">${r.hari} (${isTak ? (r.sesi || 'Sore') : (r.waktuTempat || '')})</span>
                  </td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 6px; font-weight: bold; color: #0f172a;">${r.namaUstadz}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center;">
                    <span style="font-size: 6.5pt; font-weight: bold; padding: 1px 4px; border-radius: 3px; background-color: ${isTak ? '#d1fae5; color: #065f46;' : '#ccfbf1; color: #115e59;'}">
                      ${isTak ? 'Takhossus' : 'Angkatan'}
                    </span>
                    ${tingkatStr ? `<div style="font-size: 6.5pt; color: #64748b; margin-top: 1px;">${tingkatStr}</div>` : ''}
                  </td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 6px;">
                    <b style="color: #064e3b;">${r.kitab || '-'}</b>
                    ${r.materi ? `<br><span style="color: #475569; font-size: 7.5pt;">Bab/Fasal: ${r.materi}</span>` : ''}
                  </td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #047857;">${santriStr}</td>
                  <td style="border: 1px solid #cbd5e1; padding: 4px 4px; color: #475569; font-size: 7.5pt;">${r.catatan || '-'}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <!-- BAGIAN III: DISTRIBUSI KITAB YANG DIKAJI -->
    <div style="margin-bottom: 20px;">
      <div style="font-size: 9.5pt; font-weight: bold; color: #111827; margin-bottom: 6px;">
        III. DISTRIBUSI KAJIAN PER KITAB TURATS BULAN INI
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
        <thead>
          <tr style="background-color: #0f766e; color: #ffffff; text-align: center;">
            <th style="border: 1px solid #0f766e; padding: 4px 3px; width: 5%;">NO</th>
            <th style="border: 1px solid #0f766e; padding: 4px 6px; text-align: left; width: 30%;">NAMA KITAB TURATS</th>
            <th style="border: 1px solid #0f766e; padding: 4px 6px; text-align: left; width: 28%;">USTADZ PENGAJAR</th>
            <th style="border: 1px solid #0f766e; padding: 4px 4px; width: 14%;">PROGRAM</th>
            <th style="border: 1px solid #0f766e; padding: 4px 4px; width: 10%;">PERTEMUAN</th>
            <th style="border: 1px solid #0f766e; padding: 4px 4px; width: 13%;">TOTAL JAMAAH</th>
          </tr>
        </thead>
        <tbody>
          ${bookSummaryList.map((b, idx) => `
            <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
              <td style="border: 1px solid #cbd5e1; padding: 4px 3px; text-align: center; font-weight: bold;">${idx + 1}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 6px; font-weight: bold; color: #064e3b;">${b.kitab}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 6px; color: #334155;">${Array.from(b.ustadzSet).join(', ') || '-'}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-size: 7.5pt;">${Array.from(b.categorySet).join(', ')}</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center; font-weight: bold; color: #0f766e;">${b.totalPertemuan} Kali</td>
              <td style="border: 1px solid #cbd5e1; padding: 4px 4px; text-align: center;">${b.totalSantri} Santri</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${includeSignatures ? buildLaporanSignaturesHTML(printDateStr, 'koordinator') : ''}
  `;

  return { container, data };
}

function triggerMonthlyPdfDownload() {
  const result = buildMonthlyRecapReportHTML();
  if (!result) return;

  const { container, data } = result;
  const safeLabel = data.periodLabel.replace(/[^a-zA-Z0-9]/g, '_');
  const now = new Date();
  const filename = `Laporan_Rekap_Kehadiran_Bulanan_${safeLabel}_${now.toISOString().slice(0, 10)}.pdf`;

  closeMonthlyPdfExportModal();
  generateAndDownloadPDF(container, filename, `Laporan Rekapitulasi Bulanan - ${data.periodLabel}`);
}

function printMonthlyRecapReport() {
  const result = buildMonthlyRecapReportHTML();
  if (!result) return;

  const { container, data } = result;
  openPrintWindow(container.innerHTML, `Laporan Rekapitulasi Bulanan - ${data.periodLabel}`);
}

// ==============================================================================

function testConnection() {
  const url = appState.appsScriptUrl || GOOGLE_APPS_SCRIPT_URL;
  if (!url || !url.startsWith("http")) {
    showToast("Format URL di kode (GOOGLE_APPS_SCRIPT_URL) tidak valid!", "error");
    return;
  }
  showToast("Menghubungkan ke endpoint Apps Script...", "info");
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "ping", timestamp: new Date().toISOString() })
  })
  .then(r => r.json())
  .then(d => showToast("Koneksi berhasil! Respon: " + (d.message || "OK"), "success"))
  .catch(e => showToast("Gagal terhubung: " + e.message, "error"));
}

let toastTimer = null;

function showToast(message, type = "info") {
  const toast = document.getElementById('toastNotification');
  const msg = document.getElementById('toastMessage');
  const icon = document.getElementById('toastIcon');
  if (!toast || !msg) return;

  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  msg.innerText = message;
  const innerCard = toast.querySelector('div');

  if (type === "success") {
    icon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>';
    if (innerCard) {
      innerCard.className = "bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-emerald-500/50 backdrop-blur-md";
    }
  } else if (type === "error") {
    icon.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-400 text-lg animate-bounce"></i>';
    if (innerCard) {
      innerCard.className = "bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-rose-500/60 backdrop-blur-md ring-1 ring-rose-500/30";
    }
  } else if (type === "warning") {
    icon.innerHTML = '<i class="fa-solid fa-circle-exclamation text-amber-400 text-lg"></i>';
    if (innerCard) {
      innerCard.className = "bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-amber-500/50 backdrop-blur-md";
    }
  } else {
    icon.innerHTML = '<i class="fa-solid fa-circle-info text-blue-400 text-lg"></i>';
    if (innerCard) {
      innerCard.className = "bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-700 backdrop-blur-md";
    }
  }

  toast.classList.remove('opacity-0', '-translate-y-24', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-24', 'pointer-events-none');
    toastTimer = null;
  }, 4000);
}

function showValidationError(elementId, message) {
  showToast(message, "error");
  if (!elementId) return;

  const el = document.getElementById(elementId);
  if (!el) return;

  // Scroll smoothly to the target field
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Focus the element if possible
  setTimeout(() => {
    try {
      el.focus();
    } catch (e) {}
  }, 150);

  // Add highlighted invalid field styling
  el.classList.add('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/40');

  const clearHighlight = () => {
    el.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500', 'bg-rose-50/40');
    el.removeEventListener('input', clearHighlight);
    el.removeEventListener('change', clearHighlight);
    el.removeEventListener('click', clearHighlight);
  };

  el.addEventListener('input', clearHighlight);
  el.addEventListener('change', clearHighlight);
  el.addEventListener('click', clearHighlight);

  setTimeout(clearHighlight, 4500);
}

// =========================================================================
// WHATSAPP WEEKLY ATTENDANCE RECAP & INTENT API SHARING SYSTEM
// =========================================================================

let currentWaPreset = 'last7days';

function openWeeklyWhatsAppModal() {
  const modal = document.getElementById('weeklyWhatsAppModal');
  if (!modal) return;

  // Populate list of teachers into the modal dropdown
  const teacherSelect = document.getElementById('waRecapTeacherFilter');
  if (teacherSelect) {
    const teachers = new Set();
    (appState.jadwalTakhossus || []).forEach(j => { if (j.ustadz) teachers.add(j.ustadz.trim()); });
    (appState.jadwalAngkatan || []).forEach(j => { if (j.ustadz) teachers.add(j.ustadz.trim()); });
    (appState.history || []).forEach(h => { if (h.namaUstadz) teachers.add(h.namaUstadz.trim()); });

    let opts = '<option value="all">-- Semua Asatidz --</option>';
    Array.from(teachers).sort().forEach(t => {
      opts += `<option value="${t}">${t}</option>`;
    });
    teacherSelect.innerHTML = opts;
  }

  // Set default preset to last 7 days
  setWhatsAppPeriodPreset('last7days', false);

  // Refresh preview
  onWhatsAppRecapConfigChange();

  // Check Web Share API availability
  const nativeBtn = document.getElementById('btnWaNativeShare');
  if (nativeBtn) {
    if (navigator.share) {
      nativeBtn.classList.remove('hidden');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeWeeklyWhatsAppModal() {
  const modal = document.getElementById('weeklyWhatsAppModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Setup ESC key listener for WhatsApp modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeWeeklyWhatsAppModal();
  }
});
const waModalBackdrop = document.getElementById('weeklyWhatsAppModal');
if (waModalBackdrop) {
  waModalBackdrop.addEventListener('click', (e) => {
    if (e.target === waModalBackdrop) {
      closeWeeklyWhatsAppModal();
    }
  });
}

function setWhatsAppPeriodPreset(preset, triggerChange = true) {
  currentWaPreset = preset;

  // Highlight active preset button
  document.querySelectorAll('.wa-preset-btn').forEach(btn => {
    btn.className = 'wa-preset-btn px-2.5 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-center';
  });
  const activeBtn = document.getElementById('waPreset_' + preset);
  if (activeBtn) {
    activeBtn.className = 'wa-preset-btn px-2.5 py-1.5 text-xs font-bold rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-800 transition text-center';
  }

  const now = new Date();
  const formatYMD = (d) => d.toISOString().slice(0, 10);

  let startDateStr = "";
  let endDateStr = formatYMD(now);

  if (preset === 'last7days') {
    const past = new Date(now);
    past.setDate(past.getDate() - 6);
    startDateStr = formatYMD(past);
  } else if (preset === 'thisWeek') {
    const day = now.getDay(); // 0: Sun, 1: Mon, ...
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const monday = new Date(now);
    monday.setDate(monday.getDate() + diffToMonday);
    startDateStr = formatYMD(monday);
  } else if (preset === 'lastWeek') {
    const day = now.getDay();
    const diffToPrevMonday = (day === 0 ? -6 : 1) - day - 7;
    const prevMonday = new Date(now);
    prevMonday.setDate(prevMonday.getDate() + diffToPrevMonday);
    const prevSunday = new Date(prevMonday);
    prevSunday.setDate(prevMonday.getDate() + 6);
    startDateStr = formatYMD(prevMonday);
    endDateStr = formatYMD(prevSunday);
  } else if (preset === 'thisMonth') {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    startDateStr = formatYMD(firstDay);
  }

  const startInput = document.getElementById('waRecapStartDate');
  const endInput = document.getElementById('waRecapEndDate');
  if (startInput) startInput.value = startDateStr;
  if (endInput) endInput.value = endDateStr;

  if (triggerChange) {
    onWhatsAppRecapConfigChange();
  }
}

function onWhatsAppRecapConfigChange() {
  const startDate = document.getElementById('waRecapStartDate')?.value || "";
  const endDate = document.getElementById('waRecapEndDate')?.value || "";
  const category = document.getElementById('waRecapCategoryFilter')?.value || "all";
  const teacher = document.getElementById('waRecapTeacherFilter')?.value || "all";
  const incStats = document.getElementById('waOptStats')?.checked ?? true;
  const incTeachers = document.getElementById('waOptTeachers')?.checked ?? true;
  const incDaily = document.getElementById('waOptDaily')?.checked ?? true;

  const recapText = generateWeeklyRecapText({
    startDate,
    endDate,
    category,
    teacher,
    incStats,
    incTeachers,
    incDaily
  });

  const previewEl = document.getElementById('waRecapPreviewText');
  if (previewEl) {
    previewEl.value = recapText;
  }
}

function generateWeeklyRecapText(config = {}) {
  const {
    startDate = "",
    endDate = "",
    category = "all",
    teacher = "all",
    incStats = true,
    incTeachers = true,
    incDaily = true
  } = config;

  // Filter history records based on parameters
  const filtered = (appState.history || []).filter(item => {
    if (startDate && item.tanggal < startDate) return false;
    if (endDate && item.tanggal > endDate) return false;
    if (category !== "all" && item.type !== category) return false;
    if (teacher !== "all" && (item.namaUstadz || "").trim() !== teacher.trim()) return false;
    return true;
  }).sort((a, b) => {
    // Sort chronologically ascending
    const dComp = (a.tanggal || "").localeCompare(b.tanggal || "");
    if (dComp !== 0) return dComp;
    return (a.timestamp || "").localeCompare(b.timestamp || "");
  });

  // Update badge
  const badgeEl = document.getElementById('waRecapStatsBadge');
  if (badgeEl) {
    badgeEl.innerText = `${filtered.length} Sesi Terdata`;
  }

  // Format date range text for header
  const formatIndoDate = (dateStr) => {
    if (!dateStr) return "-";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
  };

  const periodText = (startDate && endDate) 
    ? `${formatIndoDate(startDate)} s/d ${formatIndoDate(endDate)}`
    : (startDate ? `Mulai ${formatIndoDate(startDate)}` : (endDate ? `Sampai ${formatIndoDate(endDate)}` : 'Semua Periode Tercatat'));

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
  const todayStr = formatIndoDate(now.toISOString().slice(0, 10));

  let text = "";

  // 1. HEADER
  text += `📚 *RINGKASAN ABSENSI MINGGUAN KUTUBUTTURATS*\n`;
  text += `*MA'HAD AL-AQSHA KUDUS*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📅 *Periode:* ${periodText}\n`;
  text += `⏰ *Waktu Cetak:* ${todayStr}, ${timeStr}\n`;
  if (category !== "all") {
    text += `🏷️ *Program:* ${category === "takhossus" ? "Hanya Takhossus" : "Hanya Kajian Angkatan"}\n`;
  }
  if (teacher !== "all") {
    text += `👤 *Ustadz:* ${teacher}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (filtered.length === 0) {
    text += `⚠️ _Belum ada data absensi yang tercatat pada rentang periode ini._\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `✅ _Sistem Informasi & Absensi Kutubutturats Ma'had Al-Aqsha_`;
    return text;
  }

  // Aggregations
  let totalTakhossus = 0;
  let totalAngkatan = 0;
  let totalSantriHadir = 0;
  let totalSantriTerdaftar = 0;
  let totalIzin = 0;
  let totalSakit = 0;
  let totalAlpha = 0;

  const teacherMap = {};
  const dailyMap = {};

  filtered.forEach(r => {
    const uName = (r.namaUstadz || "Tanpa Nama").trim();
    if (!teacherMap[uName]) {
      teacherMap[uName] = {
        name: uName,
        takhossusCount: 0,
        angkatanCount: 0,
        totalSesi: 0,
        totalHadir: 0,
        kitabSet: new Set()
      };
    }

    if (r.kitab) teacherMap[uName].kitabSet.add(r.kitab);

    if (r.type === "takhossus") {
      totalTakhossus++;
      teacherMap[uName].takhossusCount++;
      const hadir = Number(r.totalHadir || 0);
      const total = Number(r.totalSantri || hadir);
      totalSantriHadir += hadir;
      totalSantriTerdaftar += total;
      totalIzin += Number(r.totalIzin || 0);
      totalSakit += Number(r.totalSakit || 0);
      totalAlpha += Number(r.totalAlpha || 0);
      teacherMap[uName].totalHadir += hadir;
    } else {
      totalAngkatan++;
      teacherMap[uName].angkatanCount++;
      const jamaah = Number(r.totalJamaah || r.totalHadir || 0);
      totalSantriHadir += jamaah;
      totalSantriTerdaftar += jamaah;
      teacherMap[uName].totalHadir += jamaah;
    }
    teacherMap[uName].totalSesi++;

    // Grouping by Date
    const dKey = r.tanggal || "Tanpa Tanggal";
    if (!dailyMap[dKey]) {
      dailyMap[dKey] = {
        date: dKey,
        dayName: r.hari || getIndonesianDayName(dKey),
        records: []
      };
    }
    dailyMap[dKey].records.push(r);
  });

  const totalAllSesi = filtered.length;
  const avgAttendance = totalAllSesi > 0 ? (totalSantriHadir / totalAllSesi).toFixed(1) : "0";
  const takPercentage = totalSantriTerdaftar > 0 && totalTakhossus > 0 
    ? Math.round((totalSantriHadir / totalSantriTerdaftar) * 100) 
    : 100;

  // 2. STATISTIK RINGKASAN PEKANAN
  if (incStats) {
    text += `📊 *RINGKASAN STATISTIK PEKANAN*\n`;
    text += `• Total Sesi Terlaksana: *${totalAllSesi} Sesi*\n`;
    if (totalTakhossus > 0) text += `  └ Takhossus: *${totalTakhossus} Sesi*\n`;
    if (totalAngkatan > 0) text += `  └ Kajian Angkatan: *${totalAngkatan} Sesi*\n`;
    text += `• Akumulasi Santri Hadir: *${totalSantriHadir} Santri*\n`;
    text += `• Rata-rata Kehadiran: *${avgAttendance} Santri/Sesi*\n`;
    if (totalTakhossus > 0 && (totalIzin > 0 || totalSakit > 0 || totalAlpha > 0)) {
      text += `• Total Izin/Sakit/Alfa: *${totalIzin + totalSakit + totalAlpha} Santri* (S: ${totalSakit}, I: ${totalIzin}, A: ${totalAlpha})\n`;
    }
    text += `\n`;
  }

  // 3. REKAP KEHADIRAN ASATIDZ
  if (incTeachers) {
    const teacherList = Object.values(teacherMap).sort((a, b) => b.totalSesi - a.totalSesi);
    text += `👨‍🏫 *REKAP KEHADIRAN ASATIDZ (${teacherList.length} Pengajar)*\n`;
    teacherList.forEach((t, idx) => {
      const kitabStr = Array.from(t.kitabSet).join(", ") || "-";
      text += `${idx + 1}. *${t.name}* (${t.totalSesi} Sesi)\n`;
      text += `   📖 Kitab: _${kitabStr}_\n`;
      text += `   👥 Akumulasi Hadir: ${t.totalHadir} santri\n`;
    });
    text += `\n`;
  }

  // 4. RINCIAN HARIAN
  if (incDaily) {
    text += `📖 *RINCIAN KAJIAN HARIAN*\n`;
    Object.values(dailyMap).forEach((dayObj) => {
      const formattedDate = formatIndoDate(dayObj.date);
      text += `\n🗓️ *${dayObj.dayName}, ${formattedDate}*\n`;
      dayObj.records.forEach((rec, idx) => {
        const isTak = rec.type === "takhossus";
        const programTag = isTak ? `[Takhossus - ${rec.tingkat || 'Ula'}]` : `[Angkatan - ${rec.kelas || 'Umum'}]`;
        const hadirStr = isTak ? `${rec.totalHadir}/${rec.totalSantri || rec.totalHadir} Santri` : `${rec.totalJamaah || rec.totalHadir} Jamaah`;
        
        text += `${idx + 1}. *${programTag}*\n`;
        text += `   👤 Ustadz: *${rec.namaUstadz || '-'}*\n`;
        text += `   📚 Kitab: _${rec.kitab || '-'}_${rec.materi ? ` (Bab: ${rec.materi})` : ''}\n`;
        text += `   👥 Kehadiran: *${hadirStr}*\n`;
        if (isTak && (rec.totalSakit > 0 || rec.totalIzin > 0 || rec.totalAlpha > 0)) {
          const notes = [];
          if (rec.totalSakit > 0) notes.push(`Sakit: ${rec.totalSakit}`);
          if (rec.totalIzin > 0) notes.push(`Izin: ${rec.totalIzin}`);
          if (rec.totalAlpha > 0) notes.push(`Alfa: ${rec.totalAlpha}`);
          text += `   ⚠️ Keterangan: ${notes.join(', ')}\n`;
        }
        if (rec.catatan && rec.catatan.trim()) {
          text += `   📝 Catatan: _${rec.catatan.trim()}_\n`;
        }
      });
    });
    text += `\n`;
  }

  // 5. FOOTER
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `✅ _Laporan resmi digenerate otomatis melalui Sistem Informasi & Absensi Kutubutturats Ma'had Al-Aqsha Kudus_`;

  return text;
}

function shareWeeklyRecapToWhatsApp() {
  const text = document.getElementById('waRecapPreviewText')?.value || generateWeeklyRecapText();
  if (!text.trim()) {
    showToast("Tidak ada teks ringkasan untuk dibagikan!", "warning");
    return;
  }

  const encoded = encodeURIComponent(text);
  // Standard WhatsApp Web & App Intent API URL
  const waUrl = "https://api.whatsapp.com/send?text=" + encoded;

  showToast("Membuka WhatsApp untuk mengirim ringkasan...", "info");

  // Open WhatsApp Intent
  const win = window.open(waUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    // Fallback if popup blocked
    window.location.href = waUrl;
  }
}

function copyWeeklyRecapText() {
  const text = document.getElementById('waRecapPreviewText')?.value || "";
  if (!text.trim()) {
    showToast("Tidak ada teks untuk disalin!", "warning");
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast("Teks ringkasan mingguan berhasil disalin ke clipboard! Silakan tempel di grup WhatsApp.", "success");
      })
      .catch(() => {
        fallbackCopyText(text);
      });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Teks ringkasan mingguan berhasil disalin ke clipboard!", "success");
  } catch (err) {
    showToast("Gagal menyalin teks secara otomatis. Silakan salin manual dari kotak preview.", "error");
  }
  document.body.removeChild(textArea);
}

function shareWeeklyRecapViaNative() {
  const text = document.getElementById('waRecapPreviewText')?.value || "";
  if (!text.trim()) {
    showToast("Tidak ada teks ringkasan untuk dibagikan!", "warning");
    return;
  }

  if (navigator.share) {
    navigator.share({
      title: "Ringkasan Absensi Mingguan Kutubutturats Ma'had Al-Aqsha",
      text: text
    }).then(() => {
      showToast("Berhasil membagikan ringkasan absensi!", "success");
    }).catch((err) => {
      if (err.name !== 'AbortError') {
        console.warn("Share failed:", err);
      }
    });
  } else {
    copyWeeklyRecapText();
  }
}


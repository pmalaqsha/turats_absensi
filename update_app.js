const fs = require('fs');

// Data master from PDF Santri TDK
const santriTakhossusMaster = [
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

// Data Jadwal Takhossus dari PDF Jadwal Kajian Takhossus
const jadwalTakhossusMaster = [
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

// Data Jadwal Kajian Angkatan dari PDF Jadwal Kajian Kitab Per-Angkatan
const jadwalAngkatanMaster = [
  { no: 1, kelas: "1 Putra", kitab: "Safinatu Naja", ustadz: "Angga Rizinida Fuzan, S.Sos", waktu: "Kamis (sore)", hari: "Kamis", tempat: "Aula Putra" },
  { no: 2, kelas: "1 Putri", kitab: "Risalatul Mahidl", ustadz: "Ayu Evita Maulid S. J, S.Sos", waktu: "Senin (sore)", hari: "Senin", tempat: "Aula Math'am Putri (lt.2)" },
  { no: 3, kelas: "2 Putra", kitab: "Ta'limul Muta'allim", ustadz: "Gus Ahmad Maulana Ishaq, S.Sos", waktu: "Selasa (Malam)", hari: "Selasa", tempat: "Masjid" },
  { no: 4, kelas: "2 Putri", kitab: "Safinatu Naja", ustadz: "Wildan Arifin, S.Hum", waktu: "Selasa (Sore)", hari: "Selasa", tempat: "Aula Math'am Putri (lt.2)" },
  { no: 5, kelas: "3 Putra", kitab: "Bidayatul Hidayah", ustadz: "Ahmad Yusup, S.Pd.", waktu: "Rabu (sore)", hari: "Rabu", tempat: "Masjid" },
  { no: 6, kelas: "3 Putri", kitab: "Bidayatul Hidayah", ustadz: "Ai Syaripah, M.Ag.", waktu: "Rabu (sore)", hari: "Rabu", tempat: "Aula Math'am Putri (lt.2)" },
  { no: 7, kelas: "4 Pa & Pi", kitab: "Ayyuhal Walad", ustadz: "M. Mujabun, M.Pd", waktu: "Sabtu (sore)", hari: "Sabtu", tempat: "Masjid" },
  { no: 8, kelas: "5 Pa & Pi", kitab: "Minhajul Arifin", ustadz: "Cical Irmansyah, Lc, M.Ag", waktu: "Kamis (sore)", hari: "Kamis", tempat: "masjid" },
  { no: 9, kelas: "6 Pa & Pi", kitab: "Nashoih Ad-Diniyah", ustadz: "Dr. KH. Mukhlis Aliyudin, M.Ag.", waktu: "Senin (Malam)", hari: "Senin", tempat: "Masjid" },
  { no: 10, kelas: "6 Pa & Pi", kitab: "Hadits Arba'in", ustadz: "M. Rifqi M.Ag", waktu: "Senin (Sore)", hari: "Senin", tempat: "Masjid" }
];

console.log("Master data successfully structured");

/**
 * =========================================================================
 * GOOGLE APPS SCRIPT BACKEND - SISTEM ABSENSI KUTUBUTTURATS MA'HAD AL-AQSHA
 * =========================================================================
 * 
 * Fitur & Otomasi:
 * 1. Penyimpanan Foto Bukti Kamera langsung ke Google Drive Folder
 * 2. Deduplikasi Data Otomatis: Dalam 1 hari, 1 guru hanya memiliki 1 baris
 *    absensi takhossus dan 1 baris absensi angkatan (data terupdate otomatis)
 * 3. Sheet "Absensi_Takhossus" & "Absensi_Angkatan" untuk log detail
 * 4. Sheet Otomatis "rekap absen harian": Rekapitulasi daftar guru hadir harian
 * 5. Sheet Otomatis "rekap asbsensi angkatan": Rekapitulasi jumlah kehadiran ustadz angkatan per bulan
 */

// Ganti dengan Folder ID Google Drive untuk penyimpanan foto bukti (opsional)
const FOLDER_ID = "1vnB_tkw4DQMtuSCIDiyoMIZUJ9ceXx_t";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No POST data received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const postData = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Ping check / Test koneksi
    if (postData.type === "ping") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Endpoint Google Apps Script aktif dan terhubung."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Simpan Foto Bukti ke Google Drive jika ada
    let fileUrl = "-";
    if (postData.fotoBukti && postData.fotoBukti.startsWith("data:image")) {
      try {
        const splitBase = postData.fotoBukti.split(",");
        const contentType = splitBase[0].split(":")[1].split(";")[0];
        const bytes = Utilities.base64Decode(splitBase[1]);
        const safeUstadz = (postData.namaUstadz || "Ustadz").replace(/[^a-zA-Z0-9]/g, "_");
        const fileName = `Absensi_${postData.type}_${postData.tanggal}_${safeUstadz}.jpg`;
        const blob = Utilities.newBlob(bytes, contentType, fileName);
        
        let folder;
        if (FOLDER_ID && FOLDER_ID !== "MASUKKAN_ID_FOLDER_GOOGLE_DRIVE_DISINI" && FOLDER_ID.trim() !== "") {
          folder = DriveApp.getFolderById(FOLDER_ID.trim());
        } else {
          folder = DriveApp.getRootFolder();
        }
        
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (errDrive) {
        fileUrl = "Gagal upload Drive: " + errDrive.toString();
      }
    }

    // 2. Simpan Data Absensi dengan Deduplikasi (1 Hari 1 Guru per Tipe)
    if (postData.type === "takhossus") {
      saveTakhossusWithDeduplication(ss, postData, fileUrl);
    } else if (postData.type === "reguler") {
      saveAngkatanWithDeduplication(ss, postData, fileUrl);
    }

    // 3. Update Rekapitulasi Otomatis
    updateRekapAbsenHarian(ss);
    updateRekapAbsensiAngkatan(ss);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      id: postData.id,
      fileUrl: fileUrl,
      message: "Data absensi & rekapitulasi otomatis berhasil diperbarui."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Simpan Absensi Takhossus dengan Deduplikasi (Update jika Tanggal & Guru sama)
 */
function saveTakhossusWithDeduplication(ss, data, fileUrl) {
  let sheet = ss.getSheetByName("Absensi_Takhossus");
  if (!sheet) {
    sheet = ss.insertSheet("Absensi_Takhossus");
    sheet.appendRow([
      "Timestamp", "ID Sesi", "Tanggal", "Hari", "Sesi", 
      "Pembina/Ustadz", "Kitab", "Materi", 
      "Total Hadir", "Total Izin", "Total Sakit", "Total Alfa", "Total Santri", 
      "Detail Kehadiran Santri", "Catatan", "Link Foto Drive"
    ]);
    sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#D1FAE5").setFontColor("#065F46");
    sheet.setFrozenRows(1);
  }

  const detailText = (data.detailSantri || [])
    .map(s => `${s.name} (${s.status})`)
    .join("; ");

  const rowValues = [
    new Date(),
    data.id,
    data.tanggal,
    data.hari,
    data.sesi || "Sore",
    data.namaUstadz,
    data.kitab,
    data.materi || "-",
    data.totalHadir || 0,
    data.totalIzin || 0,
    data.totalSakit || 0,
    data.totalAlfa || 0,
    data.totalSantri || 0,
    detailText,
    data.catatan || "-",
    fileUrl
  ];

  const lastRow = sheet.getLastRow();
  let existingRow = -1;

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
    for (let i = 0; i < dataRange.length; i++) {
      const rowTanggal = formatDateToString(dataRange[i][2]);
      const rowUstadz = (dataRange[i][5] || "").toString().trim();
      if (rowTanggal === formatDateToString(data.tanggal) && rowUstadz.toLowerCase() === (data.namaUstadz || "").trim().toLowerCase()) {
        existingRow = i + 2;
        break;
      }
    }
  }

  if (existingRow > 0) {
    // Update baris yang sudah ada (mencegah duplikasi data guru pada hari yang sama)
    sheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    // Tambah baris baru
    sheet.appendRow(rowValues);
  }
}

/**
 * Simpan Absensi Angkatan dengan Deduplikasi (Update jika Tanggal & Guru sama)
 */
function saveAngkatanWithDeduplication(ss, data, fileUrl) {
  let sheet = ss.getSheetByName("Absensi_Angkatan");
  if (!sheet) {
    sheet = ss.insertSheet("Absensi_Angkatan");
    sheet.appendRow([
      "Timestamp", "ID Sesi", "Tanggal", "Hari", 
      "Pengajar/Ustadz", "Kelas/Angkatan", "Kitab", "Waktu & Tempat", 
      "Jumlah Jamaah Hadir", "Materi", "Catatan", "Link Foto Drive"
    ]);
    sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#CCFBF1").setFontColor("#0F766E");
    sheet.setFrozenRows(1);
  }

  const rowValues = [
    new Date(),
    data.id,
    data.tanggal,
    data.hari,
    data.namaUstadz,
    data.kelas || "-",
    data.kitab,
    data.waktuTempat || "-",
    data.totalJamaah || 0,
    data.materi || "-",
    data.catatan || "-",
    fileUrl
  ];

  const lastRow = sheet.getLastRow();
  let existingRow = -1;

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
    for (let i = 0; i < dataRange.length; i++) {
      const rowTanggal = formatDateToString(dataRange[i][2]);
      const rowUstadz = (dataRange[i][4] || "").toString().trim();
      if (rowTanggal === formatDateToString(data.tanggal) && rowUstadz.toLowerCase() === (data.namaUstadz || "").trim().toLowerCase()) {
        existingRow = i + 2;
        break;
      }
    }
  }

  if (existingRow > 0) {
    // Update baris yang sudah ada
    sheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    // Tambah baris baru
    sheet.appendRow(rowValues);
  }
}

/**
 * Rekapitulasi Otomatis: "rekap absen harian"
 * Menampilkan daftar guru yang hadir setiap harinya
 */
function updateRekapAbsenHarian(ss) {
  let rekapSheet = ss.getSheetByName("rekap absen harian");
  if (!rekapSheet) {
    rekapSheet = ss.insertSheet("rekap absen harian");
  } else {
    rekapSheet.clear();
  }

  // Header Table
  const headers = [
    "No",
    "Tanggal",
    "Hari",
    "Total Guru Hadir",
    "Daftar Guru Hadir (Takhossus)",
    "Daftar Guru Hadir (Kajian Angkatan)",
    "Semua Guru Hadir Hari Ini",
    "Total Sesi Kajian",
    "Terakhir Diperbarui"
  ];
  
  rekapSheet.appendRow(headers);
  rekapSheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#065F46")
    .setFontColor("#FFFFFF")
    .setHorizontalAlignment("center");
  rekapSheet.setFrozenRows(1);

  // Map pengumpulan data per tanggal
  const dailyMap = {};

  // Baca Sheet Takhossus
  const sheetTak = ss.getSheetByName("Absensi_Takhossus");
  if (sheetTak && sheetTak.getLastRow() > 1) {
    const takData = sheetTak.getRange(2, 1, sheetTak.getLastRow() - 1, 6).getValues();
    takData.forEach(row => {
      const tgl = formatDateToString(row[2]);
      const hari = (row[3] || "").toString().trim();
      const ustadz = (row[5] || "").toString().trim();
      if (!tgl || !ustadz) return;

      if (!dailyMap[tgl]) {
        dailyMap[tgl] = { tanggal: tgl, hari: hari, takhossus: [], angkatan: [] };
      }
      if (!dailyMap[tgl].takhossus.includes(ustadz)) {
        dailyMap[tgl].takhossus.push(ustadz);
      }
    });
  }

  // Baca Sheet Angkatan
  const sheetAng = ss.getSheetByName("Absensi_Angkatan");
  if (sheetAng && sheetAng.getLastRow() > 1) {
    const angData = sheetAng.getRange(2, 1, sheetAng.getLastRow() - 1, 5).getValues();
    angData.forEach(row => {
      const tgl = formatDateToString(row[2]);
      const hari = (row[3] || "").toString().trim();
      const ustadz = (row[4] || "").toString().trim();
      if (!tgl || !ustadz) return;

      if (!dailyMap[tgl]) {
        dailyMap[tgl] = { tanggal: tgl, hari: hari, takhossus: [], angkatan: [] };
      }
      if (!dailyMap[tgl].angkatan.includes(ustadz)) {
        dailyMap[tgl].angkatan.push(ustadz);
      }
    });
  }

  // Urutkan tanggal dari yang terbaru
  const sortedDates = Object.keys(dailyMap).sort().reverse();
  const rows = [];

  sortedDates.forEach((tgl, index) => {
    const item = dailyMap[tgl];
    const allTeachers = Array.from(new Set([...item.takhossus, ...item.angkatan]));
    const totalSesi = item.takhossus.length + item.angkatan.length;

    rows.push([
      index + 1,
      tgl,
      item.hari || getDayFromDate(tgl),
      allTeachers.length,
      item.takhossus.length > 0 ? item.takhossus.join(", ") : "-",
      item.angkatan.length > 0 ? item.angkatan.join(", ") : "-",
      allTeachers.join(", "),
      totalSesi,
      new Date()
    ]);
  });

  if (rows.length > 0) {
    rekapSheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
    
    // Styling & Alignment
    rekapSheet.getRange(2, 1, rows.length, 1).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 2, rows.length, 2).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 4, rows.length, 1).setHorizontalAlignment("center").setFontWeight("bold");
    rekapSheet.getRange(2, 8, rows.length, 1).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 9, rows.length, 1).setHorizontalAlignment("center");

    // Alternating row colors
    for (let r = 2; r <= rows.length + 1; r++) {
      if (r % 2 === 0) {
        rekapSheet.getRange(r, 1, 1, headers.length).setBackground("#F0FDF4");
      }
    }
  }

  // Auto-resize columns
  for (let c = 1; c <= headers.length; c++) {
    rekapSheet.autoResizeColumn(c);
  }
}

/**
 * Rekapitulasi Otomatis: "rekap asbsensi angkatan"
 * Merekap jumlah kehadiran ustadz angkatan dalam satu bulan
 */
function updateRekapAbsensiAngkatan(ss) {
  let rekapSheet = ss.getSheetByName("rekap asbsensi angkatan");
  if (!rekapSheet) {
    rekapSheet = ss.insertSheet("rekap asbsensi angkatan");
  } else {
    rekapSheet.clear();
  }

  const headers = [
    "No",
    "Bulan & Tahun",
    "Nama Ustadz Pengajar Angkatan",
    "Kelas & Kitab",
    "Jumlah Kehadiran (Sesi)",
    "Daftar Tanggal Hadir",
    "Total Jamaah Hadir",
    "Rata-rata Jamaah/Sesi",
    "Status Keaktifan",
    "Terakhir Diperbarui"
  ];

  rekapSheet.appendRow(headers);
  rekapSheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#0F766E")
    .setFontColor("#FFFFFF")
    .setHorizontalAlignment("center");
  rekapSheet.setFrozenRows(1);

  const sheetAng = ss.getSheetByName("Absensi_Angkatan");
  if (!sheetAng || sheetAng.getLastRow() <= 1) {
    for (let c = 1; c <= headers.length; c++) rekapSheet.autoResizeColumn(c);
    return;
  }

  const data = sheetAng.getRange(2, 1, sheetAng.getLastRow() - 1, 10).getValues();
  // Grouping: Key = "YYYY-MM__NamaUstadz"
  const monthlyMap = {};

  data.forEach(row => {
    const tgl = formatDateToString(row[2]);
    if (!tgl) return;
    const ustadz = (row[4] || "").toString().trim();
    if (!ustadz) return;

    const monthKey = tgl.substring(0, 7); // "YYYY-MM"
    const groupKey = monthKey + "__" + ustadz;
    const kelas = (row[5] || "").toString().trim();
    const kitab = (row[6] || "").toString().trim();
    const jamaah = parseInt(row[8]) || 0;

    if (!monthlyMap[groupKey]) {
      monthlyMap[groupKey] = {
        monthKey: monthKey,
        monthLabel: formatMonthLabel(monthKey),
        ustadz: ustadz,
        kelasKitabSet: new Set(),
        dates: [],
        totalJamaah: 0,
        count: 0
      };
    }

    if (kelas || kitab) {
      monthlyMap[groupKey].kelasKitabSet.add(`${kelas} (${kitab})`);
    }
    if (!monthlyMap[groupKey].dates.includes(tgl)) {
      monthlyMap[groupKey].dates.push(tgl);
    }
    monthlyMap[groupKey].count += 1;
    monthlyMap[groupKey].totalJamaah += jamaah;
  });

  // Sort by Month descending, then ustadz name
  const sortedKeys = Object.keys(monthlyMap).sort((a, b) => {
    const [monthA, ustadzA] = a.split("__");
    const [monthB, ustadzB] = b.split("__");
    if (monthA !== monthB) return monthB.localeCompare(monthA);
    return ustadzA.localeCompare(ustadzB);
  });

  const rows = [];
  sortedKeys.forEach((key, index) => {
    const item = monthlyMap[key];
    const avgJamaah = item.count > 0 ? Math.round(item.totalJamaah / item.count) : 0;
    const status = item.count >= 4 ? "Sangat Aktif (≥4 Sesi)" : (item.count >= 2 ? "Aktif" : "Perlu Ditingkatkan");

    rows.push([
      index + 1,
      item.monthLabel,
      item.ustadz,
      Array.from(item.kelasKitabSet).join("; ") || "-",
      item.count,
      item.dates.sort().join(", "),
      item.totalJamaah,
      avgJamaah,
      status,
      new Date()
    ]);
  });

  if (rows.length > 0) {
    rekapSheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    // Formatting
    rekapSheet.getRange(2, 1, rows.length, 1).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 2, rows.length, 1).setHorizontalAlignment("center").setFontWeight("bold");
    rekapSheet.getRange(2, 5, rows.length, 1).setHorizontalAlignment("center").setFontWeight("bold");
    rekapSheet.getRange(2, 7, rows.length, 2).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 9, rows.length, 1).setHorizontalAlignment("center");
    rekapSheet.getRange(2, 10, rows.length, 1).setHorizontalAlignment("center");

    for (let r = 2; r <= rows.length + 1; r++) {
      if (r % 2 === 0) {
        rekapSheet.getRange(r, 1, 1, headers.length).setBackground("#F0FDFA");
      }
    }
  }

  // Auto-resize columns
  for (let c = 1; c <= headers.length; c++) {
    rekapSheet.autoResizeColumn(c);
  }
}

/**
 * Helper: Format tanggal menjadi YYYY-MM-DD
 */
function formatDateToString(val) {
  if (!val) return "";
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone() || "Asia/Jakarta", "yyyy-MM-dd");
  }
  const str = val.toString().trim();
  if (str.length >= 10 && str.charAt(4) === '-' && str.charAt(7) === '-') {
    return str.substring(0, 10);
  }
  return str;
}

/**
 * Helper: Label Bulan & Tahun dalam Bahasa Indonesia (contoh: "September 2026")
 */
function formatMonthLabel(monthKey) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const parts = monthKey.split("-");
  if (parts.length === 2) {
    const mIndex = parseInt(parts[1], 10) - 1;
    return `${months[mIndex] || parts[1]} ${parts[0]}`;
  }
  return monthKey;
}

/**
 * Helper: Nama Hari Indonesia dari Tanggal YYYY-MM-DD
 */
function getDayFromDate(dateStr) {
  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  try {
    const d = new Date(dateStr);
    return days[d.getDay()] || "-";
  } catch (e) {
    return "-";
  }
}

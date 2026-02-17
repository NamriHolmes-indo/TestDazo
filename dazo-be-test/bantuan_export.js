import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

const BASE_DIR = path.resolve("./luaran");

function getMonthFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `rangkuman-export-${year}-${month}.xlsx`;
}

function getFilePath() {
  return path.join(BASE_DIR, getMonthFileName());
}

function ensureDir() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }
}

function getWIBTimestamp() {
  return new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

const headers = ["Tanggal (WIB)", "Nama Produk", "Pesan User", "Response AI"];

export async function simpanKeExcel(row) {
  ensureDir();

  const filePath = getFilePath();
  const workbook = new ExcelJS.Workbook();
  let sheet;

  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    sheet = workbook.getWorksheet("Data");

    if (!sheet) {
      sheet = workbook.addWorksheet("Data");
      sheet.addRow(headers);
    }
  } else {
    sheet = workbook.addWorksheet("Data");
    sheet.addRow(headers);
  }

  sheet.addRow([getWIBTimestamp(), row[1], row[2], row[3]]);

  await workbook.xlsx.writeFile(filePath);
}

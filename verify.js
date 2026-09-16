// verify.js
// 用法：node verify.js agreement.txt
//
// 计算并输出四个哈希：
//   1. 原始哈希 · keccak256
//   2. 原始哈希 · SHA-256
//   3. 内容哈希（WSCF）· keccak256
//   4. 内容哈希（WSCF）· SHA-256
//
// 依赖：ethers
//   npm i ethers

const fs = require("fs");
const { ethers } = require("ethers");

const file = process.argv[2] || "agreement.txt";

if (!fs.existsSync(file)) {
  console.error("文件不存在：" + file);
  process.exit(1);
}

const text = fs.readFileSync(file, "utf8");

// 1. 原始哈希
const rawKeccak = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text));
const rawSha256 = ethers.utils.sha256(ethers.utils.toUtf8Bytes(text));

// 2. WSCF 内容哈希（删除所有空白字符）
const wscf = text.replace(/[ \t\u3000\u00A0\u2000-\u200B\u202F\u205F\r\n]/g, "");
const wscfKeccak = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(wscf));
const wscfSha256 = ethers.utils.sha256(ethers.utils.toUtf8Bytes(wscf));

// 3. 输出
console.log("=== 原始哈希 ===");
console.log("keccak256: " + rawKeccak);
console.log("SHA-256:   " + rawSha256);
console.log("");
console.log("=== WSCF 内容哈希 ===");
console.log("keccak256: " + wscfKeccak);
console.log("SHA-256:   " + wscfSha256);

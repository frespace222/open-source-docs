// verify.js
// 用法：node verify.js agreement.txt
//
// 计算并输出四个哈希：
// 1. 原始哈希 - keccak256
// 2. 原始哈希 - SHA-256
// 3. 内容哈希（WSCF） - keccak256
// 4. 内容哈希（WSCF） - SHA-256
//
// 依赖：ethers
// npm i ethers

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

// 2. WSCF 规范化（删除所有空白字符）
// 包含：半角空格、制表符、换行、回车、全角空格、非断行空格、Unicode 各类空白
const wscfText = text.replace(/[ \t\r\n\u3000\u00A0\u2000-\u200B\u202F\u205F]/g, "");
const wscfKeccak = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(wscfText));
const wscfSha256 = ethers.utils.sha256(ethers.utils.toUtf8Bytes(wscfText));

// 3. 输出结果
console.log("=== 协议哈希验证结果 ===\n");
console.log("文件：" + file);
console.log("字节数：" + Buffer.byteLength(text, "utf8"));
console.log("字符数：" + text.length + "\n");

console.log("--- 原始哈希 ---");
console.log("keccak256: " + rawKeccak);
console.log("SHA-256:   " + rawSha256 + "\n");

console.log("--- WSCF 内容哈希（删除所有空白）---");
console.log("keccak256: " + wscfKeccak);
console.log("SHA-256:   " + wscfSha256 + "\n");

console.log("--- 验证方法 ---");
console.log("将上述四个哈希值与 agreement-hash-record.txt 中的值逐一比对。");
console.log("全部一致，则协议内容未被篡改。");

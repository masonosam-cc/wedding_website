// 纯静态站点「构建」脚本：把真正用到的文件复制到 dist/
// 无任何第三方依赖，Node 16.7+ 即可运行。
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const out = join(root, 'dist');

// 需要发布的文件白名单（只发这些，避免把 zip、设计源图、备份等带上线）
const files = [
  'index.html',
  'styles.css',
  'script.js',
  '婚礼流程图/01-入住.png',
  '婚礼流程图/02-签到.png',
  '婚礼流程图/03-仪式.png',
  '婚礼流程图/04-晚宴.png',
  '婚礼流程图/05-afterparty.png',
  '请柬主图/主图背景.png',
  '酒店信息/酒店前景.webp',
  '酒店信息/酒店logo-white.png',
  '酒店信息/酒店地图1.jpg',
  '酒店信息/酒店地图2.jpg',
  '酒店信息/CDF中免穿梭巴士预约二维码.jpg',
  // 可选：RSVP 问卷二维码（不存在会自动跳过，页面也会自动隐藏该图）
  '酒店信息/RSVP二维码占位.png',
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let copied = 0;
for (const f of files) {
  const src = join(root, f);
  if (!existsSync(src)) {
    console.warn('· 跳过（文件不存在）:', f);
    continue;
  }
  const dest = join(out, f);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
  copied++;
}

console.log(`\n✅ 构建完成：已复制 ${copied} 个文件到 dist/`);
console.log('   ESA 部署时请把「输出/发布目录」设置为 dist');

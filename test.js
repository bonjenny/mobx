function extractZone(raw) {
  const is_cn_domain = /\.xdomain\.cn(:\d+)?$/.test(raw); // 도메인이 xdomain.cn인지

  if (is_cn_domain) {
    return 'f';
  }

  const match = raw
    .replace(/:\d+$/, '')                         // 포트 제거
    .replace(/\.(xdomain\.com|xdomain\.cn)$/, '')   // 도메인 제거
    .replace(/-dev$/, '')                         // -dev 제거
    .replace(/lx/g, '')                           // lx 제거
    .replace(/^(login|stage|zeus\d{2})/, '')      // 접두사 제거
    .replace(/(\D)\d+$/, '$1')                    // 존 뒤 숫자 제거 (ba1 → ba)
    .match(/(ba|e|f)$/);                          // ba, e, f만 추출

  return match?.[1] ?? null;
}

function isFZone(raw) {
  return extractZone(raw) === 'f';
}

const hosts = [
  'login.xdomain.cn', 'loginlxba1-dev.xdomain.com', 'stagef1-dev.xdomain.cn',
  'zeus03lxf1.xdomain.cn', 'zeus02lxe3-dev.xdomain.com', 'test-dev.xdomain.cn:5000'
];

for (const host of hosts) {
  console.log(`===============`);
  console.log(`원본: ${host}`);
  console.log(`  zone: ${extractZone(host)}`);
  console.log(`  isFZone: ${isFZone(host)}`);
}

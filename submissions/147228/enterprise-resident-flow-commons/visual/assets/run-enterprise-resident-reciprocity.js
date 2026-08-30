const fs = require('fs');
const path = require('path');

const here = __dirname;
const read = (name) => JSON.parse(fs.readFileSync(path.join(here, name), 'utf8'));
const contract = read('enterprise-resident-reciprocity-contract.json');
const tabletop = read(contract.evidence_inputs.fallback_tabletop);
const accessible = read(contract.evidence_inputs.accessible_state);
const transfer = read(contract.evidence_inputs.responsibility_transfer);
const denominator = read(contract.evidence_inputs.resource_denominator);
const failure = read(contract.evidence_inputs.failure_governance);
const required = [
  'grouped_request_and_owner',
  'public_and_human_equivalent',
  'accessible_route_current',
  'failed_and_withdrawn_in_denominator',
  'worst_group_not_worse',
  'appeal_can_pause_release'
];

function decisionFor(testCase, aggregateAppealOpen = false) {
  const complete = Boolean(testCase.resident_return_zh && testCase.resident_return_en)
    && required.every((item) => testCase.release_preconditions.includes(item));
  return complete && !aggregateAppealOpen && testCase.field_evidence === 'dated_local'
    ? 'ELIGIBLE_FOR_HUMAN_REVIEW'
    : 'BLOCK';
}

const fixtureResults = contract.negative_fixtures.map((fixture) => {
  const sample = JSON.parse(JSON.stringify(contract.review_cases[0]));
  let aggregateAppealOpen = false;
  if (fixture.remove === 'resident_return') {
    sample.resident_return_zh = '';
    sample.resident_return_en = '';
  } else if (fixture.remove) {
    sample.release_preconditions = sample.release_preconditions.filter((item) => item !== fixture.remove);
  } else if (fixture.set === 'aggregate_appeal_open') {
    aggregateAppealOpen = true;
  }
  const detected = decisionFor(sample, aggregateAppealOpen) === fixture.expected;
  return { id: fixture.id, expected: fixture.expected, detected };
});

const checks = {
  package_identity_is_independent: contract.package_id === 'enterprise-resident-flow-commons'
    && contract.identity_boundary.this_package.includes('reciprocal allocation'),
  four_review_cases_present: contract.review_cases.length === 4,
  every_case_binds_enterprise_to_resident: contract.review_cases.every((item) =>
    item.enterprise_request_zh && item.enterprise_request_en && item.resident_return_zh && item.resident_return_en),
  six_release_preconditions_each: contract.review_cases.every((item) =>
    required.every((gate) => item.release_preconditions.includes(gate))),
  every_field_case_holds: contract.review_cases.every((item) =>
    item.field_evidence === 'unknown' && item.decision === 'HOLD_FIELD_RELEASE'),
  package_tabletop_replays_four_fallbacks: tabletop.tabletop_status === 'pass'
    && tabletop.replayed_counts.service_requests === '4/4'
    && tabletop.operational_status === 'not_authorized_not_run',
  accessible_routes_fail_closed: accessible.readout.local_audits_completed === 0
    && accessible.readout.public_route_states.every((item) => item.state === 'UNKNOWN'),
  responsibility_not_assumed: transfer.summary.accepted_transfers === 0
    && transfer.summary.transfer_ready_count === 0,
  denominators_not_invented: denominator.summary.locked_contract_count === 0
    && denominator.summary.current_local_measurements === 0,
  failure_and_appeal_claims_remain_zero: failure.summary.field_incidents === 0
    && failure.summary.appeals_recorded === 0,
  failed_and_withdrawn_stay_visible: transfer.summary.failed_attempts_in_denominator === true
    && transfer.summary.withdrawals_in_denominator === true,
  aggregate_appeal_pauses_release: failure.checks.appeal_pauses_release === true,
  negative_fixtures_block: fixtureResults.every((item) => item.detected),
  no_performance_or_authorization_claim: contract.claim_boundary.performance_claims === 0
    && contract.claim_boundary.operating_authorizations === 0,
  no_personal_trace_and_no_air_release: contract.claim_boundary.personal_traces_required === false
    && contract.claim_boundary.air_candidate === 'excluded'
};

const passed = Object.values(checks).every(Boolean);
const output = {
  screen_id: contract.screen_id,
  package_id: contract.package_id,
  review_surface_revision: contract.review_surface_revision,
  status: passed ? 'ENTERPRISE_RESIDENT_RECIPROCITY_PASS' : 'ENTERPRISE_RESIDENT_RECIPROCITY_REVIEW',
  check_count: Object.keys(checks).length,
  checks,
  fixture_results: fixtureResults,
  current_readout: {
    package_replay: 'PASS',
    fallback_requests_replayed: tabletop.replayed_counts.service_requests,
    accessible_route_states: accessible.readout.public_route_states.map((item) => item.state),
    accepted_responsibility_transfers: transfer.summary.accepted_transfers,
    locked_resource_denominators: denominator.summary.locked_contract_count,
    field_incidents: failure.summary.field_incidents,
    aggregate_appeals: failure.summary.appeals_recorded,
    field_release: 'HOLD',
    interpretation_zh: 'PASS 只说明包内互惠规则、停止条件和回滚证据可以重放；现场发布仍为 HOLD，不证明企业或居民已经获得服务。',
    interpretation_en: 'PASS means only that package-level reciprocity, stop and rollback evidence can be replayed; field release remains HOLD and no enterprise or resident service is proven.'
  }
};

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
}[char]));

function wrap(text, limit) {
  if (/[㐀-鿿]/.test(text)) {
    const result = [];
    for (let i = 0; i < text.length; i += limit) result.push(text.slice(i, i + limit));
    return result;
  }
  const words = text.split(/\s+/);
  const result = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) { result.push(line); line = word; } else line = next;
  }
  if (line) result.push(line);
  return result;
}

function lines(x, y, text, limit, cls, gap, fill) {
  return wrap(text, limit).map((line, index) =>
    `<text x="${x}" y="${y + index * gap}" class="${cls}" fill="${fill}">${esc(line)}</text>`).join('');
}

function svg(lang) {
  const zh = lang === 'zh';
  const title = zh ? '京张流线公地｜企业资源回到居民日常的互惠发布门' : 'Jing-Zhang Flow Commons | Enterprise–Resident Reciprocity Gate';
  const subtitle = zh
    ? '企业少占一段公共资源，不自动等于居民多得到一段服务；两边必须在同一条证据链上验收。'
    : 'An enterprise saving does not automatically become a resident benefit; both sides pass through one evidence chain.';
  const cases = contract.review_cases.map((item, index) => {
    const y = 354 + index * 164;
    const enterprise = zh ? item.enterprise_request_zh : item.enterprise_request_en;
    const resident = zh ? item.resident_return_zh : item.resident_return_en;
    const textX = zh ? 890 : 1035;
    const lineLimit = zh ? 25 : 48;
    return `<g><rect x="620" y="${y}" width="1090" height="138" rx="22" fill="#F7FAFC" stroke="#D9E3EA"/>
      <rect x="640" y="${y + 18}" width="82" height="36" rx="18" fill="#143F52"/><text x="681" y="${y + 43}" text-anchor="middle" class="caseId" fill="#7DE5C8">${item.id}</text>
      <text x="744" y="${y + 42}" class="caseTitle" fill="#112B40">${esc(zh ? item.window_zh : item.window_en)}</text>
      <text x="744" y="${y + 75}" class="label" fill="#D65F49">${zh ? '企业请求' : 'ENTERPRISE REQUEST'}</text>${lines(textX, y + 75, enterprise, lineLimit, 'body', 18, '#30495A')}
      <text x="744" y="${y + 112}" class="label" fill="#188A7A">${zh ? '居民回报' : 'RESIDENT RETURN'}</text>${lines(textX, y + 112, resident, lineLimit, 'body', 18, '#30495A')}</g>`;
  }).join('');
  const siteLabels = zh
    ? [
      ['众智园', '企业到岗 / 班车 / 装卸'],
      ['AI 原点社区', '上学 / 照护 / 就医 / 回家'],
      ['大钟寺', '轨道换乘 / 路缘 / 访客']
    ]
    : [
      ['Zhongzhiyuan', 'arrivals / shuttle / loading'],
      ['AI Origin Community', 'school / care / health / return'],
      ['Dazhongsi', 'rail transfer / curb / visitors']
    ];
  const sites = siteLabels.map((item, index) => {
    const y = 408 + index * 184;
    const color = ['#EF7254', '#27A694', '#7180F6'][index];
    return `<circle cx="180" cy="${y}" r="33" fill="${color}"/><text x="180" y="${y + 8}" text-anchor="middle" class="siteNo" fill="#fff">0${index + 1}</text><text x="240" y="${y - 5}" class="siteTitle" fill="#F1F8FA">${esc(item[0])}</text><text x="240" y="${y + 30}" class="siteBody" fill="#9FC0CA">${esc(item[1])}</text>`;
  }).join('');
  const field = zh ? 'G1 现场发布' : 'G1 FIELD RELEASE';
  const packageReplay = zh ? 'G0 包内回放' : 'G0 PACKAGE REPLAY';
  const titleMarkup = zh
    ? `<text x="70" y="120" class="title" fill="#F4FBFD">${esc(title)}</text><text x="70" y="160" class="sub" fill="#ACCAD2">${esc(subtitle)}</text>`
    : `<text x="70" y="105" class="title" fill="#F4FBFD">Jing-Zhang Flow Commons</text><text x="70" y="150" class="title" fill="#F4FBFD">Enterprise–Resident Reciprocity Gate</text><text x="70" y="190" class="sub" fill="#ACCAD2">${esc(subtitle)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 1800 1200" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc>
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2C"/><stop offset="1" stop-color="#123E4B"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#00111F" flood-opacity=".22"/></filter><style>
      .sans{font-family:"PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.title{font:900 43px "PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.sub{font:600 19px "PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.eyebrow{font:900 17px Arial,sans-serif;letter-spacing:3px}.caseId{font:900 16px Arial,sans-serif}.caseTitle{font:900 22px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.label{font:900 14px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.body{font:650 15px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.status{font:900 16px Arial,sans-serif}.siteNo{font:900 18px Arial,sans-serif}.siteTitle{font:900 23px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.siteBody{font:650 16px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.small{font:650 14px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}.metric{font:900 29px Arial,sans-serif}.metricLabel{font:800 14px "PingFang SC","Noto Sans CJK SC",Arial,sans-serif}</style></defs>
    <rect width="1800" height="1200" fill="url(#bg)"/><circle cx="1700" cy="70" r="300" fill="#2AA593" opacity=".12"/><text x="70" y="55" class="eyebrow" fill="#71E1C2">FLOW COMMONS / RECIPROCITY REVIEW / v2.1</text>${titleMarkup}
    <rect x="70" y="215" width="500" height="765" rx="30" fill="#0C293A" stroke="#28576A" filter="url(#shadow)"/><text x="110" y="270" class="eyebrow" fill="#71E1C2">${zh ? '三处接口 / 一条双向契约' : 'THREE INTERFACES / ONE TWO-WAY CONTRACT'}</text><path d="M180 350 L180 810" stroke="#5D7F8D" stroke-width="9" stroke-linecap="round"/><path d="M180 350 C390 340 390 535 180 592 C390 605 390 780 180 810" fill="none" stroke="#71E1C2" stroke-width="3" stroke-dasharray="10 10" opacity=".7"/>${sites}
    <rect x="105" y="855" width="430" height="84" rx="18" fill="#153B4B"/><text x="125" y="887" class="small" fill="#9FC0CA">${zh ? '规则' : 'RULE'}</text>${lines(125, 916, zh ? '企业侧节省只有在居民最慢路径不变差时才可进入人工复核。' : 'An enterprise saving enters human review only when the slowest resident path does not worsen.', zh ? 25 : 54, 'small', 20, '#F3FAFB')}
    ${cases}
    <rect x="70" y="1020" width="790" height="125" rx="26" fill="#123F49" stroke="#3EB69F"/><text x="105" y="1055" class="metricLabel" fill="#9DEAD6">${packageReplay}</text><text x="105" y="1097" class="metric" fill="#72E4C5">PASS</text><text x="250" y="1083" class="small" fill="#D6E8EA">4/4 fallback · 6/6 checks · 5/5 rollback</text><text x="250" y="1111" class="small" fill="#9FC0CA">${zh ? '只证明结构可重放，不推进 P1/P2' : 'structure replay only; does not advance P1/P2'}</text>
    <rect x="890" y="1020" width="840" height="125" rx="26" fill="#392A31" stroke="#EF8A73"/><text x="925" y="1055" class="metricLabel" fill="#FFC0B2">${field}</text><text x="925" y="1097" class="metric" fill="#FF927D">HOLD</text><text x="1070" y="1083" class="small" fill="#F8DDD7">0 audit · 0 transfer · 0 locked denominator · 0 authorization</text><text x="1070" y="1111" class="small" fill="#DDBAB2">${zh ? '现场基线、责任接受与专业授权缺一项都不发布' : 'no release without field baseline, accepted responsibility and authorization'}</text>
    <text x="70" y="1180" class="small" fill="#87AAB4">PROVISIONAL GEOMETRY · SYNTHETIC PACKAGE REPLAY · NO PERSONAL TRACES · AIR EXCLUDED · 147228</text></svg>`;
}

const artifacts = {
  'enterprise-resident-reciprocity-readout.json': `${JSON.stringify(output, null, 2)}\n`,
  '../../assets/figures/site-overview-review.svg': `${svg('zh')}\n`,
  '../../assets/figures/site-overview-review.en.svg': `${svg('en')}\n`
};
function squareRasterSource(markup) {
  return markup
    .replace('width="1800" height="1200" viewBox="0 0 1800 1200"', 'width="1800" height="1800" viewBox="0 0 1800 1800"')
    .replace(/(<desc id="desc">.*?<\/desc>)/, '$1<g transform="translate(0 300)">')
    .replace('</svg>', '</g></svg>');
}
const rasterArg = process.argv.indexOf('--raster-source-dir');
if (rasterArg >= 0) {
  const rasterDir = process.argv[rasterArg + 1];
  if (!rasterDir) throw new Error('--raster-source-dir requires a target directory');
  fs.mkdirSync(rasterDir, { recursive: true });
  fs.writeFileSync(path.join(rasterDir, 'site-overview-review.raster.svg'), `${squareRasterSource(svg('zh'))}\n`);
  fs.writeFileSync(path.join(rasterDir, 'site-overview-review.en.raster.svg'), `${squareRasterSource(svg('en'))}\n`);
}
const checkOnly = process.argv.includes('--check');
for (const [relative, content] of Object.entries(artifacts)) {
  const target = path.resolve(here, relative);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) {
      console.error(`stale or missing generated artifact: ${path.relative(here, target)}`);
      process.exit(1);
    }
  } else {
    fs.writeFileSync(target, content);
  }
}
if (!passed) {
  console.error(JSON.stringify(output, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(output, null, 2));

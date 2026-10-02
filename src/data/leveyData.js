const rnd = (seed) => {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

const round = (v, p = 1) => Number(v.toFixed(p))

// Nilai run Glukosa Level 3 sesuai temuan desain (Run 14 = warning 1-2s, Run 24 = reject 1-3s)
const GLUCOSE_L3 = [
  214.2, 216.5, 212.8, 218.0, 215.5, 217.2, 213.9, 211.0, 215.2, 219.0, 217.8, 214.6, 222.1, 232.5, 219.4, 216.0,
  213.4, 211.8, 215.0, 217.4, 220.2, 224.8, 228.6, 242.0,
]

const buildValues = (seed, mean, sd, { warnAt = 8, rejectAt = 20, drift = 0 } = {}) => {
  const rand = rnd(seed)
  return Array.from({ length: 24 }, (_, i) => {
    const z = (rand() - 0.5) * 1.5 + (i >= 18 ? drift : 0)
    let value = mean + z * sd
    if (i === warnAt) value = mean + (2.0 + rand() * 0.35) * sd
    if (i === rejectAt) value = mean + (2.4 + rand() * 0.3) * sd
    return round(value, 2)
  })
}

const level = (mean, sd, values, lot, extra = {}) => ({
  mean,
  sd,
  values,
  lot,
  exp: '30-Jun-2025',
  ...extra,
})

export const ljParameters = [
  {
    id: 'glu',
    label: 'Glukosa Darah (GOD-PAP) — mg/dL',
    method: 'Enzimatik Heksokinase / Trinder',
    levels: {
      1: level(98.5, 3.2, buildValues(11, 98.5, 3.2, { warnAt: 9 }), '#GLU-9901'),
      2: level(215.0, 8.0, buildValues(22, 215.0, 8.0, { warnAt: 14, rejectAt: 21, drift: 0.2 }), '#GLU-9902'),
      3: level(215.0, 8.0, GLUCOSE_L3, '#GLU-9903', { critical: true }),
    },
  },
  {
    id: 'chol',
    label: 'Kolesterol Total (CHOD-PAP) — mg/dL',
    method: 'Enzimatik CHOD-PAP',
    levels: {
      1: level(156.0, 5.0, buildValues(33, 156.0, 5.0, { warnAt: 5 }), '#CHOL-112'),
      2: level(252.0, 7.5, buildValues(44, 252.0, 7.5, { warnAt: 17, rejectAt: 22 }), '#CHOL-113'),
      3: level(398.0, 11.0, buildValues(55, 398.0, 11.0, { warnAt: 12 }), '#CHOL-114'),
    },
  },
  {
    id: 'sgot',
    label: 'SGOT / AST (IFCC) — U/L',
    method: 'IFCC Without Pyridoxal',
    levels: {
      1: level(40.0, 2.5, buildValues(66, 40.0, 2.5, { warnAt: 4 }), '#ENZ-204'),
      2: level(68.0, 3.4, buildValues(77, 68.0, 3.4, { warnAt: 19, rejectAt: 23, drift: 0.25 }), '#ENZ-205'),
      3: level(124.0, 5.6, buildValues(88, 124.0, 5.6, { warnAt: 15 }), '#ENZ-206'),
    },
  },
  {
    id: 'sgpt',
    label: 'SGPT / ALT (IFCC) — U/L',
    method: 'IFCC Without Pyridoxal',
    levels: {
      1: level(38.0, 2.3, buildValues(99, 38.0, 2.3, { warnAt: 7 }), '#ENZ-210'),
      2: level(64.0, 3.1, buildValues(110, 64.0, 3.1, { warnAt: 20, rejectAt: 22, drift: 0.3 }), '#ENZ-211'),
      3: level(118.0, 5.2, buildValues(121, 118.0, 5.2, { warnAt: 11 }), '#ENZ-212'),
    },
  },
  {
    id: 'hb',
    label: 'Hemoglobin (SLS-Hb) — g/dL',
    method: 'SLS-Binding spectrophotometry',
    levels: {
      1: level(6.4, 0.22, buildValues(132, 6.4, 0.22, { warnAt: 10 }), '#HEM-8820'),
      2: level(13.6, 0.3, buildValues(143, 13.6, 0.3, { warnAt: 16, rejectAt: 22 }), '#HEM-8821'),
      3: level(20.1, 0.48, buildValues(154, 20.1, 0.48, { warnAt: 13 }), '#HEM-8822'),
    },
  },
  {
    id: 'wbc',
    label: 'Leukosit (Flow Cytometry) — 10^3/uL',
    method: 'Flow Cytometry (DDS)',
    levels: {
      1: level(4.2, 0.3, buildValues(165, 4.2, 0.3, { warnAt: 12 }), '#WBC-4412'),
      2: level(9.3, 0.55, buildValues(176, 9.3, 0.55, { warnAt: 6, rejectAt: 21, drift: 0.2 }), '#WBC-4413'),
      3: level(18.4, 1.05, buildValues(187, 18.4, 1.05, { warnAt: 9 }), '#WBC-4414'),
    },
  },
]

export const ljAnalyzers = [
  { value: 'cs-t240', label: 'Dirui CS-T240 (Kimia Klinik) - Aktif' },
  { value: 'sysmex-xn', label: 'Sysmex XN-550 (Hematologi)' },
  { value: 'cobas-e411', label: 'Roche Cobas e411 (Imunologi)' },
  { value: 'mission-u500', label: 'Mission U500 (Urin Automatik)' },
]

export const ljLevels = [
  { id: 1, label: 'Level 1 (Normal)' },
  { id: 2, label: 'Level 2 (Patologis Rendah)' },
  { id: 3, label: 'Level 3 (Patologis Tinggi)' },
  { id: 'multi', label: 'Multi-Level Overlay' },
]

export const ljPeriod = { label: '1 - 24 Okt 2024', runs: 24 }

export const OFFICERS = ['Siti Rahma, A.Md.AK', 'Budi Santoso, S.Tr.Kes', 'Andi Wijaya, A.Md.AK', 'Dewi Anggraini, A.Md.AK']

const runDates = (i) => {
  const day = String(i).padStart(2, '0')
  const times = ['08:10', '08:15', '08:22', '08:30', '08:42']
  return `${day}/10/2024 ${times[i % times.length]}`
}

export function buildRuns({ values, mean, sd, critical }) {
  return values.map((v, i) => {
    const z = (v - mean) / sd
    const rules = evaluateRules(values, mean, sd)
    const status = rules.rejects.includes(i)
      ? 'reject'
      : rules.warnings.includes(i)
        ? 'warning'
        : 'normal'
    return {
      run: i + 1,
      date: runDates(i + 1),
      value: v,
      mean,
      sd,
      deviation: round(v - mean, 2),
      z: round(z, 2),
      zText: `${z >= 0 ? '+' : ''}${z.toFixed(2)} SD`,
      status,
      ruleLabel:
        status === 'reject'
          ? '1-3s Reject'
          : status === 'warning'
            ? '1-2s Warning'
            : 'In-Control',
      controlStatus: status === 'reject' ? 'Ditolak (Karantina)' : status === 'warning' ? 'Diterima Bersyarat' : 'Diterima',
      officer: OFFICERS[i % OFFICERS.length],
      verifier: critical && i === values.length - 1 ? 'Belum Diverifikasi' : 'dr. Hendra Pratama, Sp.PK',
      note: critical && i === values.length - 1
        ? 'Kemasan reagen Glukosa dibuka botol baru R1/R2. Cuvette wash selesai jam 08:00 WIB.'
        : 'Pemeriksaan rutin sesuai SOP-PMI-005, kondisi lingkungan normal.',
    }
  })
}

export function evaluateRules(values, mean, sd) {
  const z = values.map((v) => (v - mean) / sd)
  const warnings = []
  const rejects = []
  const detail = {}

  const push = (rule, index, kind) => {
    if (kind === 'warn') warnings.push(index)
    else rejects.push(index)
    detail[rule] = detail[rule] ?? { count: 0, runs: [] }
    detail[rule].count += 1
    detail[rule].runs.push(index + 1)
  }

  z.forEach((v, i) => {
    if (Math.abs(v) > 3) push('1-3s', i, 'reject')
    else if (Math.abs(v) > 2) push('1-2s', i, 'warn')
  })

  for (let i = 1; i < z.length; i += 1) {
    if (Math.abs(z[i] - z[i - 1]) > 4) push('R-4s', i, 'reject')
  }

  for (let i = 1; i < z.length; i += 1) {
    if (Math.abs(z[i]) > 2 && Math.abs(z[i - 1]) > 2 && Math.sign(z[i]) === Math.sign(z[i - 1]))
      push('2-2s', i, 'reject')
  }

  for (let i = 3; i < z.length; i += 1) {
    const window = z.slice(i - 3, i + 1)
    if (window.every((v) => v > 1) || window.every((v) => v < -1)) push('4-1s', i, 'warn')
  }

  for (let i = 9; i < z.length; i += 1) {
    const window = z.slice(i - 9, i + 1)
    if (window.every((v) => v > 0) || window.every((v) => v < 0)) push('10x', i, 'warn')
  }

  return { warnings: [...new Set(warnings)], rejects: [...new Set(rejects)], detail, z }
}

export const ljRuleMeta = [
  { id: '1-2s', name: 'Aturan 1-2s (Warning)', desc: '1 Nilai melampaui ±2 SD', kind: 'warn' },
  { id: '1-3s', name: 'Aturan 1-3s (Reject)', desc: '1 Nilai melampaui ±3 SD (Random Error)', kind: 'reject' },
  { id: '2-2s', name: 'Aturan 2-2s (Reject)', desc: '2 Nilai berturut-turut > 2 SD', kind: 'reject' },
  { id: 'R-4s', name: 'Aturan R-4s (Reject)', desc: 'Rentang perbedaan > 4 SD antar run', kind: 'reject' },
  { id: '4-1s', name: 'Aturan 4-1s (Maintenance)', desc: '4 Nilai berturut-turut pada 1 sisi > 1 SD', kind: 'warn' },
  { id: '10x', name: 'Aturan 10x (Systematic Bias)', desc: '10 Nilai berturut-turut pada sisi sama dari mean', kind: 'warn' },
]

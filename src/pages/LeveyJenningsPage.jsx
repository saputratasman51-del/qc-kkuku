import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import LJChart from '../components/levey/LJChart.jsx'
import {
  buildRuns,
  evaluateRules,
  ljAnalyzers,
  ljLevels,
  ljParameters,
  ljPeriod,
  ljRuleMeta,
} from '../data/leveyData.js'

const FIELD =
  'w-full h-9 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md outline-none cursor-pointer appearance-none'
const LABEL = 'font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold flex items-center gap-1'

const round = (v, p = 2) => Number(v.toFixed(p))

function PageBanner({ onNotify, onRefresh }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md min-w-0">
        <div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center p-1.5 shrink-0 shadow-sm">
          <Icon name="biotech" className="text-headline-lg text-primary" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-space-xs mb-0.5">
            <span className="px-space-xs py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase font-bold tracking-wide">
              Kendali Mutu Internal (PMI)
            </span>
            <span className="text-on-surface-variant text-label-sm font-label-sm">• ISO 15189:2022 Acc.</span>
            <span className="px-space-xs py-0.5 rounded-DEFAULT bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />1 Pelanggaran Kritis Aktif
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Grafik Kendali Mutu Levey-Jennings (L-J Chart)
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Pemantauan stabilitas analitik berkala, deteksi bias sistematik dan kesalahan acak (random error) berbasis
            aturan Westgard Multirule.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-xs w-full xl:w-auto shrink-0 justify-end">
        {[
          { icon: 'print', label: 'Cetak Grafik' },
          { icon: 'picture_as_pdf', label: 'Export PDF' },
          { icon: 'table_view', label: 'Export Excel (Runs)' },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => onNotify(`${b.label}: berk sedang disiapkan.`)}
            className="inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm"
          >
            <Icon name={b.icon} className="text-body-lg text-primary" />
            <span>{b.label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-1 px-space-sm py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors shadow-sm"
        >
          <Icon name="refresh" className="text-body-lg" />
          <span>Perbarui Data</span>
        </button>
      </div>
    </div>
  )
}

function FilterBar({ analyzer, setAnalyzer, parameterId, setParameterId, levelId, setLevelId, dataset, onNotify }) {
  const parameter = ljParameters.find((p) => p.id === parameterId)
  const isMulti = levelId === 'multi'

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="flex flex-col space-y-1">
          <label className={LABEL}>
            <Icon name="precision_manufacturing" className="text-label-md text-primary" />
            Alat / Analyzer
          </label>
          <div className="relative">
            <select value={analyzer} onChange={(e) => setAnalyzer(e.target.value)} className={FIELD}>
              {ljAnalyzers.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-2.5 top-2 text-on-surface-variant pointer-events-none text-body-lg" />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className={LABEL}>
            <Icon name="science" className="text-label-md text-primary" />
            Parameter Analit
          </label>
          <div className="relative">
            <select value={parameterId} onChange={(e) => setParameterId(e.target.value)} className={FIELD}>
              {ljParameters.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-2.5 top-2 text-on-surface-variant pointer-events-none text-body-lg" />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className={LABEL}>
            <Icon name="barcode" className="text-label-md text-primary" />
            Nomor Lot Serum Kontrol
          </label>
          <div className="h-9 px-3 rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface font-data-mono text-data-mono">
            <span className="font-bold text-primary">{isMulti ? 'Multi-Lot' : dataset.lot}</span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">Exp: {dataset.exp}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className={LABEL}>
            <Icon name="date_range" className="text-label-md text-primary" />
            Periode Pemantauan
          </label>
          <div className="h-9 px-3 rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface font-label-md text-label-md">
            <span className="font-medium">{ljPeriod.label}</span>
            <span className="px-space-xs py-0.5 rounded-DEFAULT bg-surface-container text-primary font-bold text-label-sm">
              {ljPeriod.runs} Run
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pt-space-xs bg-surface-container-low/50 p-space-sm rounded-lg">
        <div className="flex items-center gap-space-xs flex-wrap">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold mr-1">
            Tingkat Kontrol:
          </span>
          {ljLevels.map((l) => {
            const active = levelId === l.id
            const flagged = l.id === 3 && parameter.levels[3]?.critical
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevelId(l.id)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${
                  active
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm flex items-center gap-1.5'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs'
                }`}
              >
                {active && flagged && <span className="w-2 h-2 rounded-full bg-error animate-ping" />}
                {l.label}
                {active && l.id === 3 ? ' - Terpilih' : ''}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1 text-primary font-medium">
            <Icon name="verified" className="text-body-md text-primary" />
            Metode: {parameter.method}
          </span>
        </div>
      </div>
    </div>
  )
}

function StatCards({ stats, dataset, isMulti }) {
  const fmt = (v, p = 1) => (typeof v === 'number' ? v.toFixed(p) : v)
  const cards = [
    {
      label: 'Mean Acuan (Target)',
      icon: 'flag',
      iconTone: 'text-primary',
      value: dataset.mean.toFixed(1),
      unit: dataset.unit,
      foot: `SD Target: ±${dataset.sd.toFixed(2)} ${dataset.unit}`,
    },
    {
      label: 'Mean Teramati (X̄)',
      icon: 'analytics',
      iconTone: 'text-secondary',
      value: fmt(isMulti ? '—' : stats.mean),
      unit: isMulti ? 'Multi-Level' : dataset.unit,
      foot: isMulti ? 'Rata-rata tiap level(normalisasi Z)' : `Deviasi: ${stats.dev >= 0 ? '+' : ''}${stats.dev.toFixed(2)} ${dataset.unit}`,
      footTone: 'text-primary',
    },
    {
      label: 'SD Terhitung (s)',
      icon: 'square_foot',
      iconTone: 'text-tertiary',
      value: fmt(isMulti ? '—' : stats.sd, 2),
      unit: isMulti ? 'Multi-Level' : dataset.unit,
      foot: `Target Batas: ±${(3 * dataset.sd).toFixed(1)} (3s)`,
    },
    {
      label: 'Koefisien Variasi (%CV)',
      icon: 'percent',
      iconTone: 'text-primary',
      value: `${stats.cv.toFixed(2)}%`,
      badge: stats.cv < 4.5 ? 'In-Spec' : 'Over-Spec',
      badgeTone: stats.cv < 4.5 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-error-container text-on-error-container',
      foot: 'Spesifikasi Maks: < 4.50%',
    },
    {
      label: 'Indeks Deviasi (SDI)',
      icon: 'balance',
      iconTone: 'text-secondary',
      value: `${stats.sdi >= 0 ? '+' : ''}${stats.sdi.toFixed(2)}`,
      unit: 'SD',
      foot: Math.abs(stats.sdi) < 0.5 ? 'Bias Minimal (< 0.5 SDI)' : 'Bias Signifikan (> 0.5 SDI)',
      footTone: Math.abs(stats.sdi) < 0.5 ? 'text-primary' : 'text-error',
    },
    {
      label: 'Status Multirule',
      icon: 'warning',
      iconTone: 'text-error',
      value: `${stats.rejects} Reject`,
      unit: `/ ${stats.warnings} Warn`,
      foot: stats.rejects > 0 ? 'Aturan 1-3s pada Run 24' : 'Semua run dalam kendali',
      critical: true,
      valueTone: 'text-error',
      footTone: 'text-error',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col justify-between ${
            c.critical ? 'bg-gradient-to-br from-surface-container-lowest to-error-container/20' : ''
          }`}
        >
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className={`font-label-sm text-label-sm uppercase tracking-wider font-semibold ${c.critical ? 'text-error' : ''}`}>
              {c.label}
            </span>
            <Icon name={c.icon} className={`text-headline-sm ${c.iconTone}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`font-headline-lg text-headline-lg font-bold ${c.valueTone ?? 'text-on-surface'}`}>{c.value}</span>
            {c.badge ? (
              <span className={`px-1.5 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold ${c.badgeTone}`}>
                {c.badge}
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-on-surface-variant">{c.unit}</span>
            )}
          </div>
          <span className={`font-body-sm text-body-sm mt-1 ${c.footTone ?? 'text-on-surface-variant'}`}>{c.foot}</span>
        </div>
      ))}
    </div>
  )
}

function ChartPanel({ runs, mode, setMode, dataset, isMulti, onOpenCapa, onNotify }) {
  const activeMode = isMulti ? 'z' : mode
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col space-y-space-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-xs">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">
            {isMulti ? 'ML' : `L${dataset.level}`}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Plotting Titik Kendali Mutu Harian
                {!isMulti && ` (Level ${dataset.level}${dataset.level === 3 ? ' - Patologis Tinggi' : ''})`}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-data-mono text-label-sm font-semibold">
                N = {isMulti ? new Set(runs.map((r) => r.xIndex)).size : runs.length} Runs
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {dataset.label} • Skala SD: ±1.0 SD = {dataset.sd.toFixed(1)} {dataset.unit}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg">
          {[
            { id: 'abs', label: `Nilai Mutlak (${dataset.unit})` },
            { id: 'z', label: 'Transformasi Z-Score' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-2.5 py-1 rounded-DEFAULT font-label-sm text-label-sm transition-colors ${
                activeMode === m.id
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              } ${isMulti ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isMulti}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <LJChart runs={runs} mode={activeMode} onOpenCapa={onOpenCapa} onNotify={onNotify} />

      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-high text-label-sm font-label-sm text-on-surface-variant">
        <div className="flex flex-wrap items-center gap-space-md">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 h-1 rounded bg-primary" />
            <span>Target Mean (X̄ = {dataset.mean.toFixed(1)})</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t border-dashed border-outline" />
            <span>±1 SD</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t border-dashed border-amber-500" />
            <span>±2 SD Warning</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 h-1 border-t-2 border-dashed border-error" />
            <span>±3 SD Reject</span>
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            In-Control (Normal)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Peringatan (1-2s)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-error" />
            Reject (1-3s / R-4s)
          </span>
        </div>
      </div>
    </div>
  )
}

function DiagnosticPanel({ stats, detail, onOpenCapa, onNotify }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md" id="capa-action">
      <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between space-y-space-md">
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <Icon name="crisis_alert" className="text-headline-sm" />
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-error">
                  Insiden Pelanggaran: Aturan Westgard 1-3s Terdeteksi
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Pemeriksaan Glukosa Serum • Alat Dirui CS-T240
                </span>
              </div>
            </div>
            <span className="px-space-xs py-1 rounded-DEFAULT bg-error text-on-error font-label-sm text-label-sm uppercase font-bold">
              Run Rejected
            </span>
          </div>

          <div className="bg-surface-container-low p-space-sm rounded-lg space-y-1.5 text-body-sm font-body-sm text-on-surface">
            <p>
              <strong>Deskripsi Kejadian:</strong> Pada <strong>Run #24</strong> (24 Okt 2024, 08:42 WIB), nilai konsentrasi
              Glukosa Level 3 mencapai <strong>242.0 mg/dL</strong>. Angka ini melampaui ambang batas atas{' '}
              <span className="font-semibold text-error">+3 SD (239.0 mg/dL)</span> dengan deviasi{' '}
              <span className="font-semibold text-error">+3.38 SD</span>.
            </p>
            <p className="text-on-surface-variant">
              <strong>Indikasi Klinis:</strong> Pelanggaran aturan 1-3s mengindikasikan adanya potensi{' '}
              <span className="text-error font-semibold">Kesalahan Acak Ekstrem (Large Random Error)</span> atau permulaan
              pergeseran sistematik signifikan (Systematic Shift) yang timbul segera setelah pergantian lot/botol reagen.
            </p>
          </div>

          <div className="p-space-sm rounded-lg bg-error-container/15 space-y-1">
            <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1">
              <Icon name="rule" className="text-body-lg text-error" />
              Protokol Intervensi Medis Mutu Laboratorium:
            </span>
            <ul className="list-disc list-inside text-body-sm font-body-sm text-on-surface space-y-0.5">
              <li>
                <strong>Tahan Rilis:</strong> Jangan validasi atau merilis hasil pemeriksaan glukosa pasien yang dianalisis
                dalam batch ini.
              </li>
              <li>
                <strong>Inspeksi Alat:</strong> Evaluasi gelembung reagen pada jarum pipetting reagen Dirui CS-T240 dan
                integritas cuvette nomor 14-22.
              </li>
              <li>
                <strong>Uji Re-run:</strong> Lakukan pengukuran ulang serum kontrol level 3 dengan botol kontrol segar yang
                baru dicairkan.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
          <button
            type="button"
            onClick={() => onOpenCapa({ id: 'CAPA-2024-10-042', parameter: 'Glukosa Sewaktu L2', instrument: 'Dirui CS-T240' })}
            className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-lg text-label-lg font-semibold transition-colors shadow-sm"
          >
            <Icon name="post_add" className="text-body-lg" />
            <span>Buat Laporan Investigasi CAPA Terkait</span>
          </button>
          <button
            type="button"
            onClick={() => onNotify('Modul analisis Glukosa dikunci sementara. Rilis hasil pasien ditahan.')}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
          >
            <Icon name="lock_person" className="text-body-lg" />
            <span>Kunci Modul Analisis Glukosa Sementara</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between space-y-space-md">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Evaluasi Skema Westgard Multirule
            </h2>
            <span className="font-label-sm text-label-sm text-primary font-semibold">ISO 15189 Valid</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
            Pemeriksaan sekuensial otomatis terhadap 6 algoritma kendali mutu patologi klinik.
          </p>

          <div className="space-y-1.5">
            {ljRuleMeta.map((rule) => {
              const found = detail[rule.id]
              const isBreach = !!found
              const isRejectRule = rule.kind === 'reject'
              return (
                <div
                  key={rule.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    isBreach ? (isRejectRule ? 'bg-error-container/20' : 'bg-amber-50/60') : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      name={isBreach ? (isRejectRule ? 'cancel' : 'warning') : 'check_circle'}
                      className={`text-body-lg ${isBreach ? (isRejectRule ? 'text-error' : 'text-amber-600') : 'text-primary'}`}
                    />
                    <div>
                      <span
                        className={`font-label-md text-label-md font-semibold ${
                          isBreach ? (isRejectRule ? 'text-error' : 'text-amber-800') : 'text-on-surface'
                        }`}
                      >
                        {rule.name}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block">{rule.desc}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm ${
                      !isBreach
                        ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                        : isRejectRule
                          ? 'bg-error text-on-error font-bold'
                          : 'bg-amber-100 text-amber-800 font-bold'
                    }`}
                    title={isBreach ? `Run: ${found.runs.join(', ')}` : undefined}
                  >
                    {isBreach
                      ? `${found.count} Kali (Run ${found.runs.slice(0, 3).join(', ')}${found.runs.length > 3 ? '…' : ''})`
                      : 'Lolosan (Nol)'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container text-body-sm font-body-sm text-on-surface flex items-center justify-between">
          <span className="text-on-surface-variant">Evaluator Algorithm Engine:</span>
          <span className="font-data-mono text-data-mono font-bold text-primary">QC-Kernel v4.19</span>
        </div>
      </div>
    </div>
  )
}

function RunLogTable({ runs, onOpenCapa, onNotify }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const rows = useMemo(
    () =>
      runs
        .filter((r) => {
          const q = query.toLowerCase()
          const matchQuery = q === '' || `#${r.run}`.includes(q) || r.officer.toLowerCase().includes(q)
          const matchStatus = statusFilter === 'all' || r.status === statusFilter
          return matchQuery && matchStatus
        })
        .reverse(),
    [runs, query, statusFilter],
  )

  const statusBadge = {
    reject: 'bg-error text-on-error font-bold uppercase',
    warning: 'bg-amber-100 text-amber-800 font-bold uppercase',
    normal: 'bg-primary-fixed text-on-primary-fixed font-medium',
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
        <div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Log Tabel Run Pengujian QC (Data Tabular)
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Rekam jejak setiap pembacaan fotometer dan verifikasi penanggung jawab teknis.
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 pl-8 pr-3 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm outline-none w-48"
              placeholder="Cari Run / Operator..."
              type="text"
            />
            <Icon name="search" className="absolute left-2 top-2 text-on-surface-variant text-body-md" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 pl-3 pr-7 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm appearance-none cursor-pointer outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="reject">Reject</option>
              <option value="warning">Warning</option>
              <option value="normal">In-Control</option>
            </select>
            <Icon name="arrow_drop_down" className="absolute right-1 top-1 text-on-surface-variant text-body-md pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Run #</th>
              <th className="py-2.5 px-3">Waktu Input</th>
              <th className="py-2.5 px-3 text-right">Hasil</th>
              <th className="py-2.5 px-3 text-right">Mean Target</th>
              <th className="py-2.5 px-3 text-right">Deviasi (d)</th>
              <th className="py-2.5 px-3 text-right">Z-Score</th>
              <th className="py-2.5 px-3">Evaluasi Westgard</th>
              <th className="py-2.5 px-3">Status Kontrol</th>
              <th className="py-2.5 px-3">Verifikator Sp.PK</th>
              <th className="py-2.5 px-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {rows.map((r) => (
              <tr
                key={`${r.series ?? 0}-${r.run}`}
                className={`transition-colors ${
                  r.status === 'reject'
                    ? 'bg-error-container/20 hover:bg-error-container/30'
                    : r.status === 'warning'
                      ? 'bg-amber-50/60 hover:bg-amber-50'
                      : 'hover:bg-surface-container-low'
                }`}
              >
                <td
                  className={`py-2.5 px-3 font-data-mono ${
                    r.status === 'reject'
                      ? 'font-bold text-error'
                      : r.status === 'warning'
                        ? 'font-semibold text-amber-800'
                        : 'font-semibold text-on-surface'
                  }`}
                >
                  #{String(r.run).padStart(2, '0')}
                  {r.level ? <span className="ml-1 text-[10px]">L{r.level}</span> : ''}
                </td>
                <td className="py-2.5 px-3 font-data-mono">{r.date}</td>
                <td
                  className={`py-2.5 px-3 text-right font-data-mono ${
                    r.status === 'reject'
                      ? 'font-bold text-error'
                      : r.status === 'warning'
                        ? 'font-semibold text-amber-800'
                        : 'font-semibold'
                  }`}
                >
                  {r.value}
                </td>
                <td className="py-2.5 px-3 text-right font-data-mono text-on-surface-variant">{r.mean.toFixed(1)}</td>
                <td
                  className={`py-2.5 px-3 text-right font-data-mono ${
                    r.status === 'reject' ? 'font-bold text-error' : r.status === 'warning' ? 'text-amber-800' : ''
                  }`}
                >
                  {r.deviation >= 0 ? '+' : ''}
                  {r.deviation.toFixed(1)}
                </td>
                <td
                  className={`py-2.5 px-3 text-right font-data-mono ${
                    r.status === 'reject'
                      ? 'font-bold text-error'
                      : r.status === 'warning'
                        ? 'font-bold text-amber-800'
                        : ''
                  }`}
                >
                  {r.zText}
                </td>
                <td className="py-2.5 px-3">
                  <span className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm ${statusBadge[r.status]}`}>
                    {r.ruleLabel}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center gap-1 font-label-sm text-label-sm ${
                      r.status === 'reject'
                        ? 'font-semibold text-error'
                        : r.status === 'warning'
                          ? 'font-semibold text-amber-800'
                          : 'font-medium text-primary'
                    }`}
                  >
                    <span
                      className={`rounded-full ${
                        r.status === 'reject'
                          ? 'w-2 h-2 bg-error animate-ping'
                          : r.status === 'warning'
                            ? 'w-2 h-2 bg-amber-500'
                            : 'w-1.5 h-1.5 bg-primary'
                      }`}
                    />
                    {r.controlStatus}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-on-surface-variant">
                  {r.verifier === 'Belum Diverifikasi' ? (
                    <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm">
                      Belum Diverifikasi
                    </span>
                  ) : (
                    <span className="text-on-surface">{r.verifier}</span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {r.status === 'reject' ? (
                    <button
                      type="button"
                      onClick={() => onOpenCapa({ id: 'CAPA-2024-10-042', parameter: 'Glukosa Sewaktu L2', instrument: 'Dirui CS-T240' })}
                      className="px-2 py-1 rounded bg-error text-on-error hover:bg-on-error-container font-label-sm text-label-sm font-semibold transition-colors"
                    >
                      Investigasi CAPA
                    </button>
                  ) : (
                    <button
                      type="button"
                      title="Lihat Detail"
                      onClick={() => onNotify(`Detail Run #${r.run} (${r.value} • ${r.zText}) dicetak ke lembar audit QI.`)}
                      className="text-primary hover:text-primary-container p-1"
                    >
                      <Icon name="visibility" className="text-body-lg" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="py-6 px-3 text-center text-on-surface-variant">
                  Tidak ada run yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs text-label-sm font-label-sm text-on-surface-variant">
        <span>
          Menampilkan {rows.length} dari {new Set(runs.map((r) => r.xIndex ?? r.run)).size} run periode Oktober 2024
        </span>
        <div className="flex items-center gap-1">
          <button type="button" className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container">
            Sebelumnya
          </button>
          <button type="button" className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold">
            1
          </button>
          <button type="button" className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container">
            2
          </button>
          <button type="button" className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LeveyJenningsPage({ onOpenCapa, onNotify }) {
  const [analyzer, setAnalyzer] = useState('cs-t240')
  const [parameterId, setParameterId] = useState('glu')
  const [levelId, setLevelId] = useState(3)
  const [mode, setMode] = useState('abs')
  const [refreshKey, setRefreshKey] = useState(0)

  const parameter = ljParameters.find((p) => p.id === parameterId)
  const isMulti = levelId === 'multi'

  const dataset = useMemo(() => {
    if (isMulti) {
      const base = parameter.levels[2]
      return {
        level: 'multi',
        mean: base.mean,
        sd: base.sd,
        unit: base.unit,
        lot: 'Multi-Lot',
        exp: base.exp,
        label: `${parameter.label} • Overlay L1/L2/L3 (skala Z)`,
      }
    }
    const lv = parameter.levels[levelId]
    return { ...lv, level: levelId, unit: parameter.label.split('—')[1]?.trim() ?? '', label: parameter.label }
  }, [parameter, levelId, isMulti])

  const runs = useMemo(() => {
    if (isMulti) {
      // Overlay: level 1/2/3 digabung pada sumbu run yang sama (skala Z per level)
      const combined = []
      ;[1, 2, 3].forEach((lv) => {
        const data = parameter.levels[lv]
        const evals = evaluateRules(data.values, data.mean, data.sd)
        data.values.forEach((v, i) => {
          const z = (v - data.mean) / data.sd
          const status = evals.rejects.includes(i) ? 'reject' : evals.warnings.includes(i) ? 'warning' : 'normal'
          combined.push({
            run: i + 1,
            xIndex: i,
            xOffset: (lv - 2) * 11,
            series: lv,
            level: lv,
            axisLabel: lv === 2,
            date: `${String(i + 1).padStart(2, '0')}/10/2024 08:00`,
            value: v,
            mean: data.mean,
            sd: data.sd,
            deviation: round(v - data.mean),
            z: round(z),
            zText: `${z >= 0 ? '+' : ''}${z.toFixed(2)} SD`,
            officer: ['Siti Rahma, A.Md.AK', 'Budi Santoso, S.Tr.Kes', 'Andi Wijaya, A.Md.AK'][lv - 1],
            verifier: 'dr. Hendra Pratama, Sp.PK',
            note: `Overlay Level ${lv} (mean ${data.mean} ± ${data.sd}) • ${parameter.method}`,
            status,
            ruleLabel: status === 'reject' ? '1-3s Reject' : status === 'warning' ? '1-2s Warning' : 'In-Control',
            controlStatus:
              status === 'reject' ? 'Ditolak (Karantina)' : status === 'warning' ? 'Diterima Bersyarat' : 'Diterima',
          })
        })
      })
      return combined
    }
    return buildRuns({
      values: parameter.levels[levelId].values,
      mean: parameter.levels[levelId].mean,
      sd: parameter.levels[levelId].sd,
      critical: parameter.levels[levelId].critical,
    })
  }, [parameter, levelId, isMulti, refreshKey])

  const stats = useMemo(() => {
    if (isMulti) {
      const detail = {}
      let rejects = 0
      let warnings = 0
      ;[1, 2, 3].forEach((lv) => {
        const data = parameter.levels[lv]
        const evals = evaluateRules(data.values, data.mean, data.sd)
        rejects += evals.rejects.length
        warnings += evals.warnings.length
        Object.entries(evals.detail).forEach(([rule, v]) => {
          detail[rule] = detail[rule] ?? { count: 0, runs: [] }
          detail[rule].count += v.count
          detail[rule].runs.push(...v.runs.map((r) => `L${lv}#${r}`))
        })
      })
      const allZ = [1, 2, 3].flatMap((lv) => parameter.levels[lv].values.map((v) => (v - parameter.levels[lv].mean) / parameter.levels[lv].sd))
      const meanZ = allZ.reduce((a, b) => a + b, 0) / allZ.length
      const sdZ = Math.sqrt(allZ.reduce((a, b) => a + (b - meanZ) ** 2, 0) / allZ.length)
      return {
        mean: 0,
        dev: meanZ,
        sd: sdZ,
        cv: sdZ * 100,
        sdi: meanZ,
        rejects,
        warnings,
        detail,
      }
    }

    const evals = evaluateRules(
      runs.map((r) => r.mean + r.z * r.sd),
      runs[0].mean,
      runs[0].sd,
    )
    const observed = runs.map((r) => (r.value - r.mean) / r.sd)
    const mean = observed.reduce((a, b) => a + b, 0) / observed.length
    const sd = Math.sqrt(observed.reduce((a, b) => a + (b - mean) ** 2, 0) / observed.length)
    return {
      mean: runs[0].mean + mean * runs[0].sd,
      dev: mean * runs[0].sd,
      sd: sd * runs[0].sd,
      cv: (sd * runs[0].sd) / (runs[0].mean + mean * runs[0].sd) * 100,
      sdi: mean,
      rejects: evals.rejects.length,
      warnings: evals.warnings.length,
      detail: evals.detail,
    }
  }, [runs, isMulti, parameter])

  return (
    <div className="flex flex-col w-full space-y-space-md">
      <PageBanner
        onNotify={onNotify}
        onRefresh={() => {
          setRefreshKey((k) => k + 1)
          onNotify('Data Levey-Jennings diperbarui dari interface LIS (24 run terakhir).')
        }}
      />

      <FilterBar
        analyzer={analyzer}
        setAnalyzer={setAnalyzer}
        parameterId={parameterId}
        setParameterId={setParameterId}
        levelId={levelId}
        setLevelId={setLevelId}
        dataset={dataset}
        onNotify={onNotify}
      />

      <StatCards stats={stats} dataset={dataset} isMulti={isMulti} />

      <ChartPanel
        runs={runs}
        mode={mode}
        setMode={setMode}
        dataset={dataset}
        isMulti={isMulti}
        onOpenCapa={onOpenCapa}
        onNotify={onNotify}
      />

      <DiagnosticPanel stats={stats} detail={stats.detail} onOpenCapa={onOpenCapa} onNotify={onNotify} />

      <RunLogTable runs={runs} onOpenCapa={onOpenCapa} onNotify={onNotify} />
    </div>
  )
}

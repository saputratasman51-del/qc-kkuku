import { useMemo, useState } from 'react'
import Icon from '../Icon.jsx'

const VB_W = 1000
const VB_H = 460
const X0 = 90
const X1 = 960
const Y_MEAN = 210
const PX_PER_SD = 50

const COLORS = {
  primary: '#005c55',
  primaryContainer: '#0f766e',
  primaryFixedDim: '#80d5cb',
  amber: '#d97706',
  amberSoft: '#f59e0b',
  error: '#ba1a1a',
  grid: '#bdc9c6',
  outline: '#6e7977',
  onSurfaceVariant: '#3e4947',
}

const SERIES_COLORS = {
  1: '#80d5cb',
  2: '#005c55',
  3: '#0f766e',
}

const seriesColor = (s) => SERIES_COLORS[s] ?? COLORS.primary

export default function LJChart({ runs, mode, onOpenCapa, onNotify }) {
  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState(null)

  const points = useMemo(() => {
    const ticks = [...new Set(runs.map((r) => r.xIndex ?? r.run - 1))].sort((a, b) => a - b)
    const span = Math.max(ticks[ticks.length - 1] - ticks[0], 1)
    return runs.map((r) => {
      const idx = r.xIndex ?? r.run - 1
      const x = X0 + ((idx - ticks[0]) / span) * (X1 - X0) + (r.xOffset ?? 0)
      const z = mode === 'z' ? r.z : (r.value - r.mean) / r.sd
      return { ...r, x, y: Y_MEAN - z * PX_PER_SD, z, series: r.series ?? 0 }
    })
  }, [runs, mode])

  const seriesList = useMemo(() => [...new Set(points.map((p) => p.series))], [points])

  const axisTicks = useMemo(
    () => [...new Set(points.map((p) => p.xIndex ?? p.run - 1))].sort((a, b) => a - b),
    [points],
  )

  const tickX = (idx) => {
    const span = Math.max(axisTicks[axisTicks.length - 1] - axisTicks[0], 1)
    return X0 + ((idx - axisTicks[0]) / span) * (X1 - X0)
  }

  const lines = useMemo(() => {
    if (mode === 'z') {
      return [
        { z: 3, label: '+3 SD', color: COLORS.error, dash: '6,4', w: 2, bold: true },
        { z: 2, label: '+2 SD', color: COLORS.amber, dash: '5,4', w: 1.5, bold: true },
        { z: 1, label: '+1 SD', color: COLORS.grid, dash: '3,3', w: 1 },
        { z: 0, label: 'MEAN (0 SD)', color: COLORS.primary, dash: null, w: 2.5, bold: true },
        { z: -1, label: '-1 SD', color: COLORS.grid, dash: '3,3', w: 1 },
        { z: -2, label: '-2 SD', color: COLORS.amber, dash: '5,4', w: 1.5, bold: true },
        { z: -3, label: '-3 SD', color: COLORS.error, dash: '6,4', w: 2, bold: true },
      ]
    }
    return [3, 2, 1, 0, -1, -2, -3].map((z) => {
      const value = runs[0].mean + z * runs[0].sd
      return {
        z,
        value,
        label: z === 0 ? `MEAN (${value.toFixed(1)})` : `${z > 0 ? '+' : ''}${z} SD (${value.toFixed(1)})`,
        color: z === 0 ? COLORS.primary : Math.abs(z) === 3 ? COLORS.error : Math.abs(z) === 2 ? COLORS.amber : COLORS.grid,
        dash: z === 0 ? null : Math.abs(z) === 1 ? '3,3' : Math.abs(z) === 2 ? '5,4' : '6,4',
        w: z === 0 ? 2.5 : Math.abs(z) === 1 ? 1 : Math.abs(z) === 2 ? 1.5 : 2,
        bold: z === 0 || Math.abs(z) >= 2,
      }
    })
  }, [mode, runs])

  const polylineBySeries = useMemo(
    () =>
      seriesList.map((s) => ({
        series: s,
        color: seriesColor(s),
        points: points
          .filter((p) => p.series === s)
          .sort((a, b) => a.x - b.x)
          .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(2)}`)
          .join(' '),
      })),
    [points, seriesList],
  )
  const active = pinned ?? hovered
  const activePoint = active ? points.find((p) => `${p.series}-${p.run}` === active) : null

  return (
    <div className="relative w-full overflow-x-auto select-none py-2">
      <div className="min-w-[860px] relative">
        <svg className="w-full h-auto overflow-visible font-label-sm" viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label="Grafik kendali mutu Levey-Jennings">
          <defs>
            <linearGradient id="rejectUpper" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLORS.error} stopOpacity="0.15" />
              <stop offset="100%" stopColor={COLORS.error} stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="rejectLower" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLORS.error} stopOpacity="0.02" />
              <stop offset="100%" stopColor={COLORS.error} stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="warnUpper" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLORS.amber} stopOpacity="0.1" />
              <stop offset="100%" stopColor={COLORS.amber} stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="warnLower" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLORS.amber} stopOpacity="0.02" />
              <stop offset="100%" stopColor={COLORS.amber} stopOpacity="0.1" />
            </linearGradient>
            <filter id="shadowPoint" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.18" />
            </filter>
            <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={COLORS.error} floodOpacity="0.8" />
            </filter>
          </defs>

          <rect fill="url(#rejectUpper)" x={X0} y={Y_MEAN - 3 * PX_PER_SD} width={X1 - X0} height={PX_PER_SD} />
          <rect fill="url(#warnUpper)" x={X0} y={Y_MEAN - 3 * PX_PER_SD} width={X1 - X0} height={PX_PER_SD} />
          <rect fill="url(#warnLower)" x={X0} y={Y_MEAN + 2 * PX_PER_SD} width={X1 - X0} height={PX_PER_SD} />
          <rect fill="url(#rejectLower)" x={X0} y={Y_MEAN + 3 * PX_PER_SD} width={X1 - X0} height={PX_PER_SD} />

          <g opacity="0.35">
            {axisTicks.map((t) => (
              <line key={`v-${t}`} stroke={COLORS.grid} strokeWidth="1" x1={tickX(t)} x2={tickX(t)} y1="20" y2="400" />
            ))}
          </g>

          {lines.map((l) => {
            const y = Y_MEAN - l.z * PX_PER_SD
            return (
              <g key={l.z}>
                <line
                  stroke={l.color}
                  strokeWidth={l.w}
                  strokeDasharray={l.dash ?? undefined}
                  x1={X0}
                  x2={X1}
                  y1={y}
                  y2={y}
                />
                <text
                  x={X0 - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill={l.color}
                  fontWeight={l.bold ? 700 : 400}
                >
                  {l.label}
                </text>
              </g>
            )
          })}

          <rect fill={COLORS.primaryContainer} height="22" rx="4" width="30" x="965" y="199" />
          <text className="font-bold" fill="#ffffff" textAnchor="middle" x="980" y="214">
            X̄
          </text>

          {polylineBySeries.map((s) => (
            <polyline
              key={`poly-${s.series}`}
              fill="none"
              points={s.points}
              stroke={s.color ?? COLORS.primary}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          ))}

          {points.map((p) => {
            if (p.status === 'reject') {
              return (
                <g key={`pt-${p.series}-${p.run}`}>
                  <circle cx={p.x} cy={p.y} fill={COLORS.error} fillOpacity="0.25" r="14">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="10;18;10" />
                    <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.6;0.1;0.6" />
                  </circle>
                  <circle cx={p.x} cy={p.y} fill={COLORS.error} filter="url(#glowRed)" r="8" stroke="#ffffff" strokeWidth="2.5" />
                </g>
              )
            }
            if (p.status === 'warning') {
              return (
                <g key={`pt-${p.series}-${p.run}`}>
                  <circle cx={p.x} cy={p.y} fill={COLORS.amberSoft} fillOpacity="0.3" r="8" />
                  <circle cx={p.x} cy={p.y} fill={COLORS.amber} filter="url(#shadowPoint)" r="5.5" stroke="#ffffff" strokeWidth="2" />
                </g>
              )
            }
            return (
              <circle
                key={`pt-${p.series}-${p.run}`}
                cx={p.x}
                cy={p.y}
                r={activePoint?.series === p.series && activePoint?.run === p.run ? 6.5 : 4.5}
                fill={seriesColor(p.series)}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            )
          })}

          {points.map((p) => (
            <circle
              key={`hit-${p.series}-${p.run}`}
              cx={p.x}
              cy={p.y}
              r="14"
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(`${p.series}-${p.run}`)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPinned((v) => (v === `${p.series}-${p.run}` ? null : `${p.series}-${p.run}`))}
            >
              <title>{`Run #${p.run} • ${p.value} • ${p.zText}`}</title>
            </circle>
          ))}

          <g fill={COLORS.outline} fontSize="11" textAnchor="middle">
          {points.map((p) => {
            if (p.axisLabel === false) return null
            return (
              <text
                key={`lbl-${p.series}-${p.run}`}
                x={p.x}
                y="420"
                fill={p.status === 'reject' ? COLORS.error : p.status === 'warning' ? COLORS.amber : COLORS.outline}
                fontWeight={p.status === 'normal' ? 400 : 700}
              >
                {p.run}
                {p.status === 'warning' ? '*' : p.status === 'reject' ? '!' : ''}
              </text>
            )
          })}
          </g>
          <text
            className="font-semibold tracking-wider uppercase"
            fontSize="11"
            fill={COLORS.onSurfaceVariant}
            textAnchor="middle"
            x="525"
            y="446"
          >
            Urutan Run Pengujian QC Harian (Oktober 2024)
          </text>
        </svg>

        {activePoint && (
          <Tooltip
            point={activePoint}
            mode={mode}
            unit={mode === 'z' ? 'SD' : (runs[0].unit ?? '')}
            isToday={activePoint.run === runs.length}
            onOpenCapa={onOpenCapa}
            onNotify={onNotify}
          />
        )}
      </div>
    </div>
  )
}

function Tooltip({ point, mode, unit, isToday, onOpenCapa, onNotify }) {
  const leftPct = (point.x / VB_W) * 100
  const topPct = (point.y / VB_H) * 100
  const isReject = point.status === 'reject'
  const isWarn = point.status === 'warning'
  const tone = isReject ? 'error' : isWarn ? 'secondary' : 'primary'
  const valueTone = isReject ? 'text-error' : isWarn ? 'text-secondary' : 'text-primary'

  return (
    <div
      className="absolute max-w-xs sm:w-80 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-space-md shadow-xl ring-1 ring-outline-variant/30 z-20 space-y-space-xs"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: leftPct > 55 ? 'translate(-100%, -110%)' : 'translate(10px, -10px)',
      }}
    >
      <div className="flex items-center justify-between border-b pb-2 border-surface-container-high">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isReject ? 'bg-error animate-ping' : isWarn ? 'bg-secondary' : 'bg-primary'}`} />
          <span className="font-label-lg text-label-lg font-bold text-on-surface">
            Run #{point.run}
            {isToday ? ' • Hari Ini' : ''}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold uppercase ${
            isReject ? 'bg-error-container text-on-error-container' : 'bg-primary-fixed text-on-primary-fixed'
          }`}
        >
          {point.ruleLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="bg-surface-container-low p-2 rounded-lg">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            {mode === 'z' ? 'Nilai Z' : 'Hasil Terukur'}
          </span>
          <span className={`font-headline-sm text-headline-sm font-bold ${valueTone}`}>
            {mode === 'z' ? `${point.zText.replace(' SD', '')} ` : `${point.value} `}
            <span className="text-body-sm font-normal text-on-surface-variant">
              {mode === 'z' ? 'SD' : unit}
            </span>
          </span>
        </div>
        <div className="bg-surface-container-low p-2 rounded-lg">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Nilai Z-Score</span>
          <span className={`font-headline-sm text-headline-sm font-bold ${valueTone}`}>{point.zText}</span>
        </div>
      </div>

      <div className="text-body-sm font-body-sm text-on-surface-variant space-y-1 pt-1">
        <div className="flex justify-between gap-2">
          <span>Waktu:</span>
          <span className="font-medium text-on-surface text-right">{point.date} WIB</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Petugas ATLM:</span>
          <span className="font-medium text-on-surface text-right">{point.officer}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Verifikasi Sp.PK:</span>
          <span className={`font-medium text-right ${point.verifier.startsWith('Belum') ? 'text-error' : 'text-on-surface'}`}>
            {point.verifier === 'Belum Diverifikasi' ? 'Tertunda (Investigasi)' : point.verifier}
          </span>
        </div>
        <div className={`${isReject ? 'bg-error-container/20' : 'bg-surface-container-low'} p-2 rounded-lg mt-1 text-on-surface text-body-sm leading-snug`}>
          <span className={`font-bold block ${isReject ? 'text-error' : 'text-on-surface'}`}>Catatan Analis:</span>
          "{point.note}"
        </div>
      </div>

      {isReject ? (
        <button
          type="button"
          onClick={() =>
            onOpenCapa({ id: 'CAPA-2024-10-042', parameter: 'Glukosa Sewaktu L2', instrument: 'Dirui CS-T240' })
          }
          className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-space-sm py-2 rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-md text-label-md font-semibold transition-colors shadow-sm"
        >
          <Icon name="assignment_late" className="text-body-md" />
          Buka Tindakan Korektif (CAPA)
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onNotify(`Detail Run #${point.run} dicetak ke lembar audit QI.`)}
          className={`w-full mt-2 inline-flex items-center justify-center gap-1.5 px-space-sm py-2 rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm ${
            tone === 'secondary'
              ? 'bg-secondary-fixed text-on-secondary-fixed'
              : 'bg-primary-container text-on-primary-container'
          }`}
        >
          <Icon name="visibility" className="text-body-md" />
          Lihat Detail Run #{point.run}
        </button>
      )}
    </div>
  )
}

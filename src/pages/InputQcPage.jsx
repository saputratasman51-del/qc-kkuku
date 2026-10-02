import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import {
  capaRootCauses,
  defaultCapaAction,
  qcHistorySeed,
  qcInstruments,
  qcLevels,
  qcMasterParameters,
  qcTechnicians,
  qcTotalEntries,
} from '../data/inputQcData.js'

const LABEL = 'block font-label-md text-label-md text-on-surface font-medium'
const WRAP = 'flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5'
const selectClass = 'w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none outline-none'

function nowStamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function SectionBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Modul Analitik Terakreditasi ISO 15189
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">•</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">Shift Pagi (07:00 - 14:00 WIB)</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Form Input &amp; Riwayat QC Harian
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pencatatan kontrol mutu harian sebelum operasional pengujian spesimen pasien. Validasi real-time Z-score dan
              kepatuhan multi-rule Westgard.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-space-xs rounded-lg">
          {[
            { icon: 'rule_settings', label: 'Status Evaluasi', value: 'Otomasi Westgard Aktif', tone: 'text-primary' },
            { icon: 'sync', label: 'Sinkronisasi', value: 'Lot Master Terhubung', tone: 'text-secondary' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 px-space-sm py-1.5 rounded bg-surface-container-lowest shadow-sm">
              <Icon name={s.icon} className={`text-headline-sm ${s.tone}`} />
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">{s.label}</span>
                <span className={`font-label-md text-label-md ${s.tone} font-semibold`}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MasterTargetCard({ param, level, instrumentLabel, onNotify }) {
  const master = param.levels[level]
  const range = (n) => `${(master.mean - n * master.sd).toFixed(2)} – ${(master.mean + n * master.sd).toFixed(2)}`
  const cv = ((master.sd / master.mean) * 100).toFixed(2)

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
      <div className="flex items-center justify-between pb-space-xs">
        <div className="flex items-center gap-space-xs">
          <Icon name="tune" className="text-secondary text-headline-sm" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Target Master Kontrol</h3>
        </div>
        <span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          {instrumentLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Target Mean (X̄)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {master.mean.toFixed(master.mean < 10 ? 2 : 1)}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{param.unit}</span>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold mt-1">Titik Tengah Ideal</span>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Target SD (1s)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {master.sd.toFixed(master.sd < 1 ? 2 : 1)}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{param.unit}</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">%CV Target: {cv}%</span>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Rentang ±2 SD (Warning)</span>
          <div className="mt-1">
            <span className="font-data-mono text-data-mono font-bold text-on-surface">{range(2)}</span>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold mt-1">Batas Penerimaan Presisi</span>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Rentang ±3 SD (Action)</span>
          <div className="mt-1">
            <span className="font-data-mono text-data-mono font-bold text-error">{range(3)}</span>
          </div>
          <span className="font-label-sm text-label-sm text-error font-semibold mt-1">Batas Penolakan Batch</span>
        </div>
      </div>

      <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs">
        {[
          ['Produsen Reagen', 'DiaSys Diagnostic Systems GmbH'],
          ['Metode Deteksi', param.method],
          ['Bahan Kontrol', `${master.lot} (${param.name})`],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-on-surface-variant">
            <span>{k}:</span>
            <span className="font-semibold text-on-surface">{v}</span>
          </div>
        ))}
        <div className="flex items-center justify-between text-on-surface-variant">
          <span>Verifikator Lab:</span>
          <button
            type="button"
            onClick={() => onNotify('Detail verifikator: dr. Hendra Pratama, Sp.PK (SIP 503/446/SIP-SP/DINKES/2021).')}
            className="font-semibold text-primary hover:underline"
          >
            dr. Hendra Pratama, Sp.PK
          </button>
        </div>
      </div>
    </div>
  )
}

function ZGauge({ z, tone }) {
  const pct = Math.min(96, Math.max(4, ((z + 3.5) / 7) * 100))
  const marks = [-3, -2, -1, 0, 1, 2, 3]
  return (
    <div className="mt-space-sm">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-error/60 via-primary-fixed to-error/60">
        <div className="absolute inset-y-0 left-1/2 w-px bg-primary/60" />
      </div>
      <div className="relative h-0">
        <div
          className={`absolute -translate-x-1/2 -translate-y-[135%] w-3.5 h-3.5 rounded-full shadow-md ring-2 ring-surface-container-lowest ${tone}`}
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
        {marks.map((m) => (
          <span key={m}>{m > 0 ? `+${m}` : m === 0 ? '0' : m} SD</span>
        ))}
      </div>
    </div>
  )
}

function EntryForm({ form, setForm, onSaved, onCapaSubmit, onNotify }) {
  const { instrument, paramKey, level, technician, value, notes } = form
  const params = qcMasterParameters[instrument]
  const param = params[paramKey] ?? params[Object.keys(params)[0]]
  const master = param.levels[level]

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const numeric = parseFloat(value)
  const hasValue = !Number.isNaN(numeric)
  const z = hasValue ? (numeric - master.mean) / master.sd : 0
  const absZ = Math.abs(z)

  const status =
    !hasValue
      ? null
      : absZ > 3
        ? { key: 'reject', label: 'Reject 1-3s', note: 'Di luar batas 3 SD', tone: 'error' }
        : absZ > 2
          ? { key: 'warning', label: 'Warning 1-2s', note: 'Periksa Tren Data', tone: 'secondary' }
          : { key: 'normal', label: 'In-Control', note: 'Presisi Diterima', tone: 'primary' }

  const changeInstrument = (v) => {
    const first = Object.keys(qcMasterParameters[v])[0]
    setForm((f) => ({ ...f, instrument: v, paramKey: first }))
  }

  const simulateNormal = () => {
    const shift = (Math.random() * 1.2 - 0.6) * master.sd
    setForm((f) => ({ ...f, value: (master.mean + shift).toFixed(master.mean < 10 ? 2 : 1) }))
  }

  const reset = () => {
    setForm((f) => ({ ...f, level: 3, value: '215.0', notes: '' }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!hasValue) return
    const instrumentLabel = qcInstruments.find((i) => i.id === instrument).label.split(' (')[0]
    onSaved({
      id: `H-N${Date.now().toString().slice(-5)}`,
      date: nowStamp(),
      dateGroup: 'TODAY',
      instrument,
      instrumentLabel,
      parameter: param.short,
      unit: `${param.unit} (${param.method})`,
      level,
      lot: master.lot.replace('Lot ', ''),
      result: numeric,
      target: `${master.mean.toFixed(master.mean < 10 ? 2 : 1)} ± ${master.sd.toFixed(master.sd < 1 ? 2 : 1)}`,
      z: `${z >= 0 ? '+' : ''}${z.toFixed(2)} SD`,
      zValue: z,
      status: status.key === 'reject' ? 'REJECT' : status.key === 'warning' ? 'WARNING' : 'NORMAL',
      rule:
        status.key === 'reject' ? '1-3s (Outlier)' : status.key === 'warning' ? '1-2s (Periksa Trend)' : 'In-Control (4 Rules OK)',
      verification: 'draft',
      locked: false,
      notes,
      officer: technician,
    })
    onNotify(
      status.key === 'reject'
        ? 'PERINGATAN AUDIT QC: Nilai kontrol di luar 3 SD. Pelanggaran Westgard 1-3s dicatat, formulir CAPA wajib dilengkapi.'
        : 'Data QC harian tersimpan ke log SIM-QC. Menunggu verifikasi Sp.PK pada akhir shift.',
      status.key === 'reject' ? 'error' : 'primary',
    )
    if (status.key === 'reject') onCapaSubmit()
  }

  const zText = hasValue ? `${z >= 0 ? '+' : ''}${z.toFixed(2)} SD` : '0.00 SD'
  const zTone =
    !hasValue ? 'text-on-surface' : absZ > 3 ? 'text-error' : absZ > 2 ? 'text-secondary' : 'text-primary'
  const dev = hasValue ? numeric - master.mean : 0
  const devText = `${dev >= 0 ? '+' : ''}${dev.toFixed(Math.abs(master.mean) < 10 ? 2 : 1)} ${param.unit} dari Target`

  return (
    <div className="xl:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
      <div className="flex items-center justify-between pb-space-xs">
        <div className="flex items-center gap-space-xs">
          <Icon name="science" className="text-primary text-headline-sm" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Input Data QC Baru</h2>
        </div>
        <span className="font-data-mono text-data-mono text-on-surface-variant">ID Sesi: QC-20241024-009</span>
      </div>

      <form onSubmit={submit} className="space-y-space-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="qcTimestamp">
              Tanggal &amp; Waktu Pengujian
            </label>
            <div className={WRAP}>
              <Icon name="event_available" className="text-on-surface-variant text-body-lg mr-2" />
              <input
                id="qcTimestamp"
                readOnly
                value="2024-10-24 08:42 WIB"
                className="w-full bg-transparent font-data-mono text-data-mono text-on-surface outline-none cursor-not-allowed"
              />
            </div>
          </div>
          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="qcTechnician">
              Petugas Pemeriksa (ATLM)
            </label>
            <div className={WRAP}>
              <Icon name="badge" className="text-on-surface-variant text-body-lg mr-2" />
              <select
                id="qcTechnician"
                value={technician}
                onChange={set('technician')}
                className={selectClass}
              >
                {qcTechnicians.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="instrumentSelect">
              Instrumen / Analyzer Laboratorium
            </label>
            <div className={WRAP}>
              <Icon name="precision_manufacturing" className="text-on-surface-variant text-body-lg mr-2" />
              <select
                id="instrumentSelect"
                value={instrument}
                onChange={(e) => changeInstrument(e.target.value)}
                className={selectClass}
              >
                {qcInstruments.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="parameterSelect">
              Parameter Uji Spesifik
            </label>
            <div className={WRAP}>
              <Icon name="water_drop" className="text-on-surface-variant text-body-lg mr-2" />
              <select
                id="parameterSelect"
                value={paramKey}
                onChange={set('paramKey')}
                className={selectClass}
              >
                {Object.entries(params).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.short} - {p.method}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
          <div className="space-y-space-xs">
            <label className={LABEL}>Level Kontrol Serum/Bahan Kontrol</label>
            <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-lg text-center">
              {qcLevels.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, level: l.id }))}
                  className={`py-1.5 rounded-DEFAULT font-label-sm text-label-sm transition-all ${
                    level === l.id
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant font-semibold'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="lotNumberDisplay">
              Nomor Lot Master Kontrol
            </label>
            <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-space-sm py-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <Icon name="verified" className="text-secondary text-body-lg" />
                <span
                  id="lotNumberDisplay"
                  className="font-data-mono text-data-mono text-on-surface font-semibold truncate"
                >
                  {master.lot} ({param.name}, Exp: {master.exp})
                </span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold flex-shrink-0">
                Tervalidasi
              </span>
            </div>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs">
            <div>
              <label className="block font-label-lg text-label-lg text-on-surface font-bold" htmlFor="qcResultInput">
                Hasil Pembacaan Alat (Observed Run)
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Ketik nilai numerik hasil running instrumen
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="straighten" className="text-body-md text-primary" />
              <span>
                Satuan Acuan: <strong className="text-on-surface">{param.unit}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
            <div className="md:col-span-6 relative">
              <input
                id="qcResultInput"
                type="number"
                step="0.01"
                required
                value={value}
                onChange={set('value')}
                placeholder="0.0"
                className="w-full bg-surface-container-lowest text-on-surface font-display-lg text-display-lg px-space-md py-space-sm rounded-lg focus:outline-none shadow-inner tracking-tight"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-data-mono text-data-mono text-on-surface-variant font-bold">
                {param.unit}
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between gap-space-sm">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Kalkulasi Otomatis Z-Score</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-headline-lg text-headline-lg font-bold ${zTone}`}>{zText}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">(Deviasi Standar)</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {status ? (
                      <>
                        <span
                          className={`px-space-xs py-1 rounded font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1 ${
                            status.tone === 'error'
                              ? 'bg-error-container text-on-error-container'
                              : status.tone === 'secondary'
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : 'bg-primary-fixed text-on-primary-fixed'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status.tone === 'error'
                                ? 'bg-error animate-ping'
                                : status.tone === 'secondary'
                                  ? 'bg-secondary'
                                  : 'bg-primary'
                            }`}
                          />
                          {status.label}
                        </span>
                        <span
                          className={`font-label-sm text-label-sm mt-0.5 font-medium ${
                            status.tone === 'error' ? 'text-error' : status.tone === 'secondary' ? 'text-secondary' : 'text-primary'
                          }`}
                        >
                          {status.note}
                        </span>
                      </>
                    ) : (
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Menunggu input nilai...</span>
                    )}
                  </div>
                </div>
                <ZGauge z={z} tone={absZ > 3 ? 'bg-error' : absZ > 2 ? 'bg-secondary' : 'bg-primary'} />
                <div
                  className={`font-body-sm text-body-sm mt-1 ${
                    absZ > 3 ? 'font-semibold text-error' : absZ > 2 ? 'font-semibold text-secondary' : 'font-semibold text-primary'
                  }`}
                >
                  {hasValue ? devText : '—'}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-space-xs">
            <label className={LABEL} htmlFor="qcNotes">
              Keterangan Kondisi Reagen &amp; Kalibrasi (Opsional)
            </label>
            <input
              id="qcNotes"
              value={notes}
              onChange={set('notes')}
              placeholder="Tambahkan rincian bila ada pergantian batch reagen, cuvette wash, atau lampu fotometer..."
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={reset}
              className="px-space-md py-2 rounded-DEFAULT bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-md text-label-md font-semibold flex items-center gap-1.5"
            >
              <Icon name="restart_alt" className="text-body-lg" />
              Reset Form
            </button>
            <button
              type="button"
              onClick={simulateNormal}
              className="px-space-md py-2 rounded-DEFAULT bg-secondary-fixed text-on-secondary-fixed hover:opacity-90 transition-opacity font-label-md text-label-md font-semibold flex items-center gap-1.5"
            >
              <Icon name="science" className="text-body-lg" />
              Simulasi Nilai Normal
            </button>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="submit"
              className="px-space-lg py-2.5 rounded-DEFAULT bg-primary-container text-on-primary-container hover:opacity-95 shadow-md font-label-lg text-label-lg font-bold flex items-center gap-2"
            >
              <Icon name="save_as" className="text-headline-sm" />
              Simpan Hasil QC Harian
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function WestgardAlert({ value, param, level, z, onGoChart, onValidate }) {
  const rejected = Math.abs(z) > 3
  if (!rejected) {
    return (
      <div className="rounded-xl bg-primary-fixed/40 text-on-primary-fixed-variant p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon name="verified" className="text-headline-md" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-space-xs py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase">
                QC In-Control
              </span>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Status QC Valid &amp; Terkendali (In-Control)
              </h4>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              Hasil pengujian {param.short} Level {level} bernilai <strong>{value || '—'} {param.unit}</strong> berada dalam
              batas toleransi analitik (Z-Score {z >= 0 ? '+' : ''}
              {z.toFixed(2)} SD). Aturan Westgard aktif terpenuhi. Pengujian sampel pasien diizinkan berjalan.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-xs flex-shrink-0 self-end md:self-center">
          <button
            type="button"
            onClick={onValidate}
            className="px-space-md py-2 rounded-DEFAULT bg-primary-container text-on-primary-container hover:opacity-90 font-label-md text-label-md font-bold shadow-sm flex items-center gap-1.5"
          >
            <Icon name="task_alt" className="text-body-lg" />
            Validasi Batch Pasien
          </button>
          <button
            type="button"
            onClick={onGoChart}
            className="px-space-md py-2 rounded-DEFAULT bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Icon name="show_chart" className="text-body-lg" />
            Lihat Kurva L-J
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-error-container text-on-error-container p-space-md shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
      <div className="flex items-start gap-space-sm">
        <div className="w-10 h-10 rounded-lg bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sm">
          <Icon name="gpp_bad" className="text-headline-md" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-space-xs py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold uppercase">
              QC Reject
            </span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Pelanggaran Aturan Westgard 1-3s ({param.short} Level {level})
            </h4>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
            Nilai <strong>{value} {param.unit}</strong> ({z >= 0 ? '+' : ''}
            {z.toFixed(2)} SD) berada di luar rentang penerimaan 3 SD. Instrumen <strong>Wajib Di-Lock</strong> dan hasil
            pasien tidak boleh dirilis sebelum formulir CAPA diverifikasi Dokter Sp.PK.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-space-xs flex-shrink-0 self-end md:self-center">
        <button
          type="button"
          onClick={onGoChart}
          className="px-space-md py-2 rounded-DEFAULT bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Icon name="show_chart" className="text-body-lg" />
          Lihat Kurva L-J
        </button>
      </div>
    </div>
  )
}

const STATUS_BADGE = {
  NORMAL: 'bg-primary-fixed text-on-primary-fixed',
  WARNING: 'bg-secondary-fixed text-on-secondary-fixed',
  REJECT: 'bg-error-container text-on-error-container',
}

const STATUS_DOT = {
  NORMAL: 'bg-primary',
  WARNING: 'bg-secondary',
  REJECT: 'bg-error',
}

function HistoryTable({ rows, onNotify, onOpenCapa }) {
  const [dateFilter, setDateFilter] = useState('TODAY')
  const [instFilter, setInstFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [keyword, setKeyword] = useState('')

  const filtered = rows.filter((r) => {
    const okDate = dateFilter === 'ALL' || r.dateGroup === dateFilter
    const okInst = instFilter === 'ALL' || r.instrument === instFilter
    const okStatus = statusFilter === 'ALL' || r.status === statusFilter
    const text = `${r.parameter} ${r.lot} ${r.instrumentLabel} ${r.officer ?? ''}`.toLowerCase()
    const okKeyword = keyword === '' || text.includes(keyword.toLowerCase())
    return okDate && okInst && okStatus && okKeyword
  })

  const selectWrap = 'flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5'

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-xs">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="history" className="text-primary text-headline-sm" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Riwayat Pemeriksaan QC Harian</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Log terenkripsi hasil pemeriksaan mutu laboratorium RSUD Sultan Muhammad Jamaludin I (Bulan Berjalan: Oktober
            2024).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <div className={selectWrap}>
            <Icon name="calendar_month" className="text-on-surface-variant text-body-md mr-1.5" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none outline-none"
            >
              <option value="ALL">Semua Tanggal (Okt 2024)</option>
              <option value="TODAY">Hari Ini (24 Okt 2024)</option>
              <option value="YESTERDAY">Kemarin (23 Okt 2024)</option>
              <option value="WEEK">7 Hari Terakhir</option>
            </select>
          </div>
          <div className={selectWrap}>
            <Icon name="biotech" className="text-on-surface-variant text-body-md mr-1.5" />
            <select
              value={instFilter}
              onChange={(e) => setInstFilter(e.target.value)}
              className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none outline-none"
            >
              <option value="ALL">Semua Alat Lab</option>
              {qcInstruments.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.label.split(' (')[0]}
                </option>
              ))}
            </select>
          </div>
          <div className={selectWrap}>
            <Icon name="filter_alt" className="text-on-surface-variant text-body-md mr-1.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none outline-none"
            >
              <option value="ALL">Semua Status Mutu</option>
              <option value="NORMAL">Normal (In-Control)</option>
              <option value="WARNING">Peringatan (1-2s)</option>
              <option value="REJECT">Reject (Pelanggaran)</option>
            </select>
          </div>
          <div className={selectWrap}>
            <Icon name="search" className="text-on-surface-variant text-body-md mr-1.5" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari lot, parameter, ATLM..."
              className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none outline-none w-36 lg:w-44"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              <th className="py-2.5 px-space-sm">Waktu &amp; Alat</th>
              <th className="py-2.5 px-space-sm">Parameter &amp; Satuan</th>
              <th className="py-2.5 px-space-sm">Level &amp; Lot</th>
              <th className="py-2.5 px-space-sm text-right">Hasil Running</th>
              <th className="py-2.5 px-space-sm text-right">Target (X̄ ± 1s)</th>
              <th className="py-2.5 px-space-sm text-right">Z-Score</th>
              <th className="py-2.5 px-space-sm text-center">Status Mutu</th>
              <th className="py-2.5 px-space-sm text-center">Westgard Rule</th>
              <th className="py-2.5 px-space-sm">Verifikasi Sp.PK</th>
              <th className="py-2.5 px-space-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-on-surface">
            {filtered.map((r) => {
              const isReject = r.status === 'REJECT'
              const isWarning = r.status === 'WARNING'
              return (
                <tr
                  key={r.id}
                  className={`transition-colors ${
                    isReject
                      ? 'bg-error-container/20'
                      : isWarning
                        ? 'bg-secondary-fixed/20'
                        : r.id === qcHistorySeed[0].id
                          ? 'bg-primary-fixed/20'
                          : ''
                  } hover:bg-surface-container-low`}
                >
                  <td className="py-2.5 px-space-sm">
                    <div className="font-label-md text-label-md font-semibold text-on-surface">{r.date}</div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{r.instrumentLabel}</span>
                  </td>
                  <td className="py-2.5 px-space-sm">
                    <span
                      className={`font-label-md text-label-md font-bold ${
                        isReject ? 'text-error' : isWarning ? 'text-tertiary' : 'text-on-surface'
                      }`}
                    >
                      {r.parameter}
                    </span>
                    <span className="font-data-mono text-[11px] text-on-surface-variant block">{r.unit}</span>
                  </td>
                  <td className="py-2.5 px-space-sm">
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                      Level {r.level}
                    </span>
                    <span className="font-data-mono text-[11px] text-on-surface-variant block mt-0.5">{r.lot}</span>
                  </td>
                  <td
                    className={`py-2.5 px-space-sm text-right font-data-mono text-data-mono font-bold ${
                      isReject ? 'text-error' : isWarning ? 'text-tertiary' : 'text-on-surface'
                    }`}
                  >
                    {r.result}
                  </td>
                  <td className="py-2.5 px-space-sm text-right font-data-mono text-[12px] text-on-surface-variant">
                    {r.target}
                  </td>
                  <td
                    className={`py-2.5 px-space-sm text-right font-data-mono text-data-mono font-semibold ${
                      isReject ? 'text-error' : isWarning ? 'text-tertiary' : 'text-primary'
                    }`}
                  >
                    {r.z}
                  </td>
                  <td className="py-2.5 px-space-sm text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase inline-flex items-center gap-1 ${
                        STATUS_BADGE[r.status]
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status]}`} />
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-space-sm text-center">
                    <span
                      className={`font-label-sm text-label-sm ${
                        isReject
                          ? 'font-bold text-error'
                          : isWarning
                            ? 'font-semibold text-secondary'
                            : 'text-primary font-medium'
                      }`}
                    >
                      {r.rule}
                    </span>
                  </td>
                  <td className="py-2.5 px-space-sm">
                    {r.verification === 'locked' ? (
                      <span className="px-1.5 py-0.5 rounded bg-primary-fixed/40 text-on-primary-fixed-variant font-label-sm text-label-sm inline-flex items-center gap-1">
                        <Icon name="lock" className="text-[13px] text-primary" />
                        dr. Hendra, Sp.PK
                      </span>
                    ) : r.verification === 'capa' ? (
                      <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm inline-flex items-center gap-1">
                        <Icon name="warning" className="text-[13px]" />
                        CAPA Disetujui
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm inline-flex items-center gap-1">
                        <Icon name="pending" className="text-[13px]" />
                        {r.id === qcHistorySeed[0].id ? 'Draft ATLM (Ready Sp.PK)' : 'Draft ATLM'}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-space-sm text-right">
                    <div className="flex items-center justify-end gap-1">
                      {r.verification === 'capa' ? (
                        <button
                          type="button"
                          title="Lihat CAPA"
                          onClick={() => onOpenCapa(r)}
                          className="p-1 rounded hover:bg-surface-container-high text-error"
                        >
                          <Icon name="assignment_turned_in" className="text-body-lg" />
                        </button>
                      ) : r.locked ? (
                        <button
                          type="button"
                          title="Data Terkunci"
                          disabled
                          className="p-1 rounded text-on-surface-variant opacity-40 cursor-not-allowed"
                        >
                          <Icon name="lock" className="text-body-lg" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          title="Edit Catatan"
                          onClick={() => onNotify(`Mode edit diaktifkan untuk entri ${r.id}.`)}
                          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant"
                        >
                          <Icon name="edit" className="text-body-lg" />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Detail Data"
                        onClick={() => onNotify(`Detail ${r.parameter} • ${r.result} • ${r.z} • ${r.rule}`)}
                        className="p-1 rounded hover:bg-surface-container-high text-primary"
                      >
                        <Icon name="visibility" className="text-body-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="py-6 px-space-sm text-center text-on-surface-variant">
                  Tidak ada entri QC yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs pt-space-xs">
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
          <Icon name="shield" className="text-body-lg text-primary" />
          <span>
            <strong>Catatan Integritas Audit:</strong> Data QC yang telah divalidasi dokter spesialis patologi klinik
            terkunci secara permanen sesuai standar akreditasi ISO 15189:2022.
          </span>
        </div>
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
          <span>
            Menampilkan {filtered.length} dari {qcTotalEntries} entri kontrol bulan ini
          </span>
        </div>
      </div>
    </div>
  )
}

function CapaModal({ open, onClose, onSubmit, incident }) {
  const [cause, setCause] = useState(capaRootCauses[0])
  const [action, setAction] = useState(defaultCapaAction)

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-xl"
      headerBg="bg-primary-fixed/40"
      icon="medical_services"
      title="Formulir Tindakan Korektif (CAPA)"
      subtitle="Nomor Dokumen: CAPA/LAB-SMJ/2024/X/014"
      footer={
        <div className="bg-surface-container-low px-space-lg py-space-sm flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Status Alat: <strong className="text-error">LOCKED</strong>
          </span>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-DEFAULT bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => onSubmit({ cause, action })}
              className="px-space-md py-2 rounded-DEFAULT bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-md hover:opacity-95 transition-opacity"
            >
              Kirim &amp; Verifikasi Sp.PK
            </button>
          </div>
        </div>
      }
    >
      <div className="p-space-lg space-y-space-md">
        <div className="p-space-sm rounded-lg bg-error-container text-on-error-container flex items-center gap-space-xs font-label-md text-label-md">
          <Icon name="report" className="text-headline-sm text-error" />
          <div>
            <strong>Pelanggaran Terdeteksi:</strong> {incident?.parameter ?? 'Glukosa Darah'} (
            {incident?.instrumentLabel ?? 'Dirui CS-T240'}) bernilai {incident?.result ?? '242.0'} {incident?.unit ?? 'mg/dL'} (
            {incident?.z ?? '+3.38 SD'} - Westgard 1-3s).
          </div>
        </div>
        <div className="space-y-space-xs">
          <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="capaRootCause">
            Akar Masalah (Root Cause Identification)
          </label>
          <select
            id="capaRootCause"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className="w-full bg-surface-container-low rounded-lg px-space-sm py-2 font-body-md text-body-md text-on-surface focus:outline-none outline-none"
          >
            {capaRootCauses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-space-xs">
          <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="capaActionTaken">
            Tindakan Perbaikan Segera (Immediate Action Taken)
          </label>
          <textarea
            id="capaActionTaken"
            rows={3}
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Jelaskan tindakan ATLM (contoh: Membuka botol reagen baru, cuvette wash 3 siklus, rekondisi elektroda, running ulang kontrol...)"
            className="w-full bg-surface-container-low rounded-lg p-space-sm font-body-md text-body-md text-on-surface focus:outline-none outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-space-md">
          <div className="space-y-space-xs">
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium">Petugas Pelaksana</label>
            <div className="font-label-md text-label-md text-on-surface font-semibold">Siti Rahma, A.Md.AK</div>
          </div>
          <div className="space-y-space-xs">
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium">Sp.PK Verifikator</label>
            <div className="font-label-md text-label-md text-primary font-semibold">dr. Hendra Pratama, Sp.PK</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default function InputQcPage({ onNotify }) {
  const [rows, setRows] = useState(qcHistorySeed)
  const [capaOpen, setCapaOpen] = useState(false)
  const [incident, setIncident] = useState(null)
  const [form, setForm] = useState({
    instrument: 'DIRUI_CS240',
    paramKey: 'URIC_ACID',
    level: 2,
    technician: qcTechnicians[0].value,
    value: '7.58',
    notes: 'Run #25 harian. Kontrol rekonstitusi baru suhu 20°C, blanko reagen dan kalibrasi tervalidasi.',
  })
  const navigate = useNavigate()

  const params = qcMasterParameters[form.instrument]
  const param = params[form.paramKey] ?? params[Object.keys(params)[0]]
  const master = param.levels[form.level]
  const numeric = parseFloat(form.value)
  const z = Number.isNaN(numeric) ? 0 : (numeric - master.mean) / master.sd

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      <SectionBanner />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        <EntryForm
          form={form}
          setForm={setForm}
          onSaved={(row) => {
            setRows((list) => [row, ...list])
            setIncident(row)
          }}
          onCapaSubmit={() => setCapaOpen(true)}
          onNotify={onNotify}
        />

        <div className="xl:col-span-5 space-y-space-md">
          <MasterTargetCard
            param={param}
            level={form.level}
            instrumentLabel={qcInstruments.find((i) => i.id === form.instrument).label.split(' (')[0]}
            onNotify={onNotify}
          />
          <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface font-label-lg text-label-lg font-bold">
              <Icon name="verified_user" className="text-secondary text-body-lg" />
              <span>Protokol Mutu Internal (PMI)</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Jika nilai QC melanggar aturan penolakan (<strong className="text-on-surface">1-3s, 2-2s, R-4s, atau 4-1s</strong>
              ), instrumen <em>Wajib Di-Lock</em>. Dilarang menerbitkan hasil pasien sampai formulir Tindakan Korektif
              (CAPA) diverifikasi oleh Dokter Sp.PK.
            </p>
          </div>
        </div>
      </div>

      <WestgardAlert
        value={form.value}
        param={param}
        level={form.level}
        z={z}
        onGoChart={() => navigate('/grafik-levey-jennings')}
        onValidate={() => onNotify('Batch pasien divalidasi. Rilis hasil ke SIMRS diizinkan.')}
      />

      <HistoryTable
        rows={rows}
        onNotify={onNotify}
        onOpenCapa={(row) => {
          setIncident(row)
          setCapaOpen(true)
        }}
      />

      <CapaModal
        open={capaOpen}
        incident={incident}
        onClose={() => setCapaOpen(false)}
        onSubmit={() => {
          setCapaOpen(false)
          if (incident?.id) {
            setRows((list) => list.map((r) => (r.id === incident.id ? { ...r, verification: 'capa' } : r)))
          }
          onNotify('DOKUMEN CAPA DIKIRIM: Formulir investigasi ditandatangani digital oleh Siti Rahma, A.Md.AK dan diteruskan ke Penanggung Jawab Lab (dr. Hendra Pratama, Sp.PK).')
        }}
      />
    </div>
  )
}

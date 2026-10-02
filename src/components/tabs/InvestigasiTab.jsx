import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { correctiveActions, preventiveActions, rca5m } from '../../data/mockData.js'

function Section1() {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
      <div className="flex items-center justify-between pb-space-xs mb-space-md">
        <span className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
          <Icon name="fact_check" className="text-headline-sm" />
          Bagian 1: Informasi Kegagalan Analitik
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Sumber: Otomatisasi LIS Rule Engine</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md font-body-sm text-body-sm">
        <div className="p-space-sm rounded-lg bg-surface-container-low">
          <span className="text-on-surface-variant font-label-sm text-label-sm block">Nilai Terukur vs Target</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-data-mono text-data-mono font-bold text-headline-sm text-error">242.0</span>
            <span className="text-on-surface-variant font-label-sm">vs Target: 215.0 mg/dL</span>
          </div>
          <span className="font-data-mono text-data-mono text-error font-semibold block mt-0.5">
            Penyimpangan: +3.38 SD (+27.0 mg/dL)
          </span>
        </div>
        <div className="p-space-sm rounded-lg bg-surface-container-low">
          <span className="text-on-surface-variant font-label-sm text-label-sm block">Lot Reagen &amp; Kontrol</span>
          <span className="font-data-mono text-data-mono font-bold text-on-surface block mt-1">Reagen: #RG-GLU-8812</span>
          <span className="font-data-mono text-data-mono text-on-surface-variant">
            Kontrol: #GLU-9903 (Exp: 28/02/2025)
          </span>
        </div>
        <div className="p-space-sm rounded-lg bg-surface-container-low">
          <span className="text-on-surface-variant font-label-sm text-label-sm block">Tindakan Pengamanan Awal</span>
          <span className="font-label-sm text-label-sm font-bold text-error block mt-1">LOCK RUN AKTIF</span>
          <span className="text-on-surface-variant">12 sampel pasien ditahan di buffer</span>
        </div>
      </div>
    </div>
  )
}

function Section2() {
  const [values, setValues] = useState(() => Object.fromEntries(rca5m.map((r) => [r.key, r.value])))

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
      <div className="flex items-center justify-between pb-space-xs mb-space-md">
        <span className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
          <Icon name="account_tree" className="text-headline-sm" />
          Bagian 2: Investigasi Akar Masalah (Metode 5M)
        </span>
        <span className="px-space-xs py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
          Wajib Terisi Lengkap
        </span>
      </div>
      <div className="space-y-space-md">
        {rca5m.map((row) => (
          <div
            key={row.key}
            className="p-space-sm rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-start gap-space-sm"
          >
            <div
              className={`w-28 flex-shrink-0 flex items-center gap-1 font-label-md text-label-md font-bold ${
                row.highlight ? 'text-error' : 'text-on-surface'
              }`}
            >
              <Icon name={row.icon} className={`text-body-md ${row.highlight ? 'text-error' : 'text-primary'}`} />
              <span>{row.label}</span>
            </div>
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={values[row.key]}
                onChange={(e) => setValues((v) => ({ ...v, [row.key]: e.target.value }))}
                className={`w-full px-space-sm py-1.5 rounded-DEFAULT bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                  row.highlight ? 'font-semibold text-error' : ''
                }`}
              />
              {row.highlight && (
                <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                  <Icon name="warning" className="text-[13px] text-error" />
                  Temuan Kunci Penyebab Random Error Outlier
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Section3and4() {
  const [actions, setActions] = useState(correctiveActions)
  const doneCount = actions.filter((a) => a.checked).length
  const percent = Math.round((doneCount / actions.length) * 100)

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-xs mb-space-sm">
          <span className="font-label-lg text-label-lg font-bold text-error uppercase tracking-wide flex items-center gap-1">
            <Icon name="healing" className="text-body-md text-error" />
            Tindakan Korektif Segera
          </span>
          <span className="font-label-sm text-label-sm text-primary font-bold">
            {doneCount}/{actions.length} ({percent}%)
          </span>
        </div>
        <div className="space-y-space-xs font-body-sm text-body-sm">
          {actions.map((a) => (
            <label
              key={a.id}
              className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer ${
                a.highlight ? 'bg-primary-fixed/30' : 'bg-surface-container-low'
              }`}
            >
              <input
                type="checkbox"
                checked={a.checked}
                onChange={() =>
                  setActions((list) => list.map((x) => (x.id === a.id ? { ...x, checked: !x.checked } : x)))
                }
                className="mt-0.5 rounded text-primary focus:ring-primary"
              />
              <span className={`text-on-surface ${a.highlight ? 'font-semibold' : ''}`}>{a.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-space-md pt-space-md">
        <span className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wide flex items-center gap-1 mb-space-xs">
          <Icon name="shield" className="text-body-md text-primary" />
          Tindakan Preventif (Pencegahan)
        </span>
        <div className="p-space-sm rounded-lg bg-surface-container-low space-y-1.5">
          {preventiveActions.map((p, i) => (
            <p key={i} className="font-body-sm text-body-sm text-on-surface">
              {i + 1}. {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
        <span>
          PIC: <strong className="text-on-surface">Siti Rahma, A.Md.AK</strong>
        </span>
        <span>
          Batas SLA: <strong className="text-on-surface">Hari ini, 12:00 WIB</strong>
        </span>
      </div>
    </div>
  )
}

export default function InvestigasiTab({ onSubmitToDoctor }) {
  return (
    <div className="flex flex-col space-y-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-headline-md font-bold shadow-sm">
            #042
          </div>
          <div>
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Formulir Investigasi CAPA #CAPA-2024-10-042
              </span>
              <span className="px-space-xs py-0.5 rounded-DEFAULT bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                Status: Investigasi Berjalan
              </span>
              <span className="px-space-xs py-0.5 rounded-DEFAULT bg-error text-on-error font-label-sm text-[10px] font-bold">
                Pelanggaran 1-3s Westgard
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Parameter: <strong>Glukosa Darah GOD-PAP</strong> • Instrumen:{' '}
              <strong>Dirui CS-T240 Kimia Klinik</strong> • Pembuat Dokumen: <strong>Siti Rahma, A.Md.AK</strong> (24 Okt 2024
              08:42 WIB)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            onClick={onSubmitToDoctor}
            className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Icon name="send" className="text-body-md" />
            <span>Ajukan ke dr. Hendra, Sp.PK</span>
          </button>
          <button
            type="button"
            className="px-space-sm py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all flex items-center gap-1"
          >
            <Icon name="print" className="text-body-md" />
            <span>Cetak Form 5M</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        <div className="lg:col-span-8 flex flex-col space-y-space-md">
          <Section1 />
          <Section2 />
        </div>
        <div className="lg:col-span-4 flex flex-col space-y-space-md">
          <Section3and4 />
        </div>
      </div>
    </div>
  )
}

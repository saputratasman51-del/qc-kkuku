import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { IMG_DOCTOR, spPkAssessment, verificationSteps } from '../../data/mockData.js'

function Stepper() {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-space-md pb-space-xs">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
            <Icon name="timeline" className="text-body-md" />
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Alur Otorisasi Klinis &amp; Verifikasi CAPA
            </h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              SOP Kendali Mutu Patologi Klinik RSUD SMJ I Kayong Utara (ISO 15189:2022)
            </span>
          </div>
        </div>
        <span className="px-space-sm py-1 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
          Tahap 4 dari 4 Aktif
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
        {verificationSteps.map((s) => {
          const current = s.state === 'current'
          return (
            <div
              key={s.n}
              className={`p-space-sm rounded-lg flex flex-col justify-between ${
                current ? 'bg-primary-fixed/40 shadow-sm' : 'bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold flex items-center justify-center ${
                    current ? 'animate-pulse' : ''
                  }`}
                >
                  {s.n}
                </span>
                {current ? (
                  <span className="px-space-xs py-0.5 rounded-DEFAULT bg-primary-container text-on-primary-container font-label-sm text-[10px] font-bold">
                    MENUNGGU VALIDASI
                  </span>
                ) : (
                  <Icon name="check_circle" className="text-body-sm text-primary" />
                )}
              </div>
              <div className="mt-2">
                <span
                  className={`font-label-md text-label-md font-bold block ${current ? 'text-primary' : 'text-on-surface'}`}
                >
                  {s.title}
                </span>
                <span
                  className={`font-body-sm text-body-sm ${
                    current ? 'text-on-surface font-medium' : 'text-on-surface-variant'
                  }`}
                >
                  {s.meta}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SignatureConsole({ onApprove, onReject, onRevise, approved }) {
  const [note, setNote] = useState(spPkAssessment)

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pb-space-md mb-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-14 h-14 rounded-full bg-surface-container-high p-0.5 shadow-sm flex-shrink-0">
            <img alt="Potret dr. Hendra Pratama, Sp.PK" className="w-full h-full rounded-full object-cover" src={IMG_DOCTOR} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">dr. Hendra Pratama, Sp.PK</span>
              <span className="px-space-xs py-0.5 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                Penanggung Jawab Teknis Mutu
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              SIP: 503/446/SIP-SP/DINKES/2021 • Laboratorium Patologi Klinik RSUD SMJ I Kab. Kayong Utara
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
          <div className="w-12 h-12 bg-surface-container-lowest p-1 rounded-DEFAULT flex items-center justify-center shadow-sm">
            <svg className="w-full h-full text-on-surface" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4-2h2v4h-2v-4zm2 4h2v4h-2v-4zm2 2h2v2h-2v-2zm-6 2h4v2h-4v-2z" />
            </svg>
          </div>
          <div className="text-left font-body-sm text-body-sm">
            <span className="font-label-sm text-label-sm font-bold text-primary block">TTE Terverifikasi BSrE / Kemenkes</span>
            <span className="font-data-mono text-[10px] text-on-surface-variant block">Hash: a7f8e910-c11-smj1-2024</span>
          </div>
        </div>
      </div>

      <div className="space-y-space-sm mb-space-md">
        <label className="font-label-lg text-label-lg font-bold text-on-surface flex items-center justify-between">
          <span>Catatan Pertimbangan Klinis &amp; Rekomendasi Dokter Sp.PK:</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Tertera pada sertifikat audit</span>
        </label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-sm">
        <div className="text-on-surface-variant font-body-sm text-body-sm">
          Menyetujui dokumen ini akan otomatis membuka kunci antarmuka instrumen di jaringan LIS.
        </div>
        <div className="flex items-center gap-space-sm w-full sm:w-auto">
          <button
            type="button"
            onClick={onReject}
            className="flex-1 sm:flex-initial px-space-md py-2.5 rounded-lg bg-surface-container-high text-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md font-semibold transition-all"
          >
            Tolak &amp; Panggil Vendor
          </button>
          <button
            type="button"
            onClick={onRevise}
            className="flex-1 sm:flex-initial px-space-md py-2.5 rounded-lg bg-surface-container-high text-secondary hover:bg-secondary-fixed transition-all font-label-md text-label-md font-semibold"
          >
            Kembalikan Revisi
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={approved}
            className={`flex-1 sm:flex-initial px-space-lg py-2.5 rounded-lg font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center justify-center gap-1.5 ${
              approved
                ? 'bg-surface-container-high text-on-surface-variant'
                : 'bg-primary-container text-on-primary-container hover:opacity-95'
            }`}
          >
            <Icon name="verified" className="text-body-md" />
            <span>{approved ? 'Sudah Ditandatangani' : 'Setujui & Tanda Tangan Digital'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VerifikasiTab({ approved, onApprove, onReject, onRevise }) {
  return (
    <div className="flex flex-col space-y-space-md">
      <Stepper />
      <SignatureConsole
        approved={approved}
        onApprove={onApprove}
        onReject={onReject}
        onRevise={onRevise}
      />
    </div>
  )
}

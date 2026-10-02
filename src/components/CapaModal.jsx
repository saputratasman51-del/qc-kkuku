import { useEffect, useState } from 'react'
import Modal, { ModalHeader } from './Modal.jsx'

const FIELD =
  'px-space-sm py-2 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none'
const LABEL = 'font-label-sm text-label-sm text-on-surface font-semibold'

export default function CapaModal({ open, target, onClose, onSubmit }) {
  const [cause, setCause] = useState('')
  const [correction, setCorrection] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (open) {
      setCause('')
      setCorrection('')
      setDescription('')
    }
  }, [open, target])

  if (!target) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-lg"
      header={
        <ModalHeader
          icon="report_problem"
          iconClass="text-error"
          bgClass="bg-error-container/40"
          title={target.id === 'BARU' ? 'Investigasi & CAPA Westgard' : `CAPA: ${target.parameter}`}
          subtitle={
            target.id === 'BARU'
              ? 'Formulir ketidaksesuaian analitik baru'
              : `Instrumen: ${target.instrument} | ID: ${target.id}`
          }
          onClose={onClose}
        />
      }
      footer={
        <div className="flex items-center justify-end gap-space-sm">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => onSubmit({ ...target, cause, correction, description })}
            className="px-space-md py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold shadow-sm transition-colors"
          >
            Kirim CAPA untuk Verifikasi
          </button>
        </div>
      }
    >
      <div className="p-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col gap-1">
          <label className={LABEL}>Penyebab Utama (Root Cause Analysis)</label>
          <select value={cause} onChange={(e) => setCause(e.target.value)} className={`h-9 ${FIELD}`}>
            <option value="">-- Pilih indikasi penyebab --</option>
            <option>Masa Stabilitas Reagen On-Board Kedaluwarsa</option>
            <option>Pergeseran Kalibrasi (Drift Analitik)</option>
            <option>Kontaminasi Kuvet Reaksi / Jarum Pipet</option>
            <option>Fluktuasi Suhu Inkubasi Analitik</option>
            <option>Kesalahan Rekonstitusi Serum Kontrol</option>
            <option>Lainnya (Tuliskan pada deskripsi)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL}>Tindakan Koreksi Cepat (Immediate Correction)</label>
          <select value={correction} onChange={(e) => setCorrection(e.target.value)} className={`h-9 ${FIELD}`}>
            <option value="">-- Pilih tindakan koreksi --</option>
            <option>Ganti Cartridge Reagen Baru &amp; Re-run QC</option>
            <option>Lakukan Rekalibrasi Multi-Poin Penuh</option>
            <option>Maintenance Cuci Probe &amp; Cuci Kuvet Intensif</option>
            <option>Buka Vial Kontrol Baru &amp; Thawing Ulang</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL}>Deskripsi Rincian Tindakan Teknisi Lab</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Tuliskan nomor lot reagen pengganti, hasil pengujian ulang kontrol pasca koreksi..."
            className={`p-space-sm ${FIELD} resize-none`}
          />
        </div>
        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span>
            Pelapor: <strong className="text-on-surface">Budi Santoso, S.Tr.Kes</strong>
          </span>
          <span>
            Verifikator: <strong className="text-on-surface">dr. Hendra Pratama, Sp.PK</strong>
          </span>
        </div>
      </div>
    </Modal>
  )
}

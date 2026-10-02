import Modal from './Modal.jsx'

export default function QcDetailModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon="monitoring"
      iconTone="text-secondary"
      maxWidth="max-w-lg"
      title="Detail Kejadian QC • SGPT (2-2s)"
      subtitle="Dirui CS-T240 • Run #23 Pagi"
      footer={
        <div className="p-space-md bg-surface-container-low flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold"
          >
            Tutup
          </button>
        </div>
      }
    >
      <div className="p-space-md space-y-space-sm font-body-sm text-body-sm">
        <p className="text-on-surface">
          Terjadi 2 titik berturut-turut pada Level 2 melebihi ambang batas +2 SD (Run #22: +2.08 SD, Run #23: +2.15 SD).
          Aturan <strong>Westgard 2-2s</strong> mengindikasikan <em>Systematic Bias</em> akibat pergeseran kalibrasi photometer
          atau degradasi substrat enzym.
        </p>
        <div className="p-space-sm rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm font-bold text-primary block">Rekomendasi Teknisi:</span>
          <span className="text-on-surface-variant">
            Lakukan re-kalibrasi dengan Calibrator baru dan bersihkan filter optik 340 nm.
          </span>
        </div>
      </div>
    </Modal>
  )
}

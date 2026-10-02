export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-sm px-gutter-desktop mt-auto shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-xs">
        <span>© 2024 RSUD Sultan Muhammad Jamaludin I — Sistem Informasi Monitoring Mutu Laboratorium (SIM-QC)</span>
        <div className="flex items-center gap-space-md">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Koneksi LIS / Analyzer: Normal (Sysmex XN-550, Cobas c311)
          </span>
          <span>Kabupaten Kayong Utara</span>
        </div>
      </div>
    </footer>
  )
}

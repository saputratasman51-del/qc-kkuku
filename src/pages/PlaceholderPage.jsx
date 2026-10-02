import Icon from '../components/Icon.jsx'

const MODULES = {
  '/input-qc-harian': {
    icon: 'edit_document',
    title: 'Input QC Harian',
    desc: 'Pencatatan hasil kontrol kualitas per shift dan per level kontrol dari seluruh analyzer.',
    hint: 'Gunakan tombol "Input QC Sekarang" pada Dashboard untuk mulai entri.',
  },
  '/grafik-levey-jennings': {
    icon: 'show_chart',
    title: 'Grafik Levey-Jennings',
    desc: 'Visualisasi kurva kontrol, batas 1-2s hingga 3s, dan deteksi tren per parameter.',
    hint: 'Modul sedang dalam tahap pengembangan.',
  },
  '/laporan': {
    icon: 'analytics',
    title: 'Laporan',
    desc: 'Rekapitalisasi kepatuhan PMI, indeks keandalan, dan audit trail untuk akreditasi.',
    hint: 'Modul sedang dalam tahap pengembangan.',
  },
}

export default function PlaceholderPage({ path }) {
  const m = MODULES[path]
  if (!m) return null
  return (
    <div className="flex flex-col w-full items-center justify-center py-space-xl">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-sm p-space-lg text-center">
        <div className="w-14 h-14 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center mx-auto mb-space-md">
          <Icon name={m.icon} className="text-display-lg" />
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">{m.title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">{m.desc}</p>
        <p className="font-label-sm text-label-sm text-primary mt-space-md inline-block px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
          {m.hint}
        </p>
      </div>
    </div>
  )
}

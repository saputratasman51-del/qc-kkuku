export const IMG_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnpALLy-oYV1Fr5WvYDmRQe6jF_7Kk08gkxIBdBJCR-1QLDTFzlHm59Z4EXj__YoNotVwZM-F5G78gReBtnmkZKKaZfjQIRbZihP3epIntwj__SdJLzhldBAhZsenM-qonvCKn2w9O-_-GnZtBTdwUd8M_G6hbJLb-EstxVKu-f4jY0lmggmDQmJ92X3HYTS3dS_6g0k_s8IG809Q-Vi4bU3kv4RAFnaaLEeQsh5V5QWVi1CJ5TDDMYg'

export const IMG_HEADER_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCNOHdw0YB58_ZWZyl8k1Va-jVyFPGNkXvH0wWPGvOEs0-WR8OVvr7Cyz50fhcqi9CjrR7vlCvBcWWsgIM4h8KbWqCPRHDKIft-7v4nrU4uDpJfUKGNFnBKXvDRHVBaKODlb73hcScncaEIoZeKwFRq4aDTx84ioxkwPAPHCwNrYJIwI90q1-0aDWt_XDqOs2SgsFjdupYp8fVXaeiQ_7AnhDduBWadIzyaFf0Xoy8do10HasiqN2GNqw'

export const IMG_AVATAR =
  'https://lh3.googleusercontent.com/aida/AEtjO1VF9xYxi4lY7QVwBsrmJEKA9OtraZyEBhbhoi_TahvahNsa_6VbHwPSqw8yKGJnrx4er4Pxi_6sZTGnvBNkLFBFWpgCBORk61kKY6PsGQX1XDDIu5RFnaTeHWjT9mjc8OPmy4PnZR51qyr36Q98coV-GccupGN2WmAhxQiVrTraS7-rQ8dJPK00CxBi-heSoAbQSdW-VPnxUOIH72MnSrnzjdRTvEmxkmk3z05tsoE8hl1PxUrPXL7-T_mWEX4jF7mpXuzvMvKq6zA'

export const IMG_DOCTOR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXcJOsJTDHeU8AygnRHpaN4MTAgWR4Ea4UXL5Vt0tKgx_PDaoXS05reZAruQrzIvwvoN6RbFLXLakgLufKdQxNQSBxXr5ICEDClV_9iSHMB5q3AMc--d1fPpTJdA1euPjggIMtQWuPWW1E1RTnyBt8ztj5JgW_bKiYNVcESyoWnyybhqTgP6tN_Fu_fNrc0IVY5fBRQB_I4I-40VqNu5rWM1U_RW_Y9zK99xSH_8trsN51xrvhYoy8CQ'

export const navItems = [
  { to: '/', path: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
  { to: '/input-qc-harian', path: 'input-qc-harian', icon: 'edit_document', label: 'Input QC Harian' },
  {
    to: '/grafik-levey-jennings',
    path: 'grafik-levey-jennings',
    icon: 'show_chart',
    label: 'Grafik Levey-Jennings',
  },
  { to: '/capa-westgard', path: 'capa-westgard', icon: 'warning', label: 'CAPA & Westgard', badge: '3' },
  { to: '/master-data', path: 'master-data', icon: 'database', label: 'Master Data' },
  { to: '/laporan', path: 'laporan', icon: 'analytics', label: 'Laporan' },
]

export const westgardRules = [
  {
    id: 'WG-20241024-001',
    date: '24 Okt 2024',
    time: '08:42',
    run: 'Run QC Pagi (#24)',
    instrument: 'Dirui CS-T240',
    location: 'Meja Kimia Klinik #1',
    parameter: 'Glukosa Darah (GOD-PAP)',
    lot: 'Lot: GLU-9903 • Level 3',
    value: '242.0 mg/dL',
    zscore: 'Z-Score: +3.38 SD',
    rule: '1-3s (REJECT)',
    ruleStyle: 'error',
    errorType: 'Random Error Kritis',
    errorTypeStyle: 'error',
    impact: 'INSTRUMEN TERKUNCI',
    impactNote: '12 sampel pasien ditahan',
    critical: true,
    actionLabel: 'Buka CAPA #042',
    actionStyle: 'error',
    action: 'investigasi',
  },
  {
    id: 'WG-20241024-002',
    date: '24 Okt 2024',
    time: '08:35',
    run: 'Run QC Pagi (#23)',
    instrument: 'Dirui CS-T240',
    location: 'Meja Kimia Klinik #1',
    parameter: 'SGPT / ALT (IFCC)',
    lot: 'Lot: ENZ-2024 • Level 2',
    value: '54.2 U/L',
    zscore: 'Z-Score: +2.15 SD',
    rule: '2-2s (REJECT)',
    ruleStyle: 'secondary',
    errorType: 'Systematic Bias',
    errorTypeStyle: 'neutral',
    impact: 'Tahan Modul Enzim',
    impactNote: 'Re-kalibrasi kalibrator C.f.a.s',
    critical: false,
    valueTone: 'secondary',
    actionLabel: 'Lihat Rekam QC',
    actionStyle: 'soft',
    action: 'qc-detail',
  },
  {
    id: 'WG-20241024-003',
    date: '24 Okt 2024',
    time: '07:55',
    run: 'Run QC Shift 1 (#18)',
    instrument: 'Sysmex XN-550',
    location: 'Meja Hematologi',
    parameter: 'Trombosit (PLT-I)',
    lot: 'Lot: XN-CHECK-L1 • Level 1',
    value: '62.0 x10^3/uL',
    zscore: 'Z-Score: -2.04 SD',
    rule: '1-2s (Warning)',
    ruleStyle: 'tertiary',
    errorType: 'Peringatan Awal',
    errorTypeStyle: 'muted',
    impact: 'Operasional Lanjut',
    impactNote: 'Observasi run berikutnya',
    critical: false,
    actionLabel: 'Abaikan/Catat',
    actionStyle: 'plain',
  },
  {
    id: 'WG-20241023-004',
    date: '23 Okt 2024',
    time: '14:10',
    run: 'Run QC Siang (#12)',
    instrument: 'Cobas e411',
    location: 'Meja Imunologi',
    parameter: 'HBsAg Kuantitatif',
    lot: 'Lot: PRECI-082 • Level 2',
    value: '1.82 COI',
    zscore: 'Z-Score: +2.85 SD',
    rule: 'R-4s (Closed)',
    ruleStyle: 'closed',
    errorType: 'Random Error',
    errorTypeStyle: 'muted',
    impact: 'Normal / In-Control',
    impactNote: 'Selesai CAPA #041',
    critical: false,
    actionLabel: 'Tervalidasi Sp.PK',
    actionStyle: 'text',
  },
]

export const rca5m = [
  {
    key: 'MAN',
    icon: 'person',
    label: '1. MAN:',
    value:
      'Petugas ATLM bersertifikat kompetensi Kimia Klinik. Teknik pemipetan manual rekonstitusi kontrol telah dievaluasi ulang.',
    highlight: false,
  },
  {
    key: 'MACHINE',
    icon: 'precision_manufacturing',
    label: '2. MACHINE:',
    value:
      'Ditemukan gelembung mikro pada selang peristaltik syringe probe reagen R1 Dirui CS-T240 dan residu pada cuvette #34.',
    highlight: true,
  },
  {
    key: 'MATERIAL',
    icon: 'vaccines',
    label: '3. MATERIAL:',
    value:
      'Botol reagen baru dibuka dari pendingin 2-8°C tanpa pre-warming cukup, menyebabkan kondensasi permukaan sensor.',
    highlight: false,
  },
  {
    key: 'METHOD',
    icon: 'menu_book',
    label: '4. METHOD:',
    value: 'Metode GOD-PAP End Point Bi-chromatic sesuai Kit Insert. Prosedur kalibrasi 2-point linier.',
    highlight: false,
  },
  {
    key: 'MILIEU',
    icon: 'thermostat',
    label: '5. MILIEU:',
    value: 'Suhu ruangan laboratorium stabil pada 22.4°C, Kelembaban 54% (Log Thermo-hygrometer normal).',
    highlight: false,
  },
]

export const correctiveActions = [
  { id: 'ca-1', text: 'Tahan rilis 12 spesimen glukosa pasien batch pagi', checked: true },
  { id: 'ca-2', text: 'Prime syringe & de-bubbling tubing probe reagen', checked: true },
  { id: 'ca-3', text: 'Jalankan cuvette wash cycle dengan larutan deterjen asam', checked: true },
  { id: 'ca-4', text: 'Rekonstitusi vial kontrol baru Glukosa Level 3', checked: true },
  {
    id: 'ca-5',
    text: 'Re-run Kontrol QC: Hasil 216.5 mg/dL (+0.18 SD, IN-CONTROL)',
    checked: true,
    highlight: true,
  },
]

export const preventiveActions = [
  'SOP pre-warming reagen 30 menit pada suhu ruang sebelum dipasang ke turntable pendingin alat.',
  'Pembersihan rutin syringe pump setiap pergantian shift pagi dan malam.',
]

export const verificationSteps = [
  { n: 1, title: 'Deteksi & Laporan', meta: '08:42 WIB • Siti Rahma', state: 'done' },
  { n: 2, title: 'Korektif & Re-run QC', meta: '09:05 WIB • +0.18 SD (Lolos)', state: 'done' },
  { n: 3, title: 'Review Kepala Ruangan', meta: '09:18 WIB • Budi Santoso', state: 'done' },
  { n: 4, title: 'Verifikasi Dokter Sp.PK', meta: 'dr. Hendra Pratama, Sp.PK', state: 'current' },
]

export const rekapRows = [
  {
    doc: '#CAPA-2024-10-042',
    date: '24 Okt 2024 08:42',
    instrument: 'Dirui CS-T240',
    parameter: 'Glukosa GOD-PAP Level 3 (1-3s)',
    rca: 'Gelembung mikro pada syringe probe & kondensasi reagen',
    pic: 'Siti Rahma, A.Md.AK',
    due: 'Hari ini 12:00 WIB',
    dueOverdue: true,
    status: 'Menunggu TTD Sp.PK',
    statusStyle: 'secondary',
  },
  {
    doc: '#CAPA-2024-10-041',
    date: '23 Okt 2024 14:10',
    instrument: 'Cobas e411',
    parameter: 'HBsAg Kuantitatif Level 2 (R-4s)',
    rca: 'Partikel carryover cuvette mikro pada probe deteksi ECL',
    pic: 'Fajar Hidayat, S.Tr.AK',
    due: '23 Okt 17:00 WIB',
    status: 'Closed / Selesai',
    statusStyle: 'closed',
  },
  {
    doc: '#CAPA-2024-10-040',
    date: '21 Okt 2024 09:20',
    instrument: 'Sysmex XN-550',
    parameter: 'Leukosit (WBC) Level 3 (4-1s)',
    rca: 'Penyumbatan parsial aperture selang lisis Stromatolyser',
    pic: 'Dewi Anggraini, A.Md.AK',
    due: '21 Okt 13:00 WIB',
    status: 'Closed / Selesai',
    statusStyle: 'closed',
  },
]

export const spPkAssessment =
  'Re-run kontrol menghasilkan nilai akseptabel (+0.18 SD). Spesimen pasien batch 08:00 - 08:42 telah diperiksa ulang dan hasil konruen (CV < 2%). Prosedur de-bubbling efektif. Alat Dirui CS-T240 diizinkan kembali beroperasi penuh dan hasil pasien disahkan untuk rilis ke SIMRS.'

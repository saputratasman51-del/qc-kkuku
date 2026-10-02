---
name: Clinical Laboratory Quality Control System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#006781'
  on-secondary: '#ffffff'
  secondary-container: '#8fdfff'
  on-secondary-container: '#00647d'
  tertiary: '#2c5858'
  on-tertiary: '#ffffff'
  tertiary-container: '#457171'
  on-tertiary-container: '#c4f3f2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#b9eaff'
  secondary-fixed-dim: '#81d1f0'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d62'
  tertiary-fixed: '#bdebea'
  tertiary-fixed-dim: '#a1cfce'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#204e4d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a clinical laboratory software interface for RSUD Sultan Muhammad Jamaludin I (Kabupaten Kayong Utara). The system is built for medical laboratory technologists (ATLM), clinical pathologists, and laboratory supervisors tasked with monitoring analytical precision, calibrating analyzers, tracking Westgard rule violations, and validating batch runs with zero tolerance for diagnostic ambiguity.

The visual mood pairs institutional authority with modern clinical precision:
- **Design Movement:** Clean Modern Healthcare SaaS with technical instrument precision. It relies on architectural slate containers, subtle cyan-tinted atmospheric backdrops, crisp borders, and tactical semantic color coding for immediate alert recognition.
- **Personality:** Analytical, dependable, sterile, high-clarity, and stress-reducing during urgent critical-value workflows.
- **Target Audience:** Medical laboratory technologists, hospital quality managers, and medical directors working across desktop workstations and benchside terminal monitors in hospital diagnostic labs.

## Colors

The palette balances deep nautical medical teals with crisp hospital surfaces and high-visibility clinical status signifiers:

- **Primary (`#0f766e` - Deep Sea Teal):** Conveys analytical authority, diagnostic rigor, and institutional stability. Applied to critical interactive controls, active navigation nodes, primary buttons, and key data headers.
- **Secondary (`#0e7490` - Deep Cyan / Medical Slate):** Used for analytical grouping indicators, secondary action controls, Levey-Jennings standard deviation markers, and active filters.
- **Tertiary / Tint Accent (`#ccfbfa` - Cyan Lab Tint):** Signature clinical wash used for selected row highlights, active card headers, banner backdrops, badge tints, and subtle instrument state containers.
- **Neutral Dark (`#0f172a` - Deep Slate Neutral):** Provides typographic contrast and high-density readability across data tables, numeric metrics, and sidebar frames.
- **Neutral Light & Canvas:** Neutral canvas surfaces range from `#f8fafc` (App Canvas) to `#ffffff` (Card & Table Surface), separated by hairline borders in `#e2e8f0` and `#cbd5e1`.
- **QC Semantic Tones:**
  - *Normal / Accept (`#059669` emerald / `#ecfdf5` background):* In-control batch, 1-2s acceptable variation.
  - *Warning (`#d97706` amber / `#fffbeb` background):* 1-2s warning alert, impending reagent expiration.
  - *Reject / Violation (`#dc2626` crimson / `#fef2f2` background):* Westgard rule failure (1-3s, 2-2s, R-4s, 4-1s, 10x), run locked, calibration mandatory.
  - *Pending / Standby (`#64748b` cool slate / `#f1f5f9` background):* Run queued, unread analyzer baseline.

## Typography

Typography balances clinical software legibility and data-dense efficiency:

- **Headings (Plus Jakarta Sans):** Selected for structural clarity and approachable geometric structure. Applied to module titles, QC analytical section headings, and diagnostic dashboard aggregates.
- **Body & Data Grid (Inter):** The primary workhorse font. High x-height, open counters, and legible punctuation reduce reading fatigue across long shifts in dim laboratory environments.
- **Tabular & Monospaced Figures:** Numerical values in laboratory data grids (Mean, SD, %CV, Target Values, Lot Numbers, and Timestamp logs) strictly require tabular lining numerals (`font-feature-settings: 'tnum' 1`) to ensure perfect vertical alignment across validation tables.
- **Status & Parameter Badges:** Upper-case or title-case micro-labels (`label-sm`) with slight tracking (`0.03em`) ensure instant recognition of rule alerts (e.g., `1-3S VIOLATION`, `IN CONTROL`, `SDI: +1.4`).

## Layout & Spacing

The interface employs a fixed-width shell with fluid interior columns optimized for multi-parameter clinical monitors (1920x1080 and 1440x900 bench workstations):

- **Shell Architecture:** A fixed 260px left sidebar for analyzer instruments, patient sample QC, lot management, and accreditation reports. A top utility ribbon (56px high) displays active shift, analyzer connectivity status, and hospital unit identifiers.
- **Grid Architecture:** 12-column fluid grid within the main content container. Default column gaps are `1rem` on compact displays and `1.5rem` on wide desktop workstations.
- **Vertical Rhythm:** Content cards, Levey-Jennings visualization viewports, and tabular grids adhere to an 8px base rhythm with 4px micro-increments for compact data displays.
- **Responsive Adaptations:**
  - *Desktop (>1280px):* Split-pane layouts with Levey-Jennings curve on the upper canvas and synchronized tabular control entries below.
  - *Tablet / Small Display (768px - 1279px):* The 260px sidebar collapses into a 64px icon rail; data columns collapse non-critical statistical indices into expandable row drawers.
  - *Mobile (<768px):* Single column layout focused on immediate critical breach triage and supervisor approvals.

## Elevation & Depth

To maintain a sterile, crisp clinical appearance, depth is rendered through subtle tonal layering and hairline structural borders rather than heavy atmospheric drops:

- **Base Surfaces:** Slate canvas (`#f8fafc`) serves as the root plane. Interactive panels, analyzer cards, and data surfaces sit elevated at `#ffffff`.
- **Borders & Dividers:** 1px crisp borders using `#e2e8f0` (default) and `#cbd5e1` (interactive/focused) define boundaries without visual clutter.
- **Tonal Tiers:**
  - *Level 0 (Canvas):* `#f8fafc` background.
  - *Level 1 (Card/Container):* `#ffffff` with a hairline `1px solid #e2e8f0` border and an ambient low-opacity shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04)`.
  - *Level 2 (Active/Hover/Floating Filters):* `#ffffff` with border `1px solid #0e7490` and shadow `0 4px 6px -1px rgba(15, 118, 110, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
  - *Level 3 (Modals/QC Failure Overlays):* `#ffffff` with border `1px solid #cbd5e1` and deep clinical isolation shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.
- **Atmospheric Tint Wash:** Highlighted sections (e.g., active sample lot, selected run) utilize the `#ccfbfa` cyan tint at 20%-40% opacity with a `1px solid #0f766e` left accent rail.

## Shapes

The design system uses soft geometric shapes (`roundedness: 1` — 4px base radius) to reflect technical precision:

- **Base Controls & Inputs:** 4px (`0.25rem`) radius across buttons, input fields, dropdown triggers, and table rows to preserve maximum usable data space.
- **Cards & Data Panels:** 8px (`0.5rem`) outer corner radius (`rounded-lg`), establishing clear module boundaries while retaining industrial technical precision.
- **Status Pills & Metric Chips:** 4px or fully rounded pill styles depending on context: square-rounded (4px) for analytical Westgard rule flags (e.g., `1-2s`, `R-4s`), and pill-shaped (9999px) for live device connectivity states (e.g., `ONLINE`, `STANDBY`).
- **Interactive Focus Rings:** 2px solid rings with 2px offset in `#0e7490` ensuring full accessibility without obscuring dense numeric values.

## Components

### Buttons
- **Primary:** Solid `#0f766e` fill, `#ffffff` text, 4px border radius. Hover: `#115e59`. Active: `#134e4a`. Height: 36px (compact desktop) or 32px (dense table actions).
- **Secondary:** Surface `#ffffff`, border `1px solid #cbd5e1`, text `#0f172a`. Hover: background `#f1f5f9` with border `#94a3b8`.
- **Clinical Danger (Reject / Lock Run):** Solid `#dc2626` fill, `#ffffff` text. Used exclusively for run rejection, analyzer lockout, and critical recalibration mandates.
- **Subtle / Ghost:** Transparent background, text `#0f766e`. Hover: background `#ccfbfa` with 50% opacity.

### QC Status Badges & Chips
- **Format:** 20px-24px height, uppercase `label-sm` font, 4px radius, `1px` matched border.
- **Normal:** Background `#ecfdf5`, border `#a7f3d0`, text `#065f46`, leading emerald circle indicator.
- **Warning (1-2s Rule):** Background `#fffbeb`, border `#fde68a`, text `#92400e`, leading amber warning triangle.
- **Violation (Westgard Reject):** Background `#fef2f2`, border `#fecaca`, text `#991b1b`, leading bold crimson indicator.
- **Pending/Lot Prep:** Background `#f1f5f9`, border `#e2e8f0`, text `#475569`.

### Data Tables (Clinical QC Records)
- **Header:** Background `#f8fafc`, text `#475569`, 11px uppercase `label-sm`, bottom border `2px solid #e2e8f0`.
- **Row Styling:** Alternating subtle row striping or pure `#ffffff` with hairline `#f1f5f9` dividers. Row height 36px for dense views. Selected row highlighted with `#ccfbfa` at 30% opacity and `#0f766e` indicator.
- **Cell Alignment:** Left-aligned for instrument IDs, parameter names (e.g., Glucose, HbA1c, SGPT/ALT), test methods; right-aligned for numeric concentrations, Mean, SD, and %CV with tabular numbers.

### Levey-Jennings Chart Viewport
- **Canvas Backdrop:** Pure white `#ffffff` framed with `1px solid #e2e8f0`.
- **Grid Lines:**
  - Mean Line (0 SD): Solid `#0f766e` line (1.5px).
  - ±1 SD Lines: Subtle `#94a3b8` dashed lines.
  - ±2 SD Warning Lines: `#f59e0b` dashed lines (1px).
  - ±3 SD Action/Reject Lines: `#dc2626` solid lines (1.5px) with subtle red-tinted warning boundary band.
- **Data Points:** 6px circular nodes:
  - Inside 2SD: Fill `#0f766e`, white stroke.
  - Warning (1-2s): Fill `#d97706`, amber glow.
  - Violation (>3SD, 2-2s, R-4s): Fill `#dc2626`, crimson alert ring, pulse animation on active day.

### Input Fields & Select Controls
- **Structure:** Height 36px, background `#ffffff`, border `1px solid #cbd5e1`, text `#0f172a`, font size 13px.
- **Focus State:** Border `#0e7490`, outline `2px solid rgba(14, 116, 144, 0.2)`.
- **Lot / Level Selectors:** Segmented controls with background `#f1f5f9`, selected tab styled in `#ffffff` with active border and `#0f766e` text.

### Clinical Modal & Westgard Root Cause Form
- **Structure:** Centered dialog, 540px width, 8px corner radius, Level 3 elevation.
- **Header:** Cyan tint wash (`#ccfbfa` at 40% opacity) with title, parameter lot badge, and instrument ID.
- **Form Body:** Mandatory corrective action dropdown (e.g., *New Reagent Pack*, *Recalibration Performed*, *Maintenance Cycle*, *Operator Error*), technician digital signature confirmation, and action timestamp.
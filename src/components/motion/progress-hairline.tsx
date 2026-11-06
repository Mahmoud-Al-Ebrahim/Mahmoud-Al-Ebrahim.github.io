/**
 * A 2px reading-progress line driven by a CSS scroll timeline (see
 * globals.css). No JavaScript; hidden where scroll timelines are unsupported
 * or the visitor prefers reduced motion.
 */
export function ProgressHairline() {
  return (
    <div
      aria-hidden
      data-progress-hairline=""
      className="progress-hairline pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-laurel"
    />
  );
}

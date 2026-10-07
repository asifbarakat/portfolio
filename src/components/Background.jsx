/* Minimalist clean backdrop: deep ink background + subtle crisp grid.
   Sits behind all content (-z-10) and ignores pointer events. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05070d]">
      {/* Subtle clean tech grid */}
      <div className="grid-bg absolute inset-0 opacity-70" />
    </div>
  );
}

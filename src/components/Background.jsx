/* Fixed decorative backdrop: animated gradient blobs + dotted grid.
   Sits behind all content (-z-10) and ignores pointer events. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[#05070d]" />

      {/* gradient blobs */}
      <div className="absolute -left-32 top-[-6rem] h-[32rem] w-[32rem] rounded-full bg-cyan-500/20 blur-[120px] animate-blob" />
      <div className="absolute right-[-8rem] top-[20%] h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[120px] animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-[-8rem] left-[30%] h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-[120px] animate-blob [animation-delay:-12s]" />

      {/* dotted grid overlay */}
      <div className="grid-bg absolute inset-0" />

      {/* subtle top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05070d] to-transparent" />
    </div>
  );
}

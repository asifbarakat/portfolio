/* Flat backdrop: solid ink plus film grain. No gradients, no blobs. */
export default function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-ink" />
      <div className="grain" />
    </>
  );
}

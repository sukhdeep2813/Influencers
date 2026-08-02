export function BackgroundGlows() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-orange-100/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-150 h-150 bg-sky-100/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-137.5 h-137.5 bg-amber-100/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] w-162.5 h-162.5 bg-sky-100/6 rounded-full blur-[160px] pointer-events-none" />
    </>
  );
}

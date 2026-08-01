export function BackgroundGlows() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-100/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-100/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] bg-amber-100/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] w-[650px] h-[650px] bg-sky-100/6 rounded-full blur-[160px] pointer-events-none" />
    </>
  );
}

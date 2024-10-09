export default function PullPageLoader() {
  return (
    <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/40 z-50">
      <div className="animate-spin size-10 text-blue-400 rounded-full border-[4px] mx-auto border-t-transparent border-current" />
      {/* border-t-transparent - border 윗 부부만 투명하게 만들어서 돌아가는 것 처럼 보이게 만듬 */}
    </div>
  );
}

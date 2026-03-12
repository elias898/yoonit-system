export default function SubNavigation() {
  return (
    <div className="bg-[#ededed] content-stretch flex flex-col gap-[16px] items-start p-[12px] relative rounded-[12px] size-full" data-name="Sub-Navigation">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-r border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#c7c7c7] h-[16px] left-[calc(50%-0.5px)] rounded-[50px] top-1/2 w-[3px]" />
    </div>
  );
}
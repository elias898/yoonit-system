function Label() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">CopyTrade</p>
      </div>
    </div>
  );
}

function LabelSpacing() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label />
    </div>
  );
}

export default function ModuleTag() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Module Tag">
      <div className="bg-[#fcfcfc] h-[24px] min-w-[60px] relative rounded-[6px] shrink-0 w-full" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Module Indicator/CopyTrade">
              <div className="bg-[#f78d1d] h-[12px] rounded-[50px] shrink-0 w-[4px]" data-name="Color Accent" />
            </div>
            <LabelSpacing />
          </div>
        </div>
      </div>
    </div>
  );
}
import svgPaths from "./svg-1ltqnz11f4";

function LeftSpacing() {
  return <div className="h-[20px] shrink-0 w-[4px]" data-name="Left spacing" />;
}

function LeftSpacing1() {
  return <div className="h-[20px] shrink-0 w-[4px]" data-name="Left spacing" />;
}

function Label() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label">
      <LeftSpacing />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#646464] text-[14px] tracking-[-0.07px] whitespace-nowrap">Tab Title</p>
      <LeftSpacing1 />
    </div>
  );
}

export default function Tab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] size-full" data-name="Tab">
      <div className="relative shrink-0 size-[20px]" data-name="local-placeholder">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-6%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 18.6667">
              <path d={svgPaths.p1da8ee00} id="Icon" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Label />
      <div className="content-stretch flex flex-col items-center justify-center px-[5px] relative rounded-[3px] shrink-0" data-name="Count">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2f58] text-[14px] text-center tracking-[0.14px] w-[9px]">
          <p className="leading-[1.4]">5</p>
        </div>
      </div>
    </div>
  );
}
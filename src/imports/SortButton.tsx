import svgPaths from "./svg-inujemaomy";

export default function SortButton() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="sort button">
      <div className="bg-[#fcfcfc] h-[32px] min-w-[90px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] pl-[8px] pr-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Lead Icon Wrapper">
              <div className="h-[16px] relative shrink-0 w-[18px]" data-name="Lead Icon">
                <div className="absolute inset-[8.33%]" data-name="Icon">
                  <div className="absolute inset-[-3%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
                      <path d={svgPaths.p3a50a380} id="Icon" stroke="var(--stroke-0, #B9BBC6)" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
              <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
                <p className="leading-[1.3]">Label</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
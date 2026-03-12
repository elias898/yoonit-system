export default function InputField() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="input field">
      <div className="content-stretch flex gap-[4px] items-center leading-[1.3] not-italic relative shrink-0 whitespace-nowrap" data-name="Label wrapper">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#1c2024] text-[14px] tracking-[-0.07px]">Label</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#60646c] text-[10px] tracking-[-0.05px]">(optional)</p>
      </div>
      <div className="bg-[#fcfcfc] h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pl-[8px] relative size-full">
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Content">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center p-[8px] relative w-full">
                  <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Text input">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#60646c] text-[14px] text-ellipsis tracking-[-0.07px] whitespace-nowrap">Search options</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full relative shrink-0" data-name="Dropdown">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex h-full items-center p-[8px] relative">
                  <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="Expandable-arrow">
                    <div className="h-[4px] relative shrink-0 w-[8px]" data-name="Icon">
                      <div className="absolute inset-[-12.5%_-6.25%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
                          <path d="M0.5 0.5L4.5 4.5L8.5 0.5" id="Icon" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Hint text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#60646c] text-[12px] tracking-[-0.06px]">This is a hint text to help the user.</p>
      </div>
    </div>
  );
}
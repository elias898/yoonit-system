import svgPaths from "./svg-yefwvbx0qn";

function LeadIconWrapper() {
  return (
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
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Label</p>
      </div>
    </div>
  );
}

function LeadIconWrapper1() {
  return (
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
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Label</p>
      </div>
    </div>
  );
}

function LabelSpacing() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-center relative shrink-0" data-name="Label Spacing">
      <div className="relative shrink-0 size-[18px]" data-name="local-placeholder">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-3%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.6667 17.6667">
              <path d={svgPaths.p3a50a380} id="Icon" stroke="var(--stroke-0, #B9BBC6)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveFilters() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Active Filters">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="filter button">
        <div className="bg-[rgba(255,255,255,0)] h-[32px] min-w-[90px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] pl-[8px] pr-[16px] py-[8px] relative size-full">
              <LeadIconWrapper1 />
              <Label1 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[34px]" data-name="filter button">
        <div className="h-[34px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
              <LabelSpacing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px overflow-x-auto overflow-y-clip relative" data-name="Button Group">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="sort button">
        <div className="bg-[rgba(255,255,255,0)] h-[32px] min-w-[90px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] pl-[8px] pr-[16px] py-[8px] relative size-full">
              <LeadIconWrapper />
              <Label />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e2e2e2] h-[24px] rounded-[50px] shrink-0 w-px" data-name="vertival Divider" />
      <ActiveFilters />
    </div>
  );
}

function TextBox() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Text box">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#60646c] text-[14px] text-ellipsis tracking-[-0.07px] whitespace-nowrap">Search...</p>
        </div>
      </div>
    </div>
  );
}

export default function SortAndFilters() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative size-full" data-name="Sort and Filters">
      <ButtonGroup />
      <div className="content-stretch flex h-[34px] items-center relative rounded-[50px] shrink-0" data-name="Table search">
        <div className="content-stretch flex flex-col gap-[12px] h-full items-start relative shrink-0 w-[300px]" data-name="input field">
          <TextBox />
        </div>
        <div className="-translate-y-1/2 absolute overflow-clip right-[9px] size-[18px] top-1/2" data-name="line-search-md">
          <div className="absolute inset-[12.5%]" data-name="Icon">
            <div className="absolute inset-[-7.41%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 15.5">
                <path d={svgPaths.p657e500} id="Icon" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
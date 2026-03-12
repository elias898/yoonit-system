function LabelSpacing() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-center pr-[8px] relative shrink-0" data-name="Label Spacing">
      <div className="relative shrink-0 size-[18px]" data-name="chevron-up">
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
          <div className="absolute inset-[-11.11%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.5">
              <path d="M9.5 5L5 0.5L0.5 5" id="Icon" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableHeaderLabel() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[121px]" data-name="_Table header label">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#60646c] text-[12px] tracking-[-0.06px] whitespace-nowrap">Header</p>
      <div className="content-stretch flex items-center justify-center opacity-0 relative rounded-[8px] shrink-0 size-[24px]" data-name="Buttons/Tertiary/Small/Default/Icon Only">
        <LabelSpacing />
      </div>
    </div>
  );
}

export default function TableHeader() {
  return (
    <div className="content-stretch flex items-center pl-[8px] py-[8px] relative rounded-tl-[8px] rounded-tr-[8px] size-full" data-name="Table header">
      <TableHeaderLabel />
    </div>
  );
}
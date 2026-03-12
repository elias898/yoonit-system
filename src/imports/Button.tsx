import svgPaths from "./svg-r7ccppkux4";

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

export default function Button() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] size-full" data-name="Button">
      <LabelSpacing />
    </div>
  );
}
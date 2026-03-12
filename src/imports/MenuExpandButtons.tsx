import svgPaths from "./svg-g8gsgks6k4";

function LabelSpacing() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-center relative shrink-0" data-name="Label Spacing">
      <div className="relative shrink-0 size-[20px]" data-name="line-layout-left">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6 16.6">
              <path d={svgPaths.p545d100} id="Icon" stroke="var(--stroke-0, #646464)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuExpandButtons() {
  return (
    <button className="content-stretch cursor-pointer flex items-center justify-center relative rounded-[8px] size-full" data-name="Menu Expand Buttons">
      <LabelSpacing />
    </button>
  );
}
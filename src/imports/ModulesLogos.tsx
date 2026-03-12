import svgPaths from "./svg-9ezgt5521u";

function Group1() {
  return (
    <div className="col-1 h-[23.103px] ml-0 mt-0 relative row-1 w-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 23.1028">
        <g id="Group 1434">
          <path d={svgPaths.p374d48f1} fill="var(--fill-0, #1EBBBF)" id="Path 1095" />
          <g id="Group 1433">
            <path d={svgPaths.p22a56700} fill="url(#paint0_linear_1_10314)" id="Path 1096" />
            <path d={svgPaths.p1d224b80} fill="url(#paint1_linear_1_10314)" id="Path 1097" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_10314" x1="0" x2="12.6573" y1="11.163" y2="11.163">
            <stop stopColor="#6644E5" />
            <stop offset="0.17" stopColor="#6249E5" />
            <stop offset="0.4" stopColor="#575AE3" />
            <stop offset="0.67" stopColor="#4676DF" />
            <stop offset="0.96" stopColor="#2D9CDA" />
            <stop offset="1" stopColor="#2AA3DA" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_10314" x1="7.7274" x2="12.5752" y1="23.7969" y2="17.6994">
            <stop stopColor="#2AA3DA" />
            <stop offset="0.19" stopColor="#417DDE" />
            <stop offset="0.43" stopColor="#5B53E3" />
            <stop offset="0.56" stopColor="#6644E5" />
            <stop offset="0.64" stopColor="#5F3EDA" />
            <stop offset="0.78" stopColor="#4D32BA" />
            <stop offset="0.96" stopColor="#301E88" />
            <stop offset="0.97" stopColor="#301E87" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Group1 />
    </div>
  );
}

export default function ModulesLogos() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative rounded-[20px] size-full" data-name="Modules Logos">
      <Group />
    </div>
  );
}
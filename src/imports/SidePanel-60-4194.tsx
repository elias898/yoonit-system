import svgPaths from "./svg-uy7nbbei9x";

function Label() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <p className="font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#1a2f58] text-[18px] tracking-[-0.09px] whitespace-nowrap">{`Client `}</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label">
      <p className="font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#646464] text-[18px] tracking-[-0.09px] whitespace-nowrap">AI Assistant</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Header">
      <div className="bg-[#ecf2fd] content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Tab">
        <Label />
      </div>
      <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Tab">
        <Label1 />
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

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16px] pt-[24px] px-[16px] relative w-full">
          <Header1 />
          <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[34px]" data-name="Button">
            <LabelSpacing />
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2a37] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Client</p>
      </div>
    </div>
  );
}

function LeadIconWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Lead Icon Wrapper">
      <div className="relative shrink-0 size-[16px]" data-name="Lead Icon">
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

function Label2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#0e3c98] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Label</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Container">
      <Heading />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[34px] items-center justify-center min-w-[90px] pl-[8px] pr-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <LeadIconWrapper />
        <Label2 />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#1e4daa] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[48px]" data-name="Icon">
      <p className="font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#fcfcfd] text-[18px] tracking-[-0.09px] whitespace-nowrap">ND</p>
      <div className="absolute bottom-[-3px] content-stretch flex items-center justify-center right-[-4px]" data-name="Online Status">
        <div className="relative shrink-0 size-[12px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill="var(--fill-0, #30A46C)" id="Ellipse 1" r="5" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Name">
      <p className="font-['Public_Sans:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[#171717] text-[23px] tracking-[-0.115px] whitespace-nowrap">Nick Doe</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Title">
      <Name />
    </div>
  );
}

function Cid() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center not-italic relative shrink-0 text-[#60646c] text-[10px] tracking-[0.25px] whitespace-nowrap" data-name="CID">
      <p className="leading-[0] relative shrink-0">
        <span className="leading-none">CID</span>
        <span className="leading-[normal]">:</span>
      </p>
      <p className="leading-none relative shrink-0">9999</p>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Data">
      <Title1 />
      <Cid />
    </div>
  );
}

function Client() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Client">
      <Icon />
      <Data />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#18794e] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Active</p>
      </div>
    </div>
  );
}

function LabelSpacing1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#18794e] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">No Risk</p>
      </div>
    </div>
  );
}

function LabelSpacing2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#18794e] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">4/5</p>
      </div>
    </div>
  );
}

function LabelSpacing3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#e9f9ee] content-stretch flex h-[24px] items-center justify-center px-[8px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing1 />
      </div>
      <div className="bg-[#e9f9ee] content-stretch flex h-[24px] items-center justify-center px-[8px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing2 />
      </div>
      <div className="bg-[#e9f9ee] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Badge">
        <div className="relative shrink-0 size-[12px]" data-name="line-star-01">
          <div className="absolute inset-[10.96%_10.73%_14.16%_10.73%]" data-name="Icon">
            <div className="absolute inset-[-6.68%_-6.37%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6258 10.1863">
                <path d={svgPaths.p18bd4300} id="Icon" stroke="var(--stroke-0, #18794E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing3 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Client />
      <Frame />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[1.4]">Provider</p>
      </div>
    </div>
  );
}

function LabelSpacing4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[1.4]">Copier</p>
      </div>
    </div>
  );
}

function LabelSpacing5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label7 />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[0.14px] whitespace-nowrap">
        <p className="leading-[1.4]">Trader</p>
      </div>
    </div>
  );
}

function LabelSpacing6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label8 />
    </div>
  );
}

function Tags() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-name="Tags">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[81px]" data-name="Module Tag">
        <div className="bg-[#fcfcfc] h-[24px] min-w-[60px] relative rounded-[6px] shrink-0 w-full" data-name="Badge">
          <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[8px] relative size-full">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Module Indicator/CopyTrade">
                <div className="bg-[#f78d1d] h-[12px] rounded-[50px] shrink-0 w-[4px]" data-name="Color Accent" />
              </div>
              <LabelSpacing4 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69px]" data-name="Module Tag">
        <div className="bg-[#fcfcfc] h-[24px] min-w-[60px] relative rounded-[6px] shrink-0 w-full" data-name="Badge">
          <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[8px] relative size-full">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Module Indicator/CopyTrade">
                <div className="bg-[#f78d1d] h-[12px] rounded-[50px] shrink-0 w-[4px]" data-name="Color Accent" />
              </div>
              <LabelSpacing5 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69px]" data-name="Module Tag">
        <div className="bg-[#fcfcfc] h-[24px] min-w-[60px] relative rounded-[6px] shrink-0 w-full" data-name="Badge">
          <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="flex flex-row items-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center min-w-[inherit] px-[8px] relative size-full">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Module Indicator/CopyTrade">
                <div className="bg-[#2aa5dd] h-[12px] rounded-[50px] shrink-0 w-[4px]" data-name="Color Accent" />
              </div>
              <LabelSpacing6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="Client Section">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame1 />
        <Tags />
      </div>
    </div>
  );
}

function ModalPlaceholder() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Modal placeholder">
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Title />
      <ClientSection />
    </div>
  );
}

function LeadIconWrapper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Lead Icon Wrapper">
      <div className="relative shrink-0 size-[16px]" data-name="Lead Icon">
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

function Label9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Label</p>
      </div>
    </div>
  );
}

function LabelSpacing7() {
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

function ButtonGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Button Group">
      <div className="bg-[#fcfcfc] flex-[1_0_0] h-[34px] min-h-px min-w-[90px] relative rounded-[8px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] pl-[8px] pr-[16px] py-[8px] relative size-full">
            <LeadIconWrapper1 />
            <Label9 />
          </div>
        </div>
      </div>
      <div className="bg-[#fcfcfc] content-stretch flex h-[34px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <LabelSpacing7 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[16px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
      <ButtonGroup />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2a37] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Contact Info</p>
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#946800] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Do not Disturb</p>
      </div>
    </div>
  );
}

function LabelSpacing8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label10 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Container">
      <Heading1 />
      <div className="bg-[#fffce8] content-stretch flex h-[24px] items-center justify-center px-[8px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing8 />
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">2:30 AM</p>
      </div>
    </div>
  );
}

function LabelSpacing9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label11 />
    </div>
  );
}

function BadgeContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Static">
        <div className="relative shrink-0 size-[12px]" data-name="line-clock-snooze">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <div className="absolute inset-[-6%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2 11.2">
                <path d={svgPaths.p34900b00} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing9 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="section">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Local Time</p>
              <BadgeContainer />
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Email</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">ndoe@email.com</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Phone</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">+306988776655</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalPlaceholder1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Modal placeholder">
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Title2 />
      <Section />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2a37] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Locale</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Title3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Container2 />
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">UK</p>
      </div>
    </div>
  );
}

function LabelSpacing10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label12 />
    </div>
  );
}

function BadgeContainer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Static">
        <div className="relative shrink-0 size-[12px]" data-name="Property 1=GB">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <g id="GB">
              <path d={svgPaths.p2ca50880} fill="#F0F0F0" />
              <path d={svgPaths.pa91b300} fill="#0052B4" />
              <path d={svgPaths.p7e37700} fill="#0052B4" />
              <path d={svgPaths.p340da4f0} fill="#0052B4" />
              <path d={svgPaths.p8961500} fill="#0052B4" />
              <path d={svgPaths.p16b0c300} fill="#0052B4" />
              <path d={svgPaths.p383bc100} fill="#0052B4" />
              <path d={svgPaths.p86bca00} fill="#0052B4" />
              <path d={svgPaths.p1f9da490} fill="#0052B4" />
              <path d={svgPaths.p326fd500} fill="var(--fill-0, #D80027)" />
              <path d={svgPaths.p10188e00} fill="var(--fill-0, #D80027)" />
              <path d={svgPaths.p28126300} fill="var(--fill-0, #D80027)" />
              <path d={svgPaths.p2e23e900} fill="var(--fill-0, #D80027)" />
              <path d={svgPaths.p3605c500} fill="var(--fill-0, #D80027)" />
            </g>
          </svg>
        </div>
        <LabelSpacing10 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="relative shrink-0 w-full" data-name="section">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Country of Residence</p>
              <BadgeContainer1 />
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Nationality</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">British</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Time zone</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">Europe/London</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Preferred Language</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">English</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalPlaceholder2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Modal placeholder">
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Title3 />
      <Section1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2a37] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Registration Details</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Container">
      <Heading3 />
    </div>
  );
}

function Title4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Container3 />
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Ted Lasso</p>
      </div>
    </div>
  );
}

function LabelSpacing11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label13 />
    </div>
  );
}

function BadgeContainer2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Interactive">
        <div className="relative shrink-0 size-[12px]" data-name="Icons-ct/user">
          <div className="absolute inset-[12.5%_16.67%]" data-name="Icon">
            <div className="absolute inset-[-6.67%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.20013 10.2">
                <path d={svgPaths.p69cb800} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing11 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="relative shrink-0 w-full" data-name="section">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Date of Birth</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">British</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Age</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">British</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Registration Date</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717] whitespace-pre-wrap">{`Nov  12, 2025`}</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-center leading-[1.3] not-italic p-[12px] relative text-[14px] tracking-[-0.07px] w-full">
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#646464]">Source</p>
              <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#171717]">Website Sign-up</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Introducer</p>
              <BadgeContainer2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalPlaceholder3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Modal placeholder">
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Title4 />
      <Section2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2a37] text-[14px] tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Internal Assignment</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Title5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Container4 />
      </div>
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Tom Hardy</p>
      </div>
    </div>
  );
}

function LabelSpacing12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label14 />
    </div>
  );
}

function BadgeContainer3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Interactive">
        <div className="relative shrink-0 size-[12px]" data-name="line-user-01">
          <div className="absolute inset-[12.5%_16.67%]" data-name="Icon">
            <div className="absolute inset-[-6.67%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.20013 10.2">
                <path d={svgPaths.p69cb800} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing12 />
      </div>
    </div>
  );
}

function Label15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">UK Sales</p>
      </div>
    </div>
  );
}

function LabelSpacing13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label15 />
    </div>
  );
}

function BadgeContainer4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Interactive">
        <div className="relative shrink-0 size-[12px]" data-name="line-dataflow-02">
          <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
            <div className="absolute inset-[-6%_-6.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2 11.2">
                <path d={svgPaths.p2a332200} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing13 />
      </div>
    </div>
  );
}

function Label16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Sales</p>
      </div>
    </div>
  );
}

function LabelSpacing14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label16 />
    </div>
  );
}

function BadgeContainer5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Interactive">
        <div className="relative shrink-0 size-[12px]" data-name="line-building-04">
          <div className="absolute inset-[12.5%_16.67%]" data-name="Icon">
            <div className="absolute inset-[-6.67%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 10.2">
                <path d={svgPaths.p205f5f2a} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing14 />
      </div>
    </div>
  );
}

function Label17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-center tracking-[-0.07px] whitespace-nowrap">
        <p className="leading-[1.3]">Default Pool</p>
      </div>
    </div>
  );
}

function LabelSpacing15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label Spacing">
      <Label17 />
    </div>
  );
}

function BadgeContainer6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Badge container">
      <div className="bg-[#f3f3f3] content-stretch flex gap-[4px] h-[24px] items-center justify-center min-w-[60px] px-[8px] relative rounded-[100px] shrink-0" data-name="Color=Gray, Size=Small, Type=Lead Icon, Action=Interactive">
        <div className="relative shrink-0 size-[12px]" data-name="line-database-01">
          <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
            <div className="absolute inset-[-6%_-6.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2 11.2">
                <path d={svgPaths.p190efc00} id="Icon" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <LabelSpacing15 />
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="relative shrink-0 w-full" data-name="section">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Account Manager</p>
              <BadgeContainer3 />
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Desk</p>
              <BadgeContainer4 />
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div aria-hidden="true" className="absolute border-[#e2e2e2] border-b-[0.4px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Department</p>
              <BadgeContainer5 />
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Key Value Pair">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
              <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic relative text-[#646464] text-[14px] tracking-[-0.07px]">Pool</p>
              <BadgeContainer6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalPlaceholder4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="Modal placeholder">
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Title5 />
      <Section3 />
    </div>
  );
}

function ModalContents() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Modal contents">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <ModalPlaceholder />
          <Footer />
          <ModalPlaceholder1 />
          <ModalPlaceholder2 />
          <ModalPlaceholder3 />
          <ModalPlaceholder4 />
        </div>
      </div>
    </div>
  );
}

export default function SidePanel() {
  return (
    <div className="bg-[#fcfcfc] relative rounded-[12px] size-full" data-name="Side Panel">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Header />
        <ModalContents />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}
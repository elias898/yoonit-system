import svgPaths from "./svg-2y7gqdd6b5";

function Label() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label">
      <p className="font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#646464] text-[18px] tracking-[-0.09px] whitespace-nowrap">{`Client `}</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <p className="font-['Public_Sans:SemiBold',sans-serif] font-semibold leading-[1.3] relative shrink-0 text-[#1a2f58] text-[18px] tracking-[-0.09px] whitespace-nowrap">AI Assistant</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Header">
      <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Tab">
        <Label />
      </div>
      <div className="bg-[#ecf2fd] content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Tab">
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

function TrailIconWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Trail Icon Wrapper">
      <div className="relative shrink-0 size-[16px]" data-name="Trail Icon">
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

function Header2() {
  return (
    <div className="content-stretch flex flex-col items-center py-[8px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[34px] items-center justify-center min-w-[90px] pl-[8px] pr-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <LeadIconWrapper />
        <Label2 />
        <TrailIconWrapper />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#1e4daa] relative rounded-[8px] shrink-0 size-[32px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#fdfdfe] text-[14px] tracking-[-0.07px] whitespace-nowrap">AI</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#ededed] h-[64px] relative rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[312.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.3] left-[12px] not-italic text-[#171717] text-[14px] top-[12.5px] tracking-[-0.07px] w-[282px]">{`Hello! I'm your AI assistant. How can I help you with Nick Doe today?`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#dfeaff] relative rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[12px] relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#171717] text-[14px] tracking-[-0.07px] whitespace-nowrap">{`Hello there! `}</p>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Chat">
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Text Message">
        <Container />
        <Container1 />
      </div>
      <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Text Message">
        <Container2 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3060bf] text-[16px] text-center tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[1.3]">Draft email</p>
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
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3060bf] text-[16px] text-center tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[1.3]">Generate summary</p>
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
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3060bf] text-[16px] text-center tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[1.3]">Check activity</p>
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

function SuggestedActions() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start relative shrink-0 w-full" data-name="Suggested Actions">
      <div className="bg-[#ecf2fd] content-center flex flex-wrap h-[34px] items-center justify-center px-[12px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing1 />
      </div>
      <div className="bg-[#ecf2fd] content-center flex flex-wrap h-[34px] items-center justify-center px-[12px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing2 />
      </div>
      <div className="bg-[#ecf2fd] content-center flex flex-wrap h-[34px] items-center justify-center px-[12px] relative rounded-[100px] shrink-0" data-name="Badge">
        <LabelSpacing3 />
      </div>
    </div>
  );
}

function TextBox() {
  return (
    <div className="bg-[#fcfcfc] h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Text box">
      <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#60646c] text-[14px] text-ellipsis tracking-[-0.07px] whitespace-nowrap">Ask anything...</p>
        </div>
      </div>
    </div>
  );
}

function LabelSpacing4() {
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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="input field">
        <TextBox />
      </div>
      <div className="bg-[#fcfcfc] content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[44px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <LabelSpacing4 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-solid border-t inset-0 pointer-events-none" />
      <SuggestedActions />
      <Frame />
    </div>
  );
}

function Chatbox() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Chatbox">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <Chat />
          <Footer />
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
        <Header2 />
        <Chatbox />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}
import React from 'react';

const Item = () => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg p-[8px_16px_8px_8px] hover:bg-[rgba(255,255,255,0.10)]">
      <div className="flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7.36959 6.30093L17.6998 6.30078M17.6998 6.30078V16.4841M17.6998 6.30078L6.2998 17.7008"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <span className="text-[16px] font-medium text-[#FFF]">Send to Julie</span>
        <span className="text-[16px] text-[#868686]">12:32 - 25/03/2024</span>
      </div>
      <div className="whitespace-nowrap text-[16px] font-medium text-[#19FB9B]">-1 USDC</div>
    </div>
  );
};

const History = () => {
  return (
    <div className="z-[10] flex max-h-[509px] w-[429px] flex-col gap-6 overflow-hidden rounded-3xl bg-[#1C1C1C] p-4">
      <h1 className="text-left text-[24px] font-medium tracking-[-0.15px] text-[#FFFFFF]">Transaction History</h1>
      <div className="flex items-center gap-2 rounded-[12px] bg-[#444] p-[8px_16px_8px_8px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.125 19 14.078 18.2635 15.6177 17.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.0319 15.6177C18.2635 14.078 19 12.125 19 10C19 5.02944 14.9706 1 10 1ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
            fill="#868686"
          />
        </svg>
        <input
          type="text"
          placeholder="Search "
          className="bg-transparent text-[16px] text-white outline-none placeholder:text-[#868686]"
        />
      </div>
      <div className="flex flex-col gap-2">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Item key={i} />
          ))}
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#373737] py-2">
          <span className="text-[16px] text-[#FFFFFF]">View all</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M6 12.5L10 8.5L6 4.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default History;

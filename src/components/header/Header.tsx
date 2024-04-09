import { useState } from 'react';
import History from '@src/components/history/History';
import HistoryIcon from '@src/icons/history';
import Logo from '@src/icons/logo';

import ConnectSolanaButton from '../button/ConnectSolanaButton';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <head className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-[120px]">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="silver-text text-base font-medium md:text-2xl">{`Voice To Pay`}</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.18)]"
        >
          <HistoryIcon />
          {open && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute right-0 top-full z-[20]  mt-[16px] h-full"
            >
              <History />
            </div>
          )}
        </button>
        <ConnectSolanaButton />
      </div>
    </head>
  );
};

export default Header;

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { shortenAddress } from '@src/lib/utils';

const ConnectSolanaButton = () => {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();
  const onConnectWallet = () => {
    if (publicKey) {
      disconnect();
      return;
    }

    setVisible(true);
  };

  return (
    <>
      <button
        className="flex items-center justify-between gap-[10px] rounded-[104px] border border-[#8C8CA6] px-[24px] py-[10px] backdrop-blur-[10px]"
        onClick={onConnectWallet}
      >
        <span className="text-[14px] font-medium tracking-[-0.15px] text-[#FFFFFF] md:text-[16px]">
          {publicKey ? <>{shortenAddress(publicKey.toBase58())}</> : 'Connect Wallet'}
        </span>
      </button>
    </>
  );
};

export default ConnectSolanaButton;

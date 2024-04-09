import { useCallback, useMemo } from 'react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { ParsedTokenAccount } from '@src/lib/type';

export default function useTokenSolana() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const createParsedTokenAccountFromInfo = (
    pubkey: PublicKey,
    item: AccountInfo<ParsedAccountData>
  ): ParsedTokenAccount => {
    return {
      publicKey: pubkey?.toString(),
      mintKey: item.data.parsed?.info?.mint?.toString(),
      amount: item.data.parsed?.info?.tokenAmount?.amount,
      decimals: item.data.parsed?.info?.tokenAmount?.decimals,
      uiAmount: item.data.parsed?.info?.tokenAmount?.uiAmount,
      uiAmountString: item.data.parsed?.info?.tokenAmount?.uiAmountString,
    };
  };

  const getAllTokens = useCallback(async () => {
    try {
      if (publicKey) {
        const splParsedTokenAccounts = await connection
          .getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey(TOKEN_PROGRAM_ID),
          })
          .then((result) => {
            return result.value.map((item) => createParsedTokenAccountFromInfo(item.pubkey, item.account));
          });

        return splParsedTokenAccounts;
      }

      return [];
    } catch (e) {
      return [];
    }
  }, [publicKey, connection]);

  const getTokenByMintKey = useCallback(
    async (mintKey: string) => {
      try {
        if (publicKey) {
          const listToken = await getAllTokens();
          if (listToken.length > 0) {
            return listToken.find((item) => item.mintKey === mintKey);
          }

          return null;
        }

        return null;
      } catch (e) {
        return null;
      }
    },
    [publicKey, connection]
  );

  return useMemo(() => {
    return { getAllTokens, getTokenByMintKey };
  }, [getAllTokens]);
}

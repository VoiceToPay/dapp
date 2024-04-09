import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import * as anchor from '@coral-xyz/anchor';
import { createTransferInstruction, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { domainService } from '@src/service/domain.service';

export function useSendTransaction() {
  const connection = new Connection(import.meta.env.VITE_SOLANA_HOST as string, 'confirmed');
  // const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const sendTransactionByAddress = async (publicKey: PublicKey, address: string, amount: number) => {
    const toPublicKey = new PublicKey(address);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPublicKey,
        lamports: LAMPORTS_PER_SOL * amount,
      })
    );

    // and then send the transaction:
    const hash = await sendTransaction(transaction, connection);

    return hash;
  };

  const sendTransactionByDomainName = useCallback(
    async (domainName: string, amount: number) => {
      try {
        if (!publicKey) {
          toast.error('Please connect wallet');
          return null;
        }
        const data = await domainService.getAddressByDomainName({ domainName });
        const address = data.result;
        if (!address) {
          toast.error('Address not found');
          return null;
        }

        //
        const hash = await sendTransactionByAddress(publicKey, address, amount);

        return hash;
      } catch (error) {
        toast.error(error?.toString() as string);
        console.error('Error sending transaction:', error);
        return null;
      }
    },
    [publicKey]
  );

  const sendTokenTransactionByAddress = async (
    publicKey: PublicKey,
    address: string,
    tokenAddress: string,
    amount: number,
    decimal: number
  ) => {
    const toPublicKey = new PublicKey(address);
    // create a PublicKey instance from the token address
    const tokenPublicKey = new PublicKey(tokenAddress);

    // get or create a token account for the sender address
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      publicKey as any,
      tokenPublicKey,
      publicKey
    );

    // get or create a token account for the recipient address
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      publicKey as any,
      tokenPublicKey,
      toPublicKey
    );

    const transaction = new Transaction().add(
      createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        publicKey as any,
        new anchor.BN(amount * Math.pow(10, decimal)), // Convert the number to a string
        [],
        TOKEN_PROGRAM_ID
      )
    );

    // set a recent block hash on the transaction to make it pass smoothly
    const latestBlockHash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockHash.blockhash;

    // set who is the fee payer for that transaction
    transaction.feePayer = publicKey;

    // send the transaction
    const signature = await sendTransaction(transaction, connection);

    // wait for the transaction to complete
    const txh = await connection.confirmTransaction({
      signature,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      blockhash: latestBlockHash.blockhash,
    });

    return txh;
  };

  const sendTokenTransactionByDomainName = useCallback(
    async (domainName: string, tokenAddress: string, amount: number, decimal: number) => {
      try {
        if (!publicKey) {
          toast.error('Please connect wallet');
          return null;
        }
        const data = await domainService.getAddressByDomainName({ domainName });
        const address = data.result;
        if (!address) {
          toast.error('Address not found');
          return null;
        }

        //
        const hash = await sendTokenTransactionByAddress(publicKey, address, tokenAddress, amount, decimal);

        return hash;
      } catch (error) {
        console.error('Error sending transaction:', error);
        toast.error(error?.toString() as string);
        return null;
      }
    },
    [publicKey]
  );

  return useMemo(() => {
    return {
      sendTransactionByDomainName,
      sendTokenTransactionByDomainName,
    };
  }, [sendTransactionByDomainName, sendTokenTransactionByDomainName]);
}

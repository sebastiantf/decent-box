import { TheBox } from '@decent.xyz/the-box';
import '@decent.xyz/the-box/dist/font.woff2.css';
import '@decent.xyz/the-box/dist/light.css';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { useConnect } from 'wagmi';

// Get the signer and address via wagmi or configure using ethers
import { useSigner, useAccount } from 'wagmi';
import { ethers } from 'ethers';

export default function Home() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  console.log('signer, account: ', { signer, account });
  console.log('api_key: ', process.env.NEXT_PUBLIC_DECENT_API_KEY);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div>

        <TheBox
          className="rounded-lg border shadow-md bg-white light"
          signer={signer || null}
          nftParams={{
            address: '0xdd45d5095567f5CD681918251195deDfa84B6b93',
            chainId: 137,
            // paymentToken: ethers.constants.AddressZero,
            mintParams: {
              abi: 'function mint(bytes32 r,bytes32 s,uint8 v) payable',
              params: [
                '0xe5c34e3172070331fe240b4cffef5817cfacba2ec3821a3cbfbb2f7b0e128198',
                '0x41e593e34ba4c9768309f023a5a165a6d9b7c6aeebf0f4d3910d951731e73edc',
                28,
              ],
              cost: ethers.utils.parseEther('0.75'),
              endSupply: {
                maxCap: 10,
              },
            },
            title: 'test box polygon pay on arb',
            displayCost: '0.75 MATIC',
          }}
          options={{
            allowSecondary: true,
            allowPrimary: true,
            allowBridging: true,
            allowSwapping: true,
          }}
          onTxError={() => console.log('Rugged. Blame Elon.')}
          onTxPending={() => console.log('Box is fast so this should be qui')}
          onTxReceipt={() => console.log('Sweet receipt.')}
          apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY}
        />
      </main>
    </>
  );
}

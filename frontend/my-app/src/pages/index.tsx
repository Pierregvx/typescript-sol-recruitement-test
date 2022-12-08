import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import { MintNFTForm } from './All'

function Page() {
  const { isConnected } = useAccount()
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton />
      {isConnected && <Account />
      
      }
      <MintNFTForm/>

    </>
  )
}

export default Page

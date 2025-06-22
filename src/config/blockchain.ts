import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: 'your-project-id' }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

// Smart contract addresses (these would be deployed contracts)
export const CONTRACTS = {
  CONTENT_VERIFICATION: '0x1234567890123456789012345678901234567890', // Placeholder
  NEWS_REGISTRY: '0x0987654321098765432109876543210987654321', // Placeholder
}

// Content verification contract ABI (simplified)
export const CONTENT_VERIFICATION_ABI = [
  {
    inputs: [
      { name: 'contentHash', type: 'bytes32' },
      { name: 'metadata', type: 'string' },
    ],
    name: 'verifyContent',
    outputs: [{ name: 'verificationId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'verificationId', type: 'uint256' }],
    name: 'getVerification',
    outputs: [
      { name: 'contentHash', type: 'bytes32' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'creator', type: 'address' },
      { name: 'verified', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
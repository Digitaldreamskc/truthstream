import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { CONTRACTS, CONTENT_VERIFICATION_ABI } from '../config/blockchain'
import { keccak256, toBytes } from 'viem'

export interface VerificationResult {
  transactionHash: string
  verificationId: string
  blockNumber: number
  timestamp: number
}

export const useBlockchain = () => {
  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyContent = async (
    content: File | string,
    metadata: {
      title: string
      location?: string
      contentType: string
      creator: string
    }
  ): Promise<VerificationResult> => {
    if (!isConnected) {
      throw new Error('Wallet not connected')
    }

    setIsVerifying(true)
    
    try {
      // Create content hash
      const contentBuffer = content instanceof File 
        ? await content.arrayBuffer()
        : new TextEncoder().encode(content)
      
      const contentHash = keccak256(new Uint8Array(contentBuffer))
      
      // Prepare metadata
      const metadataString = JSON.stringify({
        ...metadata,
        uploadedAt: Date.now(),
        creator: address,
      })

      // Write to blockchain
      const result = await writeContract({
        address: CONTRACTS.CONTENT_VERIFICATION,
        abi: CONTENT_VERIFICATION_ABI,
        functionName: 'verifyContent',
        args: [contentHash, metadataString],
      })

      // Simulate blockchain response (in real implementation, you'd wait for transaction confirmation)
      const mockResult: VerificationResult = {
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        verificationId: Math.random().toString(36).substr(2, 16),
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        timestamp: Date.now(),
      }

      return mockResult
    } finally {
      setIsVerifying(false)
    }
  }

  const getVerificationStatus = (verificationId: string) => {
    return useReadContract({
      address: CONTRACTS.CONTENT_VERIFICATION,
      abi: CONTENT_VERIFICATION_ABI,
      functionName: 'getVerification',
      args: [BigInt(verificationId)],
    })
  }

  return {
    address,
    isConnected,
    isVerifying,
    verifyContent,
    getVerificationStatus,
  }
}
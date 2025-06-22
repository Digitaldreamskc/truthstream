# TruthStream - Blockchain News Verification Platform

A modern web application that enables journalists and citizens to upload, verify, and share news content using blockchain technology on the Base network.

## Features

- **Content Upload**: Upload images, videos, and documents with blockchain verification
- **Live Streaming**: Real-time streaming with immutable timestamps
- **News Feed**: Browse and interact with verified content from other users
- **Content Library**: Manage and organize your uploaded content
- **Verification Dashboard**: Monitor verification status and blockchain metrics
- **Base Network Integration**: Leverages Ethereum's Base L2 for fast, low-cost transactions

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Base (Ethereum L2) via Wagmi
- **Icons**: Lucide React
- **Wallet Integration**: WalletConnect + Injected wallets

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Web3 wallet (MetaMask, WalletConnect compatible)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd truthstream
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your Web3 wallet
2. **Upload Content**: Navigate to "Upload Content" to submit news materials
3. **Live Stream**: Use "Live Stream" for real-time broadcasting
4. **Browse Feed**: View verified content from other users in "News Feed"
5. **Manage Content**: Access your uploads in "Content Library"
6. **Monitor Verification**: Check verification status in "Verification Dashboard"

## Blockchain Integration

TruthStream uses the Base network for:
- Content hash verification
- Immutable timestamping
- Creator attribution
- Verification confidence scoring

All content is cryptographically hashed and recorded on-chain, ensuring authenticity and preventing tampering.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

The application is deployed at:https://brilliant-chebakia-7097a3.netlify.app/

## Support

For support, please open an issue in the GitHub repository or contact the development team.

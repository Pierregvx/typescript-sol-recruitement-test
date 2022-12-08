export default [
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC721',
                        name: 'ctr',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                indexed: false,
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'signaturesigner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'signer',
                type: 'address',
            },
        ],
        name: 'NFTStoredEvent',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'NFTStored',
        outputs: [
            {
                internalType: 'contract IERC721',
                name: 'ctr',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'counter',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC721',
                        name: 'ctr',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deposits',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC721',
                        name: 'ctr',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
            },
        ],
        name: 'getSignature',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'nftToId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC721',
                        name: 'ctr',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct NFT',
                name: 'nft',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
        ],
        name: 'storeNFT',
        outputs: [
            {
                internalType: 'bool',
                name: 'signerIsOwner',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

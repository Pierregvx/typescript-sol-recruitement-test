// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Test.sol";
import "hardhat/console.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract MySol is Test {
    mapping(uint256 => NFT) public NFTStored;
    mapping(address => mapping(uint256 => uint256)) public nftToId;
    mapping(uint256 => uint256) public deposits;
    event NFTStoredEvent(NFT nft, address signaturesigner, address signer);
    uint256 public counter = 1;

    function extractAddress(
        bytes32 _hash,
        bytes memory _signature
    ) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        // Check the signature length
        if (_signature.length != 65) {
            return address(0);
        }
        // Divide the signature in r, s and v variables
        // ecrecover takes the signature parameters, and the only way to get them
        // currently is to use assembly.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return address(0);
        } else {
            // solium-disable-next-line arg-overflow
            return
                ecrecover(
                    keccak256(
                        abi.encodePacked(
                            "\x19Ethereum Signed Message:\n32",
                            _hash
                        )
                    ),
                    v,
                    r,
                    s
                );
        }
    }

    function _storeNFT(NFT calldata _nft) internal {
        NFTStored[counter] = _nft;
    }

    function getSignature(NFT calldata nft) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(address(nft.ctr), nft.tokenId));
    }

    function storeNFT(
        NFT calldata nft,
        bytes calldata signature
    ) external returns (bool signerIsOwner) {
        bytes32 hash = getSignature(nft);
        address signer = extractAddress(hash, signature);
        address nftowner = nft.ctr.ownerOf(nft.tokenId);
        console.log("signer", signer, "signer", msg.sender);
        console.log("nftowner", nftowner);
        emit NFTStoredEvent(nft, signer, nftowner);

        require(
            nftToId[address(nft.ctr)][nft.tokenId] == 0,
            "NFT already stored"
        );
        require(signer == nftowner, "signer is not the owner of the NFT");
        _storeNFT(nft);
        counter++;
        return true;
    }

    function deposit(NFT calldata nft) external payable {
        uint256 id = nftToId[address(nft.ctr)][nft.tokenId];
        deposits[id] += msg.value;
    }
}

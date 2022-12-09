import { BigNumber, ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export function Deposit(props: {
    nftContract: `0x${string}`;
    tokenId: number;
  }) {
  
    const { config } = usePrepareContractWrite({
      chainId: 80001,
      address: "0x6D1A5a82cBd3a3F043D56CdA3f5b55799Ad81f19",
      abi: [
        {
          inputs: [
            {
              components: [
                {
                  internalType: "contract IERC721",
                  name: "ctr",
                  type: "address",
                },
                { internalType: "uint256", name: "tokenId", type: "uint256" },
              ],
              internalType: "struct NFT",
              name: "nft",
              type: "tuple",
            },
          ],
          name: "deposit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "deposit",
      args: [
        {
          ctr: props.nftContract,
          tokenId: BigNumber.from(props.tokenId),
        },
      ],
      overrides: {
        value: ethers.utils.parseEther("0.0001"),
      },
    });
    const { data, write } = useContractWrite(config);
    console.log(config, data, write);
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  
    return (
      <div>
        <button disabled={!write || isLoading} onClick={() => write!()}>
          {isLoading ? "Tx ongoing..." : "Deposit"}
        </button>
        {isSuccess && (
          <div>
            Successfully deposited
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </div>
    );
  }
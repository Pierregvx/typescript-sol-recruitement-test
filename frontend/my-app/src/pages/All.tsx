import * as React from "react";
import axios from "axios";
import { fetchSigner,Address } from '@wagmi/core'
 
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
// import { Deposit } from "../components/ContractCalls";
export function Deposit(props: {
  nftContract: `0x${string}`;
  tokenId: number;
}) {

  // const signer = await fetchSigner()
  // const address = await signer?.getAddress()
  // console.log(address)
  const { config } = usePrepareContractWrite({
    chainId: 80001,
    address: "0x617b964dfcef78195d895963cf386418658345af",
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
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const MintNFTForm =()=> {
  const [Id, setId] = React.useState("0");
  const debouncedTokenId = useDebounce(Id, 500);
  

  const { data, isError, isLoading } = useContractRead({
    address: "0x617b964dfcef78195d895963cf386418658345af",
    chainId: 80001,
    abi: [
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "NFTStored",
        outputs: [
          { internalType: "contract IERC721", name: "ctr", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        stateMutability: "view",
        args: [0],
        type: "function",
      },
    ],
    args: [BigNumber.from(Id)],
    functionName: "NFTStored",
  });
  let { data: data2 } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContractRead({
      address: data && data.ctr,
      chainId: 80001,
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "tokenURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      args: [BigNumber.from((data && data.tokenId) || 0)],
      functionName: "tokenURI",
    });
   
    // React.useEffect(async ()=>{
    //   async function fetchURI(){
    //     try{
    //      await axios.get("https://public.nftstatic.com/static/nft/BSC/BNFTMBOX01/1").then((res: any)=>{
    //         console.log("==========",res)
    //       })}
    //       catch(err){
    //         console.log(err)
    //       }
    //   }
    //   fetchURI()
    // })
  console.log("data2", data2);

  return (
    <div>
      <form>
        <label htmlFor="tokenId">Token ID</label>
        <input
          id="tokenId"
          onChange={(e) => setId(e.target.value)}
          placeholder="420"
          value={Id}
        />
      </form>
      <div>
        <p>
          {" "}
          address : <span id="address">{data?.ctr}</span>
        </p>
        <p>
          {" "}
          token id : <span id="tokenId">{data?.tokenId.toNumber()}</span>
        </p>
        <p>
          tokenURI : <span id="tokenURI">{data2}</span>
        </p>
        <img src={"https://gateway.pinata.cloud/ipfs/QmQUH91pvCMCzwjpdknAQJiFr1SrJs3GnhfcbUUcbMwJUr"}></img>
      </div>
      {data && (
        <Deposit nftContract={data.ctr} tokenId={data.tokenId.toNumber()} />
      )}
    </div>
  );
}

// data && setTokenId(data.tokenId.toString())
// data && setContractAddress(data.ctr)

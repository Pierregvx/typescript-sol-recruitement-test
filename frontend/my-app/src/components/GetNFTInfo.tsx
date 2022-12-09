import { BigNumber } from "ethers";
import React from "react";
import { useContractRead } from "wagmi";
import { Deposit } from "./Deposit";

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
  
  export const GetNFTInfo = () => {
    const [Id, setId] = React.useState("0");
    const debouncedTokenId = useDebounce(Id, 500);
  
    const { data, isError, isLoading } = useContractRead({
      address: "0x6D1A5a82cBd3a3F043D56CdA3f5b55799Ad81f19",
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
      args: [BigNumber.from("0"+Id)],
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
        args: [BigNumber.from((data && "0"+data.tokenId) || 0)],
        functionName: "tokenURI",
      });
      const xhr = new XMLHttpRequest();
      var scrap
    xhr.open(
      "GET",
      data2!,
      false
    );
    try {
      xhr.send();
      scrap = JSON.parse(xhr.responseText).image;
  
    } catch (err) {
      console.log(err);
    }
    const image = scrap?scrap:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019"
  
   
    console.log("data", data);
  
    return (
      <div>
        <form>
          <label htmlFor="tokenId">Token ID</label>
          <input
          type={"text"}
            id="tokenId"
            onChange={(e) => setId(e.target.value)}
            placeholder="420"
            value={Id}
          />
        </form>
        <div>
          <p>
            address : <span id="address">{data?.ctr}</span>
          </p>
          <p>
            token id : <span id="tokenId">{data?.tokenId.toNumber()}</span>
          </p>
          <p>
            tokenURI : <span id="tokenURI">{data2}</span>
          </p>
          <img src={image}></img>
        </div>
        {data && (
          <Deposit nftContract={data.ctr} tokenId={data.tokenId.toNumber()} />
        )}
      </div>
    );
  };
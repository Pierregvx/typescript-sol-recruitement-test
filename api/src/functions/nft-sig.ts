/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ethers } from 'ethers';
import abi from '../abi';

const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/6UhsPRKR79e4fSzMo590glSbly-BYewd'
);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (
        !event.queryStringParameters ||
        !event.queryStringParameters.key ||
        !event.queryStringParameters.tokenId ||
        !event.queryStringParameters.contract
    ) {
        return {
            statusCode: 400,
            body: 'Missing parameters',
        };
    }

    try {
        const body = {
            contract: event.queryStringParameters!.contract!,
            tokenId: event.queryStringParameters!.tokenId!,
            key: event.queryStringParameters!.key!,
        };
        const signer = new ethers.Wallet(body.key, provider);
        const contract = new ethers.Contract('0x617b964dfcef78195d895963cf386418658345af', abi, signer);
        const hash = await contract.getSignature([body.contract, body.tokenId]);
        const sig = await signer.signMessage(hash);

        const tx = await contract.storeNFT([body.contract, body.tokenId], sig);
        return {
            statusCode: 200,
            body: tx.hash,
        };
    } catch (err:any) {
            return {
                statusCode: 500,
                body: err.message,
            };
        }

    
};

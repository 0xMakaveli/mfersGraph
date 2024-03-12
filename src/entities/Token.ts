import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import { BigInt } from '@graphprotocol/graph-ts'
import {Token} from "../../generated/schema"

export function CreateToken(event: TransferEvent): Token 
{
    let token = new Token(event.params.tokenId.toString());
    token.owner = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.tokenURI = "/" + event.params.tokenId.toString();
    token.updatedAtTimestamp = event.block.timestamp;
    token.save();
    return token as Token
}

export function getOrCreateToken(event: TransferEvent): Token
{
    let token = Token.load(event.params.tokenId.toString());
    if(token === null)
    {
        token = CreateToken(event)
    }
    return token as Token
}

export function updateToken(token: Token, timestamp: BigInt): void {
    token.updatedAtTimestamp = timestamp;
    token.save()
  }
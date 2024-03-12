import {BigInt} from '@graphprotocol/graph-ts'
import {Token} from "../../generated/schema"

export function CreateToken(tokenid: BigInt, timestamp: BigInt): Token 
{
    let token = new Token(tokenid.toString());
    token.tokenID = tokenid;
    token.updatedAtTimestamp = timestamp;
    token.save();
    return token as Token
}

export function getOrCreateToken(tokenid: BigInt, timestamp: BigInt): Token
{
    let token = Token.load(tokenid.toString());
    if(token === null)
    {
        token = CreateToken(tokenid,timestamp);
    }
    return token as Token
}

export function updateToken(token: Token, timestamp: BigInt): void {
    token.updatedAtTimestamp = timestamp;
    token.save()
  }

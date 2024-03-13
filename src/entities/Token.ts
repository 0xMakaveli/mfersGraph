import {BigInt,Address} from '@graphprotocol/graph-ts'
import {Token} from "../../generated/schema"
import {Hash} from "../../utils/constants"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"

export function CreateToken(address: Address,tokenid: BigInt, timestamp: BigInt): Token 
{
    let token = new Token(tokenid.toString());
    token.tokenID = tokenid;
    token.owner = address.toHexString();
    token.tokenURI = "/" + token.id;
    token.ipfsHashURI = Hash + token.tokenURI;
    TokenMetadataTemplate.create(token.ipfsHashURI as string);
    token.updatedAtTimestamp = timestamp;
    token.save();
    return token as Token
}

export function getOrCreateToken(address: Address,tokenid: BigInt, timestamp: BigInt): Token
{
    let token = Token.load(tokenid.toString());
    if(token === null)
    {
        token = CreateToken(address,tokenid,timestamp);
    }
    return token as Token
}

export function updateToken(token: Token, timestamp: BigInt): void {
    token.updatedAtTimestamp = timestamp;
    token.save()
  }

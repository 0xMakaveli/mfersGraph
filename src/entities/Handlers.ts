import {getOrCreateToken} from "./Token"
import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import { User,Token,Transaction} from "../../generated/schema"
import {HASH} from "../../utils/constants"
import {gerOrCreateUser} from "./User"
import {getOrCreateTransaction} from "./Transactions"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"


export function TokenHandler(event: TransferEvent): Token 
{
    const token = getOrCreateToken(event.params.tokenId,event.block.timestamp)
    token.owner = event.params.to.toHexString();
    token.tokenURI = "/" + token.id;
    token.ipfsHashURI = HASH+ token.tokenURI;
    TokenMetadataTemplate.create(token.ipfsHashURI as string);
    token.save();

    return token as Token
}

export function UserHandler(event: TransferEvent): User 
{
    const user = gerOrCreateUser(event.params.to,event.block.timestamp);
    return user as User
}

export function TransactionHandler(event: TransferEvent): Transaction 
{
    const tx = getOrCreateTransaction(event.transaction.hash,event.block.timestamp);
    tx.transactionFrom = event.params.from;
    tx.transactionTo = event.params.to;
    tx.gasPrice = event.transaction.gasPrice;
    return tx as Transaction
}
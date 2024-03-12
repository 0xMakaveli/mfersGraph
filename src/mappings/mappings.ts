import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {getOrCreateToken} from "../entities/Token"
import {CreateTransaction} from "../entities/Transactions"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"
import { gerOrCreateUser } from "../entities/User"
import { CreateTokenMetadata} from "../entities/TokenMetadata"
import { Bytes} from '@graphprotocol/graph-ts'

const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
export function handleTransfer(event: TransferEvent): void {
	let token = getOrCreateToken(event)
	token.ipfsHashURI = ipfsHash + token.tokenURI;
	TokenMetadataTemplate.create(token.ipfsHashURI);
	gerOrCreateUser(event.params.to,event.block.timestamp);
	CreateTransaction(event);

}

export function handleMetadata(content: Bytes): void {
	CreateTokenMetadata(content);
}

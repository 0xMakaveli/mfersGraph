import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import { getOrCreateToken } from "../entities/Token";
import { gerOrCreateUser } from "../entities/User";
import { getOrCreateTransaction } from "../entities/Transactions";
import { CreateTokenMetadata} from "../entities/TokenMetadata"
import { Bytes} from '@graphprotocol/graph-ts'


export function handleTransfer(event: TransferEvent): void {
	let token = getOrCreateToken(event.params.to,event.params.tokenId,event.block.timestamp);
	token.save();
	let user = gerOrCreateUser(event.params.to,event.block.timestamp);
	user.save();
	let tx = getOrCreateTransaction(event);
	tx.save();

}

export function handleMetadata(content: Bytes): void {
	let tokenmetadata = CreateTokenMetadata(content);
	tokenmetadata.save()
}


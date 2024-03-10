import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {TokenMetadata} from "../../generated/schema"
import {TokenTransfer} from "../entities/Token"
import {TransactionsInfo} from "../entities/Transactions"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'
import { UserInfo } from "../entities/User"


export function handleTransfer(event: TransferEvent): void {
      TokenTransfer(event);
      TransactionsInfo(event);
      UserInfo(event);


}

export function handleMetadata(content: Bytes): void {
	let tokenMetadata = new TokenMetadata(dataSource.stringParam());
	const value = json.fromBytes(content).toObject();
	if (value) {
		const image = value.get("image");
		const name = value.get("name");
		if (name && image) {
				tokenMetadata.name = name.toString();
				tokenMetadata.image = image.toString();
      	tokenMetadata.save();
		}
	}
}

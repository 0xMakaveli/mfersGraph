import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {TokenMetadata} from "../../generated/schema"
import {getOrCreateToken} from "../entities/Token"
import {} from "../entities/Transactions"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'
import { gerOrCreateUser } from "../entities/User"
import { CreateTransaction } from "../entities/Transactions"

const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
export function handleTransfer(event: TransferEvent): void {
	let token = getOrCreateToken(event)
	token.ipfsHashURI = ipfsHash + token.tokenURI;
	TokenMetadataTemplate.create(token.ipfsHashURI);
	gerOrCreateUser(event);
	CreateTransaction(event);

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

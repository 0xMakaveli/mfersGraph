import {Transfer as TransferEvent} from "../../generated/Contract/Contract";
import {Token,TokenMetadata} from "../../generated/schema"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'


const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
export function handleTransfer(event: TransferEvent): void {
    let token = Token.load(event.params.tokenId.toString());
    if(!token) {
      token = new Token(event.params.tokenId.toString());
      token.tokenID = event.params.tokenId;
      token.tokenURI ="/" + event.params.tokenId.toString(); 
      const ipfsHashURI  = ipfsHash + token.tokenURI;
      token.ipfsHashURI = ipfsHashURI;
      TokenMetadataTemplate.create(ipfsHashURI);
    }
    token.updatedAtTimestamp = event.block.timestamp;
    token.save();
    
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
				//const attributesArray = attributes.toArray();
      			tokenMetadata.save();
		}
	}
}

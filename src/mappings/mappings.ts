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
	// Create a new TokenMetadata entity and pass in the dataSource as its ID. This is the ipfsHashUri that we created in the handleTransfer function above.

	const value = json.fromBytes(content).toObject();
	// Create a value variable that will be used to store the json object that is passed in as the content parameter.
	if (value) {
		const image = value.get("image");
		const name = value.get("name");
		const attributes = value.get("attributes");

		// Assemblyscript needs to have nullchecks. If the value exists, then we can proceed with the creating an image, name, and attributes variable gathered from the json object.

		if (name && image && attributes) {
			tokenMetadata.name = name.toString();
			tokenMetadata.image = image.toString();
			//const attributesArray = attributes.toArray();
      tokenMetadata.save();
		}
	}
}

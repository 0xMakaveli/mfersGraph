import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {Token,TokenMetadata, Transaction, User} from "../../generated/schema"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'


const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
      token = new Token(event.params.tokenId.toString());
      token.owner = event.params.to.toHexString();
      token.tokenID = event.params.tokenId;
      token.tokenURI = "/" + event.params.tokenId.toString();
      const ipfsHashUri = ipfsHash + token.tokenURI;
      token.ipfsHashURI = ipfsHashUri;
      TokenMetadataTemplate.create(ipfsHashUri);
  }
      token.updatedAtTimestamp = event.block.timestamp;
      token.save();

  let tx = new Transaction(event.transaction.hash.toHex());
        tx.transactionFrom = event.transaction.from;
        tx.transactionTo = event.transaction.to as Bytes;
        tx.gasPrice = event.transaction.gasPrice;
        tx.timestamp = event.block.timestamp;
        tx.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
        user = new User(event.params.to.toHexString());
        user.save();
  }
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

import {Transfer as TransferEvent} from "../../generated/mfers/mfers"
import {Token} from "../../generated/schema"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"


const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";

export function TokenTransfer(event: TransferEvent): Token 
{
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
    
    return token as Token
}

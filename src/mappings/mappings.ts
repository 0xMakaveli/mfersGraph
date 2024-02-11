import {Transfer as TransferEvent} from "../../generated/Contract/Contract";
import {Token,TokenMetadata} from "../../generated/schema"
import {TokenMetadata as TokenMetadataTemplate} from "../../generated/templates"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'


const ipfsHash = "QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
export function handleTransfer(event : TransferEvent): void {
    let token = Token.load(event.params.tokenId.toString());
    if(token) {
      const token = new Token(event.params.tokenId.toString());
      token.tokenID = event.params.tokenId;
      token.tokenURI =  "/" + event.params.tokenId.toString(); 
      token.updatedAtTimestamp = event.block.timestamp;
      const ipfsHashURI  = ipfsHash + token.tokenURI;
      token.ipfsHashURI = ipfsHashURI;
      TokenMetadataTemplate.create(ipfsHashURI);
      token.save();
    }
}

export function handleMetadata(content:Bytes): void {
    let tokenmetadata  = new TokenMetadata(dataSource.stringParam());
    const value = json.fromBytes(content).toObject();
    if(value)
      { 
      const image = value.get("image");
      const name = value.get("name");
      const description = value.get("description");
      const attributes  = value.get("attributes");
      if(image && name && description && attributes) {
            tokenmetadata.name = name.toString();
            tokenmetadata.image = image.toString();
            tokenmetadata.description = description.toString()
            const attributesArray = attributes.toArray();
            if(attributesArray) {
              for (let i = 0; i < attributesArray.length; i++) {
                const attributeObject = attributesArray[i].toObject();
                const trait_type = attributeObject.get("trait_type");
                const value = attributeObject.get("value");
                if (trait_type && value) {
                  switch (i) {
                    case 0:
                      tokenmetadata.trait_type_1 = trait_type.toString();
                      tokenmetadata.value_1 = value.toString();
                        break;
                    case 1:
                      tokenmetadata.trait_type_2 = trait_type.toString();
                      tokenmetadata.value_2 = value.toString();
                        break;
                    case 2:
                      tokenmetadata.trait_type_3 = trait_type.toString();
                      tokenmetadata.value_3 = value.toString();
                        break;
                    case 3:
                      tokenmetadata.trait_type_4 = trait_type.toString();
                      tokenmetadata.value_4 = value.toString();
                        break;
                    case 4:
                      tokenmetadata.trait_type_5 = trait_type.toString();
                      tokenmetadata.value_5 = value.toString();
                        break;
                    case 5:
                      tokenmetadata.trait_type_6 = trait_type.toString();
                      tokenmetadata.value_6 = value.toString();
                        break;
                    case 6:
                      tokenmetadata.trait_type_7 = trait_type.toString();
                      tokenmetadata.value_7 = value.toString();
                        break;
                    case 7:
                      tokenmetadata.trait_type_8 = trait_type.toString();
                      tokenmetadata.value_8 = value.toString();
                        break;
                  }  

                }

            }
        }
        tokenmetadata.save();
      }

    }
}

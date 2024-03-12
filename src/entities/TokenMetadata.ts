import {TokenMetadata} from "../../generated/schema"
import { json, Bytes, dataSource } from '@graphprotocol/graph-ts'

export function CreateTokenMetadata(content: Bytes): TokenMetadata
{
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
    return tokenMetadata as TokenMetadata
}
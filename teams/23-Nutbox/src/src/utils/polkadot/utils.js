
import {
  numberToU8a,
} from "@polkadot/util"

export function NumberTo4BytesU8A(number) {
    let buf = new Uint8Array(4);
    let tmp = numberToU8a(number);
    const tmpLength = tmp.length
    if (tmpLength > 4) throw new Error('Unsupported size of number');
    for (let i = tmpLength; i > 0; i--) {
      buf[4 - i] = tmp[tmpLength - i];
    }
    return buf;
  }

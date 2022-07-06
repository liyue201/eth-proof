const {GetAndVerify} = require('./../index')
require("dotenv").config({path: ".env"});
const getAndVerify = new GetAndVerify(process.env.ETHPROOFENDPOINT)
const {encode, toHex} = require('eth-util-lite')

describe('Receipt GetAndVerify Against BlockHash', () => {

    it('should be able to request a proof for 0xb53f7522 and verify it', async () => {

        // bug: python offchain/proveth.py -n 20759076 -tr True  -i 1
        //let txHash    = '0x1252c234095292f2f00568260e9cdf95409fda837d8c4f3bc08819fca696f89b'

        // python offchain/proveth.py -n 20779482 -tr True  -i 1
        //let txHash    = '0xb9299f9f24d5478040da7133bc2af1a62170f5755c0316a13ed60d8154e759a2'

        // python offchain/proveth.py -n 20781267  -tr True  -i 5
        let txHash = '0x6309fe69f1f3bf6721f0bf68ba1bba13cf93561dd8f719ad214fce78d21eca57'

        // goerli
        // let blockHash = '0xf3f15e65894e9c09758c1db6c18575b36c550499e9e2304d3d352cf33e0176b9'
        //let txHash    = '0x67cfe97a9bd2f0602d496e383996f375741609f31fd83a974edc1e8f665b21f7'

        await getAndVerify.getReceiptPoof(txHash)
    });

});

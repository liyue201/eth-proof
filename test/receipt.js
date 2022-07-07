const {GetAndVerify} = require('./../index')
require("dotenv").config({path: ".env"});
const assert = require('assert').strict;
const getAndVerify = new GetAndVerify(process.env.ETHPROOFENDPOINT)
const {encode, toHex} = require('eth-util-lite')

describe('Test Get Receipt Poof', () => {

    it('Get Receipt Poof 1', async () => {

        let txHash = '0x6309fe69f1f3bf6721f0bf68ba1bba13cf93561dd8f719ad214fce78d21eca57'

        // python offchain/proveth.py -n 20781267  -tr True  -i 5
        let proof_by_python = "f9055602f9025ea07eb652ee90d95eb5606f9e036510f8364d158472bba82459bbca7c8ce08b06e1a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d493479496c5d20b2a975c050e4220be276ace4892f4b41aa08b4cb0ac9f0167ebe88bc552e9411005fba1b811715d8b059ab21ac30e711199a0d163ec7ccaa4c6aba24a2e1298b011931ab9708c2f06188db068a138d755d401a07cbc8ea4d9a9c02919c3c6a32e823e78655fe8ea2c8221b0071e865c64e4dd86b90100000000000000100020000000000000084008000010040000000000000080000000000020010000000000080000400000080048040002000000000000002400001002080000000041000000080020000422100000210400000000000000000000000000200002000000010000040200004800000004002000000000101000000001000004000000000000000000000004000006801000000082000000020000210220200454200000000200000000000000000000240020000002000000000000200000020800000000002000000000080000000000002020000000020000400000100020000000000300000000000000001000080000004000000000020000400284013d18d38401c9c380832fe3b68462c39d7bb861d88301010b846765746888676f312e31382e32856c696e7578000000de3b3a0477c4c9062fc26e4e023bb432445e59601bf5d094b144cdf3181ff8fec05f60e67271f57b8c9898c87c959da6ca0d9c1311e9dd0df00d7bec89ba3d6aa06ecbe800a0000000000000000000000000000000000000000000000000000000000000000088000000000000000005f902f0f851a0dc8b54e414015b2c20d04cd733ea50eef763da12f92c33935332c34abd89759880808080808080a0f121c21486b34eddb6f80dd33a7749fbfed22eb3633a0ad89d8a45fc6dd7f8148080808080808080f8b180a05db4989cb67133c65208be9bb8e03e6fe1755c3655a78ef6615418f773547986a0afc21cea51745e21f1a4e4e8bed3d500f00665a9d7777c3b9d64e7f2327071e4a0cd9a8cec5ef57cb8696b52637f41205dab5c761937c03b7eeb53da3f4f2f8c6aa008de0c6f3b7bc32cc550a79bcfb579c5c1c44b4957f896b8a77a21ec61ac0d21a0eb3a42561ae8d04e4f86b9275c0520b63967c09e0987d523421ed228965e6cfa8080808080808080808080f901e720b901e3f901e001832fe3b6b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000002010000000000000000000000000000000000020000200000000000000020000080000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000002000000000000000000000000010000000000000000000000000000000000000000000000f8d6f858940000000000000000000000000000000000001000e1a0627059660ea01c4733a328effb2294d2f86905bf806da763a89cee254de8bee5a00000000000000000000000000000000000000000000000000013c1be3edb2a00f87a940000000000000000000000000000000000001000f842a093a090ecc682c002995fad3c85b30c5651d7fd29b0be5da9d784a3302aedc055a000000000000000000000000096c5d20b2a975c050e4220be276ace4892f4b41aa000000000000000000000000000000000000000000000000000b1cfb035b47a00"

        let proof_blob = await getAndVerify.getReceiptPoof(txHash)
        let proof_blob_hex = proof_blob.toString("hex")

        console.log("proof_blob", proof_blob_hex)

        assert.equal(proof_blob_hex, proof_by_python)
    });

    it('Get Receipt Poof 2', async () => {

        let txHash = '0xb9299f9f24d5478040da7133bc2af1a62170f5755c0316a13ed60d8154e759a2'

        // python offchain/proveth.py -n 20779482 -tr True  -i 1
        let proof_by_python = "f904a102f9025da031f3e11dfe9bd8e30df1ebd964f7bbdc36eaa2061ab2a2cb27cfb2dccfc5ee9fa01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d493479496c5d20b2a975c050e4220be276ace4892f4b41aa04bf42838ddf2e4b8cf3091705ebcbc65c1021d0e2132949a43733737eaf050e9a050c4bf8fad21b932b85ad77678bf5119173d4b49e79e015b0541e4f2a371dafaa0acd3d2f046027285bcb538bf6c19b1f4ad7380682c09a548d262a6981430eba2b90100000000000000000000000000000000000100000000000000000000000000000000000008000000000000000000000401000000000000000000000000000000000000000000000001000000080000000020100000000000000000000000000000000000200002200080000000000200000800000000000000000000100000000100000000000000000000000000000000000004000000000000000000000000200000000000000000000000000000000000000020000000000000000000000000000000020000000000000000000000000000000000000000000000020000000020000000000000000100000000000000000000000000000000000000000000000284013d11da8401c9c38082fa638462c38890b861d88301010b846765746888676f312e31382e32856c696e7578000000de3b3a04f718de4591ac935d1c7d7c7206122467ad62043f88afc6b4464931fd65799c230b85a5ffda96d3d19cfad93c81d55b04ea42a2c62bb675e530291154b76d131f01a0000000000000000000000000000000000000000000000000000000000000000088000000000000000001f9023cf851a075bb4948b341b99f3c437392651c8490b309824b5d60e47b3339b2864d94c46e80808080808080a007a3ccfa30afd9d8c8b69e0e2f3cbc5e22acbfd6e9c8b18dc87ff72d979852848080808080808080f901e631b901e2f901df0182fa63b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000002010000000000000000000000000000000000020000200000000000000020000080000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000002000000000000000000000000010000000000000000000000000000000000000000000000f8d6f858940000000000000000000000000000000000001000e1a0627059660ea01c4733a328effb2294d2f86905bf806da763a89cee254de8bee5a000000000000000000000000000000000000000000000000000003b243b509c00f87a940000000000000000000000000000000000001000f842a093a090ecc682c002995fad3c85b30c5651d7fd29b0be5da9d784a3302aedc055a000000000000000000000000096c5d20b2a975c050e4220be276ace4892f4b41aa00000000000000000000000000000000000000000000000000002144615d57c00"

        let proof_blob = await getAndVerify.getReceiptPoof(txHash)
        let proof_blob_hex = proof_blob.toString("hex")

        console.log("proof_blob", proof_blob_hex)

        assert.equal(proof_blob_hex, proof_by_python)
    });

    it('Get Receipt Poof 3', async () => {

        let txHash = '0x3e0b397035521ade64600a2671a7a41e07fca98fdc86c1281e05caa6b05a1245'

        // python offchain/proveth.py -n 20841159 -tr True  -i 3
        let proof_by_python = "f905da02f9025ea04159909a955ebbc70693930468249c3d9e77a685b14671b76fe1d7207ab37533a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d493479496c5d20b2a975c050e4220be276ace4892f4b41aa0c86ba8487a70a449acb09a7483987872c2115db94f415277d07977f9a45c6f2ea02c5b6e40f65e1069dced29e5ca1cd6950a26620c0a238b50067e93784d1c261ea0cb6019ab606aebd154b07020265902390509223ab670573510ffdfc002760e1fb90100052000010000000100024000810000000000000104000040002010000000800008000040200000000000400000004200200900000200008000000400402000800000000000001001020000480000002020100002000000000000000040000000020000a0120200008300000000020800080010000000000000000010000000000000000000084000000100000000004000000420000004080000224000000020024020000800000080000000000000000000000000000000000000000010000000000002000000020000080000000000000000002000001000000102000020000090200a000200000100014000000000000000008000000000000000000001040284013e02c78401c9c380830730ec8462c65c12b861d88301010b846765746888676f312e31382e32856c696e7578000000de3b3a048a34dfe47d55bd708742adfb446bf6eaf4d0880f5031af55793508b7e528ccd24061933736284ab1dbbf3e9193c9393dbc59105ebe2c54eba5234132d9e8e39501a0000000000000000000000000000000000000000000000000000000000000000088000000000000000003f90374f851a0c6581640ad885a3656490e5f394a772ec8c7ef7ca754f8d72f747c46b0c6033e80808080808080a09c1319ef5309c03d42b76b4c36552fba12b1dad0804d8f13549a70e79c5c69a68080808080808080f8b180a05ba024d0c49fa04e4dbb1b4c4584f655e83df31af1ff2a9b6f5c874f8e2870e0a091e804974400d9a12cdedbf8869a2de2741fa56e629eb576c410da2e7b6596d0a0b3a1a7c40d3f4a8bd6473917d53c3cccdacfeb2f4b923262c38797d54116ed9da0b87af08bea25a953f9339a01d51f1d5acdb7be3028c8673578b06abfe18ff152a081c73aaa00dbd2f9b0fa954faa3374a9cad9325bb7f4715d2fa398c5e2112c8b8080808080808080808080f9026b20b90267f90264018302f67ab9010000000000000000000000000000000000000000010000000000000000000000000000000000000000000040000000000000000000020000000000000040000000000000000000000000000008000000000000000200000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000004000000020000000000004000000000000000000000000000000000000000000000000000000010000000000002000000000000080000000000000000000000000000000100000020000000000000000000000000000000000000000000800000000000000000000000f90159f8b99402bb96563437796e5da1fdeaf34b76498d2f153ce1a0bade1ef9a1460ef6a988ba5d64ac136f3198dfb02107b88a8aa3b851a7e4644bb88000000000000000000000000066cad4cb71902b77615cb44c6e1526341acf0155000000000000000000000000000000000000000000000000000000000000006c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f89c9402bb96563437796e5da1fdeaf34b76498d2f153cf884a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa00000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000066cad4cb71902b77615cb44c6e1526341acf0155a0000000000000000000000000000000000000000000000000000000000000006c80"

        let proof_blob = await getAndVerify.getReceiptPoof(txHash)
        let proof_blob_hex = proof_blob.toString("hex")

        console.log("proof_blob", proof_blob_hex)

        assert.equal(proof_blob_hex, proof_by_python)
    });
});

// bug: python offchain/proveth.py -n 20759076 -tr True  -i 1
//let txHash   = '0x1252c234095292f2f00568260e9cdf95409fda837d8c4f3bc08819fca696f89b'

// goerli
//let txHash    = '0x67cfe97a9bd2f0602d496e383996f375741609f31fd83a974edc1e8f665b21f7'

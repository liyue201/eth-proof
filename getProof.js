const {encode, toBuffer} = require('eth-util-lite')
const {promisfy} = require('promisfy')

const Tree = require('merkle-patricia-tree')

const Rpc = require('isomorphic-rpc')
const rlp = require('rlp');
const {arrToBufArr, bufArrToArr} = require('ethereumjs-util')

const {Header, Proof, Receipt, Transaction} = require('eth-object')


module.exports = class GetProof {
    constructor(rpcProvider = "https://mainnet.infura.io") {
        this.rpc = new Rpc(rpcProvider)
        this.eth_getProof = this.rpc.eth_getProof
    }

    async transactionProof(txHash) {
        let targetTx = await this.rpc.eth_getTransactionByHash(txHash)
        if (!targetTx) {
            throw new Error("Tx not found. Use archive node")
        }

        let rpcBlock = await this.rpc.eth_getBlockByHash(targetTx.blockHash, true)

        let tree = new Tree();

        await Promise.all(rpcBlock.transactions.map((siblingTx, index) => {
            let siblingPath = encode(index)
            let serializedSiblingTx = Transaction.fromRpc(siblingTx).serialize()
            return promisfy(tree.put, tree)(siblingPath, serializedSiblingTx)
        }))

        let [_, __, stack] = await promisfy(tree.findPath, tree)(encode(targetTx.transactionIndex))

        return {
            header: Header.fromRpc(rpcBlock),
            txProof: Proof.fromStack(stack),
            txIndex: targetTx.transactionIndex,
        }
    }

    async receiptProof(txHash) {
        let targetReceipt = await this.rpc.eth_getTransactionReceipt(txHash)
        if (!targetReceipt) {
            throw new Error("txhash/targetReceipt not found. (use Archive node)")
        }

        console.log("transactionIndex", targetReceipt.transactionIndex)

        let rpcBlock = await this.rpc.eth_getBlockByHash(targetReceipt.blockHash, false)
        //console.log("rpcBlock", rpcBlock);

        let receipts = await Promise.all(rpcBlock.transactions.map((siblingTxHash) => {
            return this.rpc.eth_getTransactionReceipt(siblingTxHash)
        }))

        let tree = new Tree();

        await Promise.all(receipts.map((siblingReceipt, index) => {
            console.log("siblingReceipt", siblingReceipt)
            console.log("index", index)
            let siblingPath = encode(index)
            let receipt = Receipt.fromRpc(siblingReceipt);
            let serializedReceipt = receipt.serialize()
            console.log("receipt", receipt)

            console.log("siblingPath", siblingPath)
            //console.log("serializedReceipt", serializedReceipt )
            return promisfy(tree.put, tree)(siblingPath, serializedReceipt)
        }))

        let [_, __, stack] = await promisfy(tree.findPath, tree)(encode(targetReceipt.transactionIndex))

        console.log("stack", stack.toString())
        let arrayProof = stack.map((trieNode)=>{ return trieNode.raw })
        console.log("arrayProof", arrayProof)

        //const bufferList = [Buffer.from('123', 'hex'), Buffer.from('456', 'hex')]
        //const proof_blob = rlp.encode(bufArrToArr(bufferList))
        const bufferList = [
            2,
            Header.fromRpc(rpcBlock),
            targetReceipt.transactionIndex,
            arrayProof,
        ]
        let proof_blob = rlp.encode(bufferList)

        console.log("proof_blob", proof_blob)
        console.log("proof_blob", proof_blob.toString("hex"))


        return {
            header: Header.fromRpc(rpcBlock),
            receiptProof: Proof.fromStack(stack),
            txIndex: targetReceipt.transactionIndex,
        }
    }

    async accountProof(address, blockHash = null) {
        let rpcBlock, rpcProof
        if (blockHash) {
            rpcBlock = await this.rpc.eth_getBlockByHash(blockHash, false)
        } else {
            rpcBlock = await this.rpc.eth_getBlockByNumber('latest', false)
        }
        rpcProof = await this.eth_getProof(address, [], rpcBlock.number)

        return {
            header: Header.fromRpc(rpcBlock),
            accountProof: Proof.fromRpc(rpcProof.accountProof),
        }
    }

    async storageProof(address, storageAddress, blockHash = null) {
        let rpcBlock, rpcProof
        if (blockHash) {
            rpcBlock = await this.rpc.eth_getBlockByHash(blockHash, false)
        } else {
            rpcBlock = await this.rpc.eth_getBlockByNumber('latest', false)
        }
        rpcProof = await this.eth_getProof(address, [storageAddress], rpcBlock.number)

        return {
            header: Header.fromRpc(rpcBlock),
            accountProof: Proof.fromRpc(rpcProof.accountProof),
            storageProof: Proof.fromRpc(rpcProof.storageProof[0].proof),
        }
    }
}

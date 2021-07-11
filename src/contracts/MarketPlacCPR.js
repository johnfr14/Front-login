export const MarketPlaceAddress = "0x45921F2E5fc4171b436ddbeCF98966e8FB2Da90B";

export const MarketPlaceAbi = [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sacemAddress_",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "buyNFT",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getEtherBalance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "withdraw",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		]
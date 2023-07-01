export const MainContract_ABI = [
	{
	  "inputs": [],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "sessionAddress",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "name",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "description",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string[]",
		  "name": "image",
		  "type": "string[]"
		}
	  ],
	  "name": "CreateSession",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "fullName",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "email",
		  "type": "string"
		}
	  ],
	  "name": "RegisterSuccess",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "fullName_old",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "email_old",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "fullName_new",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "email_new",
		  "type": "string"
		}
	  ],
	  "name": "UpdateUser",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "fullName_new",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "email_new",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "numJoinSessinon_new",
		  "type": "uint256"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "deviationNew",
		  "type": "uint256"
		}
	  ],
	  "name": "UpdateUserAdmin",
	  "type": "event"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "addressParticipant",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "addressSessions",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "admin",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_productName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_productDescription",
		  "type": "string"
		},
		{
		  "internalType": "string[]",
		  "name": "_productImage",
		  "type": "string[]"
		}
	  ],
	  "name": "createNewSession",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getAddressSession",
	  "outputs": [
		{
		  "internalType": "address[]",
		  "name": "",
		  "type": "address[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_account",
		  "type": "address"
		}
	  ],
	  "name": "getDeviationParticipant",
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
	  "name": "getInforParticipants",
	  "outputs": [
		{
		  "components": [
			{
			  "internalType": "address",
			  "name": "account",
			  "type": "address"
			},
			{
			  "internalType": "string",
			  "name": "fullName",
			  "type": "string"
			},
			{
			  "internalType": "string",
			  "name": "email",
			  "type": "string"
			},
			{
			  "internalType": "uint256",
			  "name": "numberOfJoinedSession",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256",
			  "name": "deviation",
			  "type": "uint256"
			}
		  ],
		  "internalType": "struct Main.IParticipant[]",
		  "name": "",
		  "type": "tuple[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_account",
		  "type": "address"
		}
	  ],
	  "name": "getNumberOfJoinedSession",
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
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_address",
		  "type": "address"
		}
	  ],
	  "name": "getParticipantAccount",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "name": "participants",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		},
		{
		  "internalType": "string",
		  "name": "fullName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "email",
		  "type": "string"
		},
		{
		  "internalType": "uint256",
		  "name": "numberOfJoinedSession",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "deviation",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_fullName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_email",
		  "type": "string"
		}
	  ],
	  "name": "register",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_account",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "_deviation",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "_numberOfJoinedSession",
		  "type": "uint256"
		}
	  ],
	  "name": "updateDeviationForParticipant",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_account",
		  "type": "address"
		},
		{
		  "internalType": "string",
		  "name": "_fullName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_email",
		  "type": "string"
		},
		{
		  "internalType": "uint256",
		  "name": "_numberOfJoinedSession",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "_deviation",
		  "type": "uint256"
		}
	  ],
	  "name": "updateInfomationByAdmin",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_fullName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_email",
		  "type": "string"
		}
	  ],
	  "name": "updateInfomationByUser",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ]
import React from 'react';
import logo from './wordDAO.png';
import './App.css';
import Web3 from 'web3';
const ManagerContractAbi = [
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8da5cb5b',
  },
  {
    constant: true,
    inputs: [],
    name: 'price',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xa035b1fe',
  },
  {
    constant: true,
    inputs: [],
    name: 'registryInstance',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xc0e0f379',
  },
  {
    constant: true,
    inputs: [],
    name: 'wordDAOTokenInstance',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xe6809db6',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'registryAddress',
        type: 'address',
      },
      {
        name: 'wordDAOTokenAddress',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x485cc955',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'key',
        type: 'uint32',
      },
    ],
    name: 'getBytesByKey',
    outputs: [
      {
        name: 'word',
        type: 'bytes32',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0xe1d87d50',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'byteString',
        type: 'bytes32',
      },
    ],
    name: 'getIndex',
    outputs: [
      {
        name: '',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x8527831b',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'byteString',
        type: 'bytes32',
      },
    ],
    name: 'addBytes',
    outputs: [
      {
        name: 'key',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xb14d0728',
  },
  {
    constant: true,
    inputs: [],
    name: 'getDictionarySize',
    outputs: [
      {
        name: 'size',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xa8e682df',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x2e1a7d4d',
  },
];

function initEthereum() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      window.ethereum.enable();
      console.log('Using enthereum.enable');
    } catch (error) {
      alert('User denied account access ');
    }
  } else if (window.web3) {
    // Legacy dapp browsers...
    window.web3 = new Web3(window.web3.currentProvider);
    console.log('Using window.currentProvider');
  } else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

function contract(web3) {
  window.contract = new web3.eth.Contract(
    ManagerContractAbi,
    '0x4DC1ABd5181C0256E57cB7215b73781C5D10D224',
    {}
  );
}

function App() {
  initEthereum();
  contract(window.web3);

  window.web3.eth.getAccounts().then(accounts => {
    window.defaultAccount = accounts[0];
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <WordForm />
      </header>
    </div>
  );
}

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', error: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value, error: '' });
  }

  handleSubmit(event) {
    const word = this.state.value;
    const wordBytes = window.web3.utils.asciiToHex(word);
    window.contract.methods
      .getIndex(wordBytes)
      .call()
      .then(key => {
        if (key === 0) {
          return window.contract.methods
            .addBytes(wordBytes)
            .send({ from: window.defaultAccount, gas: 500000 })
            .then(_ => {
              this.msg = `Adding ${word} to the Word DAO.`;
            });
        } else {
          const msg = `"${word}" is already in the list.`;
          this.setState({ value: word, error: msg });
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="form-style-5">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <legend>Buy a word:</legend>
            <label>
              <input
                type="text"
                placeholder="e.g. token"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <span>{this.state.error}</span>
            </label>
          </fieldset>
          <input type="submit" value="Buy" />
        </form>
      </div>
    );
  }
}

export default App;

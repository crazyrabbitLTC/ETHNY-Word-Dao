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
  },
  {
    constant: false,
    inputs: [
      {
        name: 'temp',
        type: 'address',
        indexed: false,
      },
      {
        name: 'wordDAOTokenAddress',
        type: 'address',
      },
    ],
    name: 'LogAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'event',
    anonymous: false,
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
    outputs: [
      {
        name: 'word',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: 'view',
    type: 'function',
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
        name: '',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
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
    '0xDb56f2e9369E0D7bD191099125a3f6C370F8ed15',
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
        const msg = `Someone already added "${word}" to the list at key ${key}.`;
        this.setState({ value: word, error: msg });
      })
      .catch(_ => {
        return window.contract.methods
          .addBytes(wordBytes)
          .send({ from: window.defaultAccount, gas: 500000 })
          .then(key => {
            this.error = `Adding ${word} to the DAOionary at key ${key}.`;
          });
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="form-style-5">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <legend>Buy a word</legend>
            <label>
              Word:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <span>{this.state.error}</span>
            </label>
          </fieldset>
          <input type="submit" value="Check" />
        </form>
      </div>
    );
  }
}

export default App;

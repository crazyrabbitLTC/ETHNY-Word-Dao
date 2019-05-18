# ETHNY-Word-Dao

A stab at creating a ETHNY version of the Word-Dao idea. New team! New Project!

## Instructions to get this running

Terminal Window 1:

```bash
# npm requirements
npm install -g truffle
npm install -g zos
npm install

# Run ganache in one terminal
ganache-cli --deterministic
```

Terminal Window 2:

```bash
# Setup zos session
zos session --network development --timeout 3600

# Deploy dependencies
zos push --deploy-dependencies

# Create individual contracts
zos create WordDAOToken # Note the contract address

zos create Registry # Note the contract address

# Initialize contracts (can be done above directly with --init)
truffle console --network development
```

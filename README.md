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
zos create WordDAOToken
zos create Registry
zos create Manager

# Initialize contracts via a script in truffle console
truffle console --network development
> exec ./initialize.js
```

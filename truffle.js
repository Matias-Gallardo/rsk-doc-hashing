module.exports = {
    networks: {
        ropsten: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "3", // ROPSTEN
            gas: 5000000,
            gasprice: 110000000
        },
        rsk: {
            host: "127.0.0.1",
            port: 4444,
            network_id: "775", // RSK MAINNET
            gas: 5000000,
            gasprice: 183000000,
            from: "0x3bcc5c48ef23e005a8fb21db01f49db3784fa312"
        },
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
            gas: 5000000,
            gasprice: 11000000 // Match any network id
        }
    }
};

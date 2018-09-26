async function assertKilled(promise) {
    try {
        await promise;
        assert.fail('Error killed not received');
    } catch (error) {
        const revertFound = error.message.search('is not a contract address') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
    }
}

module.exports = assertKilled;
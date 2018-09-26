pragma solidity ^0.4.17;

import "./Owned.sol";
import "./Mortal.sol";

/*
* Contract implementing a basic virtual notary (proof of existence)
*/
contract Notary_tokkenit is Owned, Mortal {

    /*
    Fallback function
    */
    function() public payable  {
        if (msg.value > 0) {
            msg.sender.transfer(msg.value);
        }
    }

    /*
    Structures
    */
    // Metadata associated to a proof of existence
    struct ProofMetadata {
        // Address which has submitted the proof
        address sender;
    }


    /*
    Events
    */
    // Proof successfully added into the book
    event ProofAdded(bytes32 hash, address sender);
    /*
    State variables
    */
    // book storing proofs of existence submitted to the contract
    // Maps the hash of a file (SHA3 keccak-256) with additional metadata
    mapping(bytes32 => ProofMetadata) book;


    /*
    Functions
    */

    /*
    Registers a proof of existence
    Arguments:
        _hash (bytes32) = hash of the document (SHA3 keccak-256)
        row_id (string) = additional row_id associated to the proof
    */
    function registerProof(bytes32 _hash) public onlyOwner  returns (bool) {
        require(checkProof(_hash),"hash already stamped");
        // Registers the proof with the timestamp of the block
        book[_hash] = ProofMetadata(msg.sender);
        // Triggers a ProofAdded event
        emit ProofAdded(_hash, msg.sender);

        return true;
    }

    /*
    Checks for the existence of a proof
    Returns true if proof exists, otherwise returns false.
    Arguments:
        _hash (bytes32) = hash of the document to be checked (SHA3 keccak-256)
    */
    function checkProof(bytes32 _hash) public view  returns (bool) {
        return book[_hash].sender == address(0x0);
    }

    /*
    Gets metadata associated to a proof
    Returns a ProofMetadata.
    Arguments:
        _hash (bytes32) = hash of the document (SHA3 keccak-256)
    */
    function getMetadata(bytes32 _hash) public view returns (bytes32 hash, address sender){
        if (checkProof(_hash)) return;
        sender = book[_hash].sender;
        return (_hash, sender);
    }

}
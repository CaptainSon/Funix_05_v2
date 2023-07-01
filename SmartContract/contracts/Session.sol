//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./Main.sol";
import "./SessionDetail.sol";

contract Session {
    string productName;
    string productDescription;
    string[] productImages;
    address[] participantJoinSession;
    address public admin;
    uint public proposePrice;
    uint public finalPrice;
    uint multi = 10 ** 18;
    mapping(address => uint) public priceVoteByParticipant;
    Main MainContract;

    //enum State { CREATE,VOTTING, CLOSING,CLOSED }
    State state;

    event Vote(address account, uint numberVote);
    event CaclculatePropose(uint numberPropose);
    event CloseSession(uint priceFinal);
    event StateChange(string State);

    constructor(
        string memory _productName,
        string memory _productDescription,
        string[] memory _productImages,
        address _mainContract,
        address _admin
    ) {
        productName = _productName;
        productDescription = _productDescription;
        productImages = _productImages;
        MainContract = Main(_mainContract);
        admin = _admin;
        state = State.CREATE;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Session: not is admin");
        _;
    }

    modifier onlyMain() {
        require(
            msg.sender == address(MainContract),
            "Session: not is Main Constract"
        );
        _;
    }

    modifier onlyRegitsted(address _address) {
        require(
            MainContract.getParticipantAccount(_address) != address(0x0),
            "Session: Not registered"
        );
        _;
    }

    modifier onlyState(State _state) {
        require(
            _state == state,
            "Session: the operation is not valid in the state "
        );
        _;
    }

    function checkJoinSession(address _account) private view returns (bool) {
        for (uint i = 0; i < participantJoinSession.length; i++) {
            if (participantJoinSession[i] == _account) {
                return true;
            }
        }
        return false;
    }

    function alowVotingState() public onlyAdmin onlyState(State.CREATE) {
        state = State.VOTTING;
        emit StateChange("Votting");
    }

    function getState() public view returns (State) {
        return state;
    }

    function vote(
        uint _price
    ) public onlyRegitsted(msg.sender) onlyState(State.VOTTING) {
        if (checkJoinSession(msg.sender)) {
            priceVoteByParticipant[msg.sender] = _price;
        } else {
            participantJoinSession.push(msg.sender);
            priceVoteByParticipant[msg.sender] = _price;
        }
        emit Vote(msg.sender, _price);
    }

    function caclculatePropose()
        public
        onlyAdmin
        onlyState(State.VOTTING)
    {
        uint numerator = 0;
        uint sumDeviation = 0;
        for (uint i = 0; i < participantJoinSession.length; i += 1) {
            address addPaticipant = participantJoinSession[i];
            uint deviPaticipant = MainContract.getDeviationParticipant(
                addPaticipant
            );
            numerator +=
                priceVoteByParticipant[addPaticipant] *
                (100 * multi - deviPaticipant);

            sumDeviation += deviPaticipant;
        }

        proposePrice = numerator /(100 * multi * participantJoinSession.length - sumDeviation);

        state = State.CLOSING;
        emit StateChange("Closing");
        emit CaclculatePropose(proposePrice);
    }

    function calculateDeviation(uint256 _finalPrice) public onlyAdmin onlyState(State.CLOSING) {
        finalPrice = _finalPrice;
        for (uint i = 0; i < participantJoinSession.length; i += 1) {
            address addPaticipant = participantJoinSession[i];
            uint deviPaticipant = MainContract.getDeviationParticipant(
                addPaticipant
            );
            uint numberOfJoinedSession = MainContract.getNumberOfJoinedSession(
                addPaticipant
            );
            uint deviant;

            if (finalPrice >= priceVoteByParticipant[addPaticipant]) {
                deviant = finalPrice - priceVoteByParticipant[addPaticipant];
            } else {
                deviant = priceVoteByParticipant[addPaticipant] - finalPrice;
            }

            uint _dnew = (deviant * 100 * multi) / finalPrice;

            uint deviationForParticipan = (deviPaticipant *
                numberOfJoinedSession +
                _dnew) / (numberOfJoinedSession + 1);

            MainContract.updateDeviationForParticipant(
                addPaticipant,
                deviationForParticipan,
                numberOfJoinedSession + 1
            );
        }
        state = State.CLOSED;
        emit StateChange("CLOSED");
        emit CloseSession(finalPrice);
    }
}

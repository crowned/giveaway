pragma solidity ^0.4.24;

import "./helper_contracts/zeppelin/Ownable.sol";
import "./helper_contracts/vechain/builtin.sol";

/** VeChain Giveaway Smart Contract.*/
contract Giveaway is Ownable {
    using Builtin for Giveaway;

    struct Receipt {
        uint amount;
    }

    uint private numSpots;
    uint private availSpots;
    uint private spotCost;
    uint private generatedAmount;
    uint private counter;
    bool private status;

    address[] public winners;
    address[] public playerAddresses;

    // mapping to have counter to address value.
    mapping (uint => address) internal players;

    // mapping to have address to Receipt struct
    mapping (address => Receipt) internal receipts;

    // Event which will be emmitted once winner is found.
    event Winner(address winner, uint ownerFee, uint payoutToWinner, uint totalPayout);

    // Event which will be emmitted once a spot is reserved;
    event SpotReserved(address player);

    // Event which will be emmitted once all spots are reserved;
    event AllSpotsReserved(uint spots);

    /** function getGiveawayStatus returns current status of giveaway
     */
    function getGiveawayStatus() public view returns(uint, uint, uint, bool) {
        return (numSpots, availSpots, spotCost, status);
    }

    function getEnergy() public view returns(uint) {
        return this.$energy(block.number);
    }

    function getWinners() public view returns(address[]) {
        return winners;
    }

    function getPlayers() public view returns(address[]) {
        return playerAddresses;
    }

    /** startGiveaway function inititates the giveaway with #spots and cost.
      * @param spots - no of max spots
      * @param cost - cost of the spot.
     */
    function startGiveaway(uint spots, uint cost) public payable onlyOwner {
        if ((spots <= 1) || (cost == 0) || (msg.value < cost)) {
            revert("startGiveaway error");
        }
        address manager = owner();
        numSpots = spots;
        spotCost = cost;
        availSpots = numSpots - 1;
        players[++counter] = manager;
        // increase the generatedAmount
        generatedAmount += msg.value;
        // set the status to True
        status = true;
        playerAddresses.push(manager);
        receipts[msg.sender] = Receipt(msg.value);
    }

    /** function hasPlayed checks if msg.sender has reserved a spot 
      * @return reserved - if msg.sender has reserved a spot
     */
    function hasReserved() internal view returns(bool) {
        bool played;

        /** use uint in an array as var can only hold 255 elements
          * and the playerAddresses array may contain more than 255
         */
        for (uint i = 0; i < playerAddresses.length; i++) {
            if (msg.sender != playerAddresses[i]) {
                played = false;
            } else {
                played = true;
            }
        }

        return played;
    }

    /** function returnFunds returns funds to user
      * when all spots are reserved.
     */
    function returnFunds() public payable {
        for (uint i = 0; i < playerAddresses.length; i++) {
            address player = playerAddresses[i];
            player.transfer(receipts[player].amount);
        }
    }

    /** function reserveSpot allows user to reserve spots
     */
    function reserveSpot() public payable {
        // revert in case user already has bought a reserved a spot OR,
        // value sent is less than the spot cost OR,
        // status is false.
        if (hasReserved() || (msg.value < spotCost) || (!status) || (availSpots == 0)) {
            revert("reserveSpot error");
        }

        availSpots = availSpots - 1;
        players[++counter] = msg.sender;
        generatedAmount += msg.value;
        playerAddresses.push(msg.sender);
        receipts[msg.sender] = Receipt(msg.value);

        emit SpotReserved(msg.sender);

        if (availSpots == 0) {
            emit AllSpotsReserved(availSpots);
        }
    }

    /** endGiveaway function which would be called only by Owner.
     */
    function endGiveaway() public onlyOwner {
        (
            availSpots == 0,
            "more spots available"
        );

        resetGiveaway();
    }

    /** calculatePayout function.
      * this calls getEnergy function and
      * and takes a creates a 10% owner fee from energy
      * @return (ownerFee, payoutToWinner) - payouts to owner and winner
     */
    function calculatePayout() internal view returns(uint, uint, uint) {
        uint totalPayout = getEnergy(); 
        uint ownerFee = totalPayout / 10;
        uint payoutToWinner = totalPayout - ownerFee;

        return (ownerFee, payoutToWinner, totalPayout);
    }

    /** getWinner getter function. 
      * this calls getRandomNumber function and
      * finds the winner using players mapping
     */
    function getWinner() internal {
        uint winnerIndex = getRandomNumber();
        address winnerAddress = players[winnerIndex];
        address manager = owner();
        (uint ownerFee, uint payoutToWinner, uint totalPayout) = calculatePayout();

        emit Winner(winnerAddress, ownerFee, payoutToWinner, totalPayout);

        returnFunds();
        winners.push(winnerAddress);
        this.$moveEnergyTo(manager, ownerFee);
        this.$moveEnergyTo(winnerAddress, payoutToWinner);
    }

    /** getRandomNumber function, which finds the random number using counter.
     */
    function getRandomNumber() internal view returns(uint) {
        uint random = uint(blockhash(block.number - 1)) % counter + 1;
        return random;
    }

    /** resetGiveaway function resets giveaway and find the Winner.
     */
    function resetGiveaway() internal {
        status = false;
        getWinner();
        generatedAmount = 0;
        numSpots = 0;
        availSpots = 0;
        spotCost = 0;
        counter = 0;
        delete playerAddresses;
    }
}

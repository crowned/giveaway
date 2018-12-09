pragma solidity ^0.4.24;

import "./helper_contracts/zeppelin/Ownable.sol";
import "./helper_contracts/vechain/energy.sol";

/** VeChain Giveaway Smart Contract.*/
contract Giveaway is Ownable {
    Energy energy = Energy(0x0000000000000000000000000000456E65726779);

    struct Payout {
        uint ownerFee;
        uint totalPayout;
        uint payoutToWinner;
    }

    uint public counter;
    uint public numSpots;
    uint public spotCost;
    bool public canReserve;
    uint public availSpots;
    uint public generatedVET;
    bool public giveawayStatus;

    address[] public winners;
    address[] public playerAddresses;

    // mapping to have counter to address value.
    mapping (uint => address) internal players;

    // mapping to have address to Receipt struct
    mapping (address => uint) internal receipts;

    // Event which will be emmitted once a spot is reserved;
    event SpotReserved(address player);

    // Event which will be emmitted once all spots are reserved;
    event AllSpotsReserved(uint spots);

    // Event which will be emmitted once winner is found.
    event Winner(address winner, uint ownerFee, uint payoutToWinner, uint totalPayout);

    /** function getGiveawayStatus returns current status of giveaway
     */
    function getGiveawayStatus() public view returns(uint, uint, uint, bool, bool) {
        return (numSpots, availSpots, spotCost, canReserve, giveawayStatus);
    }

    function getEnergy() public view returns(uint) {
        return energy.balanceOf(this);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
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
        require((spots > 0) || (cost > 0) || (msg.value >= cost), "cannot start giveaway");

        address manager = owner();
        numSpots = spots;
        spotCost = cost;
        availSpots = numSpots - 1;

        // players is used to get winner
        players[++counter] = manager;

        // increase the generatedVET
        generatedVET += msg.value;

        // set the reservation status
        canReserve = true;

        // set the giveaway status
        giveawayStatus = true;


        // used to get list of current players
        playerAddresses.push(manager);

        receipts[manager] = msg.value;
    }

    /** function returnFunds withdraws given amount */
    function withdraw() public payable {
        require(giveawayStatus == false, "cannot withdraw while giveaway is running");

        uint amount = receipts[msg.sender];

        receipts[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    // fallback incase msg sender does not return funds
    function withdrawByAddress(address player) public payable onlyOwner {
        require(giveawayStatus == false, "cannot withdraw while giveaway is running");
        uint amount = receipts[player];

        receipts[player] = 0;
        msg.sender.transfer(amount);
    }

    /** function hasPlayed checks if msg.sender has reserved a spot 
      * @return reserved - if msg.sender has reserved a spot
     */
    function hasNotReserved(address player) internal view returns(bool) {
        uint amount = receipts[player];
        return amount == 0;
    }

    /** function reserveSpot allows user to reserve spots
     */
    function reserveSpot() public payable {
        bool hasntReserved = hasNotReserved(msg.sender);
        // require player to not have already reserved a spot OR,
        // value sent is greater or equal to spotCost OR,
        // canReserve is true OR,
        // there are available spots
        require((hasntReserved) && (msg.value >= spotCost) && (canReserve) && (availSpots > 0), "cannot reserve spot");

        availSpots = availSpots - 1;
        players[++counter] = msg.sender;
        generatedVET += msg.value;
        playerAddresses.push(msg.sender);

        receipts[msg.sender] = msg.value;

        emit SpotReserved(msg.sender);

        if (availSpots == 0) {
            canReserve = false;
            emit AllSpotsReserved(availSpots);
        }
    }

    /** endGiveaway function which would be called only by Owner.
     */
    function endGiveaway() public onlyOwner {
        resetGiveaway();
    }

    /** calculatePayout function.
      * this calls getEnergy function and
      * and takes a creates a 10% owner fee from energy
      * @return (ownerFee, payoutToWinner) - payouts to owner and winner
     */
    function calculatePayout() internal view returns(Payout payout) {
        uint totalPayout = getEnergy();

        payout = Payout({
            totalPayout: totalPayout,
            ownerFee: totalPayout / 10,
            payoutToWinner: totalPayout - (totalPayout / 10)
        });

        return payout;
    }

    /** getWinner getter function. 
      * this calls getRandomNumber function and
      * finds the winner using players mapping
     */
    function getWinner() internal {
        uint winnerIndex = getRandomNumber();
        address winnerAddress = players[winnerIndex];
        address manager = owner();

        Payout memory payout = calculatePayout();

        winners.push(winnerAddress);
        energy.transfer(manager, payout.ownerFee);
        energy.transfer(winnerAddress, payout.payoutToWinner);

        emit Winner(winnerAddress, payout.ownerFee, payout.payoutToWinner, payout.totalPayout);
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
        giveawayStatus = false;
        getWinner();
        generatedVET = 0;
        numSpots = 0;
        availSpots = 0;
        spotCost = 0;
        counter = 0;
        delete playerAddresses;
    }
}

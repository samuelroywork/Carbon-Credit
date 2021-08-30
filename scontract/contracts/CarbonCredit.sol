// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "./ERC20.sol";
import "./Roles.sol";

contract CarbonCredit is ERC20("Carbon Credit", "CR") {
    address admin;

    address[] public userList;
    uint public userListCOunt = 0;

    mapping(address => address[]) public componentList;
    mapping(address => address[]) public carList;

    event SystemLog(address indexed EventTriggeredBy, string EventAction, uint TokenConsumption);

    using Roles for Roles.Role;

    Roles.Role mangers;

    struct component {
        address maker;
        string componentName;
        uint quantity;
        uint tokenConsumed;
    }

    struct car {
        address maker;
        string carModel;
        uint tokenConsumed;
        address[] componetList;
    }

    struct user {
        string userName;
        string userLocation;
        string userType;
    }

    mapping (address => user) public userDetails;

    mapping (address => component) public componentDetails;
    mapping (address => car) public carDetails;
    
    constructor(uint initialSupplyAmpunt) {
        admin = msg.sender;
        mangers.add(msg.sender);
        _mint(msg.sender, initialSupplyAmpunt);
        _mint(address(this), initialSupplyAmpunt/2);
        userDetails[msg.sender] = user("Manager", "London", "Admin");
    }

    modifier onlyAuthorized() {
        require(mangers.has(msg.sender),"Not an authorized Person");
        _;
    }

    function depositeEther() onlyAuthorized payable public { emit SystemLog(msg.sender, "Ether Deposited to COntract", 0); }

    function withdrawEther(uint amount) onlyAuthorized public {
        msg.sender.transfer(amount * 1 ether);
        emit SystemLog(msg.sender, "Ether withdrawn from contract", 0);
    }

    function issueCC(uint amount) onlyAuthorized public {
        _mint(msg.sender, amount);
        emit SystemLog(msg.sender, "Carbon Credits Issued", amount);
    }

    function depositeCC(uint amount) onlyAuthorized public {
        transfer(address(this), amount);
        emit SystemLog(msg.sender, "Carbon Credit deposited to contract", amount);
    }

    function getCC() payable public {
        _transfer(address(this), msg.sender, (msg.value)/(10**10));
        emit SystemLog(msg.sender, "Bought Carbon Credit", (msg.value)/(10**10));
    }

    function givebackCC(uint amount) public {
        transfer(address(this), amount);
        msg.sender.transfer(amount * 10**8);
        emit SystemLog(msg.sender, "Returned Carbon Credit", amount);
    }

    function removeUser(address did) onlyAuthorized public {
        userDetails[did].userType = "Banned";
        emit SystemLog(msg.sender, "Removed User", 0);
    }

    function addManger(address _MangerAddress) public onlyAuthorized  {
        mangers.add(_MangerAddress);
        emit SystemLog(msg.sender, "Authorized Manager", 0);
        userDetails[_MangerAddress] = user("Manager", "London", "Admin");
    }

    function removeManger(address _MangerAddress) public onlyAuthorized {
        mangers.remove(_MangerAddress);
        userDetails[_MangerAddress].userType = "Banned";
        emit SystemLog(msg.sender, "Removed Manager Authorization", 0);
    }

    function newUser(address _did, string memory _userName, string memory _userLocation, string memory _userType) public {
        userDetails[_did] = user(_userName, _userLocation, _userType);
        userList.push(_did);
        userListCOunt += 1;
        emit SystemLog(msg.sender, "New User", 0);
    }   

    function initialSupply( address[] memory initialSupplyAddressList, uint listCount,uint initialSupplyAmpunt) public onlyAuthorized {
        require(msg.sender.balance > listCount * initialSupplyAmpunt);
        for(uint i = 0; i < listCount; i++) {
            transfer(initialSupplyAddressList[i], initialSupplyAmpunt);
        }
        emit SystemLog(msg.sender, "Initial Supply", listCount * initialSupplyAmpunt);
    }

    function getComponentList(address userDID) view public returns(address[] memory) {
        return componentList[userDID];
    }

    function produceComponet(address componetID, string memory componentName, uint quantity, uint tokenConsumed) public {
        componentDetails[componetID] = component(msg.sender, componentName, quantity, tokenConsumed);
        transfer(admin, tokenConsumed);
        componentList[msg.sender].push(componetID);
        emit SystemLog(msg.sender, "New Component Produced", tokenConsumed);
    }

    function sendToOEM(address userDID,address componetID) public {
        componentList[userDID].push(componetID);
        componentDetails[componetID].quantity -= 1;
        emit SystemLog(msg.sender, "Transferred to OEM", 0);
    }

    function getCarList(address userDID) view public returns(address[] memory) {
        return carList[userDID];
    }

    function getCarDetails(address carDID) public view returns(address, string memory, uint, address[] memory) {
        return(carDetails[carDID].maker, carDetails[carDID].carModel, carDetails[carDID].tokenConsumed, carDetails[carDID].componetList);
    } 

    function assembleCar(address componetID, string memory carModel, uint tokenConsumed, address[] memory componetList) public {
        carDetails[componetID] = car(msg.sender, carModel, tokenConsumed, componetList);
        for(uint i = 0; i < componetList.length; i++) {
            componentDetails[componetList[i]].quantity -= 1;
        }
        transfer(admin, tokenConsumed);
        carList[msg.sender].push(componetID);
        emit SystemLog(msg.sender, "Car Assembled", tokenConsumed);
    }    
}
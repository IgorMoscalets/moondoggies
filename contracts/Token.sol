pragma solidity 0.8.10;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC721, Ownable{

	struct MoonDog {
		uint8 attack; // 0-255
		uint8 adorable;
		uint8 health;
		uint8 stamina;

	}

	uint256 nextId = 0;
	mapping( uint256 => MoonDog) private _tokenDetails;

	constructor(string memory name, string memory symbol) ERC721(name, symbol){

	}

	function getAllTokensForUser(address user) public view returns(uint256[] memory){
		uint256 tokenCount = balanceOf(user);
		if(tokenCount == 0){
			return new uint256[](0);
		}
		else{
			uint[] memory result = new uint256[](tokenCount);
			uint256 totalDogs = nextId;
			uint256 resultIndex = 0;
			uint256 i;
			for(i = 0; i < totalDogs; i++){
				if(ownerOf(i) == user){
					result[resultIndex] = i;
					resultIndex++;
				}
			}
			return result;
		}
	}

	function getTokenDetails(uint256 tokenId) public view returns (MoonDog memory){
		return _tokenDetails[tokenId];
	}
	function mint(uint8 attack, uint8 adorable, uint8 health, uint8 stamina) public onlyOwner{
		_safeMint(msg.sender, nextId);
		_tokenDetails[nextId] = MoonDog(attack, adorable, health, stamina);
		nextId++;
	}


}
import fetch from "node-fetch";

let bannedUsers: number = 0;
let notBannedUsers: number = 0;

let startUserId = 1;
let endUserId = 1000;

let promises: Promise<null>[] = [];

let main = async () => {
	for (let index = startUserId; index <= endUserId; index++) {
		promises.push(new Promise(async (resolve, reject) => {
			let url = `https://roblox.com/users/${index}/profile`;
			let response = await fetch(url);
	
			if (response.status === 404) {
				bannedUsers++;
				console.log(`User id ${index} [BANNED FOREVER]`);
			} else if (response.status === 200) {
				notBannedUsers++;
				console.log(`User id ${index} [NOT BANNED]`);
			}

			resolve();
		}));
	}
	
	Promise.all(promises).then(() => {
		console.log(`\nStart user id: ${startUserId}\nEnd user id: ${endUserId}\n\nBanned users: ${bannedUsers}\nNot banned users: ${notBannedUsers}\n(${(bannedUsers / notBannedUsers * notBannedUsers).toFixed(2)}% banned)`);
	});
}

main();

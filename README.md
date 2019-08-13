# Daehria

## About
Discord Bot written for fun in Javascript using discord.js.

## Usage
* Install the node packages.
* Create a config.json file in the root of the project.
* Fill it with the following structure.

## Config
```json
{
    "token": "bot-token",
    "league": {
        "token": "league-api-token",
        "region": "euw1"
    },
    "prefix": "!",    
    "github": "https://github.com/Cornayy/Daehria",
    "channels": ["bot", "example-channel"],
    "presence": {
        "game": {
            "name": "!help for commands",
            "type": 1, 
            "url": "https://www.twitch.tv/cornayy"
        }
    },
    "paths": {
        "commands": "./src/commands",
        "events": "./src/events"
    }
}
```
There is a reference to all available "Game Activity Types" at the links section.

**NOTE:** Be careful not to leave your bot token online, so always exclude the config.json file from github.

## League of Legends API
To fully support the !getmatch command, add the following emotes to your Discord server:

* :challenger:
* :grandmaster:
* :master:
* :diamond:
* :platinum:
* :gold:
* :silver:
* :bronze:
* :iron:
* :unranked:

## Links

[Discord.js](https://discord.js.org)

[Activity Types](https://discord.js.org/#/docs/main/stable/typedef/ActivityType)

## TODO

- [x] Set League region (e.g. !setregion EUW1)
- [ ] Convert config.json to .env

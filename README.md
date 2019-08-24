# Daehria

## About
A Discord bot written for fun in Javascript using Discord.js & Node.js.

## Usage
* Install the node packages.
* Create a config.json and a .env file in the root of the project.
* Fill it with the following structures.

## Config
```json
{
    "league": {
        "region": "euw1"
    },
    "prefix": "!",    
    "github": "https://github.com/Cornayy/Daehria",
    "channels": ["bot", "example-channel", "member-log"],
    "presence": {
        "game": {
            "name": "!help for commands",
            "type": 1, 
            "url": "https://www.twitch.tv/cornay"
        }
    },
    "paths": {
        "commands": "./src/commands",
        "events": "./src/events"
    }
}
```
## .env

```
BOT_TOKEN=token
LEAGUE_TOKEN=token
```

There is a reference to all available "Game Activity Types" at the links section.

**NOTE:** Be careful not to leave your bot token online, so always exclude the .env file from github.

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
- [ ] Create a database and store data, make sure it works on every server.

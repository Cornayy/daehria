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
    "token": "token",
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

## Links

[Discord.js](https://discord.js.org)

[Activity Types](https://discord.js.org/#/docs/main/stable/typedef/ActivityType)

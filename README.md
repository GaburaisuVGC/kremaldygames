# Kremaldy Games

Kremaldy Games is a bot allowing you to collect and trade with characters (created according to the preferences of those close to the developer).

## About images (Very important)
You have to add an "images" folder inside the "src" folder.

You need to add 3 folders inside your "images" folder :

"card" and "perso"

An image MUST be a .png and MUST be named after the "image" field of the card/character concerned. (In your MongoDB database)

For example, in MongoDB, the "image" field of your character is 45g8rezg1r9eg5

Your image must be named 45g8rezg1r9eg5.png and be placed in src/images/perso.

## About editing cooldown

It's in src/events/cooldownReset.js

The cooldown will still be global and not individual.

Please check the cron repository in order to fully understand how to change the cooldown reset. (https://github.com/kelektiv/node-cron)
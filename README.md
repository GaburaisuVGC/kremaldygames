# Kremaldy Games

## Work in progress.

(Treasure system is not finished yet.)

## About images (Very important)
You have to add an "images" folder inside the "src" folder.

You need to add 3 folders inside your "images" folder :

"card", "perso" and "tresor"

An image MUST be a .png and MUST be named after the "image" field of the card/character/treasure concerned. (In your MongoDB database)

For example, in MongoDB, the "image" field of your character is 45g8rezg1r9eg5

Your image must be named 45g8rezg1r9eg5.png and be placed in src/images/perso.

## About editing rarity, cooldown

#### Rarity

It's in src/commands/Rolls/roll.js

Edit the const rarity.

- The total must be 100 (or 1000, 10000, etc. if you change the number of zeros in const rnd (you have to do it 2 times in the roll.js file !) )

#### Cooldown

It's in src/events/cooldownReset.js

The cooldown will still be global and not individual.

Please check the cron repository in order to fully understand how to change the cooldown reset. (https://github.com/kelektiv/node-cron)
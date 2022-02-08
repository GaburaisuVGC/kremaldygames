TO-DO LIST
```diff
+ = Terminé
- = Pas commencé
! = En cours
# = A prévoir
```
```diff

+ (EN DERNIER) Rendre le bot global. (Problème avec le handleCommands.js qui nécessite un GuildId, actuellement celui du serveur KremaldyGamestest. Quand le bot est mis sur un autre serveur, les commandes ne fonctionnent pas.)
+ Balance :
+ Commandes :
+   - balancetop
+ Equilibrage :
+   - taxe roll de -100
+ Roll :
+ Equilibrage :
+   - Equilibrer les probas de rareté
+ Trésor :
+   Commandes :
+       -view trésors (laisser le nombre de trésors dans /balance user)
+       -sell trésors <tresor.title> (donnent des freerolls)
+   BDD :
+       -ajouter image (icone si possible)
+ Personnages :
+   BDD :
+       -créer carte personnage (titre, image, valeur de base, unique: true, belongsToSomeone: Boolean, master: <member.id>)
+   Code :
+       -un certain personnage doit être obtenu selon une certaine carte
+       -la carte peut-être tirée à nouveau mais offrira une compensation si (belongsToSomeone du personnage == true)
+   Commandes :
+       -buy <personnage.name> <monnaie>
+       -onsale <personnage.name>
+       -setvalue (modifie la valeur du personnage, seulement possible par celui qui possède le perso)
+       -view personnage <personnage.name>
+       -view personnages <user.username> (pour voir les personnages d'une personne)
+       -marketplace (avec pagination, liste tous les personnages (avec leur valeur : prix de vente minimum) dont leur onSale === 1) 
+ Cartes:
+   BDD/Code:
+       -possibilité d'ajouter une image au Embed, possibilité qu'il n'y en ait pas si on met pas d'image dans la carte
+       -cooldown d'une heure par roll
+       -possibilité d'ajouter des freerolls qui bypass le cooldown, obtenables en revendant des trésors
```
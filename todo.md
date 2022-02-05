TO-DO LIST
```diff
+ = Terminé
- = Pas commencé
! = En cours
# = A prévoir
```
```diff
+ Balance :
+ Commandes :
+   - balancetop
+ Equilibrage :
+   - taxe roll de -100
- Roll :
- Equilibrage :
-   - Equilibrer les probas de rareté
- Trésor :
-   Commandes :
-       -view trésors (laisser le nombre de trésors dans /balance user)
-       -sell trésors <tresor.title> <roll/money> (donnent des freerolls ou de l'argent)
+   BDD :
+       -ajouter image (icone si possible)
-   Code :
-       -Gérer le fait d'avoir x fois le même trésor (le meilleur exemple : les Pokémon dans les rolls $p de Mudae)
! Personnages :
+   BDD :
+       -créer carte personnage (titre, image, valeur de base, unique: true, belongsToSomeone: Boolean, master: <member.id>)
+   Code :
+       -un certain personnage doit être obtenu selon une certaine carte
+       -la carte peut-être tirée à nouveau mais offrira une compensation si (belongsToSomeone du personnage == true)
-   Commandes :
-       -buy <personnage.title> <monnaie> (envoie une demande d'achat à l'utilisateur, mettre un timer pour attendre sa réponse, si le personnage n'a pas de maitre, achète le personnage immédiatement avec sa valeur de base)
-       -acceptbuy (transfert argent et personnage, seulement possible par celui qui possède le perso)
-       -refusebuy (refuse le transfert, seulement possible par celui qui possède le perso)
-       -setvalue (modifie la valeur du personnage, seulement possible par celui qui possède le perso)
-       -view personnage <personnage.title>
-       -view personnages <user.username> (pour voir les personnages d'une personne)
- Cartes:
-   BDD/Code:
-       -possibilité d'ajouter une image au Embed, possibilité qu'il n'y en ait pas si on met pas d'image dans la carte
-       -cooldown d'une heure par roll
-       -possibilité d'ajouter des freerolls qui bypass le cooldown, obtenables en revendant des trésors
```
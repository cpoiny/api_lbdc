DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS post_author CASCADE;
DROP TABLE IF EXISTS post_media CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;

CREATE TABLE "user"  (
  id SERIAL PRIMARY KEY,
  pseudo VARCHAR(50) NOT NULL ,
  email VARCHAR(255) not null,
  password VARCHAR(50) NOT NULL ,
  role INT not NULL
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL ,
  content text not null,
  picture VARCHAR(255) not null,
  publicated_at DATE not null,
  updated_at DATE null,
  is_Draft Boolean,
  quantity_comments INT null,
  quantity_likes INT null,
  user_id INT not null,
  constraint fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE author (
  id SERIAL PRIMARY KEY,
  name_author VARCHAR(255) NOT NULL ,
  description TEXT not null,
  picture VARCHAR(255) null,
  created_at DATE not null,
  updated_at DATE null
);


CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL ,
  category VARCHAR(50) not null,
  theme VARCHAR(50) not null,
  created_at DATE not null,
  updated_at DATE null,
  edition VARCHAR(50) not NULL,
  author_id INT not null,
  constraint fk_author FOREIGN KEY (author_id) REFERENCES author (id)
);

CREATE TABLE comment  (
  id SERIAL PRIMARY key,
  comment TEXT NOT NULL,
  created_at DATE not NULL,
  updated_at DATE null,
  user_id INT NOT NULL ,
  post_id INT NOT NULL,
  constraint fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
  constraint fk_post FOREIGN KEY (post_id) REFERENCES post (id)
);

CREATE TABLE likes (
   user_id INT NOT NULL ,
   post_id INT NOT NULL,  
   PRIMARY KEY (user_id , post_id),
   CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
   CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post (id)
);

CREATE TABLE post_author (
   post_id INT NOT NULL ,
   author_id INT NOT NULL,  
   PRIMARY KEY (post_id , author_id),
   CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post (id),
   CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author (id)
);

CREATE TABLE post_media (
   post_id INT NOT NULL ,
   media_id INT NOT NULL,  
   PRIMARY KEY (post_id , media_id),
   CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post (id),
   CONSTRAINT fk_media FOREIGN KEY (media_id) REFERENCES media (id)
);

CREATE TABLE wishlist (
   user_id INT NOT NULL ,
   media_id INT NOT NULL,  
   PRIMARY KEY (user_id , media_id),
   CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
   CONSTRAINT fk_media FOREIGN KEY (media_id) REFERENCES media (id)
);

insert into AUTHOR (id, name, description, picture) values
    (1,'Amanda STHERS','Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Amanda-Sthers.jpg'),
    (	2,
         'Gianfranco CALLIGARICH',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Gianfranco-CALLIGARICH.png'
    ),
    (
    	3,
         'Henri DE MONFREID ',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Henry-de-Monfreid.jpg'
    ),
    (	4,
         'Boris VIAN',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Boris-Vian.png'        
    ),
    (
    5,
         'Francis Scott FITZGERALD',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/F-Scott-Fitzgerald.jpg'         
    ),
    (
    6,
         'Romain GARY',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Romain-Gary.jpg'         
    ),
    (
    7,
         'Jack KEROUAC',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Jack-Kerouac.jpg'         
    ),
    (
    8,
         'Chuck PALAHNUIK',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Chuck-Palahnuik.png'         
    ),
    (
    9,
         'Samir BOUTAMDJA',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Samir-Boutambja.jpg'         
    ),
    (
    10,
         'Arthur RIMBAUD',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Arthur-Rimbaud.PNG'         
    ),
    (
    11,
         'Marguerite DURAS',
         'Lorem Ipsum tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. \n Ut enim ad minima veniam, quis',
         'assets/img/auteur/Marguerite-Duras.jpg'         
    );

insert into "user" (id, pseudo, email, password, role) values (1, 'cyril', 'cyril@test.com', 'cyril123', 'admin');

insert into post (id, title, content, picture, publicated_at,is_draft,quantity_comments , quantity_likes , userId) values 
( 1,
        'Le café suspendu',
        'Le café comme vecteur de partage et de solidarité dans toute sa complexité, avec amertume et force.\n\nAmanda Sthers rend hommage à cette tradition napolitaine qui est celle du ''café sospeso'' (payer deux cafés, un pour vous et un autre pour un client démuni qui en fera la demande).\n\n Elle nous présente Jacques Madelin, français ayant emménagé en Italie par amour pour une femme, et y étant resté par amour pour la ville de Naples et ses habitants si hauts en couleurs.\n\nCe dernier nous raconte son histoire ayant pour cadre principal le café Nube qu''il fréquente assidûment et au dessus duquel il vit.\n\n Il y passe le plus clair de son temps libre et y observe ces gens, ceux qui consomment les cafés, ceux qui jouent le jeu du café sospeso, et ceux qui en bénéficient. C''est leurs histoires qu''il nous raconte, sept histoires plus précisément, sous forme de nouvelles qu''il extirpe de ses carnets pleins de notes prises au fil du temps.\n\n Pour connaître Naples moi même, je trouve qu''Amanda Sthers retranscrit avec brio cette ambiance si particulière qui y règne. \n\n Une atmosphère électrique, propre à ces villes qui semblent être au bord de l''explosion, mêlée à cette énergie si typiquement méditerranéenne qui inquiète le touriste autant qu''elle le dépayse, et qui rassure l''habitant qui lui, sait l''apprivoiser, sait en tirer la substantifique moelle.\n\n Une lecture comparable à une tasse café, consommé seul ou partagé. Des histoires dans une histoire. C''est plein d''humanité, de générosité et de poésie et ça donne une très belle vision de cette sublime ville qu''est Naples 🇮🇹. \n\n À lire! ',
        'assets/img/le_cafe_suspendu.png',
        '2022-06-18',
        false,
        1
    ),
   (2,
       'Le dernier été en ville',
       'Je me suis d''abord arrêté sur ce livre pour la couverture qui me rappelait les films de Fellini. Puis, la 4eme de couverture m''a rappelé Martin Eden, moi il ne m''en faut pas plus. \n\n🇮🇹\n\n Rome, ville d''été, ville ouverte à l''amour, à l''errance et à la mélancolie. Roman paru pour la 1ere fois en Italie en 1973 qui s''offre aujourd''hui une deuxième vie avec 17 traductions dont celle en français. \n\n Ce roman est un drôle de récit initiatique sans grandes épreuves, sans apprentissage brutal. C''est l''histoire de la vie simple de la solitude, de la vie tout simplement et plus particulièrement celle de Léo, héros sans panache milanais débarqué à Rome.\n\n Alors pourquoi ce livre a t il traversé les générations sous le manteau avant de s''offrir une deuxième vie? \n\n Tout simplement parce qu''il est réel, concret. Tout ce qui est écrit ici respire une réalité vécue. L ''auteur le dit lui même ''Je ne sais écrire que ce que j''ai vécu.'' Et ça se sent.\n\n Calligarich nous offre un roman générationnel, celui de ceux qui ont eu 20 ans dans la Rome des années 60, mais aussi un roman sincère et honnête, très actuel finalement, propre à l''identification de plusieurs générations après lui qui se retrouvent dans son style et dans son histoire.\n\n Léo déambule dans la ville, tombe follement amoureux d''Ariana, mais aussi de Rome. À la manière de Marcello dans la Dolce Vita, Léo, héros très cinématographique, est happé par cette ville qui le prend et ne le laisse plus partir. \n\n Troisième personnage principal du livre (ou 1er selon les points de vue), Rome est sublimée à la manière d''un film de Fellini. ''Ville idéale pour qui vit entre fiction et imaginaire'' disait ce dernier, Calligarich continue dans ce ton et lui donne les couleurs d''une ville maternelle, qui prend soin de ses enfants tout en faisant preuve de cette indifférence cruelle à leur égard, mais propre à leur accomplissement. \n\n Hommage vibrant à Rome et aux années 60, hommage à la vie simple et à l''initiation par le quotidien, Galligarich nous offre ici un roman d''un style sublime et d''une très grande beauté qui intègre le panthéon de mes classiques. ',
       'assets/img/dernier_ete_en_ville.png',
       '2022-05-01',
       true,
       1
   ),
   (3,
       'Vivre libre',
       'Pour ceux qui ne connaissent pas cet homme extraordinaire, Henry de Monfreid est un commerçant, aventurier et écrivain français.\n\n Tantôt marchand de café ou de perles, tantôt passeur de hachich en Égypte ou marchand d''armes à Harar, de Monfreid a vécu sa vie en préférant fuir et s''affranchir de la monotonie d''un système trop établi pour lui, choisissant l''évasion et la liberté au prix d''une vie faîte d''adversité qu''il disait aimer aussi fort que les moments de bonheur. \n\n Une existence des plus romanesques ''dans un sillage très rimbaldien'' comme le précise @arnauddelagrange dans sa très belle préface des éditions Points. \n\n De Monfreid décrit dans son œuvre sa vie aventureuse sur fond de mer Rouge et d''Éthiopie (globalement vers la corne de l''Afrique), du début du siècle XX jusqu''à la seconde guerre mondiale. \n\n Au cours cette existence très riche en expériences, il rencontre l''immense Joseph Kessel avec qui il se lie d''amitié, et qui le pousse à publier ses notes précieusement consignées dans ses carnets intimes. \n\n ''Vivre libre'' est l''un de ces trésors dans lequel on découvre à travers le questionnaire de ''Proust'', des interviews ou encore des lettres ou des notes, la personnalité de cet homme hors du commun et des fragments plus ou moins intimes de sa vie. \n\n Une lecture qui insuffle liberté et poésie, qui dépayse, qui nous rappelle que le confort et la sécurité sont les meilleurs moyens de se plier à la contrainte et d''étouffer nos élans. Un souffle d''héroïsme et d''aventure à mettre entre toutes les mains. \n\n ''J''aime la vie parce que je sais trouver des joies dans une infinité de choses que jusqu''ici je n''avais pas su voir ; mais pour les voir il faut être un peu loin de cette agitation qui assourdit, de ce clinquant qui aveugle, de cette gadoue qui suffoque.''',
       'assets/img/vivre_libre.png',
       '2021-07-27',
       false,
       1
   ),
   (4,
       'L''ecume des jours',
       '"L''écume des jours" de Boris Vian est un roman surréaliste et existentialiste réputé pour son langage poétique et créatif. \n\n Le monde de ''L''écume des jours'' est une sorte de monde imaginaire dans lequel les couleurs vont bon train, le piano distribue des cocktails, les souris de cuisine dansent au son des rayons du soleil et l''air est composé de jazz. \n\n Dans ce monde surréaliste, où les animaux et les objets inanimés reflètent les émotions des humains, nous suivons l''histoire de Colin, jeune aristocrate hédoniste, dont la vie et l''enthousiasme s''assombrissent progressivement lorsque sa femme attrape une maladie qui ne peut être guérie qu''avec des fleurs.\n\n À partir ce moment-là, sa vie et celle de son entourage basculeront. \n\n L''écume des jours c''est la poésie, le jazz et l''amour réunis. Avec ce style d''écriture onirique qui lui ai propre, Vian vous conduit dans un rêve éveillé. \n\n Oubliez un peu d''être sceptiques, acceptez d''entrer dans cet univers fantastique hors série que vous propose l''auteur, dans lequel règnent l''absurde et la fantaisie, et vous serez enchantés. \n\n Un roman véritablement poignant, qui ne laisse pas indemne. \n\n Terminons sur cette magnifique citation tirée de l''avant propos: \n\n ''Dans la vie, l''essentiel est de porter sur tout un jugement a priori. Il apparaît, en effet, que les masses ont tort, et les individus toujours raison.'' \n\n 🎺',
       'assets/img/ecume_des_jours.png',
       '2020-09-30',
       false,
       1
   ),
   (5,
       'Tendre est la nuit',
       'La Côte d''Azur du milieu des années 1920 est le nouveau terrain de jeu des riches américains, parmi lesquels l''élégante héritière Nicole Warren et son mari, l''ambitieux psychiatre Dick Diver. Leur hospitalité attire les célébrités et les mondains dans leur villa.\n\n Tout va pour le mieux, jusqu''au jour où une starlette du nom de Rosemary Hoyt, emblème de la ''génération perdue'', débarque dans le décor. \n\n Naïve et inexpérimentée, Rosemary tombe follement amoureuse de Dick (c''est réciproque au passage) et déclenche le déclin d''une relation déjà déstabilisée par un sombre secret et minée par des illusions destructrices. \n\n Sa présence fait remonter à la surface les secrets passés du mariage. \n\n Dick était en réalité le psychiatre de Nicole, et leur union d''amour passée fait aujourd''hui place à une union de contrainte. \n\n Tendre est la nuit est l''histoire d''une liaison illicite mais c''est aussi et surtout l''histoire de l''auteur lui-même. \n\n Dans ce bouquin, Fitzgerald a versé toutes les inspirations qu''il a pu trouver pour concocter ce qui sera l''œuvre de sa vie. Elle est la plus autobiographique de ses œuvres et reflète plusieurs aspects de sa vie personnelle, en particulier sa relation orageuse et destructice avec sa femme, Zelda. \n\n L’un des aspects les plus subtils et les plus interessants du livre est la vision que Fitzgerald porte sur la moralité. \n\n Il y dépeint avec une grande désinvolture le côté peu glamour de la haute société, articulée autour des affaires conjugales. \n\n Il y met également en évidence des problématiques inhérentes à la relation patient-médecin, l''hypocrisie, la toxicomanie, et en particulier l''alcoolisme. \n\n En ce qui concerne le style, Fitzgerald brille, bien que difficile à lire par moment. Son écriture correspond à son époque mais son intemporalité rend ses œuvres immortelles. \n\nAu passage, je trouve le titre absolument magnifique. À lire',
       'assets/img/tendre_est_la_nuit.png',
       '2020-09-17',
       false,
       1
   ),
   (5,
       'La vie devant soi',
       'Lecture commune avec @valsemelancolie\n\n Pour ceux qui n''ont pas encore lu ce petit bijou, en voici un résumé :\n\n Le roman raconte l''histoire d''un jeune garçon musulman, Mohamed dit ''Momo'', grandissant dans un quartier d''immigrants à Paris Belleville. Il vit sous la tutelle de madame Rosa, vieille femme juive mourante, ancienne prostituée et survivante de l''Holocauste dans « une pension sans famille pour les gosses qui sont nés de travers ». \n\n Momo raconte ici son quotidien vu aux travers du regard de l''enfance. Évoluant au milieu des prostituées et des proxénètes, son ordinaire étant teinté de peur de la mort et de la vieillesse confronté à la pureté de l''enfance, Momo nous décrit ce monde terrifiant de manière complètement décontractée. \n\n La vie devant soi est un roman grave et décalé, drôle et très sérieux à la fois, mais c''est surtout un roman qui permet de voir jaillir l''espoir au milieu du désespoir grâce à l''amour que porte un jeune homme à celle qu''il considère comme sa mère, et qu''il accompagnera jusqu''à la fin. \n\n Il nous rappelle que chacun d''entre nous, peu importe son origine, son statut, son âge, est capable de transcender son quotidien grâce à l''amour et à l''espérance. \n\n C''est un roman magnifique, bouleversant et déstabilisant qui m''a vraiment beaucoup touché. \n\n Gary, enfin, Ajar, situe son roman à Paris, mais pas dans le Paris des films romantiques. Il montre ici le côté obscur de Paris, un endroit déprimant et sordide duquel jaillira pourtant une magnifique histoire d''amour. \n\n Original et profond, La vie devant soi offre à Romain Gary son deuxième Goncourt en 1975. Tour de force incroyable, quand on sait que le Goncourt ne peut être attribué qu''une seule fois... \n\n Bref, un bouquin absolument magnifique que je conseille à tout le monde.',
       'assets/img/la_vie_devant_soi.png',
       '2020-12-13',
       false,
       1
   ),
   (7,
       'Sur la route',
       'Aujourd''hui je voulais redonner de la visibilité à l''une de mes toutes premières chroniques sur cette page, celle de ''Sur la route''.\n\n Ce bouquin fait partie de ceux qui me suivent partout tout le temps, et son auteur est une source d''inspiration inconditionnelle, ce genre de source d''inspiration qui nous aide à conduire une vie. \n\n Sur la route c''est le livre de la vie libre, la seule qui vaille le coup. Livre clef de la Beat Génération, c''est le récit des errances de l''auteur, barroudeur passionné de jazz et de bebop, sillonnant les routes américaines. \n\n Voyageant en stop, logeant chez qui l''accepte, partageant femmes et alcool avec des amis d''un jour, Kerouac alias Sal Paradise, s''abandonne à la loi du hasard, à la recherche d''une fraternité réelle. Ici rien d''autre n''est plus important que le présent immédiat qui, grâce à l''insouciance, nous procure des jouissances infinies. \n\n Ce livre est le compte rendu de cette quête, avec ses moments d''euphorie, mais aussi ses passages à vide et ses échecs. Un manuel imparfait qui nous guide dans notre manière de grandir. \n\n Je conseille à tout le monde de le lire, plusieurs fois, en entier, par passage. Je suis persuadé que chacun d''entre nous peut y trouver des réponses.\n\n Le bonheur est dans le mouvement, le voyage c''est la liberté et la liberté c''est la vie 🌍 ',
       'assets/img/sur_la_route.png',
       '2021-01-09',
       false,
       1
   ),
   (8,
       'Fight club',
       'Autant que ce soit dit tout de suite, dans ce roman anti conformiste publié en 1996, l''auteur ne cherche pas à faire quelque chose de beau. Il est à la recherche d''une vérité. \n\n Comme le dit Tyler Durden: '' Attirer l''attention de Dieu en étant mauvais vaut mieux que de ne pas attirer son attention du tout. Sa haine est préférable à son indifférence.'' Le ton est donné !\n\n Fight Club c''est l''histoire d''un type sans nom, banal, cadre moyen, américain moyen, qui se plonge dans la violence dans le but d''évacuer sa haine de la société, ainsi que sa frustration profonde (il a un petit côté Taxi Driver oui). L''examen non critique de la violence et de ses répercussions devient lui-même une célébration, une esthétique et une idéologie. \n\n La rencontre du personnage principal avecTyler Durden, aux antipodes de sa personnalité, va lui permettre de révéler ce qu''il cache au plus profond de lui. \n\n Métaphore lucide et jubilatoire d''un monde au bord du chaos, perdu faute de révolution, ce roman est un OVNI littéraire qui ne laisse personne indifférent. \n\n Si le style ultra minimaliste peut dérouter, l''intrigue cumule néanmoins tous les ingrédients nécessaires pour créer une histoire explosive. \n\n Indéniablement une œuvre de son temps, cette critique sociale demande cependant une certaine attention si l''on ne veut rien en rater. \n\n Si je peux me permettre d''ajouter un petit bémol le voici: l''histoire nous guide complètement en nous imposant des opinions ''libératrices'' et ne nous laisse aucune marge de perspicacité. De plus, si à première vue ce roman est un pamphlet anti consumériste, il semble tout de même que Palahnuik ne soit pas dupe. En effet, les américains moyens censés trouver la liberté dans l''autodestruction se rassemblent finalement autour d''un guide, Tyler, auquel ils finissent par obéir aveuglément, au mépris de leurs propres libertés individuelles. \n\n Au final, le bouquin et le film sont comme les combats qu''ils decrivent. Après les avoir lus et vus, rien ne sera règlé, rien n''ira mieux, mais plus rien n''aura d''importance 🥊',
       'assets/img/fight_club.png',
       '2021-02-08',
       false,
       1
   ),
   (9,
       'Les yeux noirs existent',
       'Wahou. \n\n Quand j’avais lu Saccharose, son premier roman, je m’étais déjà dit que @confiseur.sama était un auteur à suivre. Mais alors là… \n\n « Le rapport entre le grand et le petit est égal au rapport entre le grand et le tout ». Voilà son fil rouge. \n\n Dans ce livre, Samir nous raconte l’histoire d’un auteur en passe de recevoir un prix littéraire. Mais au moment de déballer les remerciements traditionnels au parterre d’officiels présents dans la salle, il décide de leur lire une lettre qui dévoile une partie de son histoire. Tout commence là. Tout finit là. \n\n A grand coup d’analepse, le lecteur n’a plus qu’à se laisser guider par les mots de l’auteur qui l’emmèneront cheminer entre rêves et réalité lors d’une ballade aux parfums orientaux passant par la tragédie grecque, par les textes sacrés, les légendes aztèques ou encore Citizen Kane. \n\n En serpentant dans ce jardin d’Eden, le lecteur y rencontrera le diable dans ses plus belles et terrifiantes manifestations. \n\n On ne sait d’ailleurs plus bien qui nous guide: le narrateur, Samir, ou simplement la musique de ses mots? \n\n Peu importe, c’est délicieux. \n\n Et pour avoir lu et relu son premier livre, je peux vous garantir qu’ici vous retrouverez son style si singulier, cette façon de se concentrer sur les sensations physiques de ses personnages qui permet au lecteur de se sentir totalement immergé à l’intérieur de l’histoire. \n\n Samir est un dynamiteur fou. Il met l’accent sur les mots et fait sauter les phrases et leur syntaxe. Et c’est ça qu’on aime chez lui, cette liberté, cette insolence poétique et toute maîtrisée. \n\n L’écriture est dépourvue de tout superflu, de tout ce qui ralentit le rythme. Le ton est sec, innovant et précis. Tout est pesé et ça se sent. \n\n Et comme dans sa première réalisation, ses personnages développent des digressions philosophiques, mystiques, des théories étranges et complexes mais toujours pertinentes et poétiques, avec pour poncif la beauté, le sexe, l’amour, la morale et le Sacré.\n\n Bref, je crois que vous avez compris, ce livre est une bombe. \n\n Samir ne t’arrête surtout pas d’écrire frérot 👁‍🗨',
       'assets/img/les_yeux_noirs_existent.png',
       '2022-12-29',
       false,
       1
   ),
   (10,
       'La constellation',
       'En 2021, à l’occasion des 130 ans de la mort du poète, les éditions Grasset publiaient « La constellation Rimbaud » par Jean Rouaud. \n\n Le bouquin est une sorte d’enquête, ayant pour but de percer les mystères entourant celui qui est, paradoxalement, l’un des poètes français les plus connus, mais aussi l’un des plus secrets et mystérieux. \n\n Jean Rouad y dissèque la vie du poète en menant ses investigations dans des lieux qu’il a fréquentés, ainsi qu’en s’intéressant à des personnes que ce dernier a croisées. \n\n De Verlaine à Fantin Latour,de Paris à Londres en passant par Charleville, Harar ou encore les Indes, Rouaud analyse chaque miette de ce qui reste de sa mémoire et décortique les vestiges des traces laissées par le génie turbulent. \n\n L’occasion de rappeler que Rimbaud, enfant précoce et furtif, a créé son oeuvre entre ses 16 ans et ses 20 ans, âge auquel il quitte l’Europe à la recherche d’une reconnexion avec ce qu’il appelle lui même « la rugueuse réalité » de laquelle la poésie et l’absynhte l’avaient éloigné. \n\n Si la vie artistique de l’auteur est plutôt bien documentée et connue, Rouaud lève ici le voile sur une partie plus obsucre de sa personnalité. En consacrant un chapitre à son père par exemple, il nous éclaire sur l’amour d’Arthur pour l’Orient et pour la mer, lui qui n’avait jamais quitté l’Europe occidentale avant ses 20 ans. \n\n Si vous aussi êtes fascinés par le mythe Rimbaud et que vous êtes en quête de réponses, foncez en librairie (indépendante) et procurez vous ce petit trésor qui vous éclairera sans nul doute sur les parties les plus confidentielles de la vie du poète. \n\n Je termine par cette phrase prononcée par l’un de ses anciens professeurs: \n\n « Intelligent tant que vous voudrez, mais il a des yeux et un sourire qui ne me plaisent pas. Il finira mal. En tout cas rien de banal ne germera dans cette tête: ce sera le génie du bien ou du mal. » \n\n Bonne lecture !',
       'assets/img/la_constellation.png',
       '2023-05-01',
       false,
       1
   ),
   (11,
       'L''amant',
       'Comment appelle-t-on l’inverse d’une désillusion littéraire ? Un coup de foudre ? Alors j’ai eu un coup de foudre.\n\n La Duras comme on l’appelle elle donne tout quand elle écrit. Elle se positionne « en dehors d’elle même ». \n\n Dans mes souvenirs de lycéen planait sur ce livre une ombre de feel good, de romance fleur bleue. Grand bien m’a pris de l’ouvrir à nouveau presque 20 ans plus tard. \n\n L’Amant, tout le monde le sait, raconte de manière autobiographique une histoire d’amour entre une jeune française et un jeune homme chinois de 12 ans de plus qu’elle. Et ça finalement c’est la partie la moins intéressante du livre. C’est le vecteur. Le vecteur que Duras utilise pour s’explorer, explorer celle qu’elle a été, ressasser des souvenirs, entre fantasmes et réalités. \n\n Elle décortique le rapport filial qu’elle eut avec sa mère, le rapport avec ses frères, avec l’Indochine française d’après guerre, le Mékong, Cholen et ceux qu’elle a pu y croiser. Au fil de la lecture se dessine de manière prématurée le profil de cette femme clivante, écorchée vive et engagée qu’elle deviendra plus tard. \n\n L’amant c’est un tableau sur lequel on peut y voir des paysages et des sentiments. \n\n C’est parfois violent, ça interroge, ça secoue, et c’est sublime. Goncourt 84 quand même. \n\n Bref, gros coup de foudre pour cette femme qui s’introspecte et se livre sans faille. \n\n En route pour le Barrage maintenant 🇻🇳',
       'assets/img/l-amant.png',
       '2022-11-28',
       true,
       1
   );

insert into media (title, category, theme, created_at, edition, author_id) values
    (
        'Le café suspendu',
        'book',
        'classique',
        '2022-06-18',
        'Editions Grasset',
        1
    ),
   
    (
        'Le café suspendu',
        'book',
        'classique',
        '2022-06-18',
        'Editions Grasset',
        1
    ),
    (
        'Le dernier été en ville',
        'book',
        'classique',
        '2022-05-01',
        ' Editions Gallimard',
        2
    ),
    (
        'Vivre libre',
        'book',
        'Aventure',
        '2021-07-27',
        'Editions Points',
        3
    ),
    (
        'L''ecume des jours',
        'book',
        'classique',
        '2020-09-30',
        'Editions 1018',
       4
    ),
    (
        'Tendre est la nuit',
        'book',
        'classique',
        '2020-09-17',
        'Livre de poche',
        5
    ),
    (
        'La vie devant soi',
        'book',
        'classique',
        '2020-12-13',
        'Editions Folio',
        6
    ),
    (
        'Sur la route',
        'book',
        'classique',
        '2021-01-09',
        'Editions Folio',
        7
    ),
    (
        'Fight club',
        'book',
        'classique',
        '2021-02-08',
        'Editions Folio',
        8
    ),
    (
        'Les yeux noirs existent',
        'book',
        'classique',
        '2022-12-29',
        'Edition libre',
        9
    ),
    (
        'La constellation',
        'book',
        'poesie',
        '2023-05-01',
        'Editions Grasset',
        10
    ),
    (
        'L''amant',
        'book',
        'classique',
        '2022-11-28',
        'Editions de minuit',
        11
    ),
    (
        'Test',
        'movie',
        'action',
        '2022-11-28',
        'movie film',
        11
    );


   
   
   
       





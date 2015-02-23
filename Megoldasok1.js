// Feladatok: Szintaxis alapok, adattípusok, függvények, 33. oldal

//////// MATEK ////////////

// 1. Összeadás
/*
	A függvényben kapott 3 értéket add össze, és a függvény térjen vissza ezzel az értékkel.
*/
function(a,b,c){
	return a+b+c; // eleg trivialis :)
}


// 2. Bitbabra
/*
Adott az inputban 4 egész szám: a,b,c,d. Melyik két szám bitenkénti kizáró vagy kapcsolatából született meg az e szám az inputon? Adja vissza e két szám összegét a függvény.
*/
// plusz órai tudás: a bitenkénti kizáró vagy operátor a :  ^ , és ez gyengébb mint az egyenlőség, ezért zárójelezni kell
function(a,b,c,d,e){
	// ezt megcsináljuk minden párosra
	if((a^b)==e) return a+b;

	if((a^c)==e) return a+c;
	if((a^d)==e) return a+d;
	if((b^c)==e) return c+b;
	if((b^d)==e) return d+b;
	if((c^d)==e) return c+d;
}


// 3. Átlag
/*
	Given arguments a,b,c,d (all numbers), return their average.
*/

function(a,b,c,d){
	return (a+b+c+d)/4; // trivialis
}


//4.  LNKO
/*
	Greatest common denominator: Find the greatest common denominator (LNKO) of the given numbers a and b and return it.
*/
// plusz tudás: megcsináltam példaképp a diasorban valahol
function(a,b){
	// euklideszi algoritmus: mindig a nagyobbikból kivonjuk a kisebbiket. Ha egyenlőek akkor az már a közös osztó

  // ha nem egyenlőek
  while(a!=b){
  	// ha esetleg a kisebb mint b, akkor cseréljük meg őket
    if (a<b){
      var c = a;
      a = b; 
      b = c;
    }
    // ekkorra már a biztos nagyobb mint b, tehát vonjuk ki belőle b-t
    a-=b;
  }
  // ide akkor jutunk már, ha egyenlő volt a és b (a while addig nem enged ki amíg ez nem lesz igaz)
  // a végén adjuk vissza a LNKO-t
  return a;
}


//5. Másodfokú
/*
	Given the quadratic formula's three coefficients (a,b,c). Return an array containing the roots of the equation in a descending order. [Quadratic: a*x2+bx+c=0]
*/
// plusz tudás: négyzetre emelni lehet így : a*a, hiszen önmagával összeszorzod, vagy így: Math.pow(a,2), tehát a-t a második hatványra
// gyököt lehet vonni így: Math.pow(a,0.5), tehát feledik hatványra emelem, vagy így: Math.sqrt(a) 
function(a,b,c){
	// diszkrimináns
	var diszkriminans = b*b-4*a*c;
	if (diszkriminans>0){
		var diszkriminansGyoke = Math.sqrt(diszkriminans);
		var x1 = (-b+diszkriminansGyoke)/(2*a); // egyik megoldás. Figyeljünk a zárójelezésre!
		var x2 = (-b-diszkriminansGyoke)/(2*a); // másik gyök

		return [x1,x2]; // visszaadjuk egy tömbben, ahogy kérték
	} else {
		// nincs valós megoldás
		return null;
	}
}

// 6. Minimax
/**
 * Use the "arguments" variable to determine the minimum and the maximum of the give numbers for the input. Return them in an array.
 **/

// Arguments formában kapunk változó mennyiségű argumentumot
function() {
    // Kezdjük olyan értékekről a minimumot és a maximumot, hogy biztos le legyenek cserélve.
    var min = Infinity,
        max = -Infinity;
    // Egy ciklussal nézzük meg az összes számot
    for (var i = 0; i < arguments.length; i++) {
    	// Ha az aktuális szám kisebb mint a minimum, ő az új minimum
        if (arguments[i] < min) min = arguments[i];
        // Ha az aktuális szám nagyobb mint a maximum, ő lesz az új max
        if (arguments[i] > max) max = arguments[i];
    }
    // adjuk vissza őket egy tömbben
    return [min, max];
}

// 6. Minimax - High level functionality megoldás
// plusz tudás: a Math objektum rendelkezik min és max függvényekkel
// plusz tudás: a függvények .apply() függvénye második paraméterként tömbként várja az argumentumokat
function(){
	// Ez kiszedi a minimumot
	var min = Math.min.apply(null,arguments);
	// Ez kiszedi a maximumot
	var max = Math.max.apply(null,arguments);
	// Visszaadjuk egy tömbben
	return [min, max];
}

// 7. Fibonacci - szép megódás
/**
 * Given an array of numbers on the input (N), return an array of N[i]th fibonacci numbers. E.g.: Input [1,3,5] -> output [1,3,8]
 **/
// nem kell plusz tudás a map használatán kívül
function(N) {
    // Csináljunk egy függvényt, ami visszaadja az n. fibonacci számot
    var fib = function(n) {
    	// ha ez 0 vagy 1, akkor adjon vissza 1-et
        if (n <= 1) return 1;
        // különben rekurzívan számítsa ki az értékét
        else return fib(n - 1) + fib(n - 2);
    }
    // transzformáljuk az N értékeit egy .map() függvénnyel, és a transzformáció a fibonacci függvény
    return N.map(fib);
}


///////// STRINGEK /////////////

// 0. Próbafeladat
/*
Concatenate the given strings str1, and str2 and return their result.
*/
// plusz tudás: stringeket összefűzni a + operátorral lehet
function(str1, str2){
	return str1+str2; // trivialis
}


// 1. Bötűszámlálás
/*
	Given a string s on the input. Count all ocurrences of the character 'x' or 'X' and return it.
*/
// plusz tudás: Stringben betűt úgy érünk el, mint tömbben elemet. Tehát: var s = "jancsi";    s[1] értéke ekkor 'a'
// plusz tudás: stringek hosszát a .length tulajdonságán keresztül érjük el
function(s){
	var szamlalo=0;
	for(var i=0;i<s.length; i++){
		if (s[i]=='x' || s[i]=="X") szamlalo++;
	}
	return szamlalo;
}

// Trükkös megoldás 1.
// Plusz tudás: stringeken van egy függvény, a .replace(mit,mire) függvény, ami a 'mit' előfordulásokat a 'mire' kifejezésre cseréli. Ez kezel reguláris kifejezéseket is
function(s){
	var regKif = /[^xX]/g ; // ez a reguláris kifejezés megtalál minden NEM x vagy NEM X karaktert, vagy jelet.
	var csakXx = s.replace(regKif, ""); // ezeket kicserélve ""-re, csak az x és X marad, és ezt a stringet visszamentem egy másik változóba
	return csakXx.length; // ennek a hossza a megoldás
}

// Trükkös megoldás 2.
// plusz tudás: .toLowerCase() függvény a stringeken értelmezett, és mindent kisbetűs megfelelővé változtat
// plusz tudás: .split(mivel) függvény a 'mivel' kifejzés mentén darabol fel egy szöveget, és a daraboltat egy tömbként adja vissza
function(s){
	var kicsis =  s.toLowerCase(); // eztán már csak kisbetűk lesznek benne
	var reszek = kicsis.split("x"); // felosztjuk minden 'x' mentén

	// Ekkor pont eggyel több rész lesz, mint ahány 'x' volt benne, ezért a tömb hosszánál eggyel kevesebbet adunk vissza
	return reszek.length-1;
}



// 3. Számul
/*
	Given the string s on the input, find and replace all ocurrences of the names of the english digits (one, two, three, etc.) to their numeric format (one=1,two=2). Return the number represented in the string.
*/
// plusz tudás: Object.keys(obj) az "obj" objektum kulcsait adja vissza egy tombben
// plusz tudás: RegExp példány konstruálható a következőképp: new RegExp(kifejezesString,extrak), és az extrák közt a 'g' karakter megadása után az összes előfordulásra matchel
function(s){
	// csinálunk egy objektumot, amiben minden szöveges név mögött a szám lesz
	var obj = {
		"one":1, // mindegy hogy a kulcshoz teszünk-e idézőjelet,
		two:2,    //	 										 vagy sem
		three:3,
		four:4,
		five:5,
		six:6,
		"seven":7,
		"eight":8,
		nine:9,
		zero:0
	}
	// Az előző objektum kulcsait elkérjük egy tömbbe
	var szamnevek = Object.keys(obj);
	// bejarjuk a tombot, es minden elofordulasaval csinálunk egy regexpet
	for(var i=0;i<szamnevek.length;i++){
		var regExp = new RegExp(szamnevek[i],"g"); // ezzel ilyen regExp jön létre pl.: /one/g - ami a one összes előfordulására matchel

		s = s.replace(regExp, obj[szamnevek[i]]); // minden számnevet kicserélünk a neki megfelelő értékre az objektumból.
	}

	return s;
}


// 3. Visszafelé, nem favágó megoldás
/*
	Given the string s on the input. Return it reversed. Yeah, simple as that.
*/
// plusz tudás: stringeken a .split("") üres stringgel paraméterezve a szöveget betűnként felosztja, és a betűket egy tömbben visszaadja
// plusz tudás: tömbökön a .reverse() függvény megfordítja a tömb sorrendjét
// plusz tudás: tömbökön a .join("") függvény, üres stringgel hívva összecsapja a tömb elemeit egy darab stringgé.
function(s){
	// Nem töketlenkedünk. Felosztjuk, megfordítjuk, összecsapjuk, és vissza is adjuk.
	return s.split("").reverse().join("");
}


// 4. Rapper life
/*
Given a string 'lyrics' on the input.
 This string is a part of a 'songs' lyrics.
 Find and return the all rhyming word pairs in an array or arrays.
 Please only consider full rhymes (ie: the words reduced to vowels are the same, one word considered each).
*/
// plusz tudás: .replace, .split, és a reguláris kifejezések használata
function(lyrics){
	// függvények változók, tehát csinálhatunk bent egy saját függvényt a magánhangzóalak előállítására
	var csakMaganhangzok = function(bemenet){
		var kimenet = bemenet.replace(/[^aáiíeéoóöőuúüűAÁEÉIíÜŰOÓÖŐUÚ]/g,""); // kicserélünk minden NEM-MAGÁNHANGZÓT semmire
		return kimenet;
	}

	var szavak = lyrics.split(" "); // Szóközönként felosztjuk, ezek lesznek a szavak
	var rimparok = [];  // csinálunk egy gyűjtőt a szópároknak

	// összevarázslunk egy ciklust a ciklusban, hogy páronként be tudjuk járni a szavakat
	// ha ezt nem érted, kérdezz rá órán.
	for(var i=0;i<szavak.length-1;i++){
		for(var j=i+1;j<szavak.length; j++){
			var elsoSzoMaganhangzoi = csakMaganhangzok(szavak[i]);
			var masodikSzoMaganhangzoi = csakMaganhangzok(szavak[j]);

			if (elsoSzoMaganhangzoi==masodikSzoMaganhangzoi){ // ha a hangalak megegyezik
				// akkor belenyomunk belőlük egy helyben készült, frissen sült tömböt a rímpárok közé
				rimparok.push([szavak[i],szavak[j]]);
			}
		}
	}
	// végül visszaadjuk a rímpárokat
	return rimparok;
}

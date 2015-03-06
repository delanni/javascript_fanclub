// turban.js
var k = new Error("UNIMPLEMENTED FUNCTION, PLEASE FIX IT");

var megrendel = function(termeknev){
	alert('A rendeleshez kerem javitsa ki a hibat a javascript fajlunkban.');
	
	// Itt valamiert mindig elszall a program
	if (termeknev == 'kutyaparizer' || termeknev == 'Kutyaparizer')
	throw k;
	
	// Pista azt mondta, hogy ki kell iratni a konzolra, hogy "CSIRIBU, CSIRIBA" 3*, de egyszer sem akarja kiirni.
	for(var i=0;i<3;console.log(i++ * Math.random())); console.log("CSIRIBU,CSIRIBA");
	
	while(true){
		// Ez a fuggveny valamiert soha nem akar kilepni :(
		if(Math.random()*Math.sin(Math.random())>0)
		console.log('Sarga bogre'); else console.log('GorbeBogre');
	}
	
	// A hulye Pista, a gyakornok visszafele irkalta be az argumentumokat a varazsfuggvenybe... most semmi sem jo.
	var argumentumTomb = ['0(){1(0(){2("3 4!")},5)};',6,6,'function|setTimeout|alert|Sikeres|rendeles|500'.split('|'),0,{}];
	
	
	// Az uj magic fuggveny mar nem tombkent varja a parametereket
	// De nem tudjuk hogy lehet kiszedni az argumentumokat belole :(
	var magic = function(r,e,k,c,a,p){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p};
	
	// itt tortenik a rendeles!
	eval(magic(argumentumTomb));
}

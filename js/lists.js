/////////////////////////////////////////
//Time List
/////////////////////////////////////////
//Monday To Thursday
const monToThur = [
	"5:00 pm",
	"5:30 pm",
	"6:00 pm",
	"6:30 pm",
	"7:00 pm",
	"7:30 pm",
	"8:00 pm",
	"8:30 pm",
	"9:00 pm",
	"9:30 pm",
	"10:00 pm"
	]

//Friday To Saturday
const friToSat = [
	"12:00 pm",
	"12:30 pm",
	"1:00 pm",
	"1:30 pm",
	"2:00 pm",
	"2:30 pm",
	"3:00 pm",
	"3:30 pm",
	"4:00 pm",
	"4:30 pm",
	"5:00 pm",
	"5:30 pm",
	"6:00 pm",
	"6:30 pm",
	"7:00 pm",
	"7:30 pm",
	"8:00 pm",
	"8:30 pm",
	"9:00 pm",
	"9:30 pm",
	"10:00 pm"
]

//Sunday
const sun = [
	"10:00 am",
	"10:30 am",
	"11:00 am",
	"11:30 am",
	"12:00 pm",
	"12:30 pm",
	"1:00 pm",
	"1:30 pm",
	"2:00 pm",
	"2:30 pm",
	"3:00 pm",
	"3:30 pm",
	"4:00 pm",
	"4:30 pm",
	"5:00 pm",
	"5:30 pm",
	"6:00 pm",
	"6:30 pm",
	"7:00 pm",
	"7:30 pm",
	"8:00 pm",
	"8:30 pm",
	"9:00 pm",
	"9:30 pm",
	"10:00 pm"
]



/////////////////////////////////////////
//Menu List
/////////////////////////////////////////
//Snacks and Salads
const snacksAndSalads = [
	{
		name: "Primavera Salad",
		ingredents: "arugula, cherry tomato, shaved almonds, shallot vinaigrette",
		price: "$8"
	}, {
		name: "Grilled Calamari",
		ingredents: "tomato sauce, lemon",
		price: "$12"
	}, {
		name: "Mac and Cheese",
		ingredents: "cheddar.gruyere, gouda, truffle oil",
		price: "$13"
	}
]

//Sandwhiches
const sandwhiches = [
	{
		name: "Alpine",
		ingredents: "fontina, gruyere, truffle oil on multigrain toast",
		price: "$10"
	}, {
		name: "Milanese",
		ingredents: "fried chicken, lettuce, tomato, mayo on focaccia",
		price: "$13"
	}, {
		name: "Flatiron",
		ingredents: "steak, havarti, fried onions, chipotle mayo on challah",
		price: "$15"
	}, {
		name: "Raleigh",
		ingredents: "coleslaw, barbecue sauce, pickles on sesame roll",
		price: "$13"
	}, {
		name: "Reuben",
		ingredents: "pastrami, coleslaw, russian dressing on rye",
		price: "$15"
	}, {
		name: "Classic",
		ingredents: "ham, unmelted cheddar, mayo on kaiser roll",
		price: "$15"
	}
]

//Mains
const mains = [
	{
		name: "Lobster Bolognese",
		ingredents: "linguini, lobster tail, herbs in tomato & garlic broth",
		price: "$28"
	}, {
		name: "Braised Lamb",
		ingredents: "jasmine rice pilaf, roasted almonds, sesame soy reduction",
		price: "$25"
	}, {
		name: "Burger",
		ingredents: "gruyere, fried onions, special sauce on challah roll",
		price: "$15"
	}, {
		name: "Dry-Aged Rib-Eye",
		ingredents: "grass-fed, with arugula salad, smashed potatoes",
		price: "36"
	}, {
		name: "Salmon Steak",
		ingredents: "quinoa, roasted carrots, mustard Lemon glaze",
		price: "$28"
	}
]



/////////////////////////////////////////
//Drinks List
/////////////////////////////////////////
//Cocktails
const cocktails = [
	{
		name: "Manhattan",
		ingredents: "black rum, ginger beer, lime",
		price: "$11"
	}, {
		name: "Dark & Stormy",
		ingredents: "tomato sauce, lemon",
		price: "$9"
	}, {
		name: "Old Cuban",
		ingredents: "aged rum, lime juice, bitters, champagne",
		price: "$11"
	}, {
		name: "Negroni",
		ingredents: "gin, vermouth rosso, campari",
		price: "$11"
	}, {
		name: "Bloody Mary",
		ingredents: "tomato juice, vodka, tabasco, bacon bits",
		price: "$9"
	}, {
		name: "Green & Amber",
		ingredents: "vodka, single-malt scotch, honey, lemon, green tea",
		price: "$12"
	}, {
		name: "White Russian",
		ingredents: "vodka, tia maria, heavy cream",
		price: "$9"
	}
]

//Wine
const wine = [
	{
		name: "Sauvignon Blanc",
		ingredents: "cloudy bay, new zealand, 2012",
		price: "$18"
	}, {
		name: "Pinot Grigio",
		ingredents: "corte della torre, veneto, 2012",
		price: "$13"
	}, {
		name: "Chardonnay",
		ingredents: "gavilan, monterey, 2012",
		price: "$13"
	}, {
		name: "Pinot Noir",
		ingredents: "heron, napa, 2011",
		price: "$14"
	}, {
		name: "Cabernet Sauvignon",
		ingredents: "slingshot, napa, 2010",
		price: "$12"
	}, {
		name: "Pianrosso",
		ingredents: "brunello di montacino, toscana, 2003",
		price: "$22"
	}, {
		name: "Prosecco",
		ingredents: "bortolotti, brut, veneto, 2010",
		price: "$14"
	}
]

//Beer
const beer = [
	{
		name: "Lagunitas",
		ingredents: "ipa, california",
		price: "$7"
	}, {
		name: "21st Amendment",
		ingredents: "back in black ipa, san francisco",
		price: "$8"
	}, {
		name: "Breakside",
		ingredents: "wanderlust ipa, oregon",
		price: "$8"
	}, {
		name: "Hill Farmstead",
		ingredents: "edward apa, vermont",
		price: "$11"
	}, {
		name: "Alchemist",
		ingredents: "heady topper, vermont",
		price: "$15"
	}, {
		name: "Hofbräu",
		ingredents: "dunkel, munich",
		price: "$8"
	}, {
		name: "Delirium Tremens",
		ingredents: "golden ale, belgium",
		price: "$12"
	}
]
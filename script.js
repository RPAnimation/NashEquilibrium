var a11; var a12; var b11; var b12; var c11; var c12;
var a21; var a22; var b21; var b22; var c21; var c22;
var a31; var a32; var b31; var b32; var c31; var c32;

function getNumbers() {
	a11 = parseInt(document.getElementById("a11").value);
	a12 = parseInt(document.getElementById("a12").value);
	a21 = parseInt(document.getElementById("a21").value);
	a22 = parseInt(document.getElementById("a22").value);
	a31 = parseInt(document.getElementById("a31").value);
	a32 = parseInt(document.getElementById("a32").value);
	
	b11 = parseInt(document.getElementById("b11").value);
	b12 = parseInt(document.getElementById("b12").value);
	b21 = parseInt(document.getElementById("b21").value);
	b22 = parseInt(document.getElementById("b22").value);
	b31 = parseInt(document.getElementById("b31").value);
	b32 = parseInt(document.getElementById("b32").value);
	
	c11 = parseInt(document.getElementById("c11").value);
	c12 = parseInt(document.getElementById("c12").value);
	c21 = parseInt(document.getElementById("c21").value);
	c22 = parseInt(document.getElementById("c22").value);
	c31 = parseInt(document.getElementById("c31").value);
	c32 = parseInt(document.getElementById("c32").value);
	
	if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22) || isNaN(a31) || isNaN(a32) ||
			isNaN(b11) || isNaN(b12) || isNaN(b21) || isNaN(b22) || isNaN(b31) || isNaN(b32) ||
			isNaN(c11) || isNaN(c12) || isNaN(c21) || isNaN(c22) || isNaN(c31) || isNaN(c32)) {
		document.getElementById("error").innerHTML = "Enter correct numbers!";
		return false;
	} else {
		document.getElementById("error").innerHTML = "";
	}
	return true;
}
function resetStyle() {
	for (var row = 0; row < 3; ++row) {
			for (var col = 0; col < 3; ++col) {
				document.getElementById(row.toString() + col.toString()).style.backgroundColor = "white";
			}
	}
}
function highlight(row, col) {
	document.getElementById(row.toString() + col.toString()).style.backgroundColor = "red";
}

function solve() {
	var string_response = "";
	resetStyle();
	if (getNumbers()) {
		var M = [
			[[a11, a12], [b11, b12], [c11, c12]],
			[[a21, a22], [b21, b22], [c21, c22]],
			[[a31, a32], [b31, b32], [c31, c32]]
		]
		var Label = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]
		// PURE EQUILIBRIUM
		for (var row = 0; row < 3; ++row) {
			for (var col = 0; col < 3; ++col) {
				// CHECK ROW PAYOFFS
				for (var r = 0; r < 3; ++r) {
					if (Label[row][col] == 0) {
						if (M[r][col][0] > M[row][col][0]) {
							Label[row][col] = 2;
						}
					}
				}
				// CHECK IF UNSET
				if (Label[row][col] == 0) {
					for (var c = 0; c < 2; ++c) {
						if (M[row][c][1] > M[row][col][1]) {
							Label[row][col] = 2;
						}
					}
				}
				// WE GOT IT
				if (Label[row][col] == 0) {
					Label[row][col] = 1;
				}
			}
		}
		var got = 0;
		// HIGHLIGHT RESPONSE
		for (var row = 0; row < 3; ++row) {
			for (var col = 0; col < 3; ++col) {
				if (Label[row][col] == 1) {
					highlight(row, col);
					got++;
				}
			}
		}
		// NO STRATEGIES FOUND
		if (got < 1) {
			// MIXED STRATEGIES
			string_response += "Found mixed strategies: <br />";
			// PLAYER 1
			var p1_eqA = a11.toString() + "*x+" + b11.toString() + "*y+" + c11.toString() + "*(1-x-y)";
			var p1_eqB = a21.toString() + "*x+" + b21.toString() + "*y+" + c21.toString() + "*(1-x-y)";
			var p1_eqC = a31.toString() + "*x+" + b31.toString() + "*y+" + c31.toString() + "*(1-x-y)";

			// PLAYER 2
			var p2_eqA = a12.toString() + "*x+" + a22.toString() + "*y+" + a32.toString() + "*(1-x-y)";
			var p2_eqB = b12.toString() + "*x+" + b22.toString() + "*y+" + b32.toString() + "*(1-x-y)";
			var p2_eqC = c12.toString() + "*x+" + c22.toString() + "*y+" + c32.toString() + "*(1-x-y)";


			var p1_sol = nerdamer.solveEquations([p1_eqA + "=" + p1_eqB, p1_eqB + "=" + p1_eqC]);
			if (p1_sol.length > 0) {
				var p1 = parseFloat(p1_sol[0][1]);
				p1 = Math.round(p1*100)/100;
				var p2 = parseFloat(p1_sol[0][1]);
				p2 = Math.round(p1*100)/100;
				var p3 = 1 - p1 - p2;
				p3 = Math.round(p1*100)/100;
				string_response += "Probability of Player 1 using strategy A equals: " + p1 + "<br />";
				string_response += "Probability of Player 1 using strategy B equals: " + p2 + "<br />";
				string_response += "Probability of Player 1 using strategy C equals: " + p3 + "<br />";
			} else {
				string_response += "No solutions for Player 1";
			}

			var p2_sol = nerdamer.solveEquations([p2_eqA + "=" + p2_eqB, p2_eqB + "=" + p2_eqC]);
			if (p2_sol.length > 0) {
				var p1 = parseFloat(p2_sol[0][1]);
				p1 = Math.round(p1*100)/100;
				var p2 = parseFloat(p2_sol[0][1]);
				p2 = Math.round(p1*100)/100;
				var p3 = 1 - p1 - p2;
				p3 = Math.round(p1*100)/100;
				string_response += "Probability of Player 2 using strategy A equals: " + p1 + "<br />";
				string_response += "Probability of Player 2 using strategy B equals: " + p2 + "<br />";
				string_response += "Probability of Player 2 using strategy C equals: " + p3 + "<br />";
			} else {
				string_response += "No solutions for Player 2";
			}
		}
		else {
			string_response += "Found pure strategies!";
		}
		document.getElementById("error").innerHTML = string_response;
	}
}
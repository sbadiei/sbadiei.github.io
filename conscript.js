function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001
	var T=1/(1+.2316419*Math.abs(X));
	var D=.3989423*Math.exp(-X*X/2);
	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
	if (X>0) {
		Prob=1-Prob
	}
	return Prob
} 

function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}

function conint(){
    var sigma = document.getElementById("sigma").value;
    var size = document.getElementById("size").value;
    var xbar = document.getElementById("xbar").value;
    var stdev = document.getElementById("stdev").value;
    var conlev = document.getElementById("conlev").value;
    var concoeff = .01*conlev; var alpha = 1 - concoeff; var alphahalf = alpha / 2;
    var zalphahalf = NormSInv(1 - alphahalf);
    var marginerror = zalphahalf * (stdev / Math.sqrt(size));
    var anslow = xbar - marginerror; var anshigh = parseInt(xbar) + parseInt(marginerror);
    if (sigma == "known"){

    } else if (sigma == "unknown"){

    }
    
    if (sigma == "known") {
        document.getElementById("output").innerHTML = "$$ \\bar{x} \\pm z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}} $$ $$ 1 - \\alpha = " + concoeff.toFixed(4) + "\\rightarrow \\alpha = "+alpha.toFixed(4)+ "\\rightarrow \\alpha / 2 = "+ alphahalf.toFixed(4) +"$$  $$" + xbar + "\\pm" + zalphahalf.toFixed(2) + "\\frac{"+stdev+"}{\\sqrt{"+size+"}}$$ $$"+xbar + "\\pm" +marginerror.toFixed(2) + "$$ $$" + anslow.toFixed(2) + "\\text{ to }" + anshigh.toFixed(2) + " $$"
    } else if (sigma == "unknown") {
        document.getElementById("output").innerHTML = "$$ \\bar{x} \\pm t_{\\alpha/2} \\frac{s}{\\sqrt{n}} $$ $$ 1 - \\alpha = " + concoeff.toFixed(4) + "\\rightarrow \\alpha = "+alpha.toFixed(4)+ "\\rightarrow \\alpha / 2 = "+ alphahalf.toFixed(4) +"$$  $$" + xbar + "\\pm" + zalphahalf.toFixed(2) + "\\frac{"+stdev+"}{\\sqrt{"+size+"}}$$ $$"+xbar + "\\pm" +marginerror.toFixed(2) + "$$ $$" + anslow.toFixed(2) + "\\text{ to }" + anshigh.toFixed(2) + " $$"
    } 
    
    MathJax.typeset();
}
function landTax(e) {
    if (0 < e && e < 300000) {
        return 0
    } else if (300000 < e && 600000 >= e) {
        return (375 + 0.002 * (e - 300000));
    } else if (600000 < e && 1000000 >= e) {
        return (975 + 0.005 * (e - 600000));
    } else if (1000000 < e && 1800000 >= e) {
        return (2975 + 0.008 * (e - 1000000));
    } else if (1800000 < e) {
        return (9375 + 0.00155 * (e - 1800000));
    }
}
export { landTax };
/*VIC
Total taxable value of land holdings	Land tax payable
< $300,000	Nil
$300,000 to < $600,000	$375 plus 0.2% of amount > $300,000
$600,000 to < $1,000,000	$975 plus 0.5% of amount > $600,000
$1,000,000 to < $1,800,000	$2975 plus 0.8% of amount > $1,000,000
$1,800,000 to < $3,000,000	$9375 plus 1.55% of amount > $1,800,000
$3,000,000 and over	$27,975 plus 2.55% of amount > $3,000,000

function landTax(e) {
    if (0 < e < 300000) {
        return 0
    } else if (300000 < e < 600000) {
        return (375 + 0.002 * (e - 300000));
    } else if (600000 < e < 1000000) {
        return (975 + 0.005 * (e - 600000));
    } else if (1000000 < e < 1800000) {
        return (2975 + 0.008 * (e - 1000000));
    } else if (1800000 < e < 3000000) {
        return (9375 + 0.00155 * (e - 1800000));
    }
}*/
//currently only accurate to VIC - needs to be updated and preferably dynamic

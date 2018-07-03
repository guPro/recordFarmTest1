/**
 * @providesModule ConvertWonUtilService
 */

/*
* @params  {number} amount
*/
export const convertNumber2Won = ( price ) => {
    price = price.toString();
    let result = '';
    for (let i = 4; i < price.length; i++) {
        let str = price.substring(price.length - i - 1, price.length - i);
        if (i == 4) str += '만';
        if (i == 7) str += ',';
        if (i == 8) str += '억 ';
        if (i == 11) str += '억 ';
        if (i == 12) str += '조 ';
        result = str + result;
    }
    result = result.replace(' 0,000억', '');
    result = result.replace(' 0,000만', '');
    result = result.replace('0,00', '');
    result = result.replace('0,0', '');
    result = result.replace('0,', '');
    return result;
}
export const convertm2ToPyeong = ( m2 ) => {
    let pyeong = m2 * 0.3025;
    return pyeong.toFixed(1);
}
export const convertPyeongTom2 = ( pyeoung ) => {
    let m2 = pyeoung * 3.305785;
    return m2.toFixed(1);

}
const PROD_API_PREFIX = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';

const getAverageCubicWeight = async () => {
    let url = "/api/products/1";
    let count = 0;
    let totalWeight = 0;

    // While comes to the last url, the "next" will be null
    while (url) {
        try {
            const res = await fetch(PROD_API_PREFIX + url);
            const data = await res.json();

            data.objects.map(object => {
                if (object.category === 'Air Conditioners') {
                    let cubicWeight = calculateAverageCubicWeight(object.size.length, object.size.height, object.size.width);
                    totalWeight += cubicWeight;
                    count++;
                }
            });

            url = data.next;

        } catch (e) {
            break;
        }
    }

    return count === 0 ? 0 : totalWeight / count;
}

// Return the average cubic weight in the unit of kilogram
const calculateAverageCubicWeight = (length, height, width) => {
    const factor = 250;

    // A number used for converting cubic centimeters to cubic meters and offsetting the extra number.
    // ( 10 * 10 * 10 ) * ( 100 * 100 * 100 )
    const N = 1000000000;

    //Convert float number to int
    let n1 = 10 * length * 10 * height * 10 * width;
    let n2 = n1 * factor;

    return n2 / N;
}

const final = async () => {
    document.getElementById('demo').innerText = await getAverageCubicWeight();
}

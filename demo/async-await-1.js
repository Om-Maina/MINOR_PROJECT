const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b <0){
                return reject('Number Should be Positive')
            }
            resolve(a + b)
        }, 2000)
    })
}

const dowork = async () => {
    const sum1 = await add(10, 20)
    const sum2 = await add(sum1, 20)
    const sum3 = await add(sum2, -1)
    return sum3;
}

dowork().then((result) => {
    console.log('Result: ', result);
}).catch((e) => {
    console.log('E:', e)
});
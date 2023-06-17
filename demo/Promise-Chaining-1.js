const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1, 2).then((sum) => { //First call
    console.log(sum)
    return add(sum, 5); //second call
}).then((sum) => {
    console.log(sum)
    return add(sum, 2); //third call
}).then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log('Error' + e)
})


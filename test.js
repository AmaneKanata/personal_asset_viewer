(async () => {
    console.log("hello");

    const array = [
        { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ]

    // const promises = array.map((value, index) => {
    //     return new Promise((resolve, rejext) => {
    //         setTimeout(() => {
    //             value["test"] = index
    //             resolve(index)
    //         }, 1000)
    //     })
    // })

    console.log(array)

    await Promise.all(
        array.map((value, index) => {
            return new Promise((resolve, rejext) => {
                setTimeout(() => {
                    value["test"] = index
                    resolve()
                }, 1000)
            })
        }))
        .then(() => {
            console.log(array)
            return Promise.all(array.map((value, index) => {
                return new Promise((resolve, rejext) => {
                    setTimeout(() => {
                        value["test2"] = index + 10
                        resolve()
                    }, 1000)
                })
            }))
        })
        .then(() => {
            console.log(array)
        })

    console.log("test!")
})()
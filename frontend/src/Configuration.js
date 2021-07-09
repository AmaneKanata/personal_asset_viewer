const Configuration = {
    size: 1000,
    columnNumber: 2,
    getGridheight: () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width*0.99/2
    },
    getGapheight: () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width*0.01
    },
}

export default Configuration;
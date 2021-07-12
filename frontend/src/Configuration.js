const Configuration = {
    size: 1000,
    columnNumber: 2,
    getWindowWidth: () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width
    },
    getWindowHeight: () => {
        const { innerWidth: width, innerHeight: height } = window;
        return height
    }
}

export default Configuration;
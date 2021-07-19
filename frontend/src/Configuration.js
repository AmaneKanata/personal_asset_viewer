const Configuration = {
    size: 1000,
    columnNumber: 2,
    getWindowWidth: () => {
        const { innerWidth: width } = window;
        return width
    },
    getWindowHeight: () => {
        const { innerHeight: height } = window;
        return height
    }
}

export default Configuration;
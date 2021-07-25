const Configuration = {
    columnNumber: 2,
    getWindowWidth: () => {
        const { innerWidth: width } = window;
        return width
    },
    getWindowHeight: () => {
        const { innerHeight: height } = window;
        return height
    },
    STATE_NORMAL: "normal",
    STATE_DELETING: "deleting"
}

export default Configuration;
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
    STATE_DELETING: "deleting",
    STATE_UPLOADING: "uploading",
    SCENE_FOLDER_LIST: "folderList",
    SCENE_FOLDER_DETAIL: "folderDetail",
    SCENE_ITEM: "item"
}

export default Configuration;
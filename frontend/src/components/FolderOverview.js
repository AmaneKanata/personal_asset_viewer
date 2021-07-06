function FolderOverview(props) {

    return (
        <div>
            <h1>Folder overview</h1>
            <h1>Author : {props.data.authors}</h1>
            <h1>parodies : {props.data.parodies}</h1>
            <h1>tags : {props.data.tags}</h1>
        </div>
    )
}

export default FolderOverview;
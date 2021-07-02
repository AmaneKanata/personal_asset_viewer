import axios from "axios";
import { useEffect, useState } from "react";

function Test() {

    const [data, setData] = useState(null)

    useEffect(async () => {
        console.log("effect")
        axios.get("http://localhost:3000/test")
            .then((res) => {
                const encoded = btoa(String.fromCharCode.apply(null, res.data.data.data))
                const type = "jpg"
                const imgSrcString = `data:image/${type};base64,${encoded}`;
                setData(imgSrcString)
            })
    }, [])

    return (
        <div>
            this is test!
            <img src={data}></img>
        </div>
    )
}

export default Test;
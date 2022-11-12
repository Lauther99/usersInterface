import axios from "axios"
import { useEffect, useState } from "react"


const useApi = () => {
    const [data, setData] = useState([])
    function getData(){
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setData(res.data))
    }

    useEffect(() => {
        getData()
    }, [])

    return [data, getData]
}

export default useApi
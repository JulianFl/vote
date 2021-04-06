import {useEffect, useState} from "react";
import firebase from "../firebase";

const GetData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const[isThere, setIsThere]  = useState(false);
    useEffect(() => {
        const allData = firebase.database().ref('songs');
        allData.on('value', (snapshot) => {
            const snap = snapshot.val();
            const dataList = [];
            for (let id in snap){
                dataList.push({id, ... snap[id]});
            }
            /*songList.sort((a,b) => a.counter > b.counter ? 1 : -1);
            console.log(songList)*/
            if (dataList.length===0){
                setIsThere(false);
            }else {
                setIsThere(true);
            }
            setData(dataList);
            setIsLoading(false);
        })

    },[setData]);

    return {data, isLoading,isThere}
};

export default GetData;
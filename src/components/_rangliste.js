import {useEffect, useState} from "react";
import firebase from "../firebase";
import GetData from "./useFetch";

const Ranking = () => {

    const  {data, isLoading } = GetData();

    return (
        <article>
            { isLoading && <div>Loading...</div> }
            <div className="rangliste">

                {data &&
                data.sort((a,b) => a.counter < b.counter ? 1 : -1).map((song, index) =>(
                        <div key={index}>
                            <h1 >{song.title}</h1>
                            <h4>{song.counter}</h4>
                        </div>
                    )
                )}
            </div>

        </article>

    );
}

export default Ranking;
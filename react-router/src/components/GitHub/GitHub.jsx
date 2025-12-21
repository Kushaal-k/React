import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function GitHub() {
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/hiteshchoudhary')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data);
    //     })
    // }, [])

    const data = useLoaderData()

    return (
        <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>GitHub Followers: {data.followers}
            <img src={data.avatar_url} alt="Git Profile Picture" width={300}/>
        </div>
    )
}

export default GitHub

export const githubDataLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json();
}
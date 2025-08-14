import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { fetchData } from '../slices/moviesSlice';
// import { movieReducer } from '../slices/moviesSlice';

function Row({heading,tab,url}) {

    // DISPATCH IS USED TO DISPATCH THE ACTIONS FROM THE REDEX STORE
    const dispatch = useDispatch();

    // USESELECTOR IS USED TO SELECT THE STATE FROM THE REDUX STORE
    const initState = useSelector((state) => {
        return state.movieReducer;

    });

    // DATA WILL BE FETCHED WHEN THE COMPONENT MOUNTS
    // USEEFFECT WILL RUN ONCE WHEN THE COMPONENT MOUNTS
    // AND IT WILL DISPATCH THE FETCHED ACTION WITH THE URL PASSED AS AN ARGUMENT
    useEffect(() => {
        dispatch(fetchData(url[0]))

    },[dispatch, url])


    
    console.log(initState.movies)

  return (
    <div className="flex px-14 text-white">
        <header className="flex justify-between items-center w-full">
            <h1>{heading}</h1>
            <div className="toggler flex gap-4">
                <button>
                    {tab[0]}
                </button>
                <button>
                    {tab[1]}
                </button>
            </div>
        </header>

    </div>
  )
}

export default Row;
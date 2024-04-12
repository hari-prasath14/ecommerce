import axios from 'axios'
import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

const SearchProvider = ({children}) =>{

    const [searchAuth , setSearchAuth] = useState({ keyword : "" ,result : []})


    return(
        <SearchContext.Provider value={[searchAuth , setSearchAuth]} >
            {children}
        </SearchContext.Provider>

    )
    
}

//Creating Custom Hook

const useSearch = () =>useContext(SearchContext)

export {useSearch, SearchProvider} 


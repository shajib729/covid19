import React, { useEffect,useState } from 'react'

export const Covidlist = () => {

    const [global, setGloabal] = useState([])
    const [countries, setCountries] = useState([])
    const [date, setDate] = useState()
    const [search, setSearch] = useState('')

    const covidlist = async () => {
        const res = await fetch("https://api.covid19api.com/summary")
        const data = await res.json()
        // console.log(data);
        setGloabal(data.Global)
        
        setCountries(data.Countries)
    }
    setInterval(() => {
        setDate(new Date().toLocaleTimeString() +" "+ new Date().toDateString())
    },1000)
    useEffect(() => {
        covidlist()
    }, [])
    
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="container covid">
            <h6 className="text-center text-light">{date}</h6>
            <hr />
            {/* globally  */}
            <div className="row global">
                <div className="col-md-3 text-center p-3">
                    <div className="text-light p-3 newC">
                        <h4>New Confirmed</h4>
                        <h2>{global.NewConfirmed}</h2>
                    </div>
                </div>
                <div className="col-md-3 text-center p-3">
                    <div className="text-light p-3 totalC">
                        <h4>Total Confirmed</h4>
                        <h2>{global.TotalConfirmed}</h2>
                    </div>
                </div>
                <div className="col-md-3 text-center p-3">
                    <div className="text-light p-3 newD">
                    <h4>New Deaths</h4>
                    <h2>{global.NewDeaths}</h2>
                    </div>
                </div>
                <div className="col-md-3 text-center p-3">
                    <div className="text-light p-3 totalD">
                    <h4>Total Deaths</h4>
                    <h2>{global.TotalDeaths}</h2>
                    </div>
                </div>
            </div>

            {/* search bar  */}
            <form class="form-inline search-bar w-75 m-auto">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleChange} />
            </form>

            {/* countried  */}
            <hr/>
            <div className="countries px-2">
                <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Countries</th>
                        <th scope="col">New Confirmed</th>
                        <th scope="col">Total Confirmed</th>
                        <th scope="col">New Deaths</th>
                        <th scope="col">Total Deaths</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {
                            countries.map((country) => {
                                if (!search) {
                                    return <tr>
                                        <th>{country.Country}</th>
                                        <td>{country.NewConfirmed===0?"-":country.NewConfirmed}</td>
                                        <td>{country.TotalConfirmed}</td>
                                        <td>{country.NewDeaths===0?"-":country.NewDeaths}</td>
                                        <td>{country.TotalDeaths}</td>
                                        </tr> 
                                } else if(country.Country.toLowerCase().startsWith(search.toLowerCase())){
                                    return <tr>
                                        <th>{country.Country}</th>
                                        <td>{country.NewConfirmed===0?"-":country.NewConfirmed}</td>
                                        <td>{country.TotalConfirmed}</td>
                                        <td>{country.NewDeaths===0?"-":country.NewDeaths}</td>
                                        <td>{country.TotalDeaths}</td>
                                        </tr> 
                                }
                            })
                        }
                    </tbody>
                </table>
                </div>

            </div>
            
        </div>
    )
}

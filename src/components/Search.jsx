import React, {useState, useEffect} from "react";
import Result from './Result'
import axios from 'axios'
// all MUI sources
import { Alert } from '@mui/material';

// only Alert source
import Alert from '@mui/material/Alert';

const Search = () => {
    const perPage = 9;

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [val, setVal] = useState('');
    const [sortField, setSortField] = useState('login');
    const [sortDirection, setSortDirection] = useState('asc');
    const [error, setError] = useState(false);
    // use controlled state for Input
    const [inputValue, setInputValue] = useState('')

    const handleClick = () => {

        // not React approach
        let val = document.getElementById('myInput').value;

        makeRequest(val)
            .then((response) => {
                setData(response.data.items);
                setVal(val);
            });
    }

    useEffect(() => {
        if (data.length !== 0) {
            makeRequest(val)
                .then((response) => {
                    setData(response.data.items);
                })
                .catch((response) => {
                    setError(true);
                });
        }
    }, [page, sortField, sortDirection]); // eslint-disable-line react-hooks/exhaustive-deps

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        setPage(page - 1);
    }

    // const fetchGithubAccount
    const makeRequest = (val) => {
        return axios
            .get(
                // `https://api.github.com/search/users?q=&per_page=${perPage}....`
                'https://api.github.com/search/users?q='
                + val
                + '&per_page=' + perPage
                + '&page=' + page
                + '&sort=' + sortField
                + '&direction=' + sortDirection
            )
    }

    const makeFilter = (e) => {
        let target = e.target.id;

        if (target === 'direction') {
            setSortDirection(e.target.value);
        }

        if (target === 'field') {
            setSortField(e.target.value);
        }
    }

    return (
        <div>
            {
                error
                    ?
                <Alert severity="error">Error, pleas reload the page</Alert>
                    :
                null
            }
            <div className="app" key={data.id}>
                <div className="login">
                        <h1 className="text-primary">Login</h1>
                        <input onChange={(e) => setInputState(e.target.value)} id="myInput" value={inputValue} className="auth" placeholder='Enter login' />
                        <button  onClick={handleClick.bind(this)} className="btn_sumbit" >Submit</button>
                        <div className="filters">
                            <h3>Sorting for field:
                                <select id='field' className="field" onChange={makeFilter.bind(this)}>
                                    <option value='login'>Login</option>
                                    <option value='avatar_url'>Avatar_url</option>
                                    <option value='login'>type</option>
                                </select>
                            </h3>
                            <h3>Direction for sorting:
                                <select id='direction' className = 'direction' onChange={makeFilter.bind(this)}>
                                    <option value='asc'>ASC</option>
                                    <option value='desc'>DESC</option>
                                </select>
                            </h3>
                        </div>
                    <div>
                        {data.length > 0 ? <Result items={data}  /> : ''}
                    </div>
                </div>
                <div className="pagination">
                {
                    page > 1
                        ?
                        // useless bind function, prevPage is an arrow function
                    <button className = "btn_prev" onClick={prevPage.bind(this)}>Prev</button>
                        :
                    null

                    // page > 1 && <button className = "btn_prev" onClick={prevPage.bind(this)}>Prev</button>
                }

                {
                    data.length > 0
                        ?
                    <button className = "btn_next" onClick={nextPage.bind(this)}>Next</button>
                        :
                    null
                }
                </div>
            </div>
            
        </div>
    );
}

export default Search;
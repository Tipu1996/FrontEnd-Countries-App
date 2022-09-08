import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../store/countries'
import { Link } from 'react-router-dom'
import { addedToCart } from '../store/cart'
import { Country } from '../types'
import type { RootState, AppDispatch } from '../store/configureStore'
import {
  sortCountryName,
  sortCountryPopulaion,
  sortCountryRegion,
} from '../store/countries'

const Table = (props: { searchString: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  let allCountries: Country[] = useSelector(
    (state: RootState) => state.countries.list
  )
  const [countries, setCountries] = useState<Country[]>([])
  useEffect(() => {
    dispatch(getCountries())
    setCountries(allCountries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    setCountries(allCountries)
  }, [allCountries])

  useEffect(() => {
    setCountries(
      allCountries.filter((x: Country) =>
        x.name.common.includes(props.searchString)
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchString])

  const handleNameSorting = () => {
    dispatch(sortCountryName(allCountries))
  }
  const handlePopulationSorting = () => {
    dispatch(sortCountryPopulaion(allCountries))
  }
  const handleRegionSorting = () => {
    dispatch(sortCountryRegion(allCountries))
  }

  return (
    <div>
      <h1>All the Countries in the World</h1>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>
              <button onClick={() => handleNameSorting()}>Name</button>
            </th>
            <th>Languages</th>
            <th>
              <button onClick={() => handlePopulationSorting()}>
                Population
              </button>
            </th>
            <th>
              <button onClick={() => handleRegionSorting()}>Region</button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.name.common}>
              <td>{country.flag}</td>
              <td>
                <Link
                  to="/Details"
                  state={{ from: country }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {country.name.common}
                </Link>
              </td>
              <td>
                <ul>
                  {country.languages
                    ? Object.values(country.languages).map((x) => (
                        <li key={x}> {x} </li>
                      ))
                    : 'none'}
                </ul>
              </td>
              <td>{country.population}</td>
              <td>{country.region}</td>
              <td>
                <button onClick={() => dispatch(addedToCart(country))}>
                  ADD
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

//country.name.common, country.flag, Object.values(country.languages).map(language => <p>language</p>), country.population

export default Table

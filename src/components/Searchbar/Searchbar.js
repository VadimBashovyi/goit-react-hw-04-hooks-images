import { useState } from 'react'
import styles from '../Searchbar/Searchbar.module.css'
import PropTypes from 'prop-types'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('')

  const pressChange = (e) => {
    setQuery(e.target.value)
  }

  const pressSubmit = (e) => {
    e.preventDefault()

    onSubmit(query)
    setQuery('')
  }

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={pressSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <CameraAltIcon
            className={styles.icon}
            style={{ width: '100%', height: '100%', fill: 'teal' }}
          />
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={query}
          onChange={pressChange}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

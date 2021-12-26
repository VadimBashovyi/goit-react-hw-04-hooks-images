import styles from './App.module.css'
import { useState, useEffect } from 'react'
import fetchApi from './services/imagesApi'
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery'
import Button from './components/Button'
import Loader from 'react-loader-spinner'
import Modal from './components/Modal'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')
  const [tags, setTags] = useState('')
  const [isLastPage, setIsLastPage] = useState(false)

  const changeQuery = (value) => {
    console.log(value)
    setImages([])
    setCurrentPage(1)
    setSearchValue(value)
    setLoading(true)
  }

  useEffect(() => {
    if (loading && searchValue) {
      console.log(searchValue)
      console.log(currentPage)
      fetchApi(searchValue, currentPage)
        .then((respons) => {
          if (!respons) {
            console.log('err resoult')
            return
          }
          setLoading(false)
          setImages([...images, ...respons.hits])
          setIsLastPage(currentPage + 1)
          if (images.length > 12) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loading, searchValue, currentPage, images])

  const modalToggle = () => {
    setShowModal((prev) => !prev)
  }
  const clickImg = (e) => {
    console.log('Клік по карткі')
    if (e.target.nodeName !== 'IMG') {
      return
    }

    setLargeImageURL(e.target.dataset.url)
    setTags(e.target.alt)
    modalToggle()
  }
  const handleClickBtn = () => {
    setCurrentPage((page) => page + 1)
    setLoading(true)
  }

  const buttonShold = images.length > 0 && !loading
  console.log(buttonShold)

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={changeQuery} />

      <ImageGallery images={images} onClick={clickImg} />

      {loading && (
        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
      )}

      {!loading && buttonShold && <Button onClick={handleClickBtn} />}

      {showModal && (
        <Modal onClose={modalToggle}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </div>
  )
}

export default App

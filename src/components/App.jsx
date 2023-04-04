import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './API/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [error, setError] = useState(null);

  //* Якщо змінився state рендеримо картинки

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    //* Отримуємо дані з fetch і записуємо в state

    const getImages = async () => {
      setIsLoading(true);
      setIsActiveBtn(false);

      try {
        const { hits } = await fetchImages(searchQuery, page);

        setImages(state => [...state, ...hits]);
        setIsActiveBtn(true);

        if (hits.length === 0) setIsActiveBtn(false);
      } catch (error) {
        setError('sorry, the server is not responding, try again later');
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  //* По кліку отримуємо велике зображення і відкриваємо модалку

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //* При сабміті форми отримує значення інпуту і скидає images та page

  const handleFormSubmit = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  //* Рендеремо ще картинки при клік на кнопку

  const onClickLoadMore = () => {
    setPage(s => s + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {error}
      <ImageGallery items={images} onGetImages={getLargeImage} />
      {isLoading && <Loader />}
      {isActiveBtn && <Button onLoadMore={() => onClickLoadMore} />}
      {showModal && <Modal largeImage={largeImage} onClick={toggleModal} />}
    </div>
  );
};

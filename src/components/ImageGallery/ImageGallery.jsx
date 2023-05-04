import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ items, toggleModal}) => {
  return (
    <ul className={css.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            toggleModal={toggleModal}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery
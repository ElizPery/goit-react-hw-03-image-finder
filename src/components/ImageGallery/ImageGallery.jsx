import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({items}) => {
    return (
      <ul className={css.imageGallery}>
            {items.map(({ id, webformatURL, largeImageURL }) => {
                return <ImageGalleryItem key={id} smallImg={webformatURL} />
            })}
      </ul>
    );
}

export default ImageGallery
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ smallImg }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={smallImg} alt="" className={css.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem
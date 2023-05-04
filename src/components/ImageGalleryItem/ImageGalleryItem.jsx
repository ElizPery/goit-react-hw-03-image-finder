import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ smallImg, toggleModal, largeImageURL}) => {
  return (
    <li className={css.ImageGalleryItem} onClick={()=>toggleModal(largeImageURL)} >
      <img
        src={smallImg}
        alt=""
        className={css.imageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem
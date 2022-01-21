import React from "react";
import PropTypes from "prop-types";
import { Item } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ imageSrc, openModalImage, largeImageURL }) => {
  return (
    <Item>
      <img
        src={imageSrc}
        alt=""
        onClick={() => openModalImage(largeImageURL)}
        //className={styles.ImageGalleryItemImage}
        //data-source={largeImageURL}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  openModalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

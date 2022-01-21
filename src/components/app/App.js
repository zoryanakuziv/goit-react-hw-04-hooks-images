import React, { useState, useEffect } from "react";
import pixabayAPI from "../../api/PixabayApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../loader/Loader";
import GalleryErrorView from "../imageGalleryError/ImageGalleryError";
import Button from "../button/Button";
import Modal from "../modal/Modal";

import { ToastContainer } from "react-toastify";
import Searchbar from "../searchbar/Searchbar";
import ImageGallery from "../imageGallery/ImageGallery";
import { AppStyled } from "./App.styled.js";

export default function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    inputValue && fetchImages();
    if (images.length === 12) {
      setShowButton(true);
    }
  }, [inputValue, page]);

  const formSubmitHandler = (inputValue) => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
    setShowButton(false);
  };

  const fetchImages = () => {
    setStatus("pending");
    pixabayAPI
      .getImages(inputValue, page)
      .then((images) => {
        if (images.hits.length === 0) {
          toast.error(
            `No results for "${inputValue}" . Please, enter something else.`
          );
          setStatus("idle");
          return;
        }
        setImages((prevState) => [...prevState, ...images.hits]);
        if (images.hits.length < 12) {
          setShowButton(false);
          toast("No more results found");
          setStatus("resolved");
          return;
        }
        setStatus("resolved");
        setShowButton(true);
      })
      .catch((error) => {
        setError(error.massege);
        setStatus("rejected");
        setPage(1);
        setImages([]);
      })
      .finally(() => {
        scrollDown();
      });
  };

  const onClickButton = () => {
    setPage((page) => page + 1);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalImage = (largeImageURL) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={formSubmitHandler} />
      {status === "rejected" && <GalleryErrorView />}
      {images && (
        <div>
          <ImageGallery images={images} modalImage={handleModalImage} />
        </div>
      )}
      {showButton && <Button onClickButton={onClickButton} />}
      {showModal && <Modal onCloseModal={toggleModal} img={largeImageURL} />}
      {status === "pending" && <Loader />}

      <ToastContainer autoClose={5000} />
    </AppStyled>
  );
}

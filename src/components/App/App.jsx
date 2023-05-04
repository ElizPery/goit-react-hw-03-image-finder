import { Component } from "react";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import { fetchGallery } from "api/gallery";
import Button from "components/Button";
import css from './App.module.css';
import Loader from "components/Loader";
import Modal from "components/Modal";

export class App extends Component {
  state = {
    query: '',
    items: [],
    total: 0,
    page: 1,
    isError: false,
    isLoading: false,
    showModal: false,
    modalData: '',
    tags: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      query,
      page ,
    } = this.state;


    if (prevState.query !== query || prevState.page !== page) {
      this.fetchData(query, page);
    }
  }

  fetchData = async (query, page) => {
    this.setState({
      isLoading: true,
      isError: false,
    });

    if (query.trim() === '') {
      return this.setState({ isError: true, isLoading: false});
    }

    try {
      const response = await fetchGallery(query, page);

      this.setState(prev => ({
        items: [...prev.items, ...response.items],
        total: response.total,
        isLoading: false,
      }));

      if (response.total === 0) {
        this.setState({ isError: true });
      }
    } catch {
      this.setState({ isError: true, isLoading: false });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const inputValue = e.target.elements[1].value;

    this.setState({
      query: inputValue,
      items: [],
      total: 0,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onOpenModal = (img, alt) => {
    this.setState({
      showModal: true,
      modalData: img,
      tags: alt
    });
  };

  render() {
    const {
      items, total,
      isError,
      isLoading,
      showModal,
      modalData,
      tags
    } = this.state;

    const { onCloseModal, onSubmit, onOpenModal, handleLoadMore } = this;

    const loadMore = total / items.length;

    return (
      <div className={css.app}>
        {showModal && (
          <Modal onClose={onCloseModal}>
            <img src={modalData} alt={tags} width={800} />
          </Modal>
        )}
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery items={items} toggleModal={onOpenModal} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <p>Something went wrong, please try another query</p>
            ) : (
              <>
                {total === 0 ? (
                  <p>Please enter your request</p>
                ) : (
                  (loadMore > 1) && (<Button onClick = { handleLoadMore } />)
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

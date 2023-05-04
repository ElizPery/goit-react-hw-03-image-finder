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
    data: {
      items: [],
      amount: 0,
      page: 1
    },
    isError: false,
    isLoading: false,
    showModal: false,
    modalData: ''
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      const firstPage = 1;
      this.setState({
        isLoading: true,
        isError: false,
        data: {
          items: [],
          amount: 0,
          page: 1,
        },
      });
      
      try {
        const response = await fetchGallery(query, firstPage);

        setTimeout(() => {
          this.setState({
            data: response,
            isLoading: false,
          });
        }, 1000);

        if (response.amount === 0) { this.setState({ isError: true }) }
      } catch {
        this.setState({ isError: true, isLoading: false });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const inputValue = e.target.elements[1].value;

    this.setState({
      query: inputValue,
    });
  };

  handleLoadMore = async () => {
    const { data: {page}, query } = this.state;

    let pageNumber = page + 1
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    try {
      const response = await fetchGallery(query, pageNumber);

      setTimeout(() => {
        this.setState(({ data: { items, amount }}) => ({
          data: {
            items: [...items, ...response.items],
            amount: amount + response.amount,
            page: pageNumber,
          },
          isLoading: false,
        }));
      }, 1000);
    } catch {
      this.setState({ isError: true, isLoading: false });
    }
  }

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  onOpenModal = (img) => {
    this.setState({
      showModal: true,
      modalData: img,
    });
  }

  render() {
    const {
      data: { items, amount },
      isError,
      isLoading,
      showModal,
      modalData
    } = this.state;

    const { onCloseModal, onSubmit, onOpenModal, handleLoadMore } = this;

    return (
      <div className={css.app}>
        {showModal && (
          <Modal onClose={onCloseModal}>
            <img src={modalData} alt="" width={800} />
          </Modal>
        )}
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery
          items={items}
          toggleModal={onOpenModal}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <p>Something went wrong, please try another query</p>
            ) : (
              <>
                {amount === 0 ? (
                  <p>Please enter your request</p>
                ) : (
                  <Button onClick={handleLoadMore} />
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
};

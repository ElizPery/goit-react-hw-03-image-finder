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
    if (prevState.query !== this.state.query) {
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
        const response = await fetchGallery(this.state.query, firstPage);

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
    let pageNumber = this.state.data.page + 1
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    try {
      const response = await fetchGallery(this.state.query, pageNumber);

      setTimeout(() => {
        this.setState(prevState => ({
          data: {
            items: [...prevState.data.items, ...response.items],
            amount: prevState.data.amount + response.amount,
            page: pageNumber,
          },
          isLoading: false,
        }));
      }, 1000);
    } catch {
      this.setState({ isError: true, isLoading: false });
    }
  }

  // toggleModal = (e) => {
  //   this.setState((state) => ({
  //     showModal: !state.showModal,
  //   }))
  //   console.log(e.target)
  // }

  onClose = () => {
    this.setState({
      showModal: false,
    });
  }

  onOpen = (img) => {
    this.setState({
      showModal: true,
      modalData: img,
    });
  }

  render() {
    return (
      <div className={css.app}>
        {this.state.showModal && (
          <Modal onClose={this.onClose}>
            <img src={this.state.modalData} alt="" width={800} />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          items={this.state.data.items}
          toggleModal={this.onOpen}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            {this.state.isError ? (
              <p>Something went wrong please try another query</p>
            ) : (
              <>
                {this.state.data.amount === 0 ? (
                  <p>Please enter your request</p>
                ) : (
                  <Button onClick={this.handleLoadMore} />
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
};

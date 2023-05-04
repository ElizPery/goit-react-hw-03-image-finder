import { Component } from "react";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import { fetchGallery } from "api/gallery";
import Button from "components/Button";
import css from './App.module.css';
import Loader from "components/Loader";

export class App extends Component {
  state = {
    query: '',
    data: {
      items: [],
      amount: 0,
    },
    isError: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {

    console.log(this.state.query, prevState.query)
     
    if (prevState.query !== this.state.query) {
      this.setState({
        data: {
          items: [],
          amount: 0,
        },
        isLoading: true,
      });
      
      try {
        const response = await fetchGallery(this.state.query);

        setTimeout(() => {
          this.setState({
            data: response,
            isLoading: false,
          });
        }, 1000);
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

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery items={this.state.data.items} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            {this.state.isError ? (
              <p>Something went wrong</p>
            ) : (
              <>{this.state.data.amount === 0 ? <></> : <Button />}</>
            )}
          </>
        )}
      </div>
    );
  }
};

import { Component } from "react";
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import { fetchGallery } from "api/gallery";
import Button from "components/Button";
import css from './App.module.css'

export class App extends Component {
  state = {
    query: '',
    data: [],
  };

  async componentDidUpdate(prevProps, prevState) {

    if (prevState.query !== this.state.query) {
      const response = await fetchGallery(this.state.query);

      this.setState({
        data: response
      })
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
        <ImageGallery items={this.state.data} />
        <Button/>
      </div>
    );
  }
};

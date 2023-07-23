import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a Constructor From news component");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1fe843faf76f4f4e801abae5afbc1305&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleprevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1fe843faf76f4f4e801abae5afbc1305&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsTimes-Top HeadLine</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.loading===false ?
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description ? element.description : ""}
                    url={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            }):<div></div>}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevClick}
          >
            &laquo;previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

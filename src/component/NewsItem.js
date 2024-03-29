import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let{title,description,url,newsUrl}=this.props
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!url?"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg":url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="blank" className="btn btn-dark btn-sm">
             Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

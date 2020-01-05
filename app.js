"use strict";
const { h, Component, render } = preact;
const Portal = preactPortal;
/** @jsx h */

// we want to render this component elsewhere in the DOM
class Card extends Component {
  render(props) {
    return (
      <div class="row">
        {props.data &&
          props.data.length > 0 &&
          props.data.map(item => (
            <div class="col-sm-12 col-md-6 col-lg-4">
              <div class="preCard preCard">
                <div
                  class="wrapper"
                  style={{
                    "background-color": item.bgr,
                    "background-image": item.img
                  }}
                >
                  <div class="header">
                    <div class="date">
                      {item.tags &&
                        item.tags.length > 0 &&
                        item.tags.map(itemh => (
                          <mark class="day">{itemh}</mark>
                        ))}
                    </div>
                    <ul class="menu-content">
                      <li>
                        <a href={item.git} target="_blank">
                          {" "}
                          <i class="fab fa-github"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <img src={item.img} class="imgCard" />

                  <div
                    class="data"
                    style={{
                      background:
                        "linear-gradient(0deg, { item.bgr } 0%,  { item.bgr } 100%)"
                    }}
                  >
                    <div class="content">
                      <span class="author"> </span>
                      <h2 class="title">
                        <a href="#">{item.name}</a>
                      </h2>
                      <p class="text">{item.desc}</p>
                      <a href={item.link} target="_blank" class="button">
                        {" "}
                        VIEW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
class Credits extends Component {
  render(props) {
    return (
      <ol>
        {props.data &&
          props.data.length > 0 &&
          props.data.map(item => (
            <li>
              <a href={item.link} target="_blank">
                <mark class="tag">{item.name}</mark>
              </a>
               {item.desc}
            </li>
          ))}
      </ol>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentdata: [],
      loading:true,
      credits: [
        {
          name: "preactjs",
          link: "https://preactjs.com",
          desc: "Fast 3kB alternative to React"
        },
        {
          name: "minicss",
          link: "https://minicss.org/",
          desc: "minimal, responsive, style-agnostic CSS framework,"
        },
        {
          name: "babeljs",
          link: "https://babeljs.io/",
          desc: "JavaScript compiler"
        }
      ]
    };
  }
  componentDidMount() {
    fetch("https://ganesan-cv-reactjs.netlify.com/.netlify/functions/cv-list")
      .then(response => response.json())
      .then(data => {
        const contentdata = [];
        data.forEach(function(item, index) {
          contentdata.push(item.data);
        });

        this.setState({ contentdata , loading : false});
      });
  }
  render() {
    return (
      <div>
        <div class="jumbotron  ">
          <div class="stripes F"></div>
          <div class=" container content">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h1> Ganesan Karuppaiya CV</h1>
                <p>
                  {" "}
                  Curriculum vitae applications listed below with the same
                  content but developed on different frameworks and libraries
                </p>
              </div>
            </div>
          </div>
          <div class="container base">
          {this.state.loading && <div class="text-center "> <div class="spinner"></div></div>}
            <Card data={this.state.contentdata} />
          </div>
          <div class="row">
            <div class="col-sm-6 text-left">
              <label for="modal-control"> CREDITS</label>

              <input type="checkbox" id="modal-control" class="modal" />
              <div>
                <div class="card black">
                  <label for="modal-control" class="modal-close"></label>
                  <h3 class="section">This Page Developed Using</h3>
                  <div class="section">
                    <Credits data={this.state.credits} />
                  </div>
                </div>
              </div>
            </div>
    <div class="col-sm-6 text-right">&copy; {new Date().getFullYear()} Ganesan Karuppaiya </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.body);

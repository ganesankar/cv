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
                    "color": item.color ? item.color : "#ffffff",
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
      cvdata:[],
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
      ],
      documentDefinition : {
        pageSize: "A4",
        pageOrientation: "potrait",
        defaultStyle: {
          fontSize: 10,
          lineHeight: 1.2
        },
        content: 
        [
          {
            table: 
            {
              headerRows: 1,
              widths: [ '*', '*', '*', '*' ],
              body: [
                [
                  { text: 'Header 1', style: 'tableHeader' }, 
                  { text: 'Header 2', style: 'tableHeader' }, 
                    { text: 'Header 3', style: 'tableHeader' }
                ],
                [
                  { text: 'Hello' }, 
                  { text: 'I' }, 
                  { text: 'am' }
                ],
                [
                  { text: 'a' }, 
                  { text: 'table' }, 
                  { text: '.' }
                ]
              ]
            }
          },
          {
            text: 'pdfmake', style: 'header' 
          },
          'pdfmake does not generate pdfs from the html. Rather, it generates them directly from javascript.',
          'It is very fast, but very limited, especially compared to PHP alternatives.',
          'To get a pdf that looks like the page, you could use html2canvas, which generates an image that can be inserted into the pdf. I think this is a hack and not ideal',
        ],
        styles: 
        {
          header: 
          {
            fontSize: 18,
            bold: true,
            margin: [0, 10, 0, 10],
            alignment: 'center'
          },
          tableHeader: 
          {
            fillColor: '#4CAF50',
            color: 'white'
          }
        }
      }
    };
  }
  componentDidMount() {
    fetch("https://ganesan-cv-reactjs.netlify.app/.netlify/functions/cv-list")
      .then(response => response.json())
      .then(data => {
        const contentdata = [];
        data.forEach(function(item, index) {
          contentdata.push(item.data);
        });
        
        this.setState({ contentdata , loading : false});
        fetch("https://ganesan-cv-reactjs.netlify.app/.netlify/functions/cv-all")
        .then(response => response.json())
        .then(data1 => {
          const cvdata = [];
          data1.forEach(function(item1) {
            cvdata.push(item1.data);
          });
          console.log(cvdata)
          this.setState({ cvdata  });
        });
      });
  }
  downloadPdf = e => {
    pdfMake.createPdf(this.state.ocumentDefinition).download();
  };
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
          {this.state.cvdata && <div class="text-center "> 
          <button class="primary"  onClick={this.downloadPdf}>Primary</button>
          </div>}
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

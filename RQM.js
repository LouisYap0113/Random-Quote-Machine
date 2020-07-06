/*Redux*/
const QUOTE = "quote";

const changeQuote = (newquote) => ({
  type:QUOTE,
  quote:newquote.quote,
  author:newquote.author
});

const defaultq = {quote:"",
                  author:""};

const quoteReducer = (state=defaultq,action) => {
  switch (action.type)
    {
        case QUOTE:
          return ({quote:action.quote,
  author:action.author});
        default:
          return state;
    }
};

const store = Redux.createStore(quoteReducer);

/*React*/

class QuoteMachine extends React.Component {
    constructor(props){
        super(props);
        this.generateNewQuote=this.generateNewQuote.bind(this);
    }

    componentDidMount(){
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json").then(response=>response.json()).then(data =>
       {const currentQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        this.props.generateRandomQuote(currentQuote);
    })};

    generateNewQuote(){
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json").then(response=>response.json()).then(data =>
       {const currentQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        this.props.generateRandomQuote(currentQuote);
    })};

    render(){
        return (
            <div id="quote-box">
                <article>
                    <section id="text">{this.props.quote}</section>
                    <section id="author">{this.props.author}</section>
                </article>
                <div>
                    <section>
                        <a title="Tweet this quote!" id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + this.props.quote + '"  -' + this.props.author)} target="_blank">tweet</a>
                        <a title="Post on your tumblr!" id="tumblr-quote" href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(this.props.author) + '&content=' + encodeURIComponent(this.props.quote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'} target="_blank">tumblr</a>
                    </section>
                    <section>
                        <button id="new-quote" onClick={this.generateNewQuote}>New Quote</button>
                    </section>
                </div>
            </div>
        );
    }
}

/*ReactRedux*/

const mapStateToProps = (state)=>({quote:state.quote,author:state.author});

const mapDispatchToProps = (dispatch) => ({generateRandomQuote:(currentQuote)=>{dispatch(changeQuote(currentQuote))}});

const Container = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(QuoteMachine);

const Provider = ReactRedux.Provider;

class RandomQuoteMachine extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Provider store={store}>
            <Container/>
        </Provider>)
    }
}

ReactDOM.render(<RandomQuoteMachine/>,document.getElementById("RQM"))
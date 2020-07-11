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
        this.state={color:[
            {color1:"hsl(120deg,80%,40%)",color2:"hsl(120deg,100%,50%)",color3:"hsl(120deg,100%,80%)",color4:"hsl(270deg,80%,40%)",color5:"hsl(270deg,100%,50%)"},
            {color1:"hsl(150deg,80%,40%)",color2:"hsl(150deg,100%,50%)",color3:"hsl(150deg,100%,80%)",color4:"hsl(300deg,80%,40%)",color5:"hsl(300deg,100%,50%)"},
            {color1:"hsl(180deg,80%,40%)",color2:"hsl(180deg,100%,50%)",color3:"hsl(180deg,100%,80%)",color4:"hsl(330deg,80%,40%)",color5:"hsl(330deg,100%,50%)"},
            {color1:"hsl(210deg,80%,40%)",color2:"hsl(210deg,100%,50%)",color3:"hsl(210deg,100%,80%)",color4:"hsl(60deg,80%,40%)",color5:"hsl(60deg,100%,50%)"},
        ]};
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
        const colorList = this.state.color[Math.floor(Math.random()*this.state.color.length)];

        const color1 = colorList.color1;
        const color2 = colorList.color2;
        const color3 = colorList.color3;
        const color4 = colorList.color4;
        const color5 = colorList.color5;

        return (
            <div id="quote-box" style={{borderColor:color1,backgroundColor:color3}}>
                <article id="quote-area">
                    <section id="text" style={{color:color5}}><i id="openquote"></i>{this.props.quote}</section>
                    <section id="author" style={{color:color5}}>-{this.props.author}-</section>
                </article>
                <div id="button-area" style={{backgroundColor:color2}}>
                    <section id="share-area">
                        <a title="Tweet this quote!" id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + this.props.quote + '"  -' + this.props.author)} target="_blank"><i id="twittericon" style={{backgroundColor:color4}}></i></a>
                        <a title="Post on your tumblr!" id="tumblr-quote" href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(this.props.author) + '&content=' + encodeURIComponent(this.props.quote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'} target="_blank"><i id="tumblricon" style={{backgroundColor:color4}}></i></a>
                    </section>
                    <section id="newquote-area">
                        <button id="new-quote" title="Generate new quote!" style={{backgroundColor:color4}} onClick={this.generateNewQuote}>New</button>
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

/*jQuery*/

$(document).ready(function(){
    $("#twittericon").addClass("fab fa-twitter");
    $("#tumblricon").addClass("fab fa-tumblr");
    $("#openquote").addClass("fas fa-quote-left");



})
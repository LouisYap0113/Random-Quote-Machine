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
    }

    componentDidMount(){
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json").then(response=>response.json()).then(data =>
       {const currentQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        this.props.generateRandomQuote(currentQuote);
    })};

    render(){
        return (
            <div>
        <p>{this.props.author}</p>
        <p>{this.props.quote}</p>
            </div>
        );
    }
}
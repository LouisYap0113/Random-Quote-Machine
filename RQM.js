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
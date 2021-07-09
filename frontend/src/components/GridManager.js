// This is a proof of concept aimed at solving the following issues:
// 1. The CSS-Grid 1000 row limit 
//    (see https://stackoverflow.com/a/47345676/1096470)
// 2. Lazy data loading - rendering large tables where only a portion of the 
//    data is available at the client side
// 3. Performance issues that naturally occur when rendering very
//    large tables
// 
// The idea here is to only render the rows that are currently 
// visible to the user based on the scroll position.
// The non-visible rows are replaced with a single row that receives
// their total height (this row also receives a gradient background that
// simulates the horizontal row gap to make it look as if the lines are there).
//
// In terms of performance, a table of 100 rows will perform exactly 
// the same as a table with 10K rows.
const ROW_HEIGHT = 40;
const GAP_SIZE = 1;
const ROWS = 10000;
const COLS = 6;
const THRESHOLD = 300; // Represents the delay (in milliseconds) between data updates
const DATA_PADDING = 3; // Represents how much extra data should be rendered before
                        // and after the visibile rows to avoid showing empty rows 
                        // when scrolling. This number is multiplied by the number
                        // of visible rows.

const OptimisticRow = ({rows}) => (
  <React.Fragment>
    {[...new Array(COLS)].map((_, i) => (
      <div key={i} className='table-cell optimistic' style={{height: rows *(ROW_HEIGHT + GAP_SIZE)}}/>
    ))}
  </React.Fragment>
);

const TableCell = ({children, index}) => (
  <div 
    className={`table-cell column-${index}`}>
    {children}
  </div>
);

const TableRow = ({children}) => (
  children
);

class Table extends React.PureComponent {
  
  table = React.createRef();
  state = {from: 0, to: 30};
  previousScrolTop = 0;
  
  getSnapshotBeforeUpdate() {
    return this.table.current.scrollTop;
  }

  componentDidUpdate(prevProps, prevState, scrollTop) {
    // When the visible rows are moved down by changing 
    // the height of the optimistic row above them, the browser automatically
    // scrolls them back into view, which in turn creates another render
    // becuase the onScroll is called, resulting in an infinite loop.
    // To solve this, we get the snapshot before the DOM is updated
    // and check for a mismatch between the scrollTop before and after. 
    // If such a mismatch exists, it means that the scroll 
    // was done by the browser, and not the user, and therefore
    // we apply the scrollTop from the snapshot.
    if (scrollTop !== this.table.current.scrollTop) {
      this.table.current.scrollTop = scrollTop;
    }
  }
  
  debounce = _.debounce((scrollTop, clientHeight) => {
    const maxVisibleRows = Math.ceil(clientHeight / (ROW_HEIGHT + GAP_SIZE));
    const from = Math.max(0, Math.floor(scrollTop / (ROW_HEIGHT + GAP_SIZE)) - maxVisibleRows * DATA_PADDING);
    const to = Math.min(this.props.rows, from + maxVisibleRows * (DATA_PADDING * 2 + 1));
    this.setState({from, to});
  }, THRESHOLD);
  
  handleOnScroll = e => {
    const {scrollTop, clientHeight} = e.target;
    this.debounce(scrollTop, clientHeight);
  };
  
  render() {
    const {children, rows} = this.props;
    const {from, to} = this.state;
    return (
      <div className='table'>
        <div className='header'>
          <TableRow>
            <TableCell index={0}>Index</TableCell>
            {[...new Array(COLS - 1)].map((_, i) => (
              <TableCell index={i + 1} header>Header</TableCell>
            ))}
          </TableRow>
        </div>
        <div className='table-inner' onScroll={this.handleOnScroll} ref={this.table}>
          {from > 0 &&
            <OptimisticRow rows={from}/>}
          {children(from, to)}
          {to < rows &&
            <OptimisticRow rows={rows - to}/>}
        </div>
      </div>
    );
  }
}

class App extends React.PureComponent {
  
  render() {
    return (
      <div className='app'>
        <Table rows={ROWS}>
          {(from, to) => (
            [...new Array(to - from)].map((_, i) => (
              <TableRow key={i} index={i}>
                <TableCell index={0}>{i + from}</TableCell>
                {[...new Array(COLS - 1)].map((_, i) => (
                  <TableCell index={i + 1} key={i}>data</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </Table>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.body
);


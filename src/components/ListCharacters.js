import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
    display: 'none',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

export default class ListCharacters extends Component {

  constructor(){
    super();
    this.state = {
      characters: [],
      rowsPerPage: [5,10,15],
      rows: [],
      numberOfRows: 5,
      page: 1,
      totalPages:1,
      total: undefined,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: 'auto',
    };
  }


  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  componentDidMount(){
    let paginationParam = this.props.match.params.page;
    let paginationText = "";
    if (paginationParam) {
        let paginationOffset = (paginationParam - 1) * 20;
        paginationText = "offset="+paginationOffset+"&";
    }
    let publicKey = sessionStorage.getItem('publicKey');
    let accessKey = sessionStorage.getItem('accessKey');
    let dateNow = sessionStorage.getItem('dateNow');
    fetch('https://gateway.marvel.com/v1/public/characters?'+paginationText+'ts='+dateNow+'&apikey='+publicKey+'&hash='+accessKey)
    .then (data => {
      return data.json();
    }).then(results => {
        if (results.code !== "InvalidCredentials") {
            
          let characters = results.data.results.map((character) => {
            return (
              <TableRow key={character.id}>
                <TableRowColumn>
                  <Link to={{
                    pathname: '/character/'+character.id,
                    state: { fromPage: paginationParam }
                }}
                  >
                    {character.name}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>{character.description}</TableRowColumn>
                <TableRowColumn>{character.modified}</TableRowColumn>
              </TableRow>
            )
          });
          let paginationMarkup = <Pagination page={this.props.match.params.page} resultsTotal={results.data.total} />
          this.setState({characters: characters});
          this.setState({paginationMarkup: paginationMarkup});
        } else {        
            let characters = (<TableRow key="000"><TableRowColumn><Link to={{pathname: '/',}}>Erro nos dados, informe uma chave valida</Link></TableRowColumn></TableRow>);
            this.setState({characters: characters});
        }
    })
  }
 componentWillReceiveProps(){
    let paginationParam = ( this.props.match.params.page ) ? parseInt(this.props.match.params.page,10) + 1 : 1;
    let paginationText = "";
    if (paginationParam) {
        let paginationOffset = (paginationParam - 1) * 20;
        paginationText = "offset="+paginationOffset+"&";
    }
    console.log("pagparam",paginationParam);
    let publicKey = sessionStorage.getItem('publicKey');
    let accessKey = sessionStorage.getItem('accessKey');
    let dateNow = sessionStorage.getItem('dateNow');

    fetch('https://gateway.marvel.com/v1/public/characters?'+paginationText+'ts='+dateNow+'&apikey='+publicKey+'&hash='+accessKey)
    .then (data => {
      return data.json();
    }).then(results => {
        if (results.code !== "InvalidCredentials") {          
          let characters = results.data.results.map((character) => {
            return (
              <TableRow key={character.id}>
                <TableRowColumn>
                  <Link to={{
                    pathname: '/character/'+character.id,
                    state: { fromPage: paginationParam }
                }}
                  >
                    {character.name}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>{character.description}</TableRowColumn>
                <TableRowColumn>{character.modified}</TableRowColumn>
              </TableRow>
            )
          });
          let paginationMarkup = <Pagination page={this.props.match.params.page} resultsTotal={results.data.total} />
          this.setState({characters: characters});
          this.setState({paginationMarkup: paginationMarkup});
        } else {        
            let characters = (<TableRow key="000"><TableRowColumn><Link to={{pathname: '/',}}>Erro nos dados, informe uma chave valida</Link></TableRowColumn></TableRow>);
            this.setState({characters: characters});
        }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar 
            title="Marvel Characters"
            iconElementLeft={<IconButton><Link to={"/"}><IconHome />Home</Link></IconButton>}
        />
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The Name">Character</TableHeaderColumn>
              <TableHeaderColumn tooltip="The D">Description</TableHeaderColumn>
              <TableHeaderColumn tooltip="Date Modified">Last Modified</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.characters}
          </TableBody>
        </Table>
        {this.state.paginationMarkup}

        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
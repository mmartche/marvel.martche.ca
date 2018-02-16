import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconBack from 'material-ui/svg-icons/content/backspace';

const styles = {
    imgRadius: {
        borderRadius: 0
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        overflowY: 'auto',
    },
}


export default class DataCharacter extends Component {

  constructor(props,state){
    super(props,state);
    this.state = {
      character: [],
      backLink: (props.location.state.fromPage) ? props.location.state.fromPage : "",
    };
  }

 componentDidMount(){
  let publicKey = sessionStorage.getItem('publicKey');
  let accessKey = sessionStorage.getItem('accessKey');
  let dateNow = sessionStorage.getItem('dateNow');
  let characterId = this.props.match.params.characterId;
    fetch('https://gateway.marvel.com/v1/public/characters/'+characterId+'/comics?ts='+dateNow+'&apikey='+publicKey+'&hash='+accessKey)
    .then (data => {
      return data.json();
    }).then(results => {
        if (results.data.total !== 0) {
        let character = results.data.results.map((character) => {
          return (
              <Card key={character.id}>
                  <CardHeader
                      title={"Detalhe sobre "+character.title}
                      actAsExpander={true}
                      showExpandableButton={true}
                      />
                  <CardTitle title={character.title} />
                  <CardText expandable={true}>
                  <GridList
                      cellHeight="auto"
                      style={styles.gridList}
                      >
                      <GridTile>
                          <Avatar src={character.thumbnail.path+'/standard_fantastic.'+character.thumbnail.extension} alt="thumbnail" size={250} style={styles.imgRadius} />
                      </GridTile>
                      <GridTile>
                          {character.description}
                      </GridTile>
                      </GridList>
                  </CardText>
              </Card>
          )
        })
        this.setState({character: character});
      } else {
        let character = (<div>Não tem dados a ser exibido deste Personagem</div>);
            this.setState({character: character});
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider className="container">
      <div>
      <AppBar 
            title="Marvel Character"
            iconElementLeft={<IconButton><Link to={"/list-characters/"+this.state.backLink}><IconBack />Voltar</Link></IconButton>}
      />
          { this.state.character }
      </div>
      </MuiThemeProvider>
    );
  }
}
import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconFirstPage from 'material-ui/svg-icons/navigation/first-page';
import IconPreviousPage from 'material-ui/svg-icons/navigation/chevron-left';
import IconNextPage from 'material-ui/svg-icons/navigation/chevron-right';
import IconLastPage from 'material-ui/svg-icons/navigation/last-page';
import IconActualPage from 'material-ui/svg-icons/navigation/more-horiz';
import { Link } from 'react-router-dom';

const iconFirstPage = <IconFirstPage />;
const iconPreviousPage = <IconPreviousPage />;
const iconNextPage = <IconNextPage />;
const iconLastPage = <IconLastPage />;
const iconActualPage = <IconActualPage />;

export default class Pagination extends Component {


constructor(props){
	super(props);
	let actualPage = this.props.page ? parseInt(this.props.page,10) : 1;
	let totalPages = this.props.resultsTotal;
	let calcPages = Math.round( parseInt(totalPages,10) / 20 ) ;
	let previousPage = ( actualPage !== 1 ) ? actualPage - 1 : "";
	let nextPage = actualPage + 1;
    this.state = {
    	previousPage: previousPage,
    	nextPage: nextPage,
		actualPage: actualPage,
		calcPages: calcPages,
	}
	this.actualPage = actualPage;
	this.previousPageMarkup = <Link to={'/list-characters/'+previousPage} > <BottomNavigationItem label={'Anterior ( '+previousPage+' )'} icon={iconPreviousPage}/> </Link>;
	this.nextPageMarkup = <Link to={'/list-characters/'+nextPage} > <BottomNavigationItem label={'Proximo ( '+nextPage+' )'} icon={iconNextPage} /> </Link>;
	this.lastPageMarkup = <Link to={'/list-characters/'+calcPages} > <BottomNavigationItem label={'Ultima ( '+calcPages+' )'} icon={iconLastPage} /> </Link>;
}

 	componentWillReceiveProps(){
 		let actualPage = this.props.page ? parseInt(this.props.page,10) : 1;
 		actualPage++;
		let totalPages = this.props.resultsTotal;
		let calcPages = Math.round( parseInt(totalPages,10) / 20 ) ;
		let previousPage = ( actualPage !== 1 ) ? actualPage - 1 : "";
		let nextPage = actualPage + 1;
		this.setState = {
			newpa: nextPage,
	    	previousPage: previousPage,
	    	nextPage: nextPage,
			actualPage: actualPage,
			calcPages: calcPages,
		}
	this.actualPage = actualPage;
	this.previousPageMarkup = <Link to={'/list-characters/'+previousPage} > <BottomNavigationItem label={'Anterior ( '+previousPage+' )'} icon={iconPreviousPage}/> </Link>;
	this.nextPageMarkup = <Link to={'/list-characters/'+nextPage} > <BottomNavigationItem label={'Proximo ( '+nextPage+' )'} icon={iconNextPage} /> </Link>;
	this.lastPageMarkup = <Link to={'/list-characters/'+calcPages} > <BottomNavigationItem label={'Ultima ( '+calcPages+' )'} icon={iconLastPage} /> </Link>;
 	}
	render(){
		return (
			<div>
			<Paper zDepth={1}>

				<BottomNavigation selectedIndex={this.state.selectedIndex}>
					<Link to='/list-characters'>
					<BottomNavigationItem
						label="Primeira Página"
						icon={iconFirstPage}
						href="/list-characters"
						/>
					</Link>
					{ this.previousPageMarkup }
					<BottomNavigationItem label={'Página Atual ( '+this.actualPage+' )'} icon={iconActualPage}/>
					{this.nextPageMarkup}
					{this.lastPageMarkup}
				</BottomNavigation>
			</Paper>
			</div>
		)
	}
}
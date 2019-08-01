import React from 'react';
import Loading from '../../../../loading';
import {Row, Col} from 'react-bootstrap';
import styles from './Trend.module.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MonthlyTrend from '../containers/MonthlyTrend';
import WeeklyTrend from '../containers/WeeklyTrend';
import DailyTrend from '../containers/DailyTrend';


export default class Trends extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpenProduct:false,
            selectedTrend: this.props.trends[0],
            trends: this.props.trends,
            selectedProduct:this.props.teams[0],
            products:this.props.teams,
        };
    }

    
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggleProduct = () => {
        this.setState(prevState => ({
            dropdownOpenProduct: !prevState.dropdownOpenProduct
        }));
    }

    changeTrend = (trend) => {
        if(this.state.selectedTrend!=trend){
        this.setState({
            ...this.state,
            selectedTrend: trend
        });

        if (this.state.selectedTrend === 'Monthly')
            this.props.actions.dae_invalidateMonthlyIncidentsData();
        if (this.state.selectedTrend === 'Weekly')
            this.props.actions.dae_invalidateWeeklyIncidentsData();
        if (this.state.selectedTrend === 'Daily')
            this.props.actions.dae_invalidateDailyIncidentsData();
    }
    }
    changeProduct = (product) => {
        if(this.state.selectedProduct!=product){
        this.setState({
            ...this.state,
            selectedProduct: product
        });
        if(this.state.selectedTrend==='Monthly')
            this.props.actions.dae_invalidateMonthlyIncidentsData();
        if (this.state.selectedTrend === 'Weekly')
             this.props.actions.dae_invalidateWeeklyIncidentsData();
        if (this.state.selectedTrend === 'Daily')
             this.props.actions.dae_invalidateDailyIncidentsData();
    }
}
    

    render(){
        
            return <div>
            <Loading loading={false}/>
            <Row>
                <Col lg={12} className="text-left">
                    <label>Trend</label>
                    <Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.selectedTrend}
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Teams</DropdownItem>
                        {this.state.trends.map(team => {
                            return (<DropdownItem key={team} onClick={() => this.changeTrend(team)}>{team}</DropdownItem>);
                        })}
                        </DropdownMenu>
                    </Dropdown>
                    &emsp;
                    <label> Product</label>
                    <Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpenProduct} toggle={this.toggleProduct}>
                        <DropdownToggle caret>
                            {this.state.selectedProduct}
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Teams</DropdownItem>
                        {this.state.products.map(team => {
                            return (<DropdownItem key={team} onClick={() => this.changeProduct(team)}>{team}</DropdownItem>);
                        })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
           
               { <TrendComponent product={this.state.selectedProduct} trend={this.state.selectedTrend}></TrendComponent> }
             

            
        </div>
        }
            
       
}
function TrendComponent(props) {
        console.log('props of trend component');
        console.log(props);
        const value = props.trend;
        if (value === 'Monthly')
            return <MonthlyTrend product={props.product}
                                 key={props.product}> 
                    </MonthlyTrend>
         if (value === 'Daily')
            return <DailyTrend product={props.product}
                                 key={props.product}> 
                    </DailyTrend>
         if (value === 'Weekly')
            return <WeeklyTrend product={props.product}
                                 key={props.product}> 
                    </WeeklyTrend>
       

    }
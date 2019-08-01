import React from 'react';
import Loading from '../../loading';
import { Row, Col } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SprintVelocity extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            teamId:1,
            teamName: "Chat team 1",
            numberOfRecords:5,
            teams:[
                {
                    "id":1,
                    "name":"Chat team 1"
                },
                {
                    "id":2,
                    "name":"Chat team 2"
                },
                {
                    "id":3,
                    "name":"Chat team 3"
                },
                {
                    "id":4,
                    "name":"ACS Client Commit"
                }
            ],
            isAgilityDataAvailable:false
        };
	} 

    componentDidMount(){
		if (!this.props.isAgilityDataAvailable) {
			this.props.actions.loadAgilityData(this.state.teamId, this.state.numberOfRecords);
		}
    }
    
 mapAgilityDataToChartData = (agilityData) => {
     let ArrayColumn = (arr, n) => arr.map(x => x[n]);
     let preditability = ArrayColumn(agilityData.predictabilityData, 0)
     let options = {
         chart: {
             zoomType: 'xy',
             height: this.props.chartHeight === undefined ? 300 : this.props.chartHeight,
             width: this.props.chartWidth === undefined ? 300 : this.props.chartWidth
         },
         title: {
             text: this.props.displayNames === undefined ? agilityData.teamName : '',
             style: {
                 fontSize: '15px'
             }
         },
         subtitle: {
             text: this.props.displayNames === undefined ? 'Normalized velocity' : ''
             
         },
         xAxis: [{
             categories: agilityData.sprintNames,
             crosshair: true,
             labels:{
                 enabled: this.props.displayNames === undefined ? true: false
             }
         }],
         yAxis: [{ // Secondary yAxis
                 plotLines: [{
                     value: 80,
                     color: '#FFC107',
                     width: 2,
                     zIndex: 3,
                     label: {
                         text: ''
                     }
                 }, {
                     value: 110,
                     color: '#FFC107',
                     width: 2,
                     zIndex: 3,
                     label: {
                         text: ''
                     }
                 }],
                 min: 0,
                 max: Math.max(120, preditability.sort(function (a, b) {
                     return b - a
                 })[0]),
                 gridLineWidth: 0,
                 title: {
                     text: 'Predictability',
                     style: {
                         color: Highcharts.getOptions().colors[0]
                     }
                 },
                 labels: {
                     format: '{value} ',
                     style: {
                         color: Highcharts.getOptions().colors[0]
                     }
                 }

             },
             { // Primary yAxis
                 labels: {
                     format: '{value}',
                     style: {
                         color: Highcharts.getOptions().colors[2]
                     }
                 },
                 title: {
                     text: 'Normalised',
                     style: {
                         color: Highcharts.getOptions().colors[2]
                     }
                 },
                 opposite: true

             }
         ],
         tooltip: {
             shared: true
         },
         plotOptions: {
             line: {
                 dataLabels: {
                     enabled: false,
                     color: '#505A90',
                     shadow: false
                 }
             },
             column: {
                 dataLabels: {
                     enabled: false
                 }
             }
         },
         series: [{
             showInLegend: false,
             name: 'Predictability',
             type: 'column',
             keys: ['y', 'color'],
             data: agilityData.predictabilityData
         }, {
             showInLegend: false,
             name: 'Normalised',
             type: 'line',
             yAxis: 1,
             data: agilityData.normalizedData,
             color: '#505A90',
                 marker: {
                     enabled: false
                 }
         }],
         credits: {
             enabled: false
         }
     };
     return options;
 }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeTeam = (teamId, teamName) => {
        if (this.state.teamId !== teamId) {
			this.props.actions.loadAgilityData(teamId, this.state.numberOfRecords);
		}
        this.setState({
            ...this.state,
            teamId:teamId,
            teamName:teamName
        });
        
    }
    render(){
        if (!this.props.isAgilityDataAvailable) {
            return (
			    <Loading loading={true}/>
            );
        }
        else{
            let velocityOptions = this.mapAgilityDataToChartData(this.props.agilityData);
            return(
                <div style={{'backgroundColor':'white'}}>
				    <Loading loading={false}/>
                      <div style={{'fontSize':'16px','paddingLeft':'20px'}}><b>Agility</b></div>
                    {/* <Row>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {this.state.teamName}
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem header>Teams</DropdownItem>
                            {this.state.teams.map(team => {
                                return (<DropdownItem key={team.id} onClick={() => this.changeTeam(team.id, team.name)}>{team.name}</DropdownItem>);
                            })}
                            </DropdownMenu>
                        </Dropdown>
                    </Row> */}
                    <Row>
                        <Col lg="12">
                            <HighchartsReact highcharts={Highcharts} options={velocityOptions}/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}
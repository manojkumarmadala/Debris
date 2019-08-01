import React from 'react';
import Loading from '../../loading';
import { Row, Col } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './Agility.module.css';

export default class Agility extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            isAgilityDataAvailable:false,
            selectedTeam:this.props.selectedTeam
        };
	} 

    componentDidMount(){
        console.log('props of agility component')
        console.log(this.props);
		if (!this.props.isAgilityDataAvailable) {
			this.props.actions.loadAgilityData(this.props.selectedTeam.id, this.props.numberOfRecords);
		}
    }
    
   mapAgilityDataToSprintVelocity = (agilityData) => {
    // let ArrayColumn = (arr, n) => arr.map(x => x[n]);
    // let preditability = ArrayColumn(agilityData.predictabilityData, 0)
    let options = {
        chart: {
            type: 'column',
        },
        title: {
            text: agilityData.teamName,
             style: {
                     fontSize: '15px'
             }
        },
        subtitle: {
            text: 'Sprint velocity'
        },
        xAxis: [{
            categories: agilityData.sprintNames,
            crosshair: true
        }],
        yAxis: [
           
            { // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false

        }],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                showInLegend:false,
                name: 'Commited',
                type: 'column',
                keys:['y','color'],
                data: agilityData.commitedData,
                color:'#7cb5ec'
            },
            {
                showInLegend: false,
                name: 'Completed',
                type: 'column',
                data: agilityData.completedData,
                color: '#505A90'
            }  
        ],
            credits: {
                enabled: false
            }
    };
    return options;
   };

    mapAgilityDataToChartData = (agilityData) => {
         let ArrayColumn = (arr, n) => arr.map(x => x[n]);
         let preditability = ArrayColumn(agilityData.predictabilityData, 0)
        let options = {
            chart: {
                zoomType: 'xy',
            },
            title: {
                text: agilityData.teamName,
                 style: {
                         fontSize: '15px'
                 }
            },
            subtitle: {
                text: 'Normalized velocity'
            },
            xAxis: [{
                categories: agilityData.sprintNames,
                crosshair: true
            }],
            yAxis: [
                { // Secondary yAxis
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
                    min:0,
                    max:Math.max(120,preditability.sort(function(a,b){return b-a})[0]),
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

            }],
            tooltip: {
                shared: true
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        color: '#505A90',
                        shadow: false
                    }
                },
                column: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                            showInLegend:false,
                            name: 'Predictability',
                            type: 'column',
                            keys:['y','color'],
                            data: agilityData.predictabilityData
                        } ,{
                showInLegend: false,
                name: 'Normalised',
                type: 'line',
                yAxis: 1,
                data: agilityData.normalizedData,
                color: '#505A90'
             }  ],
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

    changeTeam = (team) => {
        if (this.state.selectedTeam.id !== team.id) {
            this.props.actions.invalidateAgilityData();
			this.props.actions.loadAgilityData(team.id, this.props.numberOfRecords);
		}
        this.setState({
            ...this.state,
            selectedTeam:{...team}
        });
        
    }
    render(){
        if (!this.props.isAgilityDataAvailable) {
            return (
			    <Loading loading={true}/>
            );
        }
        else{
            // console.log('agility');
            // console.log(this.props.agilityData);

            let predictabilityOptions = this.mapAgilityDataToChartData(this.props.agilityData);
            let velocityOptions = this.mapAgilityDataToSprintVelocity(this.props.agilityData);
            return(
                <div className={"sideNavAvailable"}>
                    <Loading loading={false}/>
                    <Row>
                        <Col lg="12" className="text-center">
                            <label>Team</label>
                            <Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    {this.state.selectedTeam.name}
                                </DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem header>Teams</DropdownItem>
                                {this.props.teams.map(team => {
                                    return (<DropdownItem key={team.id} onClick={() => this.changeTeam(team)}>{team.name}</DropdownItem>);
                                })}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row style={{'display':'table-row'}}>
                    <div style={{'display':'table-cell'}}>
                        <HighchartsReact highcharts={Highcharts} options={predictabilityOptions}/>
                    </div>
                    <div style={{'display':'table-cell','paddingLeft':'5px'}}>
                        <HighchartsReact highcharts={Highcharts} options={velocityOptions}/>
                    </div>
                    </Row>
                </div>
            );
        }
    }
}
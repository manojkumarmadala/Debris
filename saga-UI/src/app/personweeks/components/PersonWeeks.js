import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Form, FormGroup,FormFeedback,Label,ButtonGroup,Input,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Loading from '../../loading';
import styles from './PersonWeeks.module.css';

export default class PersonWeeks extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			pillar: 'Assisted and Central Services',
			boardindex:0,
			sprintindex:0,
			dropdownBoardsOpen: false,
			dropdownSprintsOpen: false,
			personweeks:0,
			validatePersonWeeks:false
		};
		this.toggle = this.toggle.bind(this);
		this.submit = this.submit.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
		this.toggleBoardsDropdown = this.toggleBoardsDropdown.bind(this);
		this.toggleSprintsDropdown = this.toggleSprintsDropdown.bind(this);
	}
    
	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}
	submit() {
		let SprintVelocity = this.props.personWeeksData.velocity[this.state.boardindex][this.state.sprintindex]
		let data={
			'SprintName':this.props.personWeeksData.sprints[this.state.boardindex][this.state.sprintindex],
			'NoOfPersonWeeks':this.state.personweeks,
			'NormalizedVelocity':Math.round((SprintVelocity/this.state.personweeks),1),
			'SprintVelocity':SprintVelocity

		};
		if(this.state.validatePersonWeeks){
		this.props.actions.updatePersonWeeksData(data);
		}
		else{
			
		}
	}

	updateInputValue = (evt)=> {
    this.setState({
      personweeks: evt.target.value
		});
		if(evt.target.value>0){
			this.setState({
				validatePersonWeeks:true
			});
		}
		else
				this.setState({
				validatePersonWeeks:false
			});
			}

	onPillarClick(selected) {
		
		this.setState({ pillar: selected ,boardindex:0,sprintindex:0});
		
		this.props.actions.invalidatePersonweeksData();
	}

	onBoardClick(selected){
		this.setState({boardindex:selected});
	}
	onSprintClick(selected){
		this.setState({sprintindex:selected});
	}
    
	componentDidMount(){
		console.log('props of personweeks component');
		console.log(this.props);
		
		if (!this.props.isPersonWeeksDataAvailable) {

			this.props.actions.loadPersonWeeksData(this.state.pillar);
		}
	}

	componentDidUpdate(){
		if (!this.props.isPersonWeeksDataAvailable) {
			this.props.actions.loadPersonWeeksData(this.state.pillar);
		}
	}
	toggleBoardsDropdown() {
		this.setState({
			dropdownBoardsOpen: !this.state.dropdownBoardsOpen});
	}

	toggleSprintsDropdown() {
		this.setState({
			dropdownSprintsOpen: !this.state.dropdownSprintsOpen
		});
	}

	render(){
		let Sprints =(props)=>{
			if(!props.isPersonWeeksDataAvailable){
				return (
					<div>
						<Loading loading={true}/>
					</div>
				);
			}
			return (
				<DropdownMenu>
					{
						Object.keys(props.personWeeksData.sprints[props.boardindex]).map(item => {
							return <DropdownItem key={item} onClick={() => this.onSprintClick(item)}>{props.personWeeksData.sprints[props.boardindex][item]}</DropdownItem>;
						})
					}

				</DropdownMenu>
			);


		};
		let Boards =(props)=>{
			if(!props.isPersonWeeksDataAvailable){
				return (
					<div>
						<Loading loading={true}/>
					</div>
				);
			}
			return (
				<DropdownMenu>
					{
						Object.keys(props.personWeeksData.boards).map(item => {
							return <DropdownItem key={item} onClick={() => this.onBoardClick(item)}>{props.personWeeksData.boards[item]}</DropdownItem>;
						})
					}

				</DropdownMenu>
			);


		};
		if (!this.props.loading) {
			return (
				<div>
					<Loading loading={true}/>
				</div>
			);
		}
        
		return <div>
			<Button color="danger" onClick={this.toggle}>Modal</Button>
			<Modal isOpen={this.state.modal} toggle={this.toggle} >
				<ModalHeader toggle={this.toggle}>Enter Persor Weeks</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label><b>Pillar</b> </Label>
							<ButtonGroup className={styles.buttonGroup}>
								<Button color="primary" onClick={() => this.onPillarClick('Assisted and Central Services')} className={this.state.pillar.includes('Assisted and Central Services')?styles.active:styles.inactive}>Assisted and Central Services</Button>
								<Button color="primary" onClick={() => this.onPillarClick('Platform - Data Analytics')} className={this.state.pillar.includes('Platform - Data Analytics')?styles.active:styles.inactive}>DataAnalytics</Button>
								<Button color="primary" onClick={() => this.onPillarClick('AIVA')} className={this.state.pillar.includes('AIVA')?styles.active:styles.inactive}>Assisted Initiatives</Button>
							</ButtonGroup>
						</FormGroup>
						<FormGroup>
							<Label><b>Boards</b> </Label>
							<Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownBoardsOpen} toggle={this.toggleBoardsDropdown}>
								<DropdownToggle caret>
									{this.props.personWeeksData.boards[this.state.boardindex]}
								</DropdownToggle>
								<Boards isPersonWeeksDataAvailable={this.props.isPersonWeeksDataAvailable} personWeeksData={this.props.personWeeksData} boardindex={this.state.boardindex}> </Boards> 
								
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Label><b>Sprints</b> </Label>
							<Dropdown className={styles.teamDropDownButton} isOpen={this.state.dropdownSprintsOpen} toggle={this.toggleSprintsDropdown}>
								<DropdownToggle caret>
									{this.props.personWeeksData.sprints[this.state.boardindex][this.state.sprintindex]}
								</DropdownToggle>
								<Sprints isPersonWeeksDataAvailable={this.props.isPersonWeeksDataAvailable} personWeeksData={this.props.personWeeksData} boardindex={this.state.boardindex}> </Sprints> 
						
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Label><b>PersonWeeks</b> </Label>
							<Input valid={this.state.validatePersonWeeks} invalid={!this.state.validatePersonWeeks} type="number"  name="number"  id="exampleNumber" value={this.state.personweeks} onChange={this.updateInputValue} placeholder="Enter Person Weeks" required/>
							
							<FormFeedback invalid>
								Enter a valid value greater than zero
							</FormFeedback>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submit}>Submit</Button>{' '}
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</div>;
	}
}



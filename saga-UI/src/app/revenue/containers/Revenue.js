import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Revenue from '../components/Revenue';


const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state, props) => {
	return {
		
		isRevenueDataAvailable: state.RevenueReducer.isRevenueDataAvailable,
		revenueData: state.RevenueReducer.revenueData,
		renderTable: props.renderTable,
		chartHeight:props.chartHeight
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Revenue);
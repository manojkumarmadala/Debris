import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../state/actions';
import Home from '../components/Home';

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};
  

const mapStateToProps = (state) => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);
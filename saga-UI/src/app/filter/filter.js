import React from 'react';
import { Row, Col } from 'reactstrap';
import DatePicker from './DatePicker';
import ClientDropDown from './ClientSelector';

class Filter extends React.Component {    

    componentDidMount(){

    }

    render(){
        return(
            <div>
            <Row>
                <Col lg="6">
                    <ClientDropDown />
                </Col>
                <Col lg="6">
                    <DatePicker />
                </Col>
            </Row>
            </div>
        );
    }
}

export default Filter;
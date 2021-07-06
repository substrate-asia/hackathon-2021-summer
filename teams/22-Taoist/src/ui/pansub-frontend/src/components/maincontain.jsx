import { Row, Col } from 'antd';
import List from './list';
import UploadFile from './uploadfile';

export default function Maincontain(){
    return(<div className='maincontain'>
        <Row className='overAuto'>
            <Col span={12} className='h100'>
                <div className="title">File List</div>
                <List />
            </Col>
            <Col span={12} className='uploadBrdr'>
                <UploadFile />
            </Col>
        </Row>
    </div>)
}

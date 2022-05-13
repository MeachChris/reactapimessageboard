import Header from '../components/Header.js';
import MessageFormHandler from '../components/MessageFormHandler.js';
import Footer from '../components/Footer';
import{ Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export async function getStaticProps() {
    let jsonData;
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/messages`);
        jsonData = data;
    } catch (error) {
        console.log('API Error: ' + error);
    }
    return {
        props: {
            jsonData
        }
    }
}

export default function Home({jsonData}) {
  
  return (
    <>
      <Container >
          <Row className="justify-content-center">
              <Col lg={8}>
                  <Header  />
              </Col>
          </Row>
          <Row className="justify-content-center">
              <Col lg={8}>
                  <MessageFormHandler jsonData={jsonData}/>
              </Col>
          </Row>
          <Row className="justify-content-center">
              <Col lg={8}>
                  <Footer />
              </Col>
          </Row>
      </Container>
    </>
  )
}

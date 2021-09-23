import { useTexts } from "@/lib/hooks";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import {
    Container,
    Row,
    Col,
    Alert,
    Button,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Nav,
} from "react-bootstrap";
import CustomNavbar from "@/components/NavBarOld";

const _template = () => {
    const { t } = useTexts();
    return (
        <>
            <CustomNavbar t={t} />
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col>
                        <p>Yay, its fluid!</p>
                    </Col>
                    <Col>Hi?</Col>
                    <Col>
                        <Alert variant="success">
                            <Alert.Heading>Hows it going?!</Alert.Heading>
                            <p>
                                Duis mollis, est non commodo luctus, nisi erat
                                porttitor ligula, eget lacinia odio sem nec
                                elit. Cras mattis consectetur purus sit amet
                                fermentum.
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => {}}
                                    variant="outline-success"
                                >
                                    Close me yall!
                                </Button>
                            </div>
                        </Alert>
                    </Col>
                    <Col>
                        <Alert
                            variant="danger"
                            onClose={() => console.log("Ok?")}
                            closeLabel={"hi"}
                            dismissible
                        >
                            <Alert.Heading>
                                Oh snap! You got an error!
                            </Alert.Heading>
                            <p>
                                Change this and that and try again. Duis mollis,
                                est non commodo luctus, nisi erat porttitor
                                ligula, eget lacinia odio sem nec elit. Cras
                                mattis consectetur purus sit amet fermentum.
                            </p>
                        </Alert>
                    </Col>
                    <Col>
                        <Alert variant="warning">
                            This is a alert—check it out!
                        </Alert>
                    </Col>
                </Row>
            </Container>
            <div>Enter :: {t("hi")}</div>
        </>
    );
};

export const getStaticProps = getStaticPropsOnlyTexts;

export default _template;

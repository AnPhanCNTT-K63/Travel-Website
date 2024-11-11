import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "../../Headers/UserHeader.js";

const Profile = () => {
  return (
    <>
      {/* Page content */}
      <UserHeader />

      <Container className="mt--7" fluid style={containerStyle}>
        <Row className="justify-content-center" style={{ marginTop: "-3rem" }}>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow" style={cardProfileStyle}>
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div
                    className="card-profile-image"
                    style={cardProfileImageStyle}
                  >
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src="/team-4-800x800.jpg"
                        style={imgStyle}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-0 pt-md-4" style={cardBodyStyle}>
                <Row>
                  <div className="col">
                    <div
                      className="card-profile-stats d-flex justify-content-center mt-md-5"
                      style={cardStatsStyle}
                    >
                      <div>
                        <span className="heading">22 </span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10 </span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89 </span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3 style={nameStyle}>
                    Jessica Jones
                    <span className="font-weight-light" style={lightFontStyle}>
                      , 27
                    </span>
                  </h3>
                  <div className="h5 font-weight-300" style={locationStyle}>
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4" style={jobStyle}>
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div style={educationStyle}>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p style={descriptionStyle}>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    style={showMoreLinkStyle}
                  >
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow" style={settingsCardStyle}>
              <CardHeader
                className="bg-white border-0"
                style={cardHeaderStyle}
              ></CardHeader>
              <CardBody style={cardBodyStyle}>
                <Form>
                  <h6
                    className="heading-small text-muted mb-4"
                    style={headingStyle}
                  >
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6
                    className="heading-small text-muted mb-4"
                    style={headingStyle}
                  >
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6
                    className="heading-small text-muted mb-4"
                    style={headingStyle}
                  >
                    About me
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                        type="textarea"
                        style={textareaStyle}
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center" style={buttonContainerStyle}>
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      style={buttonStyle}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

// Inline Styles
const cardProfileStyle = {
  borderRadius: "20px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

const cardProfileImageStyle = {
  position: "relative", // Set relative positioning on the parent to control absolute child positioning
  height: "200px",
  width: "200px",
};

const imgStyle = {
  position: "absolute", // Make the image position absolute
  top: "-30%", // Push the image upwards to overlap
  left: "-30%", // Push the image left to overlap
  width: "100%", // Increase the size of the image
  height: "100%", // Ensure it covers the full height
  objectFit: "cover", // Keep the aspect ratio and cover the area
  borderRadius: "50%", // Keep it rounded
  border: "3px solid white", // Optional border for the image
  zIndex: 10, // Ensure the image is above the other content
};

const cardHeaderStyle = {
  backgroundColor: "#f7f7f7",
  borderRadius: "20px",
  padding: "1rem 2rem",
};

const buttonStyle = {
  borderRadius: "50px",
};

const cardBodyStyle = {
  backgroundColor: "#ffffff", // Light background color
  borderColor: "#f0f0f0", // Subtle border color
  color: "#333", // Text color (dark gray)
  padding: "2rem",
  marginTop: "-90px",
};

const cardStatsStyle = {
  display: "flex",
  justifyContent: "space-around", // Space out the items evenly
  marginTop: "2rem",
  marginBottom: "2rem",
  flexDirection: "row", // Ensure horizontal layout
  alignItems: "center", // Align items vertically centered
  gap: "1rem", // Add gap between the items (adjust as necessary)
};

const nameStyle = {
  fontWeight: "600",
  fontSize: "2rem",
  color: "#333",
};

const lightFontStyle = {
  fontWeight: "300",
};

const locationStyle = {
  color: "#777",
};

const jobStyle = {
  color: "#777",
};

const educationStyle = {
  color: "#777",
};

const descriptionStyle = {
  color: "#777",
};

const showMoreLinkStyle = {
  color: "#4c9e9e",
};

const settingsCardStyle = {
  borderRadius: "20px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  fontWeight: "500",
  fontSize: "1.2rem",
  color: "#4c9e9e",
};

const inputStyle = {
  borderRadius: "10px",
  boxShadow: "none",
  border: "1px solid #ddd",
  padding: "0.75rem 1rem",
  fontSize: "1rem",
};

const textareaStyle = {
  resize: "none",
  minHeight: "100px",
};

const buttonContainerStyle = {
  marginTop: "2rem",
};

const containerStyle = {
  maxWidth: "1200px", // Limit the container width to center the layout
  margin: "0 auto", // Center the container
  padding: "0 1.5rem", // Add some padding for smaller screens
};

export default Profile;

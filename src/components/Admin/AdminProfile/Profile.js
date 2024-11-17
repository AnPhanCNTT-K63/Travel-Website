import React, { useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../../UserContext.js";
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
  CardFooter,
} from "reactstrap";
import AdminHeader from "./AdminHeader.js"; // Assuming it's a header component
import PostList from "./PostList.js"; // Display posts

export default function AdminProfile() {
  const postsSectionRef = useRef(null);
  const location = useLocation();
  const user = useContext(UserContext);
  console.log(user.email);

  useEffect(() => {
    if (location.hash === "#posts" && postsSectionRef.current) {
      postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <AdminHeader />

      <Container fluid style={containerStyle}>
        <Row className="justify-content-center">
          <Col xl="4" md="6">
            <Card className="card-profile shadow-sm" style={cardProfileStyle}>
              <Row className="justify-content-center">
                <Col lg="3">
                  <div
                    className="card-profile-image"
                    style={cardProfileImageStyle}
                  >
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="Admin"
                        className="rounded-circle"
                        src="/admin-avatar.jpg"
                        style={imgStyle}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody style={cardBodyStyle}>
                <div className="text-center">
                  <h3 style={nameStyle}>
                    John Doe
                    <span className="font-weight-light" style={lightFontStyle}>
                      , 45
                    </span>
                  </h3>
                  <div className="h5 font-weight-300" style={locationStyle}>
                    <i className="ni location_pin mr-2" />
                    New York, USA
                  </div>
                  <div className="h5 mt-4" style={jobStyle}>
                    <i className="ni business_briefcase-24 mr-2" />
                    Senior Admin - Tech Solutions
                  </div>
                  <div style={educationStyle}>
                    <i className="ni education_hat mr-2" />
                    Harvard University
                  </div>
                </div>

                <hr className="my-4" />
                <p style={descriptionStyle}>
                  Passionate about technology, innovation, and improving user
                  experience. Leading teams to provide impactful solutions.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xl="8" md="6">
            <Card className="bg-light shadow-sm" style={settingsCardStyle}>
              <CardHeader className="bg-white border-0" style={cardHeaderStyle}>
                <h3 className="mb-0">Admin Settings</h3>
              </CardHeader>
              <CardBody style={cardBodyStyle}>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    General Information
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
                            defaultValue={user.username}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled
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
                            defaultValue={user.email}
                            type="email"
                            style={inputStyle}
                            disabled // Disable the input field
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Contact Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="Phone Number"
                            type="text"
                            style={inputStyle}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <Row>
                    <Col className="text-center" md="12">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        style={buttonStyle}
                      >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Post Section */}
      <div ref={postsSectionRef} id="posts">
        <PostList />
      </div>
    </>
  );
}

// Improved styles for a more professional and polished look
const containerStyle = {
  paddingTop: "4rem",
  paddingBottom: "4rem",
};

const cardProfileStyle = {
  borderRadius: "10px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

const cardProfileImageStyle = {
  overflow: "hidden",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardBodyStyle = {
  padding: "2rem 3rem",
};

const nameStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
};

const lightFontStyle = {
  fontWeight: "normal",
  color: "#777",
};

const locationStyle = {
  fontSize: "1.1rem",
  color: "#555",
};

const jobStyle = {
  fontSize: "1.1rem",
  color: "#555",
};

const educationStyle = {
  fontSize: "1.1rem",
  color: "#555",
};

const descriptionStyle = {
  fontSize: "1.1rem",
  color: "#555",
};

const settingsCardStyle = {
  borderRadius: "10px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

const cardHeaderStyle = {
  borderBottom: "2px solid #f3f3f3",
};

const inputStyle = {
  borderRadius: "8px",
  padding: "0.75rem",
};

const buttonStyle = {
  borderRadius: "8px",
  padding: "0.75rem 2rem",
  fontSize: "1.2rem",
};

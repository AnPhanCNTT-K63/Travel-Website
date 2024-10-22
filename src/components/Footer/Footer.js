import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "react-bootstrap/Image";

export default function Footer() {
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBFooter
        bgColor="f0f2f5"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
            <div>
              <a href="" className="me-4 text-reset">
                <FacebookIcon />
              </a>
              <a href="" className="me-4 text-reset">
                <TwitterIcon />
              </a>
              <a href="" className="me-4 text-reset">
                <GoogleIcon />
              </a>
              <a href="" className="me-4 text-reset">
                <InstagramIcon />
              </a>
              <a href="" className="me-4 text-reset">
                <LinkedInIcon />
              </a>
              <a href="" className="me-4 text-reset">
                <GitHubIcon />
              </a>
            </div>
          </div>
        </section>

        <MDBRow className="mt-3">
          <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <Image
              src="/logo.jpg"
              style={{ width: "250px", height: "250px" }}
              roundedCircle
            />
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <MDBIcon icon="gem" className="me-3" />
              VVBA
            </h6>
            <p>
              Sign up for our mailing list to get latest updates and offers.
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
            <p>
              <a href="#!" className="text-reset">
                About us
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Careers
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Terms of Use
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Privacy Statement
              </a>
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <a href="#!" className="text-reset">
                Investor Relations
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Account
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Legal
              </a>
            </p>
            <p>
              <a href="#!" className="text-reset">
                Help
              </a>
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-2" />
              Phan Duc An
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              info@example.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
            </p>
            <p>
              <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
            </p>
          </MDBCol>
        </MDBRow>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <a
            className="text-reset fw-bold"
            href="https://mdbootstrap.com/"
            style={{ marginLeft: "10px" }}
          >
            Nhom bai tap lon
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

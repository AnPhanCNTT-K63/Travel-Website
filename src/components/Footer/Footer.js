import React from "react";
import { MDBFooter, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "react-bootstrap/Image";

export default function Footer() {
  return (
    <div style={{ marginTop: "50px" }}>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        {/* Footer Content */}
        <section className="py-4">
          <MDBRow className="gy-4">
            {/* Logo and Info */}
            <MDBCol md="3" lg="3" xl="3" className="mx-auto text-center">
              <Image
                src="/logo.jpg"
                style={{ width: "120px", height: "120px" }}
                roundedCircle
              />
              <h6 className="mt-3 text-uppercase fw-bold">VVBA</h6>
              <p className="text-muted small">
                Join our mailing list to get the latest updates and offers.
              </p>
            </MDBCol>

            {/* Products */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto">
              <h6 className="text-uppercase fw-bold">Products</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="#!" className="text-reset">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </MDBCol>

            {/* Useful Links */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto">
              <h6 className="text-uppercase fw-bold">Useful Links</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="#!" className="text-reset">
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </li>
              </ul>
            </MDBCol>

            {/* Contact */}
            <MDBCol md="4" lg="3" xl="3" className="mx-auto">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <ul className="list-unstyled small">
                <li>
                  <MDBIcon icon="home" className="me-2" />
                  Phan Duc An
                </li>
                <li>
                  <MDBIcon icon="envelope" className="me-2" />
                  info@example.com
                </li>
                <li>
                  <MDBIcon icon="phone" className="me-2" />+ 01 234 567 88
                </li>
                <li>
                  <MDBIcon icon="print" className="me-2" />+ 01 234 567 89
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>

        {/* Social Media Section */}
        <section
          className="d-flex justify-content-center justify-content-lg-between p-3"
          style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
        >
          <div className="me-3 d-none d-lg-block">
            <span>Connect with us on social media:</span>
          </div>
          <div>
            <a href="#" className="me-3" style={{ color: "#4267B2" }}>
              <FacebookIcon fontSize="medium" />
            </a>
            <a href="#" className="me-3" style={{ color: "#1DA1F2" }}>
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="#" className="me-3" style={{ color: "#DB4437" }}>
              <GoogleIcon fontSize="medium" />
            </a>
            <a href="#" className="me-3" style={{ color: "#E1306C" }}>
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="#" className="me-3" style={{ color: "#0077B5" }}>
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="#" className="me-3" style={{ color: "#171515" }}>
              <GitHubIcon fontSize="medium" />
            </a>
          </div>
        </section>

        {/* Footer Bottom */}
        <div
          className="text-center p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          © 2024 Copyright:
          <a className="text-reset fw-bold ms-1" href="#">
            Nhom Bai Tap Lon
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

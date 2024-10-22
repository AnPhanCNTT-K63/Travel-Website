import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.module.css";

export default function WhyChooseSection() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1 style={{ fontWeight: "900" }}>Why Choose</h1>
      <hr
        style={{
          width: "20%",
          border: "1px solid black",
          margin: "0 auto",
        }}
      />
      <Container>
        <Row>
          <Col class="col-4">
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LocalOfferIcon sx={{ fontSize: "120px", color: "blue" }} />
              <Link className={styles.link}>Competitive Pricing</Link>
              <p>
                With 500+ suppliers and the purchasing power of 300 million
                members, mytravel.com can save you more!
              </p>
            </div>
          </Col>
          <Col class="col-4">
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: "120px", color: "blue" }} />
              <Link className={styles.link}>Competitive Pricing</Link>
              <p>
                With 500+ suppliers and the purchasing power of 300 million
                members, mytravel.com can save you more!
              </p>
            </div>
          </Col>
          <Col class="col-4">
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PublicIcon sx={{ fontSize: "120px", color: "blue" }} />
              <Link className={styles.link}>Competitive Pricing</Link>
              <p>
                With 500+ suppliers and the purchasing power of 300 million
                members, mytravel.com can save you more!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

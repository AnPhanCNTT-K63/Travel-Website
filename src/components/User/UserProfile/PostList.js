import { Row, Col, Card, Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import profilavatar from "../../../assets/images/face-1.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import project1 from "../../../assets/images/home-decor-1.jpeg";
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";

export default function Post() {
  const projects = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      description: "Uber’s extensive internal management transformation.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      description: "Music’s diversity of opinion and taste.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      description: "Exploring different tastes in music and decor.",
    },
  ];

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
      title={
        <>
          <h6 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Posts</h6>
          <p style={{ color: "#888" }}>Your Posts on the Blog Page</p>
        </>
      }
    >
      <Row gutter={[24, 24]}>
        {projects.map((project, index) => (
          <Col span={24} md={12} xl={6} key={index}>
            <Card
              bordered={false}
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
              cover={
                <img
                  alt={project.title}
                  src={project.img}
                  style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <div
                className="card-tag"
                style={{ fontWeight: "bold", color: "#555" }}
              >
                {project.titlesub}
              </div>
              <h5 style={{ color: "#333", fontWeight: "bold" }}>
                {project.title}
              </h5>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                {project.description}
              </p>
              <Row
                gutter={[6, 0]}
                className="card-footer"
                style={{ marginTop: 12 }}
              >
                <Col span={12}>
                  <Button
                    type="primary"
                    ghost
                    style={{ width: "100%", fontWeight: "bold" }}
                  >
                    VIEW PROJECT
                  </Button>
                </Col>
                <Col span={12} className="text-right">
                  <Avatar.Group className="avatar-chips">
                    <Avatar size="small" src={profilavatar} />
                    <Avatar size="small" src={convesionImg} />
                    <Avatar size="small" src={convesionImg2} />
                    <Avatar size="small" src={convesionImg3} />
                  </Avatar.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
        <Col span={24} md={12} xl={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Link to="/create/post">
              <Button
                type="primary"
                size="large"
                style={{ fontWeight: "bold", width: "100%" }}
              >
                Add New Post
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

import React from "react";
import { Button, Container, Row, Col, Card, CardBody } from "reactstrap";
import { Line, Pie } from "react-chartjs-2"; // Import the Pie chart along with Line chart
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement // Register the ArcElement for Pie chart
);

const AdminHeader = () => {
  // Example data for the Line chart (User Signups)
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "User Signups",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Signups",
        },
      },
    },
  };

  // Example data for the Pie chart (User Roles Distribution)
  const pieData = {
    labels: ["Admins", "Editors", "Subscribers"],
    datasets: [
      {
        data: [10, 25, 65], // This would be the count of each role
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"], // Colors for each segment
        hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = tooltipItem.raw;
            return `${percentage} users`;
          },
        },
      },
    },
  };

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "30px" }}>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage: "url('/admin-profile-cover.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Container className="mt--7" fluid style={containerStyle}>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">
                  Welcome, Admin {localStorage.getItem("username")}
                </h1>
                <p
                  className="text-white mt-0 mb-5"
                  style={{ fontSize: "1.2rem" }}
                >
                  Manage your platform effectively. View user activity, handle
                  reports, and oversee content creation all from this page.
                </p>
                <Button
                  color="primary"
                  size="lg"
                  style={buttonStyle}
                  onClick={() => console.log("Manage users clicked")}
                >
                  Manage Users
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Statistical Data Section */}
        <Container fluid style={{ marginTop: "30px" }}>
          <Row>
            <Col lg="6" md="6">
              <Card>
                <CardBody>
                  <h4 className="text-center">User Signups (This Year)</h4>
                  <Line data={lineData} options={lineOptions} />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6">
              <Card>
                <CardBody>
                  <h4 className="text-center">User Roles Distribution</h4>
                  <Pie data={pieData} options={pieOptions} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1.5rem",
};

const buttonStyle = {
  marginTop: "20px",
  fontSize: "1rem",
  fontWeight: "600",
};

export default AdminHeader;

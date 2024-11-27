import { styled } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import {
  ShoppingCart,
  Chat,
  CalendarToday,
  PostAdd,
  LocalOffer,
  Logout,
  ManageAccounts,
  AccountCircle,
  Tour,
  YoutubeSearchedFor,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { heartBeat, signout } from "../../api/services";

// Styled Sidebar with transitions for visibility and opacity
const StyledSidebar = styled("div")(({ theme, open }) => ({
  background: "linear-gradient(180deg, #3b4b6b 0%, #1e2a47 100%)", // A darker gradient from deep blue to navy
  position: "fixed", // Fixed position on the left
  top: 0,
  left: 0,
  bottom: 0, // Take full height
  width: "270px", // Sidebar width
  zIndex: 1000, // Sidebar on top of other content
  transform: open ? "translateX(0)" : "translateX(-100%)", // Initially hidden off-screen
  opacity: open ? 1 : 0, // Fade in/out
  transition: "transform 0.3s ease, visibility 0s 0.3s, opacity 0.3s ease", // Smooth transition for transform and opacity
  paddingTop: "50px", // Space for the top logo
}));

const StyledOverlay = styled("div")(({ theme, open }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "transparent", // Overlay effect
  zIndex: open ? 999 : -1, // Show overlay when sidebar is open
  pointerEvents: open ? "all" : "none", // Block interactions when sidebar is open
  transition: "opacity 0.3s ease", // Smooth transition for overlay
}));

const StyledMenuItem = styled("div")(({ theme }) => ({
  padding: "15px",
  fontWeight: 500,
  color: "#f1f1f1", // Softer white for better contrast with dark background
  transform: "translateY(0)", // Initial position
  transition:
    "transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease", // Faster, smoother transitions
  cursor: "pointer",
  borderRadius: "8px", // Rounded corners
  "&:hover": {
    backgroundColor: "#4f6e92", // Muted blue for a smooth hover effect
    color: theme.palette.common.white,
    transform: "translateY(-2px) scale(1.02)", // Slight lift and subtle scaling
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Softer shadow for smoother look
  },
}));

const StyledName = styled("div")(({ theme }) => ({
  padding: "15px", // Larger padding for a prominent area
  textAlign: "center",
  color: "#e0e0e0", // Soft off-white color for a refined look
  fontWeight: 700,
  fontSize: "18px", // Slightly larger font size for emphasis
  background: "linear-gradient(45deg, #4e6b8e, #2c3e56)", // A smooth gradient from slate blue to dark greyish-blue
  borderRadius: "12px", // Rounded corners for a softer look
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)", // Enhanced shadow for depth
  marginBottom: "8px", // Added space below for visual balance
  transform: "translateY(0)", // Smooth transition for when the sidebar opens
  transition: "transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease", // Transition effect on hover
  fontFamily: "'Roboto', sans-serif", // Modern font for a clean look
  textTransform: "uppercase", // Capitalize for emphasis
  letterSpacing: "1px", // Slightly increased letter spacing for better readability
  "&:hover": {
    transform: "translateY(-5px)", // Lift the element slightly on hover
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow for a glowing effect
    color: "#ffffff", // White text on hover for contrast
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none", // Remove the default underline
  color: theme.palette.common.white,
}));

const username = localStorage.getItem("username");

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const user = useContext(UserContext);
  const user_id = user.userId;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        console.log(user_id);
        const data = await heartBeat(user_id);
        console.log("Heartbeat data:", data);
      } catch (error) {
        console.error("Error in heartbeat:", error.message || error);
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user_id]);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const data = await signout();
      console.log(data);
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleMenuItemClick = () => {
    toggleSidebar();
  };

  return (
    <>
      {/* Overlay */}
      <StyledOverlay open={sidebarOpen} onClick={toggleSidebar} />

      {/* Sidebar */}
      <StyledSidebar open={sidebarOpen}>
        {/* Sidebar Content */}
        <StyledName>Enjoy Our Service, @{username}</StyledName>

        <div>
          <div>
            {user.role == "admin" && (
              <>
                <StyledLink
                  to={`/profile/${user.userId}`}
                  onClick={handleMenuItemClick}
                >
                  <StyledMenuItem>
                    <AccountCircle style={{ fontSize: 20 }} /> Profile
                  </StyledMenuItem>
                </StyledLink>
                <StyledLink
                  to={`/account/${user.userId}`}
                  onClick={handleMenuItemClick}
                >
                  <StyledMenuItem>
                    <ManageAccounts style={{ fontSize: 20 }} /> Admin Account
                  </StyledMenuItem>
                </StyledLink>
                <StyledLink to={"/createTour"}>
                  <StyledMenuItem onClick={handleMenuItemClick}>
                    <Tour style={{ fontSize: 20 }} /> Create Tour
                  </StyledMenuItem>
                </StyledLink>

                <StyledLink to={"/userManagement"}>
                  <StyledMenuItem onClick={handleMenuItemClick}>
                    <YoutubeSearchedFor style={{ fontSize: 20 }} /> Users
                    Manager
                  </StyledMenuItem>
                </StyledLink>
              </>
            )}

            {user.role == "user" && (
              <>
                <StyledLink
                  to={`/profile/${user.userId}`}
                  onClick={handleMenuItemClick}
                >
                  <StyledMenuItem>
                    <AccountCircle style={{ fontSize: 20 }} /> Profile
                  </StyledMenuItem>
                </StyledLink>
                <StyledLink
                  to={`/account/${user.userId}`}
                  onClick={handleMenuItemClick}
                >
                  <StyledMenuItem>
                    <ManageAccounts style={{ fontSize: 20 }} /> My Account
                  </StyledMenuItem>
                </StyledLink>
                <StyledMenuItem onClick={handleMenuItemClick}>
                  <Tour style={{ fontSize: 20 }} /> My Tour
                </StyledMenuItem>
                <StyledLink to={`/user/booking`}>
                  <StyledMenuItem onClick={handleMenuItemClick}>
                    <YoutubeSearchedFor style={{ fontSize: 20 }} /> My Booking
                  </StyledMenuItem>
                </StyledLink>
                <StyledMenuItem onClick={handleMenuItemClick}>
                  <YoutubeSearchedFor style={{ fontSize: 20 }} /> Transactions
                  History
                </StyledMenuItem>
              </>
            )}
          </div>

          <div>
            {user.role == "user" ? (
              <StyledMenuItem onClick={handleMenuItemClick}>
                <Chat style={{ fontSize: 20 }} /> Chat With Us
              </StyledMenuItem>
            ) : (
              <StyledLink to={"/user/request"} onClick={handleMenuItemClick}>
                <StyledMenuItem>
                  <Chat style={{ fontSize: 20 }} /> User Request
                </StyledMenuItem>
              </StyledLink>
            )}

            <StyledMenuItem onClick={handleMenuItemClick}>
              <CalendarToday style={{ fontSize: 20 }} /> Notification
            </StyledMenuItem>
          </div>

          <div>
            <StyledLink to={"/create/post"} onClick={handleMenuItemClick}>
              <StyledMenuItem>
                <PostAdd style={{ fontSize: 20 }} /> Post
              </StyledMenuItem>
            </StyledLink>
            <StyledMenuItem onClick={handleMenuItemClick}>
              <LocalOffer style={{ fontSize: 20 }} /> Vouchers
            </StyledMenuItem>
          </div>

          <div>
            <StyledMenuItem onClick={handleSignOut}>
              <Logout style={{ fontSize: 20 }} /> Log Out
            </StyledMenuItem>
          </div>
        </div>
      </StyledSidebar>
    </>
  );
};

export default Sidebar;

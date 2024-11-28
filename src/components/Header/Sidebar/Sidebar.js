import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../UserContext";
import { StyledName } from "./StyledName";
import { StyledSidebar } from "./StyledSidebar";
import { StyledOverlay } from "./StyledOverlay";
import { StyledMenuItem } from "./StyledMenuItem";
import { StyledLink } from "./StyledLink";
import { StyledLogout } from "./StyledLogout";
import {
  Chat,
  PostAdd,
  LocalOffer,
  Logout,
  ManageAccounts,
  AccountCircle,
  AddLocationAlt,
  SupervisorAccount,
  EventAvailable,
  ReceiptLong,
  Notifications,
} from "@mui/icons-material";
import { signout } from "../../../api/services";

const username = localStorage.getItem("username");

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const user = useContext(UserContext);

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
                    <AddLocationAlt style={{ fontSize: 20 }} /> Create Tour
                  </StyledMenuItem>
                </StyledLink>

                <StyledLink to={"/userManagement"}>
                  <StyledMenuItem onClick={handleMenuItemClick}>
                    <SupervisorAccount style={{ fontSize: 20 }} /> Users Manager
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
                  <AddLocationAlt style={{ fontSize: 20 }} /> My Tour
                </StyledMenuItem>
                <StyledLink to={`/user/booking`}>
                  <StyledMenuItem onClick={handleMenuItemClick}>
                    <EventAvailable style={{ fontSize: 20 }} /> My Booking
                  </StyledMenuItem>
                </StyledLink>
                <StyledLink to={"/billing"} onClick={handleMenuItemClick}>
                  <StyledMenuItem>
                    <ReceiptLong style={{ fontSize: 20 }} /> My Billing
                  </StyledMenuItem>
                </StyledLink>
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
              <Notifications style={{ fontSize: 20 }} /> Notification
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

          <div style={{ marginTop: "20px" }}>
            <StyledLogout onClick={handleSignOut}>
              <Logout style={{ fontSize: 20 }} /> Log Out
            </StyledLogout>
          </div>
        </div>
      </StyledSidebar>
    </>
  );
};

export default Sidebar;

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
  BookOutlined,
} from "@mui/icons-material";
export default function AdminSlidebar({
  user,
  handleMenuItemClick,
  handleSignOut,
}) {
  return (
    <>
      <StyledLink to={`/profile/${user.userId}`} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <AccountCircle style={{ fontSize: 20 }} /> Profile
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={`/account/${user.userId}`} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <ManageAccounts style={{ fontSize: 20 }} /> Admin Account
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/createTour"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <AddLocationAlt style={{ fontSize: 20 }} /> Create Tour
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/tour/manage"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <SupervisorAccount style={{ fontSize: 20 }} /> Tours Manager
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/userManagement"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <SupervisorAccount style={{ fontSize: 20 }} /> Users Manager
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/user/request"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <Chat style={{ fontSize: 20 }} /> User Request
        </StyledMenuItem>
      </StyledLink>

      <StyledLink
        to={`/profile/${user.userId}/#posts`}
        onClick={handleMenuItemClick}
      >
        <StyledMenuItem>
          <BookOutlined style={{ fontSize: 20 }} /> Manage Post
        </StyledMenuItem>
      </StyledLink>

      <StyledLink to={"/create/post"} onClick={handleMenuItemClick}>
        <StyledMenuItem>
          <PostAdd style={{ fontSize: 20 }} /> Post
        </StyledMenuItem>
      </StyledLink>

      <StyledMenuItem onClick={handleMenuItemClick}>
        <LocalOffer style={{ fontSize: 20 }} /> Vouchers
      </StyledMenuItem>

      <StyledLogout onClick={handleSignOut}>
        <Logout style={{ fontSize: 20 }} /> Log Out
      </StyledLogout>
    </>
  );
}

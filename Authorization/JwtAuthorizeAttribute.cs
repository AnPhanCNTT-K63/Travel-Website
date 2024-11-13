using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;


public class JwtAuthorizeAttribute : AuthorizeAttribute
{
    private const string SecretKey = "AnPhan12121212!@#SuperSecretKey123456";
    private readonly string[] _allowedRoles;

    public JwtAuthorizeAttribute(params string[] roles)
    {
        _allowedRoles = roles;
    }

    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        Debug.WriteLine(new string('-', 50)); // Divider
        Debug.WriteLine("Authorization process started.");

        try
        {
            // Extract token from header
            var token = httpContext.Request.Headers["Authorization"]?.Replace("Bearer ", "");
            if (string.IsNullOrEmpty(token))
            {
                Debug.WriteLine("Authorization header missing or empty.");
                return false;
            }

            Debug.WriteLine($"Received Token: {token}");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SecretKey);

            // Validate the token
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            Debug.WriteLine("Token validated successfully.");

            // Decode and check claims in token
            var jwtToken = (JwtSecurityToken)validatedToken;

            var usernameClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "unique_name");
            var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role");

            Debug.WriteLine(usernameClaim);
            Debug.WriteLine(roleClaim);

            if (usernameClaim == null || roleClaim == null)
            {
                Debug.WriteLine("Required claims (username or role) not found in the token.");
                return false;
            }

            var username = usernameClaim.Value;
            var userRole = roleClaim.Value;

            Debug.WriteLine($"Authenticated user: {username} with role: {userRole}");

            // Check if the user's role is within the allowed roles
            if (_allowedRoles.Length > 0 && !_allowedRoles.Contains(userRole))
            {
                Debug.WriteLine("User's role is not authorized for this resource.");
                return false;
            }

            // Attach user information to HttpContext for controller access
            httpContext.User = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, userRole) }
                )
            );
            return true;
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Token validation failed: {ex.Message}");
            return false;
        }
    }

    protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
    {
        filterContext.Result = new JsonResult
        {
            Data = new { error = "Unauthorized" },
            JsonRequestBehavior = JsonRequestBehavior.AllowGet
        };
    }
}

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.IdentityModel.Tokens;

public class JwtAuthorizeAttribute : AuthorizeAttribute
{
    private const string SecretKey = "AnPhan12121212!@#SuperSecretKey123456"; // Ensure it matches the key in JwtHelper

    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        var token = httpContext.Request.Headers["Authorization"]?.Replace("Bearer ", "");

        if (string.IsNullOrEmpty(token))
            return false;

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SecretKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var username = jwtToken.Claims.First(x => x.Type == ClaimTypes.Name).Value;

            // Attach user information to HttpContext for later use
            httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }));

            return true;
        }
        catch
        {
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

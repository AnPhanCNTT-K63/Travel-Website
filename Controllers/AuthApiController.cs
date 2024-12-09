using System;
using System.Linq;
using System.Web.Http;
using WebBackendProject.Models;
using System.Net.Http;
using System.Threading.Tasks;
using WebBackendProject.Models.DTO;
using System.Diagnostics;
using System.Data.Entity;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthApiController : ApiController
    {
        DbAppContext db = new DbAppContext();

        [HttpPost]
        [Route("signup")] // POST: auth/signup
        public async Task<IHttpActionResult> Signup(SignUpInfo info)
        {
            var existedUserEmail = await db.Users.FirstOrDefaultAsync(eu => eu.Email == info.Email);
            var existedUserUsername = await db.Users.FirstOrDefaultAsync(eu => eu.Username == info.Username);
            var softDeletedUserEmail = await db.Users.FirstOrDefaultAsync(u => u.IsDeleted == true);

            if (existedUserEmail != null)
            {
                return BadRequest("Email is already in use. Please login or click forgot password");
            }

            if (existedUserUsername != null)
            {
                return BadRequest("User has been used by someone else");
            }

            if (softDeletedUserEmail != null)
            {
                return BadRequest("Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days");
            }

            if (ModelState.IsValid)
            {
                var user = new User
                {
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    LastActive = DateTime.UtcNow,
                    Role = "user",
                    Username = info.Username,
                    Password = info.Password,
                    Email = info.Email
                };

                db.Users.Add(user);
                await db.SaveChangesAsync(); // Use async save

                var profile = new UserProfile
                {
                    UserId = user.Id
                };

                db.UserProfiles.Add(profile);
                await db.SaveChangesAsync(); // Use async save

                return Ok(info);
            }

            return BadRequest("Invalid Info");
        }

        [HttpPost]
        [Route("signin")] // POST: auth/signin
        public async Task<IHttpActionResult> Signin(SignInInfo info)
        {
            var loginUser = await db.Users
                .FirstOrDefaultAsync(u => u.Email == info.Email);

            if (loginUser == null)
            {
                return BadRequest("Email Not Found");
            }
            else if (loginUser.Password != info.Password)
            {
                return BadRequest("Incorrect Password");
            }
            else if (loginUser.IsDeleted == true)
            {
                return BadRequest("Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days");
            }
            else if (loginUser.IsBanned == true)
            {
                return BadRequest("Your account has been banned. Please contact us to know details.");
            }
            else
            {
                var token = JwtHelper.GenerateToken(loginUser.Email, loginUser.Username, loginUser.Role, loginUser.Id.ToString());

                Debug.WriteLine(loginUser);
                Debug.WriteLine(token);

                return Ok(new { token = token, message = "Success" });
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("signout")] // GET: auth/signout
        public IHttpActionResult Signout()
        {
            return Ok(new { message = "Log out success" });
        }

        [JwtAuthorize("admin", "user")]
        [HttpPost]
        [Route("password/check")] // POST: auth/password/check
        public async Task<IHttpActionResult> PasswordCheck(string password, int? user_id)
        {
            var user = await db.Users.FindAsync(user_id);

            if (user == null || user.Password != password)
            {
                return BadRequest("Invalid Password");
            }
            else
            {
                return Ok(new { message = "Success" });
            }
        }
    }
}

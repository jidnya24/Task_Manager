using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly task_managerContext _context;
        public AuthController(task_managerContext context)
        {
            _context = context;
        }

        // User Registration
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            // Validate request
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
                return BadRequest(new { message = "Invalid input data" });

            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest(new { message = "User already exists!" });

            // Save user directly without hashing password
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully!" });
        }

        // User Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginUser)
        {
            // Validate input
            if (loginUser == null || string.IsNullOrEmpty(loginUser.Email) || string.IsNullOrEmpty(loginUser.Password))
                return BadRequest(new { message = "Invalid input data" });

            // Check if user exists with matching email and password
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginUser.Email && u.Password == loginUser.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid Credentials!" });

            return Ok(new { message = "Login Successful!", userId = user.UserId });
        }
    }
}

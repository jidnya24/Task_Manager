using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.DTOs; // Import DTO namespace
using System.Threading.Tasks;
using TaskManager.Services;

namespace TaskManager.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly task_managerContext _context;
        private readonly EmailService _emailService;

        // ✅ Corrected Constructor
        public AuthController(task_managerContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // ✅ User Registration without Password Hashing
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
                return BadRequest(new { message = "Invalid input data" });

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest(new { message = "User already exists!" });

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully!" });
        }

        // ✅ User Login with Email Notification
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
                return BadRequest(new { message = "Invalid input data" });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid Credentials!" });

            // 🔹 Send email notification on successful login
            await _emailService.SendLoginEmail(loginRequest.Email, user.Uname);

            return Ok(new { message = "Login Successful!", userId = user.UserId });
        }
    }
}

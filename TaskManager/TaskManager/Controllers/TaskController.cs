using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class TaskController : Controller
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public IActionResult GetTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var tasks = _context.TaskManager.Where(t => t.UserId == userId).ToList();
            return Ok(tasks);
        }

        // POST: api/tasks
        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskManagers task)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            task.UserId = userId;

            _context.TaskManager.Add(task);
            _context.SaveChanges();
            return Ok(task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskManagers updatedTask)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var task = _context.TaskManager.FirstOrDefault(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound();

            task.Title = updatedTask.Title;
            _context.SaveChanges();

            return Ok(task);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var task = _context.TaskManager.FirstOrDefault(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound();

            _context.TaskManager.Remove(task);
            _context.SaveChanges();

            return Ok(new { message = "Deleted successfully." });
        }
    }
}

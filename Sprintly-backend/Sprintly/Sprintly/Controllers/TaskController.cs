using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sprintly.Application.DTOs.Tasks;
using Sprintly.Application.Interfaces;

namespace Sprintly.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
        {
            var userId = GetUserIdFromClaims();
            var id = await _taskService.CreateTaskAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = GetUserIdFromClaims();
            var tasks = await _taskService.GetTasksAsync(userId, page, pageSize);
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var userId = GetUserIdFromClaims();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPut]
        [Route("update/{id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateTaskDto dto)
        {
            var userId = GetUserIdFromClaims();
            var success = await _taskService.UpdateTaskAsync(id, dto, userId);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var userId = GetUserIdFromClaims();
            var success = await _taskService.DeleteTaskAsync(id, userId);
            return success ? NoContent() : NotFound();
        }

        private Guid GetUserIdFromClaims()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);
            return claim != null ? Guid.Parse(claim.Value) : throw new UnauthorizedAccessException();
        }
    }
}

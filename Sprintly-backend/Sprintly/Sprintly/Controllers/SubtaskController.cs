using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sprintly.Application.DTOs.Subtask;
using Sprintly.Application.Interfaces;

namespace Sprintly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubtaskController : ControllerBase
    {
        private readonly ISubtaskService _service;

        public SubtaskController(ISubtaskService service)
        {
            _service = service;
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<ActionResult<SubtaskDto>> Create(SubtaskCreateDto dto)
        {
            var created = await _service.CreateSubtaskAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpGet("list/{id:guid}")]
        public async Task<ActionResult<SubtaskDto>> Get(Guid id)
        {
            var subtask = await _service.GetSubtaskAsync(id);
            return subtask == null ? NotFound() : Ok(subtask);
        }

        [HttpGet("task/{taskId:guid}")]
        public async Task<ActionResult<IEnumerable<SubtaskDto>>> GetForTask(Guid taskId)
        {
            var subtasks = await _service.GetAllSubtasksForTaskAsync(taskId);
            return Ok(subtasks);
        }

        [HttpPut("update/{id:guid}")]
        public async Task<IActionResult> Update(Guid id, SubtaskUpdateDto dto)
        {
            var success = await _service.UpdateSubtaskAsync(id, dto);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("delete/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.DeleteSubtaskAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

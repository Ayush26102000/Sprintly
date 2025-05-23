using Microsoft.AspNetCore.Mvc;
using Sprintly.Application.DTOs.Sprints;
using Sprintly.Application.Interfaces;

namespace ProjectPilot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SprintController : ControllerBase
    {
        private readonly ISprintService _service;

        public SprintController(ISprintService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSprintDto dto)
        {
            var id = await _service.CreateSprintAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, new { id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sprints = await _service.GetAllSprintsAsync();
            return Ok(sprints);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var sprint = await _service.GetSprintByIdAsync(id);
            if (sprint == null) return NotFound();
            return Ok(sprint);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSprintDto dto)
        {
            var success = await _service.UpdateSprintAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.DeleteSprintAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}

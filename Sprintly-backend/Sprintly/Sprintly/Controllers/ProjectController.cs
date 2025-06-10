using Microsoft.AspNetCore.Mvc;
using Sprintly.Application.DTOs.Projects;
using Sprintly.Application.Interfaces;
using Sprintly.Infrastructure.Services;

namespace ProjectPilot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectController(IProjectService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectDto dto)
        {
            var id = await _service.CreateProjectAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, new { id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _service.GetAllProjectsAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var project = await _service.GetProjectByIdAsync(id);
            if (project == null) return NotFound();
            return Ok(project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProjectDto dto)
        {
            var success = await _service.UpdateProjectAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.DeleteProjectAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet("{id}/report")]
        public async Task<IActionResult> GetReport(Guid id)
        {
            var report = await _service.GetProjectReportAsync(id);
            if (report == null) return NotFound();
            return Ok(report);
        }

        [HttpGet("{id}/GetUserReport")]
        public async Task<IActionResult> GetUserReport(Guid id)
        {
            var report = await _service.GetUserReportAsync(id);
            if (report == null) return NotFound();
            return Ok(report);
        }





        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<List<TaskItem>>> GetTasksByProjectId(Guid projectId)
        {
            var tasks = await _service.GetTasksByProjectIdAsync(projectId);
            return Ok(tasks);
        }

        [HttpPatch("{taskId}/status")]
        public async Task<ActionResult<TaskItem>> UpdateTaskStatus(Guid taskId, [FromBody] TaskStatus newStatus)
        {
            var updated = await _service.UpdateTaskStatusAsync(taskId, newStatus);
            if (updated == null) return NotFound();
            return Ok(updated);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using ProjectPilot.Application.DTOs.Users;
using ProjectPilot.Application.Interfaces;
using Sprintly.Application.DTOs.Auth;
using Sprintly.Application.Interfaces;

namespace ProjectPilot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IAuthService _authservice;

        public UserController(IUserService service, IAuthService authService)
        {
            _service = service;
            _authservice = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RegisterDto dto)
        {
            var id = await _authservice.RegisterAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, new { id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _service.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto dto)
        {
            var success = await _service.UpdateUserAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.DeleteUserAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}

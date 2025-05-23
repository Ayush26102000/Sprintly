using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProjectPilot.Infrastructure.Persistence;
using Sprintly.Application.DTOs.Sprints;
using Sprintly.Application.Interfaces;

namespace Sprintly.Infrastructure.Services
{
    public class SprintService : ISprintService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SprintService> _logger;

        public SprintService(ApplicationDbContext context, ILogger<SprintService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Guid> CreateSprintAsync(CreateSprintDto dto)
        {
            var sprint = new Sprint
            {
                Name = dto.Name,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                ProjectId = dto.ProjectId
            };

            _context.Sprints.Add(sprint);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Sprint created: {@Sprint}", sprint);
            return sprint.Id;
        }

        public async Task<IEnumerable<SprintResponseDto>> GetAllSprintsAsync()
        {
            return await _context.Sprints
                .Include(s => s.Project)
                .Select(s => new SprintResponseDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    ProjectId = s.ProjectId,
                    ProjectName = s.Project.Name
                })
                .ToListAsync();
        }

        public async Task<SprintResponseDto?> GetSprintByIdAsync(Guid id)
        {
            var sprint = await _context.Sprints
                .Include(s => s.Project)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sprint == null) return null;

            return new SprintResponseDto
            {
                Id = sprint.Id,
                Name = sprint.Name,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                ProjectId = sprint.ProjectId,
                ProjectName = sprint.Project.Name
            };
        }

        public async Task<bool> UpdateSprintAsync(Guid id, UpdateSprintDto dto)
        {
            var sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null) return false;

            sprint.Name = dto.Name;
            sprint.StartDate = dto.StartDate;
            sprint.EndDate = dto.EndDate;
            sprint.ProjectId = dto.ProjectId;

            _context.Sprints.Update(sprint);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Sprint updated: {@Sprint}", sprint);
            return true;
        }

        public async Task<bool> DeleteSprintAsync(Guid id)
        {
            var sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null) return false;

            _context.Sprints.Remove(sprint);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Sprint deleted: {@Sprint}", sprint);
            return true;
        }
    }
}

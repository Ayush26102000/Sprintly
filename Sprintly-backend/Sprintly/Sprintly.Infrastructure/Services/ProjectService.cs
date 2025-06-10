using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProjectPilot.Infrastructure.Persistence;
using Sprintly.Application.DTOs;
using Sprintly.Application.DTOs.Projects;
using Sprintly.Application.Interfaces;

namespace Sprintly.Infrastructure.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProjectService> _logger;

        public ProjectService(ApplicationDbContext context, ILogger<ProjectService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Guid> CreateProjectAsync(CreateProjectDto dto)
        {
            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                TenantId = dto.TenantId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Project created: {@Project}", project);
            return project.Id;
        }

        public async Task<IEnumerable<ProjectResponseDto>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .Include(p => p.Tenant)
                .Select(p => new ProjectResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    TenantId = p.TenantId,
                    TenantName = p.Tenant.Name
                })
                .ToListAsync();
        }

        public async Task<ProjectResponseDto?> GetProjectByIdAsync(Guid id)
        {
            var project = await _context.Projects
                .Include(p => p.Tenant)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null) return null;

            return new ProjectResponseDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                TenantId = project.TenantId,
                TenantName = project.Tenant.Name
            };
        }

        public async Task<bool> UpdateProjectAsync(Guid id, UpdateProjectDto dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            project.Name = dto.Name;
            project.Description = dto.Description;
            project.TenantId = dto.TenantId;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Project updated: {@Project}", project);
            return true;
        }

        public async Task<bool> DeleteProjectAsync(Guid id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Project deleted: {@Project}", project);
            return true;
        }

        public async Task<ProjectReportDto?> GetProjectReportAsync(Guid projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null) return null;

            var report = new ProjectReportDto
            {
                ProjectId = project.Id,
                ProjectName = project.Name,
                TotalTasks = project.Tasks.Count,
                TodoTasks = project.Tasks.Count(t => t.Status == TaskStatus.ToDo),
                InProgressTasks = project.Tasks.Count(t => t.Status == TaskStatus.InProgress),
                DoneTasks = project.Tasks.Count(t => t.Status == TaskStatus.Done),
                TasksByPriority = project.Tasks
                    .GroupBy(t => t.Priority.ToString())
                    .ToDictionary(g => g.Key, g => g.Count())
            };

            return report;
        }

    }
}

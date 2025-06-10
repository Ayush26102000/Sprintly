using Sprintly.Application.DTOs;
using Sprintly.Application.DTOs.Projects;

namespace Sprintly.Application.Interfaces
{
    public interface IProjectService
    {
        Task<Guid> CreateProjectAsync(CreateProjectDto dto);
        Task<IEnumerable<ProjectResponseDto>> GetAllProjectsAsync();
        Task<ProjectResponseDto?> GetProjectByIdAsync(Guid id);
        Task<bool> UpdateProjectAsync(Guid id, UpdateProjectDto dto);
        Task<bool> DeleteProjectAsync(Guid id);
        Task<ProjectReportDto?> GetProjectReportAsync(Guid projectId);
        Task<UserReportDto?> GetUserReportAsync(Guid UserId);
        Task <TaskItem?> UpdateTaskStatusAsync(Guid UserId, TaskStatus taskStatus);
        Task<List<TaskItem>> GetTasksByProjectIdAsync(Guid UserId);

    }
}

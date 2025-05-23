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
    }
}

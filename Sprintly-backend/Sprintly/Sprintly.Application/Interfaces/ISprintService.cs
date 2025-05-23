using Sprintly.Application.DTOs.Sprints;

namespace Sprintly.Application.Interfaces
{
    public interface ISprintService
    {
        Task<Guid> CreateSprintAsync(CreateSprintDto dto);
        Task<IEnumerable<SprintResponseDto>> GetAllSprintsAsync();
        Task<SprintResponseDto?> GetSprintByIdAsync(Guid id);
        Task<bool> UpdateSprintAsync(Guid id, UpdateSprintDto dto);
        Task<bool> DeleteSprintAsync(Guid id);
    }
}

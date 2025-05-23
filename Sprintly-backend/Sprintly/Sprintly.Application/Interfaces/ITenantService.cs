using Sprintly.Application.DTOs.Tenant;

namespace Sprintly.Application.Interfaces
{
    public interface ITenantService
    {
        Task<Guid> CreateTenantAsync(CreateTenantDto dto);
        Task<IEnumerable<TenantResponseDto>> GetAllTenantsAsync();
        Task<TenantResponseDto?> GetTenantByIdAsync(Guid id);
        Task<bool> UpdateTenantAsync(Guid id, UpdateTenantDto dto);
        Task<bool> DeleteTenantAsync(Guid id);
    }
}

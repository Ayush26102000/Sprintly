using ProjectPilot.Application.DTOs.Users;
using Sprintly.Application.DTOs.Tenant;

namespace ProjectPilot.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
        Task<UserResponseDto?> GetUserByIdAsync(Guid id);
        Task<bool> UpdateUserAsync(Guid id, UpdateUserDto dto);
        Task<bool> DeleteUserAsync(Guid id);
        Task <TenantResponseDto> GetTenantByEmailAsync(string email);
    }
}

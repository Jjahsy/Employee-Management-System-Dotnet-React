using EmployeeManagementAPI.DTOs;

namespace EmployeeManagementAPI.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync();
        Task<EmployeeDto?> GetEmployeeByIdAsync(int id);
        Task<EmployeeDto> CreateEmployeeAsync(EmployeeDto employeeDto);
        Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto employeeDto);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}

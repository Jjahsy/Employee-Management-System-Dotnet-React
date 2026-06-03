using EmployeeManagementAPI.Repositories;
using EmployeeManagementAPI.Services;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Repositories;

namespace EmployeeManagementAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync()
        {
            var employees = await _repository.GetAllAsync();
            return employees.Select(e => MapToDto(e));
        }

        public async Task<EmployeeDto?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            return employee == null ? null : MapToDto(employee);
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(EmployeeDto employeeDto)
        {
            var employee = MapToEntity(employeeDto);
            employee.CreatedDate = DateTime.UtcNow;
            var created = await _repository.AddAsync(employee);
            return MapToDto(created);
        }

        public async Task<EmployeeDto?> UpdateEmployeeAsync(int id, EmployeeDto employeeDto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return null;

            existing.FirstName = employeeDto.FirstName;
            existing.LastName = employeeDto.LastName;
            existing.Email = employeeDto.Email;
            existing.Phone = employeeDto.Phone;
            existing.Department = employeeDto.Department;

            var updated = await _repository.UpdateAsync(existing);
            return updated == null ? null : MapToDto(updated);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        // Helper methods for manual mapping (instead of AutoMapper)
        private static EmployeeDto MapToDto(Employee employee) => new()
        {
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Email = employee.Email,
            Phone = employee.Phone,
            Department = employee.Department,
            CreatedDate = employee.CreatedDate
        };

        private static Employee MapToEntity(EmployeeDto dto) => new()
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            Department = dto.Department
        };
    }
}

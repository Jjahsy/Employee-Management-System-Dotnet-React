using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAll()
        {
            var employees = await _service.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetById(int id)
        {
            var employee = await _service.GetEmployeeByIdAsync(id);
            if (employee == null) return NotFound(new { message = "Employee not found" });
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> Create(EmployeeDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var created = await _service.CreateEmployeeAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EmployeeDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = await _service.UpdateEmployeeAsync(id, dto);
            if (updated == null) return NotFound(new { message = "Employee not found" });

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteEmployeeAsync(id);
            if (!result) return NotFound(new { message = "Employee not found" });

            return Ok(new { message = "Employee deleted successfully" });
        }
    }
}

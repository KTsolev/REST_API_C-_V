using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcRestApi.Models;
using MvcRestApi.Services;
using System.Web;


namespace MvcRestApi.Controllers
{
    public class EmployeeController : ApiController
    {
        private EmployeesRepository employeeRepo = new EmployeesRepository();

        public List<EmployeeModel> Get() 
        {
            return employeeRepo.GetAllEmployees();
        }
        public List<EmployeeModel> Get(string name,string textfield) 
        {
            List<EmployeeModel> list = new List<EmployeeModel>();
            if (textfield.ToLower().Equals("searchByName".ToLower())) 
            {
                list = employeeRepo.GetAllEmployeesByName(name);
            }
            else if (textfield.ToLower().Equals("searchBySurName".ToLower()))
            {
                list = employeeRepo.GetAllEmployeesBySurName(name);
            }

            return list;
        }

        public EmployeeModel GetEmployeeByID(int id) 
        {
            var employee = employeeRepo.GetEmployeesById(id);
            return employee;
        }

        //public List<EmployeeModel> DeleteEmployee(int id)
        //{
        //    employeeRepo.DeleteEmployee(id);
        //    return employeeRepo.GetAllEmployees();
        //}
    }
}

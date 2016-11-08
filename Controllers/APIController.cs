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
        private EmployeesRepository employeeRepo;

        public List<EmployeeModel> Get() 
        {
            employeeRepo = new EmployeesRepository();
            return employeeRepo.GetAllEmployees();
        }
        public List<EmployeeModel> Get(string name,string textfield) 
        {
            employeeRepo = new EmployeesRepository();
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

    }
}

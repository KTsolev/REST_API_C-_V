using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcRestApi.Models;
using System.IO;
using Newtonsoft.Json;

namespace MvcRestApi.Services
{
    public class EmployeesRepository
    {

        public static List<EmployeeModel> items = new List<EmployeeModel>();
        public EmployeesRepository() 
        {
            using (StreamReader r = new StreamReader(HttpContext.Current.Server.MapPath("~/Scripts/employees.json")))
            {
                string json = r.ReadToEnd();
                items = JsonConvert.DeserializeObject<List<EmployeeModel>>(json);
            }
        }
        public List<EmployeeModel> GetAllEmployees() 
        {
            return items;
        }
        public List<EmployeeModel> GetAllEmployeesByName(string Name)
        {
            if (Name == null || Name == string.Empty) 
            {
                return items;
            }
            else 
            {
                return items.FindAll(e => e.Name.ToLower().Equals(Name.ToLower()) || e.Name.ToLower().Contains(Name.ToLower()));
            }
        }
        public List<EmployeeModel> GetAllEmployeesBySurName(string Name)
        {
            if (Name == null || Name == string.Empty)
            {
                return items;
            }
            else
            {
                return items.FindAll(e => e.Surname.ToLower().Equals(Name.ToLower()) || e.Surname.ToLower().Contains(Name.ToLower()));
            }
        }
    }
}
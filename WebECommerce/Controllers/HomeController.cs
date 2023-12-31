﻿using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebECommerce.Models;

namespace WebECommerce.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public ActionResult RegisterPage()
        {
            return View("RegisterPage");
        }
        public ActionResult ReturnCommerceSite()
        {
            return View("CommerceSite");
        }
        public ActionResult ViewItem()
        {
            return View("SpecificItem");
        }
        public ActionResult CustomerOrders()
        {
            return View("CustomerOrders");
        }
        public ActionResult PaymentPage()
        {
            return View("PaymentPage");
        }
        public ActionResult AddNewItem()
        {
            return View("AddNewItem");
        }
        public ActionResult Favorites()
        {
            return View("Favorites");
        }
    }
}
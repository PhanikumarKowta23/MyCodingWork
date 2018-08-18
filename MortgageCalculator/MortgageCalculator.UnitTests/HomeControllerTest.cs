using Microsoft.VisualStudio.TestTools.UnitTesting;
using Unity;
using MortgageCalculator.Web.Controllers;

namespace MortgageCalculator.UnitTests
{
    [TestClass]
    public class HomeControllerTest
    {
        IUnityContainer _unityContainer;

        private HomeController homeController;

        [TestInitialize]
        public void setup()
        {
            _unityContainer = new UnityContainer();
            homeController = _unityContainer.Resolve<HomeController>();
        }
        [TestMethod]
        public void HomeTest()
        {
            var result = homeController.Index();
            Assert.IsNotNull(result);
        }
        
    }
}

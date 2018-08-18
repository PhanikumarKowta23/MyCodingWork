using Microsoft.VisualStudio.TestTools.UnitTesting;
using Unity;
using MortgageCalculator.Api.Controllers;

namespace MortgageCalculator.UnitTests
{
    [TestClass]
    public class MortgageControllerTest
    {
        IUnityContainer _unityContainer;

        private MortgageController mortgageController;

        [TestInitialize]
        public void setup()
        {
            _unityContainer = new UnityContainer();
            mortgageController = _unityContainer.Resolve<MortgageController>();
        }
        [TestMethod]
        public void GetMortgagesTest()
        {
            var result = mortgageController.Get();
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void GetMortgagesByIdTest()
        {
            var result = mortgageController.Get(1);
            Assert.IsNotNull(result);
        }
    }
}

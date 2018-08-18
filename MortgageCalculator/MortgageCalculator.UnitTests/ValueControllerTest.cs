using Microsoft.VisualStudio.TestTools.UnitTesting;
using Unity;
using MortgageCalculator.Api.Controllers;

namespace MortgageCalculator.UnitTests
{
    [TestClass]
    public class ValueControllerTest
    {
        IUnityContainer _unityContainer;

        private ValuesController valuesController;

        [TestInitialize]
        public void setup()
        {
            _unityContainer = new UnityContainer();
            valuesController = _unityContainer.Resolve<ValuesController>();
        }
        [TestMethod]
        public void GetValuesTest()
        {
            var result = valuesController.Get();
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void GetValuesByIdTest()
        {
            var result = valuesController.Get(1);
            Assert.IsNotNull(result);
        }
        //[TestMethod]
        //public void PostTest()
        //{
        //    var result = valuesController.Post();
        //    Assert.IsNotNull(result);
        //}
    }
}

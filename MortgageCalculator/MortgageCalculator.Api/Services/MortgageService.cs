using System.Collections.Generic;
using MortgageCalculator.Api.Repos;
using MortgageCalculator.Dto;

namespace MortgageCalculator.Api.Services
{
    public interface IMortgageService
    {
        List<Mortgage> GetAllMortgages();
    }

    public class MortgageService : IMortgageService
    {

        private readonly IMortgageRepo _mortgageRepo;
        public MortgageService() : this(new MortgageRepo())
        { }

        public MortgageService(IMortgageRepo mortgageRepo)
        {
            this._mortgageRepo = mortgageRepo;
        }

        public List<Mortgage> GetAllMortgages()
        {
            return _mortgageRepo.GetAllMortgages();
        }
    }
}
using System.Collections.Generic;

namespace FULLSTACKTEST.Data
{
    public interface IPolicyRepository
    {
        IEnumerable<Policy> Get();

        void Add(Policy policy);

        void Update(Policy policy);

        void Remove(int policyNumber);
    }
}
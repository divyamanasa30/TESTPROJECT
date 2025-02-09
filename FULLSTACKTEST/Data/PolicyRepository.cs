

namespace FULLSTACKTEST.Data
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly IList<Policy> _policies;

        public PolicyRepository()
        {
            _policies = new List<Policy>
            {
                new Policy
                {
                    PolicyNumber = 739562,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    PolicyNumber = 383002,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    PolicyNumber = 462946,
                    PolicyHolder = _policyHolder2
                },
                new Policy
                {
                    PolicyNumber = 355679,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 589881,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 998256,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 100374,
                    PolicyHolder = _policyHolder3
                }
            };
        }

        public IEnumerable<Policy> Get()
        {
            return _policies;
        }

        public void Add(Policy policy)
        {
            _policies.Add(policy);
        }

        public void Update(Policy policy)
        {
            Remove(policy.PolicyNumber);
            _policies.Add(policy);
        }

        public void Remove(int policyNumber)
        {
            var policiesCopy = _policies.ToList();  // Create a copy of the collection

            foreach (var policy in policiesCopy)
            {
                if (policy.PolicyNumber == policyNumber)
                {
                    _policies.Remove(policy);  // Modify the original collection
                }
            }
        }
            
        private readonly PolicyHolder _policyHolder1 = new PolicyHolder
        {
            Name = "Dwayne Johnson",
            Age = 44,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder2 = new PolicyHolder
        {
            Name = "John Cena",
            Age = 38,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder3 = new PolicyHolder
        {
            Name = "Trish Stratus",
            Age = 42,
            Gender = Gender.Female
        };
    }
}
using FULLSTACKTEST.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FULLSTACKTEST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        //TODO add methods to get/create/update/delete data from _repository
        [HttpGet]
        public IEnumerable<Policy> Get()
        {
            return _policyRepository.Get();
        }

        [HttpPut]
        public IActionResult Update([FromBody] Policy updatedPolicy)
        {
            if (updatedPolicy == null)
            {
                return NotFound("Policy not found.");
            }
            _policyRepository.Update(updatedPolicy);
            return NoContent();
        }


        [HttpPost]
        public IActionResult Add([FromBody] Policy addedPolicy)
        {
            if (addedPolicy == null)
            {
                return NotFound("Policy not found.");
            }
            _policyRepository.Add(addedPolicy);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            _policyRepository.Remove(id);
            return NoContent();
        }

    }
}

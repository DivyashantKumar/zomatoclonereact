
import Form from 'react-bootstrap/Form';

function CostContainer(props) {

    const cost = [
        {
            "name":"less than 500",
            "from":0,
            "to": 500
        },
        {
            "name":"500 to 1000",
            "from":500,
            "to": 1000
        },
        {
            "name":"1000 to 1500",
            "from":1000,
            "to": 1500
        },
        {
            "name":"1500 to 2000",
            "from":1500,
            "to": 2000
        },
        {
            "name":"2000+",
            "from":2000,
            "to": 5000
        }

    ];
    
    return (
        <form>
            {
                (cost).map((item) => (
                        <div className="mb-1 form-check" key={item.name}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="radiogroup"
                                id={item.name}
                                onChange={()=>setCost(item.from, item.to)}
                            />
                            <label className='form-check-label' htmlFor={item.name}>
                                {item.name}
                            </label>
                        </div>
                    )
                )
            }
        </form>
    );

    function setCost(from, to){
        
        const costRange = {
            "from": from,
            "to": to
        }
        props.getCost(costRange)
    }
}

export default CostContainer;
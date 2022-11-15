import Form from 'react-bootstrap/Form';
import '../style/CuisineContainer.css';

function CuisineContainer(props) {
    return (
        <Form>
            {
                (props.cuisine).map((type) => (
                    <div className="mb-1 form-check" key={type.code}>
                        <input
                            className="form-check-input"
                            type='checkbox'
                            id={`checkbox-${type.code}`}
                            value={type.code}
                            onChange={() => props.getCuisine(type.name)}
                        />
                        <label className='form-check-label' htmlFor={`checkbox-${type.code}`}>{type.name}</label>
                    </div>
                ))
            }
        </Form>
    );
}

export default CuisineContainer;
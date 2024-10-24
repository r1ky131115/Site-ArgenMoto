import React from 'react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';
import '../../styles/animation.css'

const TripForm: React.FC = () => {
    const formRef = useAnimateOnScroll<HTMLFormElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
        console.log("Form submitted");
    };

    return (
        <div className="col-md-4 d-flex align-items-center">
        <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="request-form ftco-animate bg-primary"
            data-animate-effect="fadeInLeft"
        >
            <h2>Make your trip</h2>
            <div className="form-group">
            <label htmlFor="pickup" className="label">Pick-up location</label>
            <input
                type="text"
                id="pickup"
                className="form-control"
                placeholder="City, Airport, Station, etc"
            />
            </div>

            <div className="form-group">
            <label htmlFor="dropoff" className="label">Drop-off location</label>
            <input
                type="text"
                id="dropoff"
                className="form-control"
                placeholder="City, Airport, Station, etc"
            />
            </div>

            <div className="d-flex">
            <div className="form-group mr-2">
                <label htmlFor="book_pick_date" className="label">Pick-up date</label>
                <input
                type="date"
                className="form-control"
                id="book_pick_date"
                placeholder="Date"
                />
            </div>
            <div className="form-group ml-2">
                <label htmlFor="book_off_date" className="label">Drop-off date</label>
                <input
                type="date"
                className="form-control"
                id="book_off_date"
                placeholder="Date"
                />
            </div>
            </div>

            <div className="form-group">
            <label htmlFor="time_pick" className="label">Pick-up time</label>
            <input
                type="time"
                className="form-control"
                id="time_pick"
                placeholder="Time"
            />
            </div>

            <div className="form-group">
            <input
                type="submit"
                value="Rent A Car Now"
                className="btn btn-secondary py-3 px-4"
            />
            </div>
        </form>
        </div>
    );
};

export default TripForm;

import React, { Fragment } from 'react';
import './style.css';

// Details the
const OfferDescription = ({ offer }) => {
    switch (offer.type) {
        case 'percentage':
            return <span>-{offer.value} % = </span>;
        case 'minus':
            // No need to add description in this case
            return null;
        case 'slice':
            return (
                <span>
                    -{offer.value} EUR for each {offer.sliceValue} EUR =
                </span>
            );
        default:
            return null;
    }
};

const TotalPrice = ({ bestOffer }) => (
    <div className="Price-Group">
        {bestOffer.offer && (
            <Fragment>
                <div className="Price-Row">
                    <span className="Price-Row-Text">Total Price:</span>
                    <span className="Price-Row-Value">
                        {bestOffer.originalPrice} €
                    </span>
                </div>

                <div className="Price-Row Price-Row-Discount">
                    <span className="Price-Row-Text">Discount:</span>
                    <span className="Price-Row-Value">
                        <OfferDescription offer={bestOffer.offer} />-
                        {bestOffer.offeredPriceCut} €
                    </span>
                </div>
            </Fragment>
        )}
        <div className="Price-Row Price-Row-Final">
            <span className="Price-Row-Text">Final Price:</span>
            <span className="Price-Row-Value">
                {bestOffer.priceWithOffer} €
            </span>
        </div>
    </div>
);

export default TotalPrice;

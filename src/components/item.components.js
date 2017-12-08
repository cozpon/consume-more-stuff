import React from 'react';
import { FormattedRelative } from 'react-intl';
import { Link } from 'react-router-dom';

const Item = ({ singleItem, singleView }) => {
  const url = /^http/;
  let imageUrl = singleItem.imageUrl;
   // if imageUrl is not an http link AND this is a request from the single item view
  if (!url.test(imageUrl) && singleView) {
    imageUrl = '/' + imageUrl;
  }
  return (
    <div className="single-item">

      <div className="single-item-name">
        { singleItem.name }
      </div>

      { singleView
        ? <div className="item-img">
            <img className="uploaded-img" src={ imageUrl } alt="" />
          </div>
        : <Link to={`/items/${singleItem.id}`}>
            <div className="item-img">
              <img className="uploaded-img" src={ imageUrl } alt="" />
            </div>
          </Link>
      }

      <div className="single-item-details">
        <div className="card-price">
          ${ singleItem.price }
        </div>

        <div className="card-description">
          { singleItem.description }
        </div>

        <div className="card-createdAt">
          <FormattedRelative value={ singleItem.createdAt } />
        </div>
      </div>

      { singleView
        // if singleView is true render these
        ? <div className="card-details">
            <div>
              Category: { singleItem.Category.category }
            </div>
            <div>
              Condition: { singleItem.Condition.condition }
            </div>

            { singleItem.manufacturer
              ? <div className="card-manufacturer">{ singleItem.manufacturer }</div>
              : null
            }
            { singleItem.model
              ? <div>Model: { singleItem.model }</div>
              : null
            }
            { singleItem.dimensions
              ? <div>Dimensions: { singleItem.dimensions }</div>
              : null
            }
            { singleItem.notes
              ? <div>Notes: { singleItem.notes }</div>
              : null
            }
            {
              singleItem.createdAt
              ? <div>Posted: <FormattedRelative
                  value={singleItem.createdAt} />
                </div>
              : null
            }
            {
              singleItem.is_sold === 2
              ? <div>SOLD</div>
              : null
            }
          </div>
          // else render nothing
        : null
      }

    </div>
  );
}

export default Item;
import React from "react";

const FoodMenus = () => {
  const menuItems = [
    {
      id: 1,
      category: "Breakfast",
      image: "assets/img/banner/10.jpg",
      items: [
        {
          title: "Chicken Alfredo",
          prices: ["$20"],
          descriptionLeft: "Ricotta / goat cheese / beetroot",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/1.jpg",
        },
        {
          title: "Fish & Chips",
          prices: ["$36"],
          descriptionLeft: "Atlantic / chips / salad /tartare",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/2.jpg",
        },
        {
          title: "Ebony Fillet Steak",
          prices: ["$44"],
          descriptionLeft: "Truffle mash / pepper sauce.",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/3.jpg",
        },
      ],
    },
    {
      id: 2,
      category: "Lunch",
      image: "assets/img/banner/11.jpg",
      items: [
        {
          title: "Chicken Alfredo",
          prices: ["$20"],
          descriptionLeft: "Ricotta / goat cheese / beetroot",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/1.jpg",
        },
        {
          title: "Fish & Chips",
          prices: ["$36"],
          descriptionLeft: "Atlantic / chips / salad /tartare",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/2.jpg",
        },
        {
          title: "Ebony Fillet Steak",
          prices: ["$44"],
          descriptionLeft: "Truffle mash / pepper sauce.",
          descriptionRight: "Extra Free Juice.",
          thumbnail: "assets/img/food/3.jpg",
        },
      ],
    },
  ];

  return (
    <div className="food-menus-area default-padding">
      <div className="container">
        {menuItems.map((menu) => (
          <div className="food-menus-item" key={menu.id}>
            <div className="row">
              <div
                className={`col-lg-5 thumb ${
                  menu.id % 2 === 0 ? "order-lg-last" : ""
                }`}
                style={{ background: `url(${menu.image})` }}
              >
                <div className="discount-badge">
                  <strong>Menu</strong> {menu.category}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="info">
                  <ul className="meal-type">
                    <li>Fiyat</li>
                  </ul>
                  <ul className="meal-items">
                    {menu.items.map((item, index) => (
                      <li key={index}>
                        <div className="thumbnail">
                          <img src={item.thumbnail} alt="Image Not Found" />
                        </div>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>{item.title}</h4>
                            </div>
                            <div className="price">
                              {item.prices.map((price, i) => (
                                <span key={i}>{price}</span>
                              ))}
                            </div>
                          </div>
                          <div className="bottom">
                            <div className="left">
                              <p>{item.descriptionLeft}</p>
                            </div>
                            <div className="right">
                              <p>{item.descriptionRight}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenus;

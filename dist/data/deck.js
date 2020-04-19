"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_type_enum_1 = require("../enums/card-type.enum");
const color_enum_1 = require("../enums/color.enum");
const rents_1 = require("./rents");
const propertyCards = [
    {
        name: 'Baltic Avenue',
        value: 1,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BROWN,
                rents: rents_1.brownRents
            }
        ]
    },
    {
        name: 'Mediterranean Avenue',
        value: 1,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BROWN,
                rents: rents_1.brownRents
            }
        ]
    },
    {
        name: 'Boardwalk',
        value: 4,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLUE,
                rents: rents_1.blueRents
            }
        ]
    },
    {
        name: 'Park Place',
        value: 4,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLUE,
                rents: rents_1.blueRents
            }
        ]
    },
    {
        name: 'North Carolina Avenue',
        value: 4,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            }
        ]
    },
    {
        name: 'Pacific Avenue',
        value: 4,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            }
        ]
    },
    {
        name: 'Pennsylvania Avenue',
        value: 4,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            }
        ]
    },
    {
        name: 'Connecticut Avenue',
        value: 1,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            }
        ]
    },
    {
        name: 'Oriental Avenue',
        value: 1,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            }
        ]
    },
    {
        name: 'Vermont Avenue',
        value: 1,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            }
        ]
    },
    {
        name: 'New York Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            }
        ]
    },
    {
        name: 'St. James Place',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            }
        ]
    },
    {
        name: 'Tennessee Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            }
        ]
    },
    {
        name: 'St. Charles Place',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            }
        ]
    },
    {
        name: 'Virginia Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            }
        ]
    },
    {
        name: 'States Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            }
        ]
    },
    {
        name: 'Short Line',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'B & O Railroad',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Reading Railroad',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Pennsylvania Railroad',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Kentucky Avenue',
        value: 3,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            }
        ]
    },
    {
        name: 'Indiana Avenue',
        value: 3,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            }
        ]
    },
    {
        name: 'Illinois Avenue',
        value: 3,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            }
        ]
    },
    {
        name: 'Water Works',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.LIGHT_GREEN,
                rents: rents_1.lightGreenRents
            }
        ]
    },
    {
        name: 'Electric Company',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.LIGHT_GREEN,
                rents: rents_1.lightGreenRents
            }
        ]
    },
    {
        name: 'Ventnor Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            }
        ]
    },
    {
        name: 'Marvin Gardens',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            }
        ]
    },
    {
        name: 'Atlantic Avenue',
        value: 2,
        type: card_type_enum_1.CardType.PROPERTY,
        property: [
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            }
        ]
    }
];
const currencyCards = [
    10,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    4,
    4,
    4,
    5,
    5
].map((value) => {
    return {
        name: `$${value}`,
        value,
        type: card_type_enum_1.CardType.CURRENCY
    };
});
const wildCards = [
    {
        name: 'Wild Card',
        value: 4,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            },
            {
                color: color_enum_1.Color.BLUE,
                rents: rents_1.blueRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            },
            {
                color: color_enum_1.Color.BROWN,
                rents: rents_1.brownRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            },
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            },
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            },
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            },
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.LIGHT_GREEN,
                rents: rents_1.lightGreenRents
            },
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            },
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 2,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            },
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 0,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            },
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            },
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            },
            {
                color: color_enum_1.Color.LIGHT_GREEN,
                rents: rents_1.lightGreenRents
            },
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            },
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            },
            {
                color: color_enum_1.Color.BROWN,
                rents: rents_1.brownRents
            },
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            },
            {
                color: color_enum_1.Color.BLUE,
                rents: rents_1.blueRents
            },
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            }
        ]
    },
    {
        name: 'Wild Card',
        value: 0,
        type: card_type_enum_1.CardType.WILD,
        property: [
            {
                color: color_enum_1.Color.RED,
                rents: rents_1.redRents
            },
            {
                color: color_enum_1.Color.YELLOW,
                rents: rents_1.yellowRents
            },
            {
                color: color_enum_1.Color.BLACK,
                rents: rents_1.blackRents
            },
            {
                color: color_enum_1.Color.LIGHT_GREEN,
                rents: rents_1.lightGreenRents
            },
            {
                color: color_enum_1.Color.PURPLE,
                rents: rents_1.purpleRents
            },
            {
                color: color_enum_1.Color.ORANGE,
                rents: rents_1.orangeRents
            },
            {
                color: color_enum_1.Color.BROWN,
                rents: rents_1.brownRents
            },
            {
                color: color_enum_1.Color.LIGHT_BLUE,
                rents: rents_1.lightBlueRents
            },
            {
                color: color_enum_1.Color.BLUE,
                rents: rents_1.blueRents
            },
            {
                color: color_enum_1.Color.GREEN,
                rents: rents_1.greenRents
            }
        ]
    }
];
const rentCards = [
    [color_enum_1.Color.BLUE, color_enum_1.Color.GREEN],
    [color_enum_1.Color.BLUE, color_enum_1.Color.GREEN],
    [color_enum_1.Color.BROWN, color_enum_1.Color.LIGHT_BLUE],
    [color_enum_1.Color.BROWN, color_enum_1.Color.LIGHT_BLUE],
    [color_enum_1.Color.PURPLE, color_enum_1.Color.ORANGE],
    [color_enum_1.Color.PURPLE, color_enum_1.Color.ORANGE],
    [color_enum_1.Color.BLACK, color_enum_1.Color.LIGHT_GREEN],
    [color_enum_1.Color.BLACK, color_enum_1.Color.LIGHT_GREEN],
    [color_enum_1.Color.RED, color_enum_1.Color.YELLOW],
    [color_enum_1.Color.RED, color_enum_1.Color.YELLOW],
    [
        color_enum_1.Color.RED,
        color_enum_1.Color.YELLOW,
        color_enum_1.Color.BLACK,
        color_enum_1.Color.LIGHT_GREEN,
        color_enum_1.Color.PURPLE,
        color_enum_1.Color.ORANGE,
        color_enum_1.Color.BROWN,
        color_enum_1.Color.LIGHT_BLUE,
        color_enum_1.Color.BLUE,
        color_enum_1.Color.GREEN
    ],
    [
        color_enum_1.Color.RED,
        color_enum_1.Color.YELLOW,
        color_enum_1.Color.BLACK,
        color_enum_1.Color.LIGHT_GREEN,
        color_enum_1.Color.PURPLE,
        color_enum_1.Color.ORANGE,
        color_enum_1.Color.BROWN,
        color_enum_1.Color.LIGHT_BLUE,
        color_enum_1.Color.BLUE,
        color_enum_1.Color.GREEN
    ],
    [
        color_enum_1.Color.RED,
        color_enum_1.Color.YELLOW,
        color_enum_1.Color.BLACK,
        color_enum_1.Color.LIGHT_GREEN,
        color_enum_1.Color.PURPLE,
        color_enum_1.Color.ORANGE,
        color_enum_1.Color.BROWN,
        color_enum_1.Color.LIGHT_BLUE,
        color_enum_1.Color.BLUE,
        color_enum_1.Color.GREEN
    ]
].map((rentColors) => {
    return {
        value: 1,
        name: 'Rent',
        type: card_type_enum_1.CardType.RENT,
        rentColors
    };
});
const actionCards = [
    {
        name: 'Deal Breaker',
        value: 5,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Steal a complete set of properties from any player (Includes any buildings).'
    },
    {
        name: 'Deal Breaker',
        value: 5,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Steal a complete set of properties from any player (Includes any buildings).'
    },
    {
        name: 'Debt Collector',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Force any player to pay you $5.'
    },
    {
        name: 'Debt Collector',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Force any player to pay you $5.'
    },
    {
        name: 'Debt Collector',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Force any player to pay you $5.'
    },
    {
        name: 'Double the Rent',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Needs to be played with a rent card.'
    },
    {
        name: 'Double the Rent',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Needs to be played with a rent card.'
    },
    {
        name: 'Forced Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Swap any property with another player. (Cannot be part of a full set)'
    },
    {
        name: 'Forced Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Swap any property with another player. (Cannot be part of a full set)'
    },
    {
        name: 'Forced Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Swap any property with another player. (Cannot be part of a full set)'
    },
    {
        name: 'Forced Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Swap any property with another player. (Cannot be part of a full set)'
    },
    {
        name: 'It`s My Birthday',
        value: 2,
        type: card_type_enum_1.CardType.ACTION,
        description: 'All players give you $2 as a "gift"'
    },
    {
        name: 'It`s My Birthday',
        value: 2,
        type: card_type_enum_1.CardType.ACTION,
        description: 'All players give you $2 as a "gift"'
    },
    {
        name: 'It`s My Birthday',
        value: 2,
        type: card_type_enum_1.CardType.ACTION,
        description: 'All players give you $2 as a "gift"'
    },
    {
        name: 'Just Say No!',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Use any time when an action card is played against you.'
    },
    {
        name: 'Just Say No!',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Use any time when an action card is played against you.'
    },
    {
        name: 'Just Say No!',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Use any time when an action card is played against you.'
    },
    {
        name: 'Sly Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
    },
    {
        name: 'Sly Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
    },
    {
        name: 'Sly Deal',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Steal a property from the player of your choice. (Cannot be part of a full set).'
    },
    {
        name: 'Hotel',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $4 to the rent value.'
    },
    {
        name: 'Hotel',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $4 to the rent value.'
    },
    {
        name: 'Hotel',
        value: 4,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $4 to the rent value.'
    },
    {
        name: 'House',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $3 to the rent value.'
    },
    {
        name: 'House',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $3 to the rent value.'
    },
    {
        name: 'House',
        value: 3,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Add onto any full set you own to add $3 to the rent value.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    },
    {
        name: 'Pass Go',
        value: 1,
        type: card_type_enum_1.CardType.ACTION,
        description: 'Draw 2 extra cards.'
    }
];
exports.deck = () => {
    const deck = propertyCards
        .concat(wildCards)
        .concat(currencyCards)
        .concat(rentCards)
        .concat(actionCards);
    deck.forEach((card, index) => {
        card.id = index;
    });
    return deck;
};

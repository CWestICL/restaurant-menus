const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    let r1;
    let r2;
    let r3;
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        r1 = await Restaurant.create({
            name: "Messy Joe's",
            location: "London",
            cuisine: "English"
        });
        r2 = await Restaurant.create({
            name: "Tarana",
            location: "Turner Hill",
            cuisine: "Indian"
        });
        r3 = await Restaurant.create({
            name: "Fagin's",
            location: "Hastings",
            cuisine: "American"
        });
    });

    test('can create a Restaurant', async () => {
        expect(r1.name).toEqual("Messy Joe's");
        expect(r1.location).toEqual("London");
        expect(r1.cuisine).toEqual("English");
    });

    test('can create a Menu', async () => {
        const m1 = await Menu.create({
            title: "Breakfast"
        });

        expect(m1.title).toEqual("Breakfast");
    });

    test('can find Restaurants', async () => {
        const messyJoes = await Restaurant.findOne({
            where: {
                name: "Messy Joe's"
            }
        });
        expect(messyJoes.cuisine).toEqual("English");
        const fagins = await Restaurant.findOne({
            where: {
                location: "Hastings"
            }
        });
        expect(fagins.name).toEqual("Fagin's");
    });

    test('can find Menus', async () => {
        const m2 = await Menu.create({
            title: "Lunch"
        });
        const m3 = await Menu.create({
            title: "Dessert"
        });
        const breakfast = await Menu.findOne({
            where: {
                title: "Breakfast"
            }
        });
        expect(breakfast.title).toEqual("Breakfast");
        const dessert = await Menu.findOne({
            where: {
                title: "Dessert"
            }
        });
        expect(dessert.title).toEqual("Dessert");
    });

    test('can delete Restaurants', async () => {
        Restaurant.destroy({
            where: {
                name: "Messy Joe's"
            }
        });
        const deleted = await Restaurant.findOne({
            where: {
                cuisine: "English"
            }
        });
        expect(deleted).toEqual(null);
        const notDeleted = await Restaurant.findOne({
            where: {
                cuisine: "Indian"
            }
        });
        expect(notDeleted.name).toEqual("Tarana");
    });
})